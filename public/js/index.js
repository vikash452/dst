const inputs = document.querySelectorAll(".input");


function addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}


inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});

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


