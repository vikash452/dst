const express = require('express')
const bodyParser = require('body-parser');
const app=express();
const PORT = process.env.PORT || 5000 ;

app.listen(PORT,()=>{
    console.log('server started on port 5000')
})