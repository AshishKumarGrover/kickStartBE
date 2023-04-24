const downloadInvoice = require('../services/downloadInvoice')
const { RESPONSE_MSG, STATUS } = require('../constants')
const path = require('path')
const { generatePdf } = require('../utils/index')

const downloadInvoiceController = async (request, response) => {
    try{
        let reqQuery = request.query.data.replaceAll("hashSymbol", "#")
        reqQuery = reqQuery.replaceAll("ampersandSymbol", "&")
        reqQuery = reqQuery.replaceAll("percentageSymbol", "%")
        reqQuery = reqQuery.replaceAll("plusSymbol", "+")
        reqQuery = JSON.parse(reqQuery)
        const htmlCode = await downloadInvoice.downloadInvoiceService(reqQuery)
        const pdfFilePath = path.join(__dirname, '..', 'invoice.pdf')
        const options = { 
            format: 'A4',
            path: pdfFilePath
        }
        const file = { content: htmlCode}
        await generatePdf(file, options)
        response.download("invoice.pdf", "tax-invoice.pdf", function (error) {
            if(error){
                console.log("Error: ", error)
                throw error
            }else{
                console.log("Pdf downloaded successfully")
            }
        })
    }
    catch(error){
        response.send({
            status: -1,
            message: "Request Failed",
            result: error.message
        })
    }
}

module.exports = {
    downloadInvoiceController
}