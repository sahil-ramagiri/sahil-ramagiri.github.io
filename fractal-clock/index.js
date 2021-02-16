// var today = new Date();
var rad;
var startX,startY;
var clockToggle = true;
function setup() {
  createCanvas(window.innerWidth,window.innerHeight);
  rad = 80;
  startX = width/2;
  startY = height/2;
  if(width<600 || height<500)
  {
    rad = 60;}
  if(height>width){
      startY=height/2-(height-width)*0.3;
      // console.log(startX,startY);
    }
    console.log(window.innerWidth,window.innerHeight);
    console.log(rad);
}
function windowResized(){
  resizeCanvas(window.innerWidth,window.innerHeight,"noRedraw");
  rad = 75;
  startX = window.innerWidth/2;
  startY = window.innerHeight/2;
  // console.log(window.innerWidth,width);
  if(window.innerWidth<600 || window.innerHeight<500)
    rad = 60;
  if(window.innerHeight>window.innerWidth){
    startY-=(window.innerHeight-window.innerWidth)*0.3;
    // console.log(startX,startY);
  }
  console.log(window.innerWidth,window.innerHeight);
  console.log(rad);
}
function draw(){
  clear();
  background('rgba(0,0,0,0)');
  push();
  translate(startX,startY);
  // rotate(PI);
  drawTime();
  pop();
}
function drawTime(){
  var today = new Date();
  var hour = (today.getHours() % 12) / 12;
  var min = today.getMinutes() / 60;
  var sec = today.getSeconds() / 60;
  sec += (today.getMilliseconds()/60000);
  min += today.getSeconds()/3600;
  // sec = 45/60;
  // min = 15/60;
  // sec = 0.25
  // min = 0.75
  stroke(255);
  strokeWeight(3);
  noFill();
  // ellipse(0,0,rad*2+20,rad*2+20);
  for(var i =-0.25;i<11.75;i++){
    arc(0,0,rad*2,rad*2,i*2*PI/12,(i+0.5)*2*PI/12);
  }
  // strokeWeight(4);
  // line(0,0,rad*sin(hour*2*PI ),rad*cos(hour*2*PI )*-1);
  stroke(200);
  strokeWeight(1);
  // drawTree1m(0,0,sec*2*PI,abs(sec*2*PI-min*2*PI),0.75);
  var g = abs(sec-min);
  g = g>0.5? (1-g):g;
  line(0,0,rad*sin(min*2*PI),rad*cos(min*2*PI)*-1);
  line(0,0,rad*sin(sec*2*PI),rad*cos(sec*2*PI)*-1);
  if(!clockToggle){
  drawTree1m(rad*sin(min*2*PI),rad*cos(min*2*PI)*-1,min*2*PI,g*2*PI,0.75);
  drawTree1m(rad*sin(sec*2*PI),rad*cos(sec*2*PI)*-1,sec*2*PI,g*2*PI,0.75);
}else
  {drawTree1h(rad*sin(min*2*PI),rad*cos(min*2*PI)*-1,min,sec,2,min);
  drawTree1h(rad*sin(sec*2*PI),rad*cos(sec*2*PI)*-1,min,sec,2,sec);}
  // console.log(min,sec);
  // if (frameCount>200) {
  //   noLoop();
  // }
}
function drawTree1h(ix,iy,alpha,beta,s,gamma){
  if(s>12){
    return;
  }
  gamma = gamma>1? gamma-1:gamma;
  // var dec= 1;
  var dec= Math.pow(0.69,s);
  var offX = ix+dec*rad*sin((gamma + alpha)*2*PI);
  var offY = iy+dec*rad*cos((gamma + alpha)*2*PI)*-1;
  line(ix,iy,offX,offY);
  drawTree1h(offX,offY,alpha,beta,Number(str(s+1)),(gamma + alpha));
   offX = ix+dec*rad*sin((gamma + beta)*2*PI);
   offY = iy+dec*rad*cos((gamma + beta)*2*PI)*-1;
  line(ix,iy,offX,offY);
  drawTree1h(offX,offY,alpha,beta,Number(str(s+1)),(gamma + beta));
}
function drawTree1m(ix,iy,alpha,gamma,s){
  if(s<0.04){
    return;
  }
  var offX = ix+s*rad*sin(alpha-gamma/2);
  var offY = iy+s*rad*cos(alpha-gamma/2)*-1;

  // colorMode(HSB,1);
  // // stroke(noise(alpha,gamma),1,1);
  // stroke(noise(gamma+1),1,1);
  line(ix,iy,offX,offY);
  drawTree1m(offX,offY,alpha-gamma/2,gamma,0.75*s);
  offX = ix+s*rad*sin(alpha+gamma/2);
  offY = iy+s*rad*cos(alpha+gamma/2)*-1;
  line(ix,iy,offX,offY);
  drawTree1m(offX,offY,alpha+gamma/2,gamma,0.75*s);
}

function update(){
  var today = new Date();
  document.querySelector('#hr').innerHTML = n((today.getHours()%12) || 12);
  document.querySelector('#min').innerHTML = n(today.getMinutes());
  document.querySelector('#sec').innerHTML = n(today.getSeconds());

}
function n(x) {
  return x>9 ? ""+x:"0"+x;
}
setInterval(update,1000);
var infoToggle = false;
function infoClick(){
  infoToggle = !infoToggle;
  document.querySelector('.menu').style.display = infoToggle ? 'block':'none';
}

function clockType() {
  clockToggle = !clockToggle;
  console.log(clockToggle);
  if(clockToggle){
    document.querySelector('.checkbox2').style.left = "5px";
  }else{
    document.querySelector('.checkbox2').style.left = "37px";
  }
}
