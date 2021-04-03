document.getElementById('addDustbin').addEventListener('click',()=>{
var areaName=document.getElementById('areaName').value;
var capacity=document.getElementById('capacity').value;
var userID=document.getElementById('userID').value;
var password=document.getElementById('password').value;

fetch('/addDustbin',{
    method:"POST",
    headers:{
    'Content-Type' : 'application/json',
    },
    body:JSON.stringify({
    areaName,
    capacity,
    filled:0,
    userID,
    password
    })
})
.then(res=>res.json())
.then((data)=>{
    console.log(data)
    if(data.error)
    {
    alert(data.error)
    }
    else
    {
    alert('dustbin added successfully')
    }
})
.catch((err)=>{
    console.log(err)
})

})