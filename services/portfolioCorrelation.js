const moment = require('moment')
const query = require('../repositories/index')
const calculation = require('./calculateMatrix.js')

const getSchemes = async (category) => {
    const schemes = await query.getSchemes(category)
    return schemes
}

const getNavs = async(schid, timePeriod)=>{

    Math.min(timePeriod)

  
    const date = moment().subtract(timePeriod, 'months').format('YYYY-MM-DD')
    const navData = await query.getNavs(schid, date)
    const correlationMatrix = await calculation.calculateMatrix(navData)
    return correlationMatrix
}

const getLaunchDate = async(schid)=>{

    const launchDate = await query.getLaunchDate(schid)
    return launchDate
}

module.exports = {
    getSchemes,
    getNavs,
    getLaunchDate
}
