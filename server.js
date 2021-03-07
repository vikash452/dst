const express = require('express')
const bodyParser = require('body-parser');
const app=express();
const PORT = process.env.PORT || 5000 ;

// app.use(express.static('public'))
app.use(bodyParser.json())

app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname +  '/public/index.html')
})

app.get('/throwGarbage',(req,res)=>{
    res.sendFile(__dirname +  '/public/throwGarbage.html')
})

app.listen(PORT,()=>{
    console.log('server started on port 5000')
})