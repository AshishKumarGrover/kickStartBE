const html_to_pdf = require("html-pdf-node")

const generatePdf = async (file, options) => {
    try{
        await html_to_pdf.generatePdf(file, options)
        console.log("Pdf generated successfully")
    }
    catch(error){
        console.log(error)
        throw error
    }
}

module.exports = {
    generatePdf
}