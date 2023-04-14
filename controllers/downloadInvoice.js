const downloadInvoice = require('../services/downloadInvoice')
const { RESPONSE_MSG, STATUS } = require('../constants')
 
const downloadInvoiceController = async (req, res) => {
    const result = await downloadInvoice.downloadInvoiceService(req.body);
    res.send(result)
}

module.exports = {
    downloadInvoiceController
}