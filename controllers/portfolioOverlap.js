const portfolioOverlap = require("../services/portfolioOverlap")
const { VALIDATION_CONSTANTS, RESPONSE_MSG,STATUS } = require("../constants/index")

const getSchemes = async (request, response) => {
  try {
    const schemeName = request.query.schemeName
    if (!schemeName != VALIDATION_CONSTANTS.SCHEME_NAME)
      throw "Scheme Name can't be null ! Please Enter Scheme Name"

    const schemes = await portfolioOverlap.getSchemes(schemeName)
    response.send({
      status: STATUS.SUCCESS,
      message: RESPONSE_MSG.SUCCESS,
      result: schemes,
    })
  } catch (error) {
    response.send({
      status: STATUS.FAILED,
      message: RESPONSE_MSG.FAILED || error,
      result: error
    })
  }
}

const getPortfolioOverlap = async (request, response) => {
  try {

    let {schid1,schid2} = request.query

    schid1 = parseInt(schid1)
    schid2 = parseInt(schid2)
    
    if (schid1 && schid2 < VALIDATION_CONSTANTS.SCHEME_ID)
      throw "Schid should be greater than 0"
    
    else if (isNaN(schid1) || isNaN(schid2))
      throw "Schid id should be in Numbers"

    const schemeHolding = await portfolioOverlap.getPortfolioOverlap(schid1,schid2)
    response.send({
      status: STATUS.SUCCESS,
      message: RESPONSE_MSG.SUCCESS,
      result: schemeHolding,
    })
  } catch (error) {
    response.send({
      status: STATUS.FAILED,
      message: RESPONSE_MSG.FAILED || error,
      result:error
    })
  }
}

module.exports = {
  getSchemes,
  getPortfolioOverlap,
}
