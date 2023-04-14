const { RESPONSE_MSG } = require("../constants/index")
const { scheme, schemeholding, sequelize } = require("../models/index")
const { QueryTypes } = require("sequelize")

const getSchemesData = async (request, response) => {
  try {
    const schemeName = request.query.name
    const schemes = await scheme.sequelize.query(
      `SELECT orgsch, schemeDetails.schid 
            FROM schemeDetails 
            INNER JOIN schemes ON schemeDetails.schid = schemes.schid 
            WHERE mfTally ='Y' AND schemes.fsid IS NOT NULL AND name like "%${schemeName}%"`,
      {
        type: QueryTypes.SELECT,
      }
    )
    return schemes
  } catch (error) {
    response.send({
      status: -1,
      message: RESPONSE_MSG.FAILED,
      result: error,
    })
  }
}

const fetchPortfolioOverlap = async (request, response) => {
  try {
    const schid1 = request.query.schid1
    const schid2 = request.query.schid2
    if (!schid1 || !schid2) {
      return "Enter scheme Id"
    } else {
      const holdingA = await schemeholding.sequelize.query(
        `SELECT holdings,netAsset 
        FROM schemeHolding
        inner join schemes  
        where schemes.fsid=schemeHolding.fsid  and schemes.schid= "${schid1}"`,
        {
          type: QueryTypes.SELECT,
        }
      )
      const holdingB = await schemeholding.sequelize.query(
        `SELECT holdings,netAsset
          FROM schemeHolding
          inner join schemes  
          where schemes.fsid=schemeHolding.fsid  and schemes.schid= "${schid2}"`,
        {
          type: QueryTypes.SELECT,
        }
      )
      return { holdingA, holdingB }
    }
  } catch (error) {
    response.send({
      status: -1,
      message: RESPONSE_MSG.FAILED,
      result: error,
    })
  }
}

module.exports = {
  getSchemesData,
  fetchPortfolioOverlap,
}
