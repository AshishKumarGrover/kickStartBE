const express = require('express')
const router = express.Router()
const sipCalculatorCtrl = require('../controllers/sipCalculator')

router.post('/sipCalculator', sipCalculatorCtrl.sipCalculator)
router.post('/sipStepUpCalculator', sipCalculatorCtrl.sipStepUpCalculator)
router.post('/sipDelayCalculator', sipCalculatorCtrl.sipDelayCalculator)

module.exports = router