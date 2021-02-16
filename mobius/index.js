window.addEventListener('load',()=>{
  let inputs = document.querySelectorAll("input");
  for(i of inputs){
    i.addEventListener('change',()=>{
      docInit();
      // init();
    });
  }
  docInit();
  init();
});
let toggle = false;
let params = {};
let docInit = ()=>{

    n = document.querySelector('#nPi').value;
    params.stripC = document.querySelector('#stripC').value;
    params.pathC = document.querySelector('#pathC').value;
    params.loop1C = document.querySelector('#loop1C').value;
    params.loop2C = document.querySelector('#loop2C').value;
    params.loop1S = document.querySelector('#loop1S').checked;
    params.loop2S = document.querySelector('#loop2S').checked;
    params.stripS = document.querySelector('#stripS').checked;
    params.pathS = document.querySelector('#pathS').checked;
    params.rX = document.querySelector('#rX').checked;
    params.rY = document.querySelector('#rY').checked;
    params.rZ = document.querySelector('#rZ').checked;
    params.step = document.querySelector('#step').value;
  };
let n;
let init = ()=>{
  let rad = 150;
  let trad = 25;
  let tnrad = 25;
  let prad1 = 25;
  let prad2 = -25;
  let mrad = Math.sqrt(trad*trad+rad*rad);
  //let cosx = rad/mrad;
  //let mx = Math.acos(cosx);
  let sinx = trad/mrad;
  let mx = Math.asin(sinx);
  // let n = param.nPi;
  let speed;
  const sketch = (p)=>{
    let checkdom = ()=>{
      speed = document.querySelector('#speed').value;
    };
    let pointX = (i)=>{
      p.point(i.x,i.y,i.z);
    };
    let lineX =(i,j)=>{
      p.line(i.x,i.y,i.z,j.x,j.y,j.z);
    };
    let mobius = (u)=>{
      let ts = p.createVector(rad*p.sin(u*2*p.PI),0,rad*p.cos(u*2*p.PI));
      let te = p.createVector(mrad*p.sin(u*2*p.PI + mx),0,mrad*p.cos(u*2*p.PI + mx));

      if(params.pathS){
        p.strokeWeight(3);
        p.stroke(params.pathC);
        lineX(ts,te);
      }

      let tn1 = p.createVector(rad*p.sin(u*2*p.PI),tnrad*p.cos(n*p.PI*u),rad*p.cos(u*2*p.PI));
      let tn2 = p.createVector(rad*p.sin(u*2*p.PI),tnrad*p.cos(n*p.PI*u + p.PI),rad*p.cos(u*2*p.PI));
      let off1 = p.createVector(tnrad*p.sin(u*n*p.PI),0,tnrad*p.sin(u*n*p.PI));
      let off2 = p.createVector(tnrad*p.sin(u*n*p.PI + p.PI),0,tnrad*p.sin(u*n*p.PI + p.PI));
      tn1.add(off1);
      tn2.add(off2);
      if(params.stripS){
        p.strokeWeight(3);
        p.stroke(params.stripC);
        lineX(tn1,tn2);
      }

      p.stroke(0,200,200);
      p.strokeWeight(5);
      //pointX(tn1);
      if(params.loop1S){
      let particle1 = p.createVector((rad)*p.sin(u*2*p.PI),0,(rad)*p.cos(u*2*p.PI));
      let Poff1 = p.createVector( prad1*p.cos(u*n*p.PI)*p.sin(u*2*p.PI),prad1*p.sin(n*p.PI*u),prad1*p.cos(u*n*p.PI)*p.cos(u*2*p.PI));
      particle1.add(Poff1);
      p.stroke(params.loop1C);
      p.strokeWeight(10);
      pointX(particle1);
    }
      if(params.loop2S){
      let particle2 = p.createVector((rad)*p.sin(u*2*p.PI),0,(rad)*p.cos(u*2*p.PI));
      let Poff2 = p.createVector( prad2*p.cos(u*n*p.PI)*p.sin(u*2*p.PI),prad2*p.sin(n*p.PI*u),prad2*p.cos(u*n*p.PI)*p.cos(u*2*p.PI));
      particle2.add(Poff2);
      p.stroke(params.loop2C);
      p.strokeWeight(10);
      pointX(particle2);
    }
    };
    p.setup = ()=>{
      let c = p.createCanvas(500,500,p.WEBGL);
    };
    let v;
    let counter = 0;
    p.draw = ()=>{
      if(!toggle){
        counter++;
        v = counter % speed;
        v/=speed;
        p.background(0);
      }

      checkdom();

      // v = p.frameCount % speed;
      // v/=speed;
      p.push();
      // p.translate(p.width/2,p.height/2);
      if(params.rX)
      p.rotateX(v*2*p.PI)
      if(params.rY)
      p.rotateY(v*2*p.PI)
      if(params.rZ)
      p.rotateZ(v*2*p.PI)
      let step = 1/Number(params.step);
      for(let u = 0;u<=2*n+1;u+=step){
      mobius(u);
      }
      p.pop();
    };
  };
  let w = document.querySelector('.wrapper');
  let myp5 = new p5(sketch,w);


};

let save = ()=>{
  let Canvas = document.querySelector('canvas');
  if(Canvas){
    let imgsrc = Canvas.toDataURL('image/png');
    imgsrc = imgsrc.replace("image/png","image/octet-stream")
    let img = document.createElement("img");
    img.setAttribute('download','mobius-strip.png');
    img.setAttribute('href',imgsrc);
    img.click();
  }
};
