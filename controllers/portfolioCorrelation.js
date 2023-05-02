const portfolioCorrelation = require('../services/portfolioCorrelation')
const { RESPONSE_MSG, STATUS} = require('../constants/index.js')

const getSchemes = async (request, response) => {
    try {
        const category = request.query.category;
        const pattern = /^[a-zA-Z]+$/
        if(category == ''){
            throw 'Please enter a valid value'
        }
        if(!pattern.test(category)){
            throw 'Only characters allowed (A-Z and a-z)'
        }
        const schemes = await portfolioCorrelation.getSchemes(category)
        response.send({status: STATUS.SUCCESS, message: RESPONSE_MSG.SUCCESS, result: schemes})
    }
    catch (error) {
        response.send({ status: STATUS.FAILED, message: RESPONSE_MSG.FAILED, result: error })
    }
}

const getNavs = async (request, response) => {
    try {
        
        if(!request.query.schid){
            throw "Please provide schemes"
        }
        if(!request.query.timePeriod){
            throw "Please provide Time Period"
        }

        let schid
        if(typeof request.query.schid == String){
            schid = JSON.parse(request.query.schid).arr
        }else{
            schid = (request.query.schid).arr
        }

        const timePeriod = request.query.timePeriod
        const pattern = /^[0-9]+$/

        if(timePeriod.startsWith("-")){
            throw "Negative Time Period not allowed"
        }
        if(!pattern.test(timePeriod)){
            throw "Please enter a valid Time Period"
        }

        if(schid.length < 2){
            throw "Please provide minimum two schemes"
        }else if(schid.length > 15){
            throw "Maximum 15 schemes allowed"
        }

        const correlationMatrix = await portfolioCorrelation.getNavs(schid, timePeriod)
        // console.log("**************correlation",correlationMatrix.length)
        response.send({status: STATUS.SUCCESS, message: RESPONSE_MSG.SUCCESS, result: correlationMatrix})
    }
    catch (error) {
        response.send({ status: STATUS.FAILED, message: RESPONSE_MSG.FAILED, result: error })
    }
}

const getLaunchDate = async (request, response) => {
    try {
        const pattern = /^[0-9]+$/
        const schid = request.query.schid
        if (schid < 0) {
            throw "Scheme Id should be a positive number"
        }
        if(!pattern.test(schid)) {
            throw "Please enter numbers only !!"
        }

        const launchDate = await portfolioCorrelation.getLaunchDate(schid)
        response.send({status: STATUS.SUCCESS, message: RESPONSE_MSG.SUCCESS, result: launchDate})
    }
    catch (error) {
        response.send({ status: STATUS.FAILED, message: RESPONSE_MSG.FAILED, result: error })
    }
}

module.exports = {
    getSchemes,
    getNavs,
    getLaunchDate
}