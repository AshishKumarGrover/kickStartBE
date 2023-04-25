const {getSchemesData,fetchPortfolioOverlap} = require("../repositories/portfolioOverlap")
const { VALIDATION_CONSTANTS,RESPONSE_MSG} = require("../constants/index")
const getSchemes = async (obj) => {
  try {
    return getSchemesData(obj)
  } catch (error) {
    throw error
  }
}

const getPortfolioOverlap = async (obj,obj2) => {
  try {
    const schemeHoldings = await fetchPortfolioOverlap(obj,obj2)
    const holdingA = schemeHoldings.holdingA
    const holdingB = schemeHoldings.holdingB
    const totalHoldingsInA = holdingA.length
    const totalHoldingsInB = holdingB.length

    let percentage = 0
    let holding = []
    let sample = []

holdingA.forEach(a => {
  const b = holdingB.find(b => b.holdings === a.holdings)
  if (b) {
    holding.push({
      holdingsA: a.holdings,
      holdingsB: b.holdings,
      netAssetA: a.netAsset,
      netAssetB: b.netAsset
    })
    percentage += Math.min(a.netAsset, b.netAsset)
  } else {
    sample.push({
      holdingsA: a.holdings,
      holdingsB: "",
      netAssetA: a.netAsset,
      netAssetB: 0
    })
  }
})

holdingB.forEach(b => {
  const a = holdingA.find(a => a.holdings === b.holdings)
  if (!a) {
    sample.push({
      holdingsA: "",
      holdingsB: b.holdings,
      netAssetA: 0,
      netAssetB: b.netAsset
    })
  }
})

holding = holding.concat(sample)

    // find sumNetAssetHoldingA
    const sumNetAssetHoldingA = holdingA
      .filter((h1) => !holdingB.some((h2) => h2.holdings === h1.holdings))
      .reduce((total, h1) => total + h1.netAsset, 0)

    // find sumNetAssetHoldingB
    const sumNetAssetHoldingB = holdingB
      .filter((h2) => !holdingA.some((h1) => h1.holdings === h2.holdings))
      .reduce((total, h2) => total + h2.netAsset, 0)

    // for finding common holdings
    const commonHoldings = holdingA.filter((h1) =>
      holdingB.some((h2) => h2.holdings === h1.holdings)
    )

    const result = {
      holding,
      vennDiagram: {
        holdingAOnlyNetAsset: Math.round(sumNetAssetHoldingA),
        holdingBOnlyNetAsset: Math.round(sumNetAssetHoldingB),
        commonHoldingA: Math.round(
          VALIDATION_CONSTANTS.PERCENTAGE - sumNetAssetHoldingA
        ),
        commonHoldingsB: Math.round(
          VALIDATION_CONSTANTS.PERCENTAGE - sumNetAssetHoldingB
        ),
      },

      overlapValue: {
        overlapPercentage: Math.round(percentage),
        commonHoldings: commonHoldings.length,
        unCommonHoldingsInA: totalHoldingsInA - commonHoldings.length,
        unCommonHoldingsInB: totalHoldingsInB - commonHoldings.length,
        totalHoldingsInA,
        totalHoldingsInB
      },
    };
    return result
  } catch (error) {
    throw error
  }
}

module.exports = {
  getSchemes,
  getPortfolioOverlap,
}