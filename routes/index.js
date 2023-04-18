const express = require('express')
const router = express.Router()
const controller = require('../controllers/index')

router.get('/getSchemes', controller.getSchemes)
router.get('/getNavs', controller.getNavs)
module.exports = router