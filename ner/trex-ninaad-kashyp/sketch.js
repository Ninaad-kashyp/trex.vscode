var j;
var PLAY=1,END=0,SERVE=2;
var score
var obstaclesanimation,obstaclesGroup,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var cloudanimation,cloudsGroup
var trex, trex_running, trex_collided,trex12;
var ground, invisibleGround, groundImage;
var bird,birdanimation;
var gameOver,gameoveranimation,restart,restartanimation;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png")
  cloudanimation=loadImage("cloud.png")
  obstacle1=loadImage("obstacle1.png")
  obstacle2=loadImage("obstacle2.png")
  obstacle3=loadImage("obstacle3.png")
  obstacle4=loadImage("obstacle4.png")
  obstacle5=loadImage("obstacle5.png")
  obstacle6=loadImage("obstacle6.png")
  birdanimation=loadAnimation("fly1-removebg-preview.png","fly2-removebg-preview.png")
  gameoveranimation=loadImage("gameOver.png");
  restartanimation=loadImage("restart.png");
  trex12=loadImage("trex1.png")
}

function setup() {
  createCanvas(600, 200);
  gameState=SERVE;
  cloudsGroup=new Group()
  obstaclesGroup=new Group()
  birdsGroup=new Group()
  coinsGroup=new Group()
  
  trex = createSprite(34,180,20,50);
  trex.addAnimation(trex_running)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width/2;
 
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  gameOver = createSprite(300,90,40,10);
  gameOver.addImage(gameoveranimation);
  gameOver.scale=0.5;
  gameOver.visible=false;
  
  restart =createSprite(300,120,10,10);
  restart.addImage(restartanimation);
  restart.scale = 0.5;
  restart.visible=false;

  j=createSprite(300,100,600,200);
  j.visible=false;

  score=0
  level=0
  coins=0
}

function draw() {
  
  background("white");
  
  if (gameState===SERVE){
    trex.addImage("stop",trex12)
    textFont("monotypecorsivia")
    fill("blue")
    text("welcome",150,100);
    fill("green")
    text("to",200,100)
    fill("red")
    text("trex!",213,100);
    fill("yellow")
    text("tap",238,100);
    fill("blue")
    text("anywhere to ",260,100);
    fill("green")
    text("start tap anywhere to jump",325,100);
    if (mousePressedOver(j)) {
      gameState=PLAY
      
    }
    
  }

  if (gameState===PLAY){
    trex.addAnimation("t",trex_running);
     
    ground.velocityX = -(6 + 3*score/100);
  score=score+Math.round(getFrameRate()/60);

  textFont("georgia");
  textSize(12)
  text("score:"+score,500,50);
  text("levels:"+level,300,50);
  text("coins:"+coins,100,50);
  
  if (score%100===0) {
    level=level+1;
    
  }
  
  
  
  if(keyDown("space") && trex.y>=149) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
 
  
  spawnclouds();
  spawnobstacles();
  fly();
} else if (gameState===END) {
  
}

  trex.collide(invisibleGround);
  drawSprites();
  
}

function spawnclouds(){
  if (frameCount%60 === 0){
    var cloud=createSprite(600,320,40,10);
    
    cloud.addImage(cloudanimation);
    cloud.scale=0.5;
    cloud.velocityX=-3
    cloud.y=Math.round(random(80,120));
    cloud.lifetime=600;
    cloudsGroup.add(cloud);
    cloud.depth=trex.depth;
    trex.depth=trex.depth+1;
    }
}

function spawnobstacles(){
  
  if(frameCount%100=== 0){
    var obstacles=createSprite(650,165,10,40);
    obstacles.velocityX=-(6 + 3*score/100);
    var Rand=Math.round(random(1,6));
    switch(Rand){
      case 1:obstacles.addImage(obstacle1);
              break;
      case 2:obstacles.addImage(obstacle2);
              break;
      case 3:obstacles.addImage(obstacle3);
              break;
      case 4:obstacles.addImage(obstacle4);
              break;
      case 5:obstacles.addImage(obstacle5);
              break;
      case 6:obstacles.addImage(obstacle6);
              break;
      default:break;                 
    }
    obstacles.scale=0.5;
    obstacles.lifetime=600;
    obstaclesGroup.add(obstacles);
  }
}

function fly(){
 if (frameCount%90===0) {
   var bird=createSprite(700,100,20,20);
   bird.addAnimation("n",birdanimation);
   bird.scale=0.5;
   bird.velocityX=-3;
   var ra=Math.round(random(48,90));
   bird.Y=ra;
   bird.scale=0.5;
   bird.lifetime=600;
   birdsGroup.add(bird);
   
 }
}

function reset(){
  gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;

  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  flyGroup.destroyEach();
  coinGroup.destroyEach();
  trex.setAnimation(trex_running);
  count=0;
  level=0;
  coins=0;
  
}
