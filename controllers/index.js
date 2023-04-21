const services = require('../services/index')
const { VALIDATION } = require('../constants/index.js')

const getSchemes = async (request, response) => {
    try {
        const queryObject = request.query
        if (typeof queryObject != 'object' && queryObject.length <= VALIDATION) {
            throw error
        }
        const schemes = await services.getSchemes(queryObject.category);
        response.send(schemes)
    }
    catch (error) {
        response.send({ status: -1, message: " went", result: error })
    }
}

const getNavs = async (request, response) => {
    try {
        const queryObject = request.query
        const schid = JSON.parse(request.query.schid).arr
        const timePeriod = request.query.timePeriod

        if (Object.keys(queryObject).length != 2 && timePeriod.length <= VALIDATION) {
            throw error
        }
        const correlationMatrix = await services.getNavs(schid, timePeriod)
        response.send(correlationMatrix)
    }
    catch (error) {
        response.send({ status: -1, message: "wrong", result: error })
    }
}

const getLaunchDate = async (request, response) => {
    try {
        const pattern = /^[0-9]+$/;
        const schid = request.query.schid
        if (schid < 0) {
            throw "Scheme Id should be a positive number"
        }
        if(!pattern.test(schid)) {
            throw "Please enter numbers only !!"
        }

        const launchDate = await services.getLaunchDate(schid)
        response.send(launchDate)
    }
    catch (error) {
        response.send({ status: -1, message: "wrong", result: error })
    }
}

module.exports = {
    getSchemes,
    getNavs,
    getLaunchDate
}