const repository = require('../repositories/index')
const {calculator} = require('./calculator.js')

const getSchemes = async (category) => {
    const schemes = await repository.getSchemes(category)
    return schemes
}

const getNavs = async(schid, timePeriod)=>{
    const navData = await repository.getNavs(schid, timePeriod)
    const correlationMatrix = await calculator(navData)
    return correlationMatrix
}

const getLaunchDate = async(schid)=>{
    const launchDate = await repository.getLaunchDate(schid)
    return launchDate
}

module.exports = {
    getSchemes,
    getNavs,
    getLaunchDate
}
