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
    let k = 0
    let l = 0
    let sample = []

    // for finding common holdings and data in holdingA which is not present in holding B
    for (let i = 0; i < holdingA.length; i++) {
      for (let j = 0; j < holdingB.length; j++) {
        if (holdingA[i].holdings == holdingB[j].holdings) {
          holding[k] = {
            holdingsA: holdingA[i].holdings,
            holdingsB: holdingB[j].holdings,
            netAssetA: holdingA[i].netAsset,
            netAssetB: holdingB[j].netAsset,
          }
          k++
          // overlap percentage
          percentage += Math.min(holdingA[i].netAsset, holdingB[j].netAsset)
          break
        } else {
          if (j == holdingB.length - 1) {
            sample[l] = {
              holdingsA: holdingA[i] ? holdingA[i].holdings : "",
              holdingsB: "",
              netAssetA: holdingA[i] ? holdingA[i].netAsset : 0,
              netAssetB: 0,
            };
            l++
          }
        }
      }
      if (holdingB.length == 0) {
        holding[k] = {
          holdingsA: holdingA[i].holdings,
          holdingsB: "",
          netAssetA: holdingA[i].netAsset,
          netAssetB: 0,
        }
        k++
      }
    }

    // data present in holding B not in A
    for (let i = 0; i < holdingB.length; i++) {
      for (let j = 0; j < holdingA.length; j++) {
        if (holdingA[j].holdings == holdingB[i].holdings) {
          break
        } else {
          if (j == holdingA.length - 1) {
            sample[l] = {
              holdingsA: "",
              holdingsB: holdingB[i] ? holdingB[i].holdings : "",
              netAssetA: 0,
              netAssetB: holdingB[i] ? holdingB[i].netAsset : 0,
            }
            l++
          }
        }
      }
      if (holdingA.length == 0) {
        holding[k] = {
          holdingsA: "",
          holdingsB: holdingB[i].holdings,
          netAssetA: 0,
          netAssetB: holdingB[i].netAsset,
        }
        k++
      }
    }

    //for copy sample data into holding
    let n = 0
    for (let i = k; i < k + l - 1; i++) {
      holding[i] = sample[n];
      n++
    }

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
      overlapValue: {
        holdingAOnlyNetAsset: Math.round(sumNetAssetHoldingA),
        holdingBOnlyNetAsset: Math.round(sumNetAssetHoldingB),
        commonHoldingA: Math.round(
          VALIDATION_CONSTANTS.PERCENTAGE - sumNetAssetHoldingA
        ),
        commonHoldingsB: Math.round(
          VALIDATION_CONSTANTS.PERCENTAGE - sumNetAssetHoldingB
        ),
      },

      vennDiagram: {
        overlapPercentage: percentage,
        CommonHoldings: commonHoldings.length,
        uncommonHoldingsInA: totalHoldingsInA - commonHoldings.length,
        uncommonHoldingsInB: totalHoldingsInB - commonHoldings.length,
        TotalHoldingsInA: totalHoldingsInA,
        TotalHoldingsInB: totalHoldingsInB,
      },
    };
    return result
  } catch (error) {
    response.send({
      status: -1,
      message: RESPONSE_MSG.FAILED
    })
  }
}

module.exports = {
  getSchemes,
  getPortfolioOverlap,
}
