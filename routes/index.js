const express = require('express')
const router = express.Router()
const portfolioOverlap = require('../controllers/portfolioOverlap')
const sipCalculatorCtrl = require('../controllers/sipCalculator')

router.post('/sipCalculator', sipCalculatorCtrl.sipCalculator)
router.post('/sipStepUpCalculator', sipCalculatorCtrl.sipStepUpCalculator)
router.post('/sipDelayCalculator', sipCalculatorCtrl.sipDelayCalculator)

// api for portfolioOverlap
router.get('/getSchemes', portfolioOverlap.getSchemes)
router.get('/getPortfolioOverlap', portfolioOverlap.getPortfolioOverlap)

module.exports = router