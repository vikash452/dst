const express = require('express')
const bodyParser = require('body-parser');
const app=express();
const PORT = process.env.PORT || 5000 ;
const mongoose=require('mongoose')

require('dotenv').config()
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false} )
// mongoose.connect('mongodb://localhost:27017/DST',{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false} );
mongoose.connection.on('connected',()=>{
    console.log('connected to database')
})
mongoose.connection.on('error',()=>{
    console.log('failed to connect to database')
})

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(require('./Routes'))


app.get('/',(req,res)=>{
    res.sendFile(__dirname +  '/public/index.html')
})

app.get('/throwGarbage',(req,res)=>{
    res.sendFile(__dirname +  '/public/throwGarbage.html')
})

app.get('/add_dustbin_page',(req,res)=>{
    res.sendFile(__dirname +  '/public/addDustbin.html')
})

app.listen(PORT,()=>{
    console.log('server started on port 5000')
})