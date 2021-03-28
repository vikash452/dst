var coordinates=[[600,250],[400,70],[200,400],[1200,150],[1200,600],[200,100],[550,650],[800,100],[900,400],[1300,400]]
var c = document.getElementById("mycanvas");
var ctx = c.getContext("2d");
/*
[{600,250},{400,70},{200,400},{1200,150},{1200,600},{200,100},{550,650},{800,100},{900,400},{1300,400}]

void solve()
{
    double distance[11][2]={{600,250},{400,70},{200,400},{1200,150},{1200,600},{200,100},{550,650},{800,100},{900,400},{1300,400}};
    double dm[11][11];
    for(int i=0; i<11; ++i)
    {
        for(int j=0 ;j<11 ;++j)
        {
            double x1=distance[i][0];
            double y1=distance[i][1];
            
            double x2=distance[j][0];
            double y2=distance[j][1];
            
            dm[i][j]=sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
        }
    }
    
    for(int i=0 ;i<11; ++i)
    {
        for(int j=0; j<11; ++j)
        {
            cout<<dm[i][j]<<" ";
        }
        cout<<endl;
    }
}*/

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

            ctx.beginPath()
            ctx.moveTo(x,y);
            ctx.lineTo(coordinates[j][0],coordinates[j][1]);
            ctx.stroke();
            ctx.closePath()
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
var local_to_global_index_map=new Map()

var placesTemp=['A','B','C','D','E','F','G','H','I','J']

document.getElementById('onrealmap').addEventListener('click',()=>{
    var totalCoordinates=coordinates.length
    for(var i=0; i<totalCoordinates; ++i)
    {
        ctx.beginPath();
        ctx.arc(coordinates[i][0], coordinates[i][1], 50, 0, 2 * Math.PI);
        // ctx.fillStyle = 'rgba(255, 165, 0, 1)'
        // ctx.fill()
        ctx.stroke();
        ctx.font='50px Arial'
        ctx.fillText(placesTemp[i],coordinates[i][0],coordinates[i][1])
        ctx.strokeText(placesTemp[i],coordinates[i][0],coordinates[i][1])
        
        ctx.closePath()
    }
})

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

            var j=0;
            data.forEach((element,index)=>{
                if(element.status >= 70)
                {
                    console.log(index)
                    place_from_waste_to_be_collected.push(element);
                    local_to_global_index_map.set(j,index)
                    ++j;
                }
                
            })

            total_waste_collection_areas=place_from_waste_to_be_collected.length;
            // console.log(place_from_waste_to_be_collected)
            console.log(local_to_global_index_map)
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
            var starting=local_to_global_index_map.get(i)
            var ending=local_to_global_index_map.get(parent[i])
            ctx.moveTo(coordinates[starting][0],coordinates[starting][1]);
            ctx.lineTo(coordinates[ending][0],coordinates[ending][1]);
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


function ShowGraph() {
    let graph = document.getElementById("graph");
    // graph.style.top = '120%';
    graph.style.position = 'absolute';
    graph.style.display = 'contents';
}

function Myfunction() {
    /*console.log("Hello");*/
    let res_card = document.getElementById("result-card");
    res_card.style.display = "block";
  }


    