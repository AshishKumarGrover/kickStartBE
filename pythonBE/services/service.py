from flask import Flask, render_template, url_for
from jinja2 import Environment, FileSystemLoader
import os

def downloadInvoiceService(reqBody):
    env = Environment(loader=FileSystemLoader('views/templates'))
    template = env.get_template('index.jinja.html')
    dictObj =  eval(reqBody.decode('utf8')) #Extracting data comming from FE
    output_from_parsed_template = template.render(data=dictObj)
    return output_from_parsed_template
   