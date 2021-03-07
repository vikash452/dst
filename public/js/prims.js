var distance_matrix=[
    [0,1,2,3,4],
    [1,0,5,6,7],
    [2,5,0,8,9],
    [3,6,8,0,10],
    [4,7,9,10,0]
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
    for(var i=0; i<totalPlaces; ++i)
    area_map.set(places[i],i);

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
            calculate()
    })
    .catch((err)=>{
        console.log(err);
    })
}

function calculate()
{
    arr=new Array(total_waste_collection_areas)
    for(var i=0; i<total_waste_collection_areas; ++i)
    {
        arr[i]=new Array(total_waste_collection_areas)

        for(var j=0; j<total_waste_collection_areas; ++j)
            arr[i][j]=0;
    }

    for(var i=0; i<total_waste_collection_areas; ++i)
    {
        var startPoint=place_from_waste_to_be_collected[i];
        var start_point_id=area_map.get(startPoint);

        for(var j=0; j<total_waste_collection_areas; ++j)
        {
            var endPoint=place_from_waste_to_be_collected[j];
            var end_point_id=area_map.get(endPoint);
            arr[i][j]=distance_matrix[start_point_id][end_point_id];
        }
    }

    applyPrims()
}

var parent=[]
var visited=[]
var weight=[]

function applyPrims()
{
    for(var i=0; i<total_waste_collection_areas; ++i)
    {
        parent[i]=-1;
        weight[i]=MAX_VALUE;
        visited[i]=false;
    }

    weight[0]=0;
    visited[0]=true;

    var count=0, index=0;

    while(count < total_waste_collection_areas)
    {
        visited[index]=true;
        var nextVertex;
        for(var i=0; i<total_waste_collection_areas; ++i)
        {
            if(arr[index][i]!=0 && visited[i]==false && arr[index][i] < weight[i])
            {
                weight[i]=arr[index][i];
                parent[i]=index;
                nextVertex=i;
            }
        }
        ++count;
    }
    console.log(parent)
}