from services import service 

def downloadInvoiceController(data):
    result = service.downloadInvoiceService(data)
    return result
   
