const express = require('express')
const router = express.Router()
const downloadInvoice = require('../controllers/downloadInvoice')
// const sipCalculatorCtrl = require('../controllers/sipCalculator')

// router.post('/sipCalculator', sipCalculatorCtrl.sipCalculator)
// router.post('/sipStepUpCalculator', sipCalculatorCtrl.sipStepUpCalculator)
// router.post('/sipDelayCalculator', sipCalculatorCtrl.sipDelayCalculator)

router.post('/downloadInvoice', downloadInvoice.downloadInvoiceController)

module.exports = router