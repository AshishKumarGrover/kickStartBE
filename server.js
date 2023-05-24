const express = require('express')
const bodyparser = require('body-parser')
const app = express()

app.use(express.json())
app.use(bodyparser.json())           //parsing the  incoming request bodies in middleware
app.use('/', require('./routes'))    //using api from the router 

app.all('/*', (req, res) => {
  res.status(404).send('API Not Found')
})
//running the server
app.listen(3000, () => { console.log(`Express server listening on port 3000`) }) 