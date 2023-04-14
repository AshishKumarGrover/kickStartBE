const portfolioOverlap = require("../services/portfolioOverlap")
const { VALIDATION_CONSTANTS,RESPONSE_MSG } = require("../constants/index")

const getSchemes = async (request, response) => {
  try {
    const schemeName = request.query.name;
    
    if(schemeName.length == VALIDATION_CONSTANTS.SCHEME_NAME )
    throw 'please enter valid scheme name'

    const schemes = await portfolioOverlap.getSchemes(request)
    response.send({
      status: 0,
      message: RESPONSE_MSG.SUCCESS,
      result: schemes,
    })
  } catch (error) {
    response.send({
      status: -1,
      message: RESPONSE_MSG.FAILED,
      result: error,
    })
  }
}

const getPortfolioOverlap = async (request, response) => {
  try {
    const schid = request.query
    if(schid.schid1 && schid.schid2 < VALIDATION_CONSTANTS.SCHEME_ID)
    throw 'please enter valid id'

    const schemeHolding = await portfolioOverlap.getPortfolioOverlap(request)
    response.send({
      status: 0,
      message: RESPONSE_MSG.SUCCESS,
      result: schemeHolding,
    })
  } catch (error) {
    response.send({
      status: -1,
      message: RESPONSE_MSG.FAILED,
      result: error,
    })
  }
}

module.exports = {
  getSchemes,
  getPortfolioOverlap,
}
