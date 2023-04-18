const repository = require('../repositories/index')
const {calculator} = require('./calculator.js')

const getSchemes = async (category) => {
    const schemes = await repository.getSchemes(category)
    return schemes
}

const getNavs = async(schid, timePeriod)=>{
    const navs = await repository.getNavs(schid, timePeriod)
    const correlationMatrix = await calculator(navs)
    return correlationMatrix
}

module.exports = {
    getSchemes,
    getNavs
}
