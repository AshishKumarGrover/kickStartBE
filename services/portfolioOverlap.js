const { getSchemesData, fetchPortfolioOverlap } = require('../repositories/portfolioOverlap')
// Get Schemes Data
const getSchemes = async (schemeName) => {
  return getSchemesData(schemeName)
}

// Calculate Portfolio Ovelap  
const getPortfolioOverlap = async (schid1, schid2) => {
  const schemeHoldings = await fetchPortfolioOverlap(schid1, schid2)
  const holdingA = schemeHoldings.holdingA
  const holdingB = schemeHoldings.holdingB

  let percentage = 0
  let holding = []
  let unCommonData = []
  let commonHoldings = 0
  let commonHoldingASum = 0
  let commonHoldingBSum = 0

  holdingA.forEach((a) => {
    const b = holdingB.find((b) => b.holdings == a.holdings)
    if (b) {
      holding.push({
        holdingsA: a.holdings,
        holdingsB: b.holdings,
        netAssetA: a.netAsset,
        netAssetB: b.netAsset
      })
      commonHoldings++
      commonHoldingASum = commonHoldingASum + a.netAsset
      commonHoldingBSum = commonHoldingBSum + b.netAsset
      percentage += Math.min(a.netAsset, b.netAsset)
    } else {
      unCommonData.push({
        holdingsA: a.holdings,
        holdingsB: "",
        netAssetA: a.netAsset,
        netAssetB: 0
      })
    }
  })

  holdingB.forEach((b) => {
    const a = holdingA.find((a) => a.holdings == b.holdings)
    if (!a) {
      unCommonData.push({
        holdingsA: "",
        holdingsB: b.holdings,
        netAssetA: 0,
        netAssetB: b.netAsset
      })
    }
  })
  // concat Common Holdings and Uncommon Holdings
  holding = holding.concat(unCommonData)

  // find sumNetAssetHoldingA
  const sumNetAssetHoldingA = holdingA
    .filter((h1) => !holdingB.some((h2) => h2.holdings == h1.holdings))
    .reduce((total, h1) => total + h1.netAsset, 0)

  // find sumNetAssetHoldingB
  const sumNetAssetHoldingB = holdingB
    .filter((h2) => !holdingA.some((h1) => h1.holdings == h2.holdings))
    .reduce((total, h2) => total + h2.netAsset, 0)

  const result = {
    holding,
    vennDiagram: {
      holdingAOnlyNetAsset: Math.round(sumNetAssetHoldingA),
      holdingBOnlyNetAsset: Math.round(sumNetAssetHoldingB),
      commonHoldingA: Math.round(commonHoldingASum),
      commonHoldingsB: Math.round(commonHoldingBSum)
    },

    overlapValue: {
      overlapPercentage: Math.round(percentage),
      commonHoldings,
      unCommonHoldingsInA: holdingA.length - commonHoldings,
      unCommonHoldingsInB: holdingB.length - commonHoldings,
      totalHoldingsInA: holdingA.length,
      totalHoldingsInB: holdingB.length
    }
  }
  return result
}

module.exports = {
  getSchemes,
  getPortfolioOverlap
}
