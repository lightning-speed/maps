const mapObjects = [];

class MapObject{
  
    
    constructor(objectData){
        this.objectData = objectData;
    }
    drawOnCanvas(ctx){
        if(this.objectData.type=='road'){
            drawRoad( this.objectData.points, this.objectData.label,ctx);
        }
        else if( this.objectData.type=='railway'){
            drawRailway( this.objectData.points,ctx);
        }
        else if( this.objectData.type=='land_mark'){
            drawLandMark( this.objectData.point[0],label, this.objectData.landMarkType,ctx);
        }
        else if( this.objectData.type=='polygon'){
            drawPolygon( this.objectData.points, this.objectData.label, this.objectData.polygonColor,ctx)
        }
    }
}
class Block{
    constructor(x,y,scale,block_data){
        this.x = x;
        this.y = y;
        this.scale = scale;
        this.objects = [];
        for(let i = 0;i<block_data.objects.length;i++)
        this.objects.push(new MapObject(block_data.objects[i]));
        mapObjects.push(this);
    }
    drawOnCanvas(ctx){
        this.objects.forEach((obj)=>{
            obj.drawOnCanvas(ctx);
        })
    }
}



async function getBlock(x,y,scale){
    const data = await request(window.location.href+"api/get_map_data","POST",{
        x:x,
        y:x,
        scale:scale
    })
    const block = new Block(x,y,scale,data)
    return block;
}