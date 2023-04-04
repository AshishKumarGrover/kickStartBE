const sipCalculatorService = require('../services/sipCalculator')
const { RESPONSE_MSG, STATUS } = require('../constants')

const sipStepUpCalculator = async (req, res) => {
    try {
        const { monthlySavings, yearlyIncrement, investmentPeriod, rateOfReturn } = req.body
        if (!monthlySavings || monthlySavings <= 0 || !yearlyIncrement || yearlyIncrement <= 0 ||
            !investmentPeriod || investmentPeriod <= 0 || !rateOfReturn || rateOfReturn <= 0) {
            return res.json({
                status: STATUS.FAILED,
                message: RESPONSE_MSG.FAILED,
                result: {}
            })
        }
        const result = await sipCalculatorService.calculateSipStepUp(req.body)
        res.json({
            status: STATUS.SUCCESS,
            message: RESPONSE_MSG.SUCCESS,
            result: result
        })
    }
    catch (exception) {
        res.json({
            status: STATUS.FAILED,
            message: RESPONSE_MSG.FAILED,
            result: {}
        })
    }
}

const sipDelayCalculator = async (req, res) => {
    try {
        const { monthlyInvestment, investmentPeriod, rateOfReturn, delay } = req.body
        // validating the values of user input
        if ((isNaN(monthlyInvestment) || isNaN(investmentPeriod) || isNaN(rateOfReturn) || isNaN(delay))
            || (monthlyInvestment <= 0 || investmentPeriod <= 0 || rateOfReturn <= 0 || delay < 0)) {
            return res.json({
                status: STATUS.FAILED,
                message: RESPONSE_MSG.FAILED,
                result: {}
            })
        }
        const result = await sipCalculatorService.calculateSipDelay({ monthlyInvestment, investmentPeriod, rateOfReturn, delay })
        res.json({
            status: STATUS.SUCCESS,
            message: RESPONSE_MSG.SUCCESS,
            result
        })
    }
    catch (exception) {
        res.json({ status: STATUS.FAILED, message: RESPONSE_MSG.FAILED, result: {} })
    }
}

const sipCalculator = async (req, res) => {
    try {
        //  Check If all inputs are numerical or not
        // Check if all inputs are more than zero or not
        const { period, rate, monInvest, inflationRate } = req.body
        if (typeof period != 'number' || typeof rate != 'number' || typeof monInvest != 'number'
            || typeof inflationRate != 'number' || period <= 0 || rate <= 0 || monInvest <= 0
            || inflationRate < 0) {
            return res.json({
                status: STATUS.FAILED,
                message: RESPONSE_MSG.FAILED,
                result: {}
            })
        }
        const result = await sipCalculatorService.sipService({ period, rate, monInvest, inflationRate })
        res.json({
            status: STATUS.SUCCESS,
            message: RESPONSE_MSG.SUCCESS,
            result: result
        })
    } catch (exception) {
        res.json({ status: STATUS.FAILED, message: RESPONSE_MSG.FAILED, result: {} })
    }
}

module.exports = {
    sipDelayCalculator,
    sipStepUpCalculator,
    sipCalculator
}