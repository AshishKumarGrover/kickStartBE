const sipService = async (requestOption) => {
    // Calculation of Total Return
    const months = requestOption.period * 12
    const rate = (requestOption.rate - requestOption.inflationRate) / 12
    const monInvest = requestOption.monInvest
    let returnSip = 0
    const graph = [{
        month: 0,
        investment: 0,
        value: 0
    }]
    for (let i = 1; i <= months; i++) {
        returnSip += monInvest * Math.pow(1 + rate / 100, i)
        const obj = {
            month: i,
            investment: monInvest * i,
            value: Math.floor(returnSip)
        }
        graph.push(obj)
    }
    const result = {
        period: requestOption.period,
        rate: requestOption.rate,
        moneyInvested: months * monInvest,
        inflationRate: requestOption.inflationRate,
        returnSip: Math.floor(returnSip),
        graph: graph
    }
    return result
}

const calculateSipStepUp = async (inputData) => {
  const { monthlySavings, yearlyIncrement, investmentPeriod, rateOfReturn } = inputData
  const months = investmentPeriod * 12
  const rate = rateOfReturn / 12

  let graph = [
    {
      month: 0,
      sip: 0,
      sipStepUp: 0,
      totalInvestmentTillDate: 0
    }
  ]

  let sipStepUpSavings = monthlySavings
  let sipGrowth = 0
  let sipStepUpGrowth = 0
  let totalInvestmentTillDate = 0

  for (let i = 1; i <= months; i++) {
    sipGrowth += monthlySavings * Math.pow(1 + rate / 100, i)
    if (i % 12 == 1 && i != 1)
      sipStepUpSavings += sipStepUpSavings * (yearlyIncrement / 100)
    sipStepUpGrowth += sipStepUpSavings * Math.pow(1 + rate / 100, i)
    totalInvestmentTillDate += sipStepUpSavings
    graph.push({
      month: i,
      sip: Math.floor(sipGrowth),
      sipStepUp: Math.floor(sipStepUpGrowth),
      totalInvestmentTillDate: Math.floor(totalInvestmentTillDate)
    })
  }
  const data = {
    monthlySavings,
    investmentPeriod,
    yearlyIncrement,
    totalSipStepUpAmount: Math.floor(sipStepUpGrowth),
    graph
  }
  return data
}

//function for calculation of sipgrowth
const _sipGrowth = async (monthlyInvestment, timeDuration, rateOfReturn) => {
    let sipCumulation = 0
    let sipGrowthResult = 0

    for (let i = 1; i <= timeDuration; i++) {
        sipCumulation = monthlyInvestment * (Math.pow((1 + rateOfReturn / 100), i))
        sipGrowthResult += sipCumulation
    }
    return sipGrowthResult
}

const calculateSipDelay = async (options) => {
    const monthlyInvestment = options.monthlyInvestment
    const investmentPeriod = options.investmentPeriod
    const rateOfReturn = options.rateOfReturn
    const delay = options.delay

    const timeDuration = (investmentPeriod) * 12  //converting years into months 
    const rate = (rateOfReturn) / 12  //calculating rate for per month
    const timeDurationAfterDelay = timeDuration - delay

    const sipGrowthToday = await _sipGrowth(monthlyInvestment, timeDuration, rate)  //amount get if start from today 
    const sipGrowthDelay = await _sipGrowth(monthlyInvestment, timeDurationAfterDelay, rate)  //amount get if start after delay 
    const sipLossDelay = sipGrowthToday - sipGrowthDelay  //loss get from the delay of investment

    const startToday = { startToday: "StartToday", sipGrowthToday }
    const delayedStart = { delayedStart: "DelayedStart", sipGrowthDelay }
    const loss = { lossFromDelay: "LossFromDelay", sipLossDelay }

    const graph = [startToday, delayedStart, loss]
    const data = {
        sipLossDelay,
        delayMonths: delay,
        graph: graph
    }
    return data
}

module.exports = { 
  calculateSipDelay,
  calculateSipStepUp,
  sipService 
}
