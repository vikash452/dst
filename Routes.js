const express=require('express')
const router=express.Router();
const Dustbin=require('./Dustbin');
require('dotenv').config()

function VerifyUser()
{
    if(req.body.userID === process.env.USER_ID && req.body.password === process.env.PASSWORD)
    next()
    else
    {
        return res.status(400).json({error:'invalid credentials'})
    }
}

router.post('/addDustbin',(req,res)=>{
    const areaName=req.body.areaName;
    const capacity=req.body.capacity;
    const filled=req.body.filled;
    const status=filled/capacity;

    Dustbin.findOne({areaName:areaName})
    .then((foundDustbin)=>{

        if(foundDustbin)
        {
            res.status(400).json({error:'Dustbin already exists in that area'})
        }

        const newDustbin=new Dustbin({
            areaName,
            capacity,
            filled,
            status
        })

        newDustbin.save()
        .then((savedDustbin)=>{
            res.status(200).json(savedDustbin)
        })
        .catch((err)=>{
            console.log(err)
        })
    })

})

router.put('/throwGarbage',(req,res)=>{
    const areaName=req.body.areaName;
    const garbageToThrow=parseInt(req.body.garbageToThrow)
    Dustbin.findOne({areaName})
    .then((foundDustbin)=>{
        if(!foundDustbin)
        {
            res.status(400).json({error:'no dustbin with this area name'})
        }
        
        foundDustbin.filled+=garbageToThrow;
        foundDustbin.status = ((foundDustbin.filled)/(foundDustbin.capacity))*100;
        foundDustbin.save()
        .then((savedDustbin)=>{
            res.status(200).json(savedDustbin)
        })
        .catch((err)=>{
            console.log(err)
        })
    })
})

router.get('/getDetails',(req,res)=>{
    Dustbin.find()
    .then((dustbinList)=>{
        res.status(200).json(dustbinList)
    })
    .catch((err)=>{
        console.log(err)
    })
})

router.put('/removeGarbage',(req,res)=>{
    const areaName=req.body.areaName;
    Dustbin.findOne({areaName})
    .then((foundDustbin)=>{
        if(!foundDustbin)
        {
            res.status(400).json({error:'no dustbin with this area name'})
        }
        
        foundDustbin.filled = 0;
        foundDustbin.status = 0;
        foundDustbin.save()
        .then((savedDustbin)=>{
            res.status(200).json(savedDustbin)
        })
        .catch((err)=>{
            console.log(err)
        })
    })
})

module.exports=router;