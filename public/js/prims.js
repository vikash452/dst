var coordinates=[[750,400],[400,40],[200,400],[1200,150],[1200,600],]
var c = document.getElementById("mycanvas");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.arc(750, 400, 40, 0, 2 * Math.PI);
ctx.stroke();
ctx.font='30px Arial'
ctx.fillText('a',750,400)
ctx.strokeText('a',750,400)

ctx.beginPath();
ctx.arc(400, 40, 40, 0, 2 * Math.PI);
ctx.stroke();
ctx.font='30px Arial'
ctx.fillText('b',400,40)
ctx.strokeText('b',400,40)

ctx.beginPath();
ctx.arc(200, 400, 40, 0, 2 * Math.PI);
ctx.stroke();
ctx.font='30px Arial'
ctx.fillText('c',200,400)
ctx.strokeText('c',200,400)

ctx.beginPath();
ctx.arc(1200, 150, 40, 0, 2 * Math.PI);
ctx.stroke();
ctx.font='30px Arial'
ctx.fillText('d',1200,150)
ctx.strokeText('d',1200,150)

ctx.beginPath();
ctx.arc(1200, 600, 40, 0, 2 * Math.PI);
ctx.stroke();
ctx.font='30px Arial'
ctx.fillText('e',1200,600)
ctx.strokeText('e',1200,600)

document.getElementById('animation').addEventListener('click',()=>{

    var totalCoordinates=coordinates.length
    lines_on_canvas(0)
    function lines_on_canvas(i)
    {
        if(i>=totalCoordinates)
        return;

        function connect_to_all(j,x,y)
        {
            if(j>=totalCoordinates)
            return;

            ctx.moveTo(x,y);
            ctx.lineTo(coordinates[j][0],coordinates[j][1]);
            ctx.stroke();
            setTimeout(()=>{
                connect_to_all(j+1,x,y)
            },500)
        }
        // console.log(i)
        connect_to_all(0,coordinates[i][0],coordinates[i][1])
        setTimeout(()=>{
            lines_on_canvas(i+1)
        },500)
    }
})

var distance_matrix=[
    [0,5,3,6,10],
    [5,0,10,5,9],
    [3,10,0,5,9],
    [6,5,5,0,8],
    [10,9,9,8,0]
]

var MAX_VALUE=100000;
var places=['A','B','C','D','E'];
var totalPlaces=5;
var placeDetails=[];
var place_from_waste_to_be_collected=[];
var total_waste_collection_areas=0;
var area_map=new Map()
var arr;

function fillAreaDetails()
{
    area_map.clear();
    place_from_waste_to_be_collected=[]

    for(var i=0; i<totalPlaces; ++i)
    area_map.set(places[i],i);

    console.log(area_map)

    fetch('/getDetails/',{
        method:'GET',
        headers:{
            'Content-Type' : 'application/json'
        },
    })
    .then(res=>res.json())
    .then((data)=>{
            data.forEach(element => {
                placeDetails.push(element)    
            });

            data.forEach(element=>{
                if(element.status >= 70)
                place_from_waste_to_be_collected.push(element);
            })

            total_waste_collection_areas=place_from_waste_to_be_collected.length;
            console.log(place_from_waste_to_be_collected)
            calculate()
    })
    .catch((err)=>{
        console.log(err);
    })
}

var index_to_area=new Map()

function calculate()
{
    for(var i=0; i<total_waste_collection_areas; ++i)
    {
        index_to_area.set(i,place_from_waste_to_be_collected[i].areaName);
    }

    arr=new Array(total_waste_collection_areas)
    for(var i=0; i<total_waste_collection_areas; ++i)
    {
        arr[i]=new Array(total_waste_collection_areas)

        for(var j=0; j<total_waste_collection_areas; ++j)
            arr[i][j]=0;
    }

    for(var i=0; i<total_waste_collection_areas; ++i)
    {
        var startPoint=place_from_waste_to_be_collected[i].areaName;
        var start_point_id=area_map.get(startPoint);

        for(var j=0; j<total_waste_collection_areas; ++j)
        {
            var endPoint=place_from_waste_to_be_collected[j].areaName;
            var end_point_id=area_map.get(endPoint);
            arr[i][j]=distance_matrix[start_point_id][end_point_id];
        }
    }

    console.log(arr)

    applyPrims()
}

var parent=[]
var visited=[]
var weight=[]
var parent_area=[];

function applyPrims()
{
    parent=[];
    visited=[];
    weight=[];
    parent_area=[];


    for(var i=0; i<total_waste_collection_areas; ++i)
    {
        // parent[i]=-1;
        // weight[i]=MAX_VALUE;
        // visited[i]=false;
        parent.push(-1);
        weight.push(MAX_VALUE);
        visited.push(false);
    }

    weight[0]=0;
    visited[0]=true;

    var count=0, index=0;
    console.log(visited)
    console.log(weight)
    console.log(parent)
    while(count < total_waste_collection_areas)
    {
        visited[index]=true;
        var nextVertex=-1;
        for(var i=0; i<total_waste_collection_areas; ++i)
        {
            if(arr[index][i]!=0 && visited[i]==false && arr[index][i] < weight[i])
            {
                
                weight[i]=arr[index][i];
                parent[i]=index;
            }
        }
        // console.log(index)

        for(var i=0; i<total_waste_collection_areas; ++i)
        {
            if(visited[i]==false && (nextVertex == -1 || weight[i] < weight[nextVertex]))
            nextVertex=i;
        }

        ++count;
        index=nextVertex
        // console.log(index)
    }
    console.log(parent)
    for(var i=0; i<parent.length; ++i)
    {
        // if(parent[i] == -1)
        // parent_area.push('source')
        // else
        // {
            var src=index_to_area.get(i);
            var dest=index_to_area.get(parent[i]);
            parent_area.push(src + '->' + dest)
        // }
    }
    console.log(parent_area)
    displayResult()
}

function displayResult()
{
    document.getElementById('result').innerHTML=''
    for(var i=0; i<parent_area.length; ++i)
    {
        document.getElementById('result').innerHTML+=`
        <h3>${parent_area[i]}</h3>
        `
    }
}

document.getElementById('prims').addEventListener('click',()=>{
    fillAreaDetails();
})

document.getElementById('prims_on_map').addEventListener('click',()=>{
    var parentLength=parent.length;

    lines_on_canvas(0)
    function lines_on_canvas(i)
    {
        if(i>=parentLength)
        return;

        if(parent[i] != -1)
        {
            ctx.beginPath()
            ctx.moveTo(coordinates[i][0],coordinates[i][1]);
            ctx.lineTo(coordinates[parent[i]][0],coordinates[parent[i]][1]);
            ctx.lineWidth=20;
            ctx.stroke();
            ctx.closePath()
            setTimeout(()=>{
                lines_on_canvas(i+1)
            },500)
        }
        else
        {
            lines_on_canvas(i+1)
        }
        
    }
})



    