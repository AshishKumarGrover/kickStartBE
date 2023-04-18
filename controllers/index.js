const services = require('../services/index')
const {VALIDATION} = require('../constants/index.js')

const getSchemes = async (req, res) => {
    try {
        const testing = req.query
        const category = req.query.category;
        if (typeof testing != 'object' && testing.length <= VALIDATION) {
            console.log(" object error ");
        }
        const schemes = await services.getSchemes(category);
        res.send(schemes)
    }
    catch (error) {
        res.send({ status: -1, message: " went", result: error })
    }
}


const getNavs = async (req, res) => {
    try {
        const navHistoryData = req.query
        var schid = JSON.parse(req.query.schid)
        schid = schid.arr
        const timePeriod = req.query.timePeriod

        if (Object.keys(navHistoryData).length != 2 && timePeriod.length <= VALIDATION) {
            console.log("data is insufficient")
        }
        const navs = await services.getNavs(schid, timePeriod)
        res.send(navs)
    }
    catch (error) {
        console.log(error)
        res.send({ status: -1, message: "wrong", result: error })
    }
}

module.exports = {
    getSchemes,
    getNavs
}