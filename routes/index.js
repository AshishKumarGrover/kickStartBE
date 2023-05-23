const express = require('express')
const router = express.Router()
const downloadInvoice = require('../controllers/downloadInvoice')

router.get('/downloadInvoice', downloadInvoice.downloadInvoiceController)

module.exports = router