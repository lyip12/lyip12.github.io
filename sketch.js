var mclick = 0;
var ts;
var stage = 1;
var SGB;
var SGR;
var trigger = false;
var welc;
var counter = 0;
// var loadcube;

function preload() {
  SGB = loadFont('font/SegoeUIBold.ttf');
  SGR = loadFont('font/SegoeUI.ttf');
  welc = loadImage('img/load.jpg');
}

function setup() {
var myCanvas = createCanvas(windowWidth,windowHeight);
myCanvas.parent('myContainer');
imageMode(CENTER);
background(255); 
} 

function windowResized(){
resizeCanvas(windowWidth,600);
}


function draw() {
  translate(width/2,height/2);

  var locX = mouseX ;
  var locY = mouseY;


// -------------------------------------------------------------------------------------------------------------------------------------- started block


  if(stage==1){
    counter=0;
    stage = 2;
  }
  
  
  
// -------------------------------------------------------------------------------------------------------------------------------------- loading page
  
  
  if(stage==2){
  counter++;
  background(0);
  noStroke();
  
  push();
  fill('#648493');
  rect(-200,20,400,2);
  fill(0,174,255);
  rect(-200,20,counter,2);
  
  fill(255);
  textFont(SGB);
  textSize(12);
  textAlign(CENTER);
  text(counter/4-0.25+" %",0,0);
  
  if(counter > 400){
    counter = 0;
    stage = 3;
  }
  pop()
  
  }


// -------------------------------------------------------------------------------------------------------------------------------------- facade system welcome page and logo

  if(stage==3){
  counter++;
  push();
  background(255);
  image(welc,0,-50,300,300);

  rectMode(CENTER);
  fill(0,0,0,255-counter);
  rect(0,0,2*width,2*height);
  pop();
  
  noStroke();
  fill(0,0,0,counter/2);
  textSize(24);
  textAlign(CENTER);
  textFont(SGB);
  text("FACADE",0,150);
  textSize(16);
  textFont(SGR);
  text("Microsoft Tenant Data Physicalization Tool",0,180);
  
  if(counter < 300){
  stroke(0,0,0,counter/2);
  strokeWeight(2);
  line(-counter/2,160,counter/2,160);
  }
  if(counter > 300){
  stroke(0,0,0,counter/2);
  strokeWeight(2);
  line(-150,160,150,160);
  noStroke();
  }
  
  if(counter > 500){
    fill(255,255,255,(counter-500)*6)
    rectMode(CENTER);
    rect(0,0,width/2,height/2);
  }
  
  if(counter>530){
  stage = 4;
  counter=0;
  }
// -------------------------------------------------------------------------------------------------------------------------------------- facade system welcome page and logo

  if(stage==4){
    
  counter++;
  
  }



}}

// function mouseClicked() {
//   if(trigger ==true){
//   mclick++;
//   }
// }
