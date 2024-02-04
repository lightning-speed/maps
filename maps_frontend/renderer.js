var camera = {
    x:0,
    y:0,
    scale:0.5
}
var originX,originY;
var mousePressed = false;
var presviousMovePoint = null;
var lastCamPos = {x:0,y:0,scale:0.5};
function rendererSetup(){
    originX = document.body.offsetWidth/2;
    originY = document.body.offsetHeight/2;
}

function drawRoad(points,label,ctx){
    let pointOnScreen  = translatePoint(points[0]);
    ctx.beginPath(); // Start a new path
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#ffcc00";
    ctx.moveTo(pointOnScreen.x, pointOnScreen.y);
   
    for(let i = 1;i<points.length;i++){
        
        let pointOnScreenTemp= translatePoint(points[i]);
       
         // Move the pen to (30, 50)
        ctx.lineTo(pointOnScreenTemp.x, pointOnScreenTemp.y); // Draw a line to (150, 100)
        
        pointOnScreen = pointOnScreenTemp;
    }
    ctx.stroke(); // Render the path
}

function translatePoint(point){
    const realX = (point.x-camera.x)*camera.scale;
    const realY = (point.y-camera.y)*camera.scale;
    const onScreenX = realX+originX;
    const onScreenY = realY+originY;
    return {x:parseInt(onScreenX),y:parseInt(onScreenY)};
}
function renderMapObjects(){
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,originX*2,originY*2);
    mapObjects.forEach((obj)=>obj.drawOnCanvas(ctx));
}
function zoomIn(){
    camera.scale+=0.05;
    renderMapObjects();
}
function zoomOut(){
    camera.scale-=0.05;
    renderMapObjects();
}
function moveMap(deltaX,deltaY){
    camera.x+=deltaX/camera.scale;
    camera.y+=deltaY/camera.scale;
}


map_canvas.addEventListener('mousedown', function(event) {
    mousePressed=true;
  });
  
map_canvas.addEventListener('mouseup', function(event) {
    mousePressed=false;
    presviousMovePoint = null;
    
  });
   
  map_canvas.addEventListener('mousemove',  function(event) {
    if(!mousePressed)return;
    point = {x:event.clientX,y:event.clientY};
    if(presviousMovePoint!=null){
        moveMap(presviousMovePoint.x-point.x,presviousMovePoint.y-point.y);
         
        renderMapObjects();
        
    }
    presviousMovePoint = (point);

});

setInterval(()=>{
 if(camera.x!=lastCamPos.x||camera.y!=lastCamPos.y||camera.scale!=lastCamPos.scale){
    getBlock(camera.x,camera.y,camera.scale);
    lastCamPos.x = camera.x;
    lastCamPos.y = camera.y;
    lastCamPos.scale = camera.scale;
 }
 renderMapObjects();
},1500)