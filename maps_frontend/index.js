var ctx;
function entry(){
 map_canvas.width = document.body.offsetWidth;   
 map_canvas.height = document.body.offsetHeight;
 ctx = map_canvas.getContext('2d');
 
 rendererSetup();
}