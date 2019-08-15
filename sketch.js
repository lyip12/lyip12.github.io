var mclick = 0;
var ts;
var stage = 1;
var SGB;
var SGR;
var trigger = false;
var welc;
var counter = 0;
var keyy = 10000000;

// var loadcube;

function preload() {
  SGB = loadFont('font/SegoeUIBold.ttf');
  SGR = loadFont('font/SegoeUI.ttf');
  welc = loadImage('img/load.jpg');
}

function setup() {
//var myCanvas = createCanvas(windowWidth,windowHeight);
createCanvas(windowWidth,windowHeight);
//myCanvas.parent('myContainer');
imageMode(CENTER);
background(0); 

} 

//


function draw() {
  translate(width/2,height/2);

  var locX = mouseX ;
  var locY = mouseY;


// -------------------------------------------------------------------------------------------------------------------------------------- started block


  if(stage==1){

    counter=0;
    stage = 4;
  }
  
  
  
// -------------------------------------------------------------------------------------------------------------------------------------- loading page
  
  
  if(stage==2){
  counter++;
  background(0,0,0,30);
  noStroke();
  
  push();
  fill('#648493');
  rect(-200,20,400,2);
  fill(0,174,255);
  rect(-200,20,counter,2);
  
  fill(0);
  rectMode(CENTER);
  rect(0,0,30,20);
  fill(255);
  textFont(SGB);
  textSize(12);
  textAlign(CENTER);
  text(int(counter/4-0.25)+" %",0,0);
  textFont(SGR);
  rect(counter-200+random(-10,10),random(10,30),random(1,3),random(1,3));
  text("... lucy is confused ...",0,50);
  
  if(counter > 400){
    counter = 0;
    stage = 3;
  }
  pop()
  
  }


// -------------------------------------------------------------------------------------------------------------------------------------- facade system welcome page and logo + id

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
  
  if(counter < 290){
  stroke(0,0,0,counter/2);
  strokeWeight(2);
  line(-counter/2,160,counter/2,160);
  }
  if(counter > 290){
  stroke(0,0,0,counter/2);
  strokeWeight(2);
  line(-147,160,147,160);
  noStroke();
  }
  
  if(counter > 500 && counter <300){
    fill(255,255,255,(counter-500)*6.5)
    rectMode(CENTER);
    rect(0,0,width/2,height/2);
  }
  
  if(counter>530){

    
  push();
  
  background(255,195);
  noStroke();
  fill('#78c0d6');
  rectMode(CORNER);
  rect(-150,-250,300,450);
  fill('#c2f1ff');
  rect(-150,-220,7,52);
  
  fill(0);
  
  textAlign(LEFT);
  textFont(SGB);
  textSize(24);
  text("Hello,",-120,-200);
  text("this is FACADE.",-120,-170);
  textFont(SGR);
  textSize(12);
  text("FACADE is a Client Data Phsyicalization",-120,-130);
  text("tool developed by M365 Data Analytics and",-120,-115);
  text("Microsoft Research. It is meant to help you",-120,-100);
  text("engage with and understand your org's",-120,-85);
  text("strengths and weaknesses, growth and",-120,-70);
  text("development. We think these resources will",-120,-55);
  text("be helpful to you as you progress forward.",-120,-40);
  fill('#c2f1ff');
  
  if(mouseX > -130+width/2 && mouseX < width/2 && mouseY >height/2-25 && mouseY<height/2-10){
    fill('#547cff');
  }
  text("why is this important?",-120,-20);
  stroke('#c2f1ff');
  if(mouseX > -130+width/2 && mouseX < width/2 && mouseY >height/2-25 && mouseY<height/2-10){
    stroke('#547cff');
  }
  line(-120,-18,-5,-18);

  noStroke();
  fill(255,255,255,50);
  if(mouseX>-120+width/2 && mouseX<70+width/2 && mouseY>60+height/2 && mouseY<90+height/2){
    fill(255,255,255,100);
  }
  rect(-120,60,210,30);
  fill(255);
  
  if(mouseX>70+width/2 && mouseX<120+width/2 && mouseY>60+height/2 && mouseY<90+height/2){
    fill('#547cff');
  }
  rect(90,60,30,30)
  stroke(255);
  strokeWeight(2);
  line(103,70,110,75);
  line(103,80,110,75);
  noStroke();
  fill(0);
  
  textFont(SGB);
  text("Please enter your Org _ ID:",-120,50);
  
  if (keyIsDown(32)) {
  keyy = -110;
  }
  textFont(SGR);
  text("173642424134",keyy,80);
  text("Empower every person and every",-120,150);
  text("organization on the planet to achieve more.",-120,165);
  pop();
  
  if(mouseIsPressed && mouseX>70+width/2 && mouseX<120+width/2 && mouseY>60+height/2 && mouseY<90+height/2){
    stage = 4;
    counter = 0;
  }
  
  }
}


