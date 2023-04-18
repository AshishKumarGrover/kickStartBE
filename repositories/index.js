const moment = require('moment')
const { scheme, navHistory } = require('../models/index')
const { QueryTypes } = require('sequelize')


const  getSchemes = async(category)=>{
    const schemes = await scheme.sequelize.query(`select schid, name from schemes where objectiveid In (select objectiveid from objectives where AUMObjective = '${category}')`,{type: QueryTypes.SELECT})
    return schemes
}

const getNavs = async (schid, timePeriod) => {
    const navs = await navHistory.sequelize.query(`select nav,navDate,schid from navHistory where navDate >= ${moment().subtract(timePeriod, 'months').format('YYYY-MM-DD')} AND schid IN (${schid.join(',')})`)
    return navs
}

module.exports = {
    getSchemes,
    getNavs
}