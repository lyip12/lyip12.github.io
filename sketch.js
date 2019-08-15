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
  var welco = loadImage('img/load.jpg');
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
    stage = 3;
  }
  
  
  
// -------------------------------------------------------------------------------------------------------------------------------------- loading page
  
  
  if(stage==2){
  background(0);
  noStroke();
  
  push();
  fill('#648493');
  rect(-200,20,400,2);
  fill(0,174,255);
  rect(-200,20,frameCount-timestamp,2);
  
  fill(255);
  textFont(SGB);
  textSize(12);
  textAlign(CENTER);
  text((frameCount-timestamp)/4-0.25+" %",0,0);
  
  
  if(frameCount-timestamp > 400){
    timestamp = frameCount;
    stage = 3;
  }
  pop()
  }


// -------------------------------------------------------------------------------------------------------------------------------------- facade system welcome page and logo

  if(stage==3){
    push();
  background(255);
  imageMode(CENTER);
  if(width*0.56<height){
    image(welc,0,0,height/0.56,height);
  }else{
    image(welc,0,0,width,width*0.56);
  }
  rectMode(CENTER);
  fill(0,0,0,255-frameCount/3);
  rect(0,0,2*width,2*height);
  pop();

}
}

function mouseClicked() {
  if(trigger ==true){
  mclick++;
  }
}
