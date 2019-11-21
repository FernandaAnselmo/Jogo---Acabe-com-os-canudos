//variáveis jogador
var ax=[]
var by=[]
var x = 250;
var y = 400;
var velocidadeT = 1
var raioP = 80
var raio0 = 20
let imgT = [];
var contFrame = 0;
var z = 0
var paraFrame = 0
var a = 150
var b = 150
let imgV;
//variáveis inimigos
var xC=[];
var yC=[];
var raioC = 60;
var velocidadeC = 3
var total = 3;
var totalc = 1
let imgC;
//variáveis para Disparo
var xd = 100;
var yd = 100;
var raio1 = 8
var raio2 = 5
var estadoDisparo = false
let imgDis;
//variáveis para tela
var anima
var tela = 0;
var vidas = 5;
var receberVidas = false
var pontos = 0;
var xPremio;
var yPremio = 0
var barreiradepontos = 60;
var nível = 1;
let imgTela01;
let imgTela02;
let imgTela03;
let imgTela04;
let imgTela05;
let imgtriste;
let imgfeliz;
let mySound; 

function preload(){
  mySound = loadSound('Komiku_-_24_-_Time_to_go_to_space_now_.mp3');
  imgC = loadImage("Canudo.png")
  for(i=0; i<3; i++){
  imgT[i] = loadImage("tartaruga000"+i+".png") 
  }
  imgDis = loadImage ("shot10.png")
  imgV = loadImage ("coração-1.png")
  imgTela01 = loadImage("Tela 01.png")
  imgTela02 = loadImage("Tela 02.png")
  imgTela03 = loadImage("telapeixes.png")
  imgTela04 = loadImage("t.png")
  imgtriste = loadImage("chocada.png")
  imgfeliz = loadImage("feliz.png")
}
function setup (){
  mySound.setVolume(0.2);
  mySound.play();
  createCanvas(510, 510);
  stroke(0, 0, 0);
  fill(100, 10, 40) //verde 
  for (var i = 0; i < total; i++) {
    xC[i] = 500
    yC[i] = 350
  }
  for (var k = 0; i < totalc; i++) {
    ax[k] = 100
    by[k] = 300
  }
  xPremio = random(0, 500);
}
 function draw (){
   //Primeira Tela
   if(tela == 0){
     imageMode(CENTER)
     background(0);
     image(imgTela01, (width/2), (height/2), width, height)
     if(millis()>5000){
       tela = 1
     }
   }
   
   //Segunda Tela
   if(tela == 1){
     
     imageMode(CENTER)
     background(0);
     image(imgTela02, (width/2), (height/2), width, height)
     stroke (0, 0, 0)
      fill(0, 300, 0)
     textSize(15);
   }
   //Terceira tela (jogo em si)
   if(tela==2) {
     imageMode(CENTER)
     background(0)
     image(imgTela03, (width/2), (height/2), width, height)
     teclado();
     //ellipse (x, y, 2*raioP, 2*raioP)tartaruga
     if(x>width){
       x=5;
     }
     anima = imgT[contFrame]
     ellipse(x,y, 0, 0)
     imageMode(CENTER);
     image(anima, x, y, raioP, raioP);
     paraFrame ++
     if(paraFrame > 5){
       contFrame++
       paraFrame = 0
     }
     if(contFrame > 2){
       contFrame = 0
     }
       for( var i = 0; i<total; i++){
       image(imgC, xC[i], yC[i], raioC, 60);
         yC[i] = yC[i] + velocidadeC
         xC[i] = xC[i] + random(- velocidadeT, velocidadeT)
         
          if (yC[i] > 500) {
        yC[i] = random(10, 0)
        xC[i] = random(10, 500)
          }
       }
     
     //Tiro
     
     if(keyIsDown(CONTROL) && estadoDisparo==false){
        xd = x;
        yd = y;
      estadoDisparo = true
      }
    if(estadoDisparo == true) {
    ellipse( xd, yd, 2*raio2, 2*raio2); //representa o tiro
      yd =  yd - 10;
      if(yd < 0){
      estadoDisparo = false
      }
    }
     
   for(i = 0; i < total; i++) {
      if (dist(x, y, xC[i], yC[i]) < raioC) {
        x = 100;
        y = 400
        //perder vidas
        vidas = vidas - 1;
        xC[i] = random(0, 0);
        yC[i] = random(0, 0);
      }
    } 
    for(i = 0; i < total; i++) {
      if (dist(xd, yd, xC[i], yC[i]) < raioC) {
        pontos = pontos + 2;
        if (pontos > barreiradepontos) {
          nível++
          velocidadeC += 0.6;
          velocidadeT += 0.6;

          barreiradepontos = barreiradepontos + 30;
          receberVidas = true;
          console.log('deveriaaparerumavida');
        }
        xC[i] = random(0, 400);
        yC[i] = random(-100, 40);
      }
    }
     //fim de jogo
     if (vidas <= 0) {
      tela = 3
    }

    if (receberVidas == true) {
      image(imgV, xPremio, yPremio, 50, 50);
      yPremio = yPremio + 5;
      if ((dist(x, y, xPremio, yPremio) <= raioP)) {
        yPremio = 0;
        xPremio = random(25, 475);
        vidas = vidas + 1
        receberVidas = false;
      }
      if (yPremio >= 500) {
        receberVidas = false;
        yPremio = 0;
      }
    }
    textSize(20);
    stroke(100, 100, 0)
    fill(255);
    text("Nível: " + nível, 30, 30);
    text("Vidas: " + vidas, 200, 30);
    text("Pontos: " +pontos, 400, 30);
    if (vidas == 0) {
      tela = 3;
    }
     if((pontos == 400)||(nível == 8)){
     tela = 4;
     }
     
}
   if (tela == 3) {
     mySound.setVolume(0.2);
      mySound.stop();
    background(0)
    image(imgTela04, (width / 2), (height / 2), width, height)
    image(imgtriste, 80, 400, 100, 160);
    textSize(50);
    textFont("Andalus")
    text("VOCÊ PERDEU!", 100, 100);
    textSize(26);
    text("Sua conquista foi de " + pontos + " pontos!   Nível: " +nível+"\n", 50, 200);
     text("Aperte ENTER para jogar novamente!", 50, 300)
   }     
   if (tela == 4) {
     mySound.setVolume(0.2);
    mySound.stop();
    background(0)
    image(imgTela04, (width / 2), (height / 2), width, height)
    image(imgfeliz, 80, 400, 100, 160);
    
    textFont("Andalus")
     textSize(56)
    text("VOCÊ VENCEU!", 50, 150);
    textFont("Andalus")
     textSize(26)
    text("Sua conquista foi de " + pontos + " pontos!", 50, 200);
    textFont("Andalus")
    text("Nível: " + nível, 330, 250);
    text("Aperte ENTER para jogar novamente!", 50, 300)
   } 
 }
function teclado() {

  if (keyIsDown(LEFT_ARROW)) {
    x -= 8;
    if (x < 0) {
      x = -random(170)
    }
  }

  if (keyIsDown(RIGHT_ARROW)) {
    x += 8;
    if (x > 500) {
      x = +random(170)

    }
  }

  if (keyIsDown(UP_ARROW)) {
    y -= 8;
    if (y < 0) {
      y = -random(170)
    }
  }
  if (keyIsDown(DOWN_ARROW)) {
    y += 8;
    if (y > 500) {
      y = +random(170)
    }
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    if ((tela == 3)|| (tela ==4)) {
      tela = 0
      tela = 1
      vidas = 5
      pontos = 0
      nível = 1
      velocidadeC = 3
      velocidadeT = 1 
      mySound.setVolume(0.2);
      mySound.play();
      for (var i = 0; i < total; i++) {
    xC[i] = 500
    yC[i] = 350
  }
  for (var k = 0; i < totalc; i++) {
    ax[k] = 100
    by[k] = 300
  }
    }
    else{
      
      tela = 2
    }
  }   
}