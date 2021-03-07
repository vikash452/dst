const mongoose=require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const DustbinSchema=new mongoose.Schema({
    areaName:{
        type:String
    },
    capacity:{
        type:Number
    },
    filled:{
        type:Number
    },
    status:{
        type:Number
    }
})

const Dustbin=mongoose.model('Dustbin',DustbinSchema);
module.exports=Dustbin;