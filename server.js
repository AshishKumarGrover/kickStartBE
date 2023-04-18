const express = require('express')
const bodyparser = require('body-parser')
const app = express()

const PORT = process.env.PORT || 5000

//for cors
const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:8080', 
    credentials:true,            
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(express.json())
app.use(bodyparser.json())           //parsing the  incoming request bodies in middleware
app.use('/', require('./routes'))    //using api from the router 


app.all('/*', (req, res) => {
  res.status(404).send('API Not Found')
})

//running the server
app.listen(PORT, () => { console.log(`Express server listening on port ${PORT}`) }) 