// -------------------------------------------------------------------------------------------------------------------------------------- facade system welcome page and logo

  if(stage==4){
    counter +=10;
    if(counter<width/6){
      
      
      push();
  
  background(255,195);
  noStroke();
  fill('#78c0d6');
  rectMode(CORNER);
  rect(-150-counter,-250,300,450);
  fill('#c2f1ff');
  rect(-150-counter,-220,7,52);
  fill(0);
  
  textAlign(LEFT);
  textFont(SGB);
  textSize(24);
  text("Hello,",-120-counter,-200);
  text("this is FACADE.",-120-counter,-170);
  textFont(SGR);
  textSize(12);
  text("FACADE is a Client Data Phsyicalization",-120-counter,-130);
  text("tool developed by M365 Data Analytics and",-120-counter,-115);
  text("Microsoft Research. It is meant to help you",-120-counter,-100);
  text("engage with and understand your org's",-120-counter,-85);
  text("strengths and weaknesses, growth and",-120-counter,-70);
  text("development. We think these resources will",-120-counter,-55);
  text("be helpful to you as you progress forward.",-120-counter,-40);
  fill('#c2f1ff');
  text("why is this important?",-120-counter,-20);
  stroke('#c2f1ff');    
  line(-120-counter,-18,-5-counter,-18);
  noStroke();
  fill(255,255,255,50);    
  rect(-120-counter,60,210,30);
  fill(255);    
  rect(90-counter,60,30,30)
  stroke(255);
  strokeWeight(2);
  line(103-counter,70,110-counter,75);
  line(103-counter,80,110-counter,75);
  noStroke();
  fill(0);
  textFont(SGB);
  text("Please enter your Org _ ID:",-120-counter,50);    
  textFont(SGR);
  text("173642424134",-110-counter,80);
  text("Empower every person and every",-120-counter,150);
  text("organization on the planet to achieve more.",-120-counter,165);
  fill('#f2f4f7');
  rect(150-counter,-250,counter*2,450);
  
  pop();
  
    }
  if(counter>width/6){
    push();
    
    noStroke();
  fill(0,0,0,counter/2-width/6);
  textSize(16);
  textAlign(RIGHT);
  textFont(SGR);
  text("welcome",width/6+100,-30);
  textSize(24);
  textFont(SGB);
  text("EXAMPLE COMPANY NAME",width/6+100,0);
  stroke(255-(counter/2-width/6));
  if(mouseX>width/6+80+width/2 && mouseX<width/6+95+width/2 && mouseY<60+height/2 && mouseY>30+height/2){
    stroke('#c2f1ff');
  }
  strokeWeight(4);
  line(width/6+80,30,width/6+95,45);
  line(width/6+80,60,width/6+95,45);
  noStroke();
    pop();
  }
  
  if(mouseIsPressed && mouseX>width/6+80+width/2 && mouseX<width/6+95+width/2 && mouseY<60+height/2 && mouseY>30+height/2){
    stage = 5;
    counter = 0;
  }

}



// -------------------------------------------------------------------------------------------------------------------------------------- facade system welcome page and logo

  if(stage==5){
  }


}

// function mouseClicked() {
//   if(trigger ==true){
//   mclick++;
//   }
// }
