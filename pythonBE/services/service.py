from jinja2 import Environment, FileSystemLoader

def downloadInvoiceService(reqBody):
    env = Environment(loader=FileSystemLoader('views/templates'), lstrip_blocks=True, trim_blocks=True)
    template = env.get_template('index.jinja.html')
    dictObj =  eval(reqBody.decode('utf8'))
    output_from_parsed_template = template.render(data=dictObj)
    return output_from_parsed_template
   