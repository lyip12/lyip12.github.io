var timestamp;
var stage = 1;
var loadcube;

function preload() {
  loadcube = loadModel('3d/mini5.stl',true);
}

function setup() {
  createCanvas(windowWidth,windowHeight, WEBGL);
}

function draw() {
  

  var locX = mouseX ;
  var locY = mouseY;

  ambientLight(50);
  directionalLight(150,150,150,1,1,1);
  pointLight(0,0,255, locX, locY,200);

  if(stage==1){
    timestamp = frameCount;
    stage = 2;
  }
  
  
  if(stage==2){
  background(0);

  push();
  fill(0);
  translate(0,-50,0);
  rotateZ(frameCount * 0.005);
  rotateX(frameCount * 0.01);
  specularMaterial(255);
  scale(1);
  model(loadcube);
  pop();
  
  push();
  fill('#648493');
  rect(-200,50,400,3);
  fill(0,174,255);
  rect(-200,50,frameCount-timestamp,3);
  if(frameCount-timestamp > 400){
    timestamp = frameCount;
    stage = 3;
  }
  pop()
  }

}