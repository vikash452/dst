document.getElementById('throw').addEventListener('click',()=>{
	console.log(document.getElementById('garbageAmount').value)
	console.log(document.getElementById('areaName').value)
	var areaName=document.getElementById('areaName').value;
	var garbageToThrow=document.getElementById('garbageAmount').value;

	fetch('/throwGarbage',{
		method:'PUT',
		headers:{
			'Content-Type':'application/json'
		},
		body:JSON.stringify({
			areaName,
			garbageToThrow
		})
	})
	.then(res=>res.json())
	.then((data)=>{
		console.log(data)
	})
	.catch((err)=>{
		console.log(err)
	})

})