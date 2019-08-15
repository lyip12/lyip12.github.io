var mclick = 0;
var timestamp;
var stage = 1;
var SGB;
var SGR;
var trigger = false;
// var loadcube;

function preload() {
  SGB = loadFont('font/SegoeUIBold.ttf');
  SGR = loadFont('font/SegoeUI.ttf');
}

function setup() {
  createCanvas(windowWidth,windowHeight);
}

function draw() {
  translate(width/2,height/2);

  var locX = mouseX ;
  var locY = mouseY;

  if(stage==1){
    timestamp = frameCount;
    stage = 2;
  }
  
  
  if(stage==2){
  background(0);
  noStroke();
  
  push();
  fill('#648493');
  rect(-200,50,400,2);
  fill(0,174,255);
  rect(-200,50,frameCount-timestamp,2);
  
  fill(255);
  textFont(SGB);
  textSize(10);
  textAlign(CENTER);
  text((frameCount-timestamp)/4-0.25+" %",0,0);
  
  
  if(frameCount-timestamp > 400){
    timestamp = frameCount;
    stage = 3;
  }
  pop()
  }

}

function mouseClicked() {
  if(trigger ==true){
  mclick++;
  }
}
