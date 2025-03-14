let xBolinha = 323;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;

let xMeio = 323;
let yMeios = 200;
let meioDiametro = 30;

let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

let raqueteComprimento2 = 10;
let raqueteAltura2 = 90;
let xRaqueteOponente = 640;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false;

let meusPontos = 0;
let pontosDoOponente = 0;

let raquetada;
let ponto;
let trilha;

let chanceDeErrar;

function setup() {
  createCanvas(656, 400);
  trilha.loop();
}

function draw() {
  background(90,200,55);
  meioDeCampo();
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete2(xRaqueteOponente, yRaqueteOponente);
  movimentaMinhaRaquete();
  //verificaColisaoRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  incluiPlacar();
  marcaPonto();
  
  line(328,10,328,390);
  line(10,10,10,390);
  line(645,10,645,390);
  line(10,10,645,10);
  line(10,390,645,390)
  stroke(0)
}
function meioDeCampo() {
  stroke(255);
  fill(90,200,55);
  ellipse(328,195,100,100);
  fill(255)
}
function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x,y) {
  stroke(0,0,0);
  rect(x, y, raqueteComprimento, raqueteAltura);
}
function mostraRaquete2(x,y) {
  rect(x, y, raqueteComprimento2, raqueteAltura2);
  fill(255);
}

function movimentaMinhaRaquete() {
  if(keyIsDown(87)) {
    yRaquete -= 10;
  }
  if(keyIsDown(83)) {
    yRaquete += 10;
  }
}

function verificaColisaoRaquete() {
  if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function verificaColisaoRaquete(x,y) {
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if(colidiu) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente() {
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
}

function movimentaRaqueteOponente(){
    if (keyIsDown(UP_ARROW)){
        yRaqueteOponente -= 10;
    }
    if (keyIsDown(DOWN_ARROW)){
        yRaqueteOponente += 10;
    }
}

function incluiPlacar() {
  fill(255);
  text(meusPontos, 278, 26);
  text(pontosDoOponente, 321, 26);
}

function marcaPonto() {
  if (xBolinha > 641) {
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 6) {
    pontosDoOponente += 1;
    ponto.play();
  }
}
function incluiPlacar(){
    stroke(255);
    textAlign(CENTER);
    textSize(16);
    fill(color(0,140,0))
    rect(130, 15, 40, 20);
    fill(255);
    text(meusPontos, 150, 30);
    fill(color(0, 140, 0));
    rect(475, 15, 40, 20);
    fill(255);
    text(pontosDoOponente, 495, 30);
}

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

