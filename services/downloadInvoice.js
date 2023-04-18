const axios = require('axios')

const downloadInvoiceService = async (reqQuery) => {
  try{
  const response = await axios({
      url: 'http://localhost:8000/pythonDownloadInvoice',
      method: 'POST',
      data: reqQuery
    })
    const result = response && response.data
    return result
  }
  catch(error){
    throw error
  } 
}

module.exports = {
    downloadInvoiceService
}