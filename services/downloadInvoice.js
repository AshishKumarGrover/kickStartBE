const axios = require('axios')

const downloadInvoiceService = async (reqQuery) => {
    const options = {
        url: 'http://localhost:8080/pythonDownloadInvoice',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        },
        data: reqQuery
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