const axios = require('axios')

const downloadInvoiceService = async (reqBody) => {
    const options = {
        url: 'http://localhost:8080/pythonDownloadInvoice',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        },
        data: reqBody
      }

      let result;
      
      await axios(options)
        .then(response => {
          result = response.data
        })
    return result
}

module.exports = {
    downloadInvoiceService
}