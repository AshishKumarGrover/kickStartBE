const moment = require('moment')
const { scheme, navHistory } = require('../models/index')
const { QueryTypes } = require('sequelize')
const { ARRAYLENGTH } = require('../constants/index.js')


const getSchemes = async (category) => {
    try{
        const schemes = await scheme.sequelize.query(`select schid, name from schemes where objectiveid In (select objectiveid from objectives where AUMObjective = '${category}')`, { type: QueryTypes.SELECT })
        if(schemes.length == ARRAYLENGTH){
            throw "Category doesn't exist"
        }
        return schemes
    }
    catch(error){
        return error
    }
    
}

const getNavs = async (schid, timePeriod) => {
    const navData = await navHistory.sequelize.query(`select nav,navDate,schid from navHistory where navDate >= ${moment().subtract(timePeriod, 'months').format('YYYY-MM-DD')} AND schid IN (${schid.join(',')})`)
    return navData
}

const getLaunchDate = async (schid) => {
    try {
        var launchDate = await navHistory.sequelize.query(`select MIN(navDate) AS 'date' from navHistory where schid = ${schid}`)
        launchDate = launchDate[0][0].date

        if (launchDate == null) {
            throw "Scheme ID doesn't exist"
        }
        return launchDate
    }
    catch (error) {
        return error
    }
}

module.exports = {
    getSchemes,
    getNavs,
    getLaunchDate
}