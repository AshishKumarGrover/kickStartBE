const { scheme, schemeholding, sequelize } = require("../models/index")
const { QueryTypes } = require("sequelize")

const getSchemesData = async (schemeName) => {
  try {
    const schemes = await scheme.sequelize.query(
      `SELECT shortName, schemeDetails.schid 
            FROM schemeDetails 
            JOIN schemes ON schemeDetails.schid = schemes.schid 
            WHERE mfTally ='Y'  AND shortName like "%${schemeName}%"`,
      {
        type: QueryTypes.SELECT,
      }
    )
    return schemes
  } catch (error) {
    throw error
  }
}

const fetchPortfolioOverlap = async (schid1,schid2) => {
  try {
    if (!schid1 || !schid2) {
      return "Enter scheme Id"
    } else {
      const holdingA = await schemeholding.sequelize.query(
        `SELECT holdings,netAsset 
        FROM schemeHolding
        inner join schemes  
        where schemes.fsid = schemeHolding.fsid  and schemes.schid= "${schid1}"`,
        {
          type: QueryTypes.SELECT,
        }
      )
      const holdingB = await schemeholding.sequelize.query(
        `SELECT holdings,netAsset
          FROM schemeHolding
          inner join schemes  
          where schemes.fsid = schemeHolding.fsid  and schemes.schid= "${schid2}"`,
        {
          type: QueryTypes.SELECT,
        }
      )
      return { holdingA, holdingB }
    }
  } catch (error) {
    throw error
  }
}

module.exports = {
  getSchemesData,
  fetchPortfolioOverlap,
}
