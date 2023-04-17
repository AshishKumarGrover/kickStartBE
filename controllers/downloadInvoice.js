const downloadInvoice = require('../services/downloadInvoice')
const { RESPONSE_MSG, STATUS } = require('../constants')
const html_to_pdf = require('html-pdf-node')
const path = require('path')

const downloadInvoiceController = async (request, response) => {
 
    try{
        const reqQuery = JSON.parse(request.query.data);
        const htmlCode = await downloadInvoice.downloadInvoiceService(reqQuery);

        const pdfFilePath = path.join(__dirname, '..', 'invoice.pdf')
        const options = { 
            format: 'A4',
            path: pdfFilePath
        }
        const file = { content: htmlCode};

        html_to_pdf.generatePdf(file, options)
        .then((pdfBuffer)=>{
            console.log("Pdf generated successfully")
            response.download("invoice.pdf", "tax-invoice.pdf", function (error) {
                if(error){
                    console.log("Error: ", error)
                }else{
                    console.log("Pdf downloaded successfully")
                }
            })
        })
        .catch((error)=>{
            console.log("Error ", error)
            throw error
        })

    }
    catch(error){
        response.send({
            status: -1,
            message: "Request Failed",
            result: error
        })
    }
    
}

module.exports = {
    downloadInvoiceController
}