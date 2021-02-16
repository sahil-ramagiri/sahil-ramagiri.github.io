window.addEventListener("load",()=>{
  fetch("./playerX.json").then((resp)=>{return resp.json();}).then((data)=>{
    playerX = data;
    init();
  });

  var retryButton = document.querySelector('#retry');
  retryButton.addEventListener('click',()=>{
    reset();
  });
});
var state = [ [0,0,0],
              [0,0,0],
              [0,0,0]];
var player = 1;
var moves = 0;
var mode = 0;
var playerX;

let init = ()=>{
  var row1 = document.querySelectorAll(".row1 li");
  var row2 = document.querySelectorAll(".row2 li");
  var row3 = document.querySelectorAll(".row3 li");
  var board = [row1, row2, row3];
  var id = 0;
  for(var row of board){
    for(var li of row){
      li.style.backgroundImage = '';
      li.setAttribute('id','a'+id);
      li.setAttribute('state','0');
      id++;
    li.addEventListener("click",(e)=>{
      if(checkState(e.target.state,e.target.id)){
        e.target.style.backgroundImage = `url("SVG/Asset ${player}.svg")`;
        e.target.setAttribute('state',`${player}`);

        var r = checkWin();
        if(r != 0){
          win(r);
        }
        moves++;
        if(moves == 9 && r ==0){
          draw();
        }
        player = player == 1? 2:1;
        if(mode == 0){
        checkAttention();
      }
      }
      if(notInit(state)){
        work();
      }
      })

    }
  }
  work();
};

let checkState = (s,id)=>{
  id = id.charAt(1);
  var j = id%3;
  var i = Math.floor(id/3);
  var v = state[i][j] == '0' ? true:false;
  if(v){
    state[i][j] = player;
  }
  return v;
  // var u = state[i][j] == `${player}` ? true:false;
};

let checkWin = ()=>{
  //row match
  for(var i = 0;i<=2;i++){
    if(state[i][1] == state[i][0] && state[i][1] == state[i][2] && state[i][2] != 0){
      return player;
    }
    if(state[1][i] == state[0][i] && state[1][i] == state[2][i] && state[2][i] != 0){
      return player;
    }
  }

  //diagonal match
  if(state[0][0] == state[1][1] && state[1][1] == state[2][2] && state[1][1] != 0){
    return player;
  }
  if(state[0][2] == state[1][1] && state[1][1] == state[2][0] && state[1][1] != 0){
    return player;
  }

  return 0;
};

let win = (p)=>{
  console.log(`HEY! PLAYER ${p} WON!!`);
  retry(p);
};
let draw = ()=>{
  console.log('DRAW!!');
  retry(0);
};
let retry = (p)=>{
  var section = document.querySelector(".status");
  if(p == 0){section.innerHTML = "Draw Match";}
  if(p == 1){section.innerHTML = "Player 1 Wins!";}
  if(p == 2){section.innerHTML = "Player 2 Wins!";}
  var retryScreen = document.querySelector(".retry");
  retryScreen.style.transform = "translateY(0)";
  retryScreen.style.opacity = "1"
};
let reset = ()=>{
  var retryScreen = document.querySelector(".retry");
  retryScreen.style.opacity = "1"
  retryScreen.style.transform = "translateY(-100vh)";
  state = [ [0,0,0],
                [0,0,0],
                [0,0,0]];
  player = 1;
  moves = 0;
  if(mode == 0)
  checkAttention();
  console.log("reset");
  init();

};
let checkAttention = ()=>{
  if(player==1){
    // document.querySelector("#p1").style.backgroundColor = "#ffffff";
    // document.querySelector("#p2").style.backgroundColor = "#cccccc";
    document.querySelector("#p1").style.opacity = "1";
    document.querySelector("#p2").style.opacity = "0.2";
  }
  if(player==2){
    // document.querySelector("#p2").style.backgroundColor = "#ffffff";
    // document.querySelector("#p1").style.backgroundColor = "#cccccc";
    document.querySelector("#p2").style.opacity = "1";
    document.querySelector("#p1").style.opacity = "0.2";
  }
};
let getHash= (b)=>{
  let flatten = [].concat(...b);
  let switcher = ["-","x","o"]
  let hash = ""
  for (var i in flatten) {
    hash += switcher[flatten[i]]
  }
  return hash;
};
let notInit= (b)=>{
  let flatten = [].concat(...b);
  for (var i in flatten) {
    if(flatten[i])
    return true;
  }
  return false;
};
let checkToggle = ()=>{
  let toggle = document.querySelector(".toggle-btn");
  mode = toggle.checked ? 1 :0;
  reset();
  if(mode==1){document.querySelector("#p1").style.opacity = "0";
  document.querySelector("#p2").style.opacity = "0";
  document.querySelector(".toggle h2").innerHTML = "P vs P";
}
  else{
  checkAttention();
  document.querySelector(".toggle h2").innerHTML = "Against AI"
}
}
let work = ()=>{
  if(player == 1 && playerX && mode==1){
    var hash = getHash(state);
    var action = playerX[hash];
    console.log(islegal(action));
    if(action && islegal(action)){
    if(moves != 0){
    indexli(Number(action));}
    else{
      var n = Math.floor(Math.random()*9);
      indexli(n);
    }
  }
  else{
    console.log("else");
    for(var i=0;i<9;i++){
      if(islegal(i)){
        indexli(Number(action));
        break;
      }
    }
  }
}

};
let islegal = (a)=>{
  let flatten = [].concat(...state);
  return (flatten[a] == 0)
}
let indexli = (i)=>{
  var child = i%3;
  var row = Math.floor(i/3);
  let exp = `.row${row+1} li:nth-child(${child+1})`;
  document.querySelector(exp).click();
};
