var bg, bgImg;
var playerImg, player, playerShooting;
var zombieImg;
var zombieGroup;
var heart1, heart2, heart3;
var heart1Img;
var heart2Img;
var heart3Img;
var lives=3;
var bulletImg,bulletGroup;
var nz=0,nb=100;
var mZ=40;
var winSound;
var looseSound;

var gameState="shoot";

var shootSound,killSound;

var zombieDie;


function preload() {
  bgImg = loadImage("assets/bg5.jpg");
  playerImg = loadImage("assets/shooter_2.png");
  playerShooting = loadImage("assets/shooter_3.png");
  zombieImg = loadImage("assets/zombie.png");
  zombieDie = loadImage("assets/zombieDie.png");
  heart1Img = loadImage("assets/heart_1.png");
  heart2Img = loadImage("assets/heart_2.png");
  heart3Img = loadImage("assets/heart_3.png");
  bulletImg = loadImage ("assets/bullet.png");

  shootSound=loadSound("assets/explosion.mp3");
  killSound=loadSound("assets/lose.mp3");
  winSound=loadSound("assets/win.mp3");
  looseSound=loadSound("assets/lose.wav")
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  bg = createSprite(width / 2 , height / 2, width, height)
  bg.addImage(bgImg)
  bg.scale = 2.5  

  player = createSprite(150, height - 200, 50, 50)
  player.addImage(playerImg)
  player.scale = 0.5

  player.debug = true;
  player.setCollider("rectangle", 0, 0, 150, 300)
  heart1 = createSprite(width - 150, 40, 20, 20)
  heart1.visible = false
  heart1.addImage(heart1Img)
  heart1.scale = 0.4

  heart2 = createSprite(width - 100, 40, 20, 20)
  heart2.visible = false
  heart2.addImage(heart2Img)
  heart2.scale = 0.4

  heart3 = createSprite(width - 150, 40, 20, 20)
  heart3.addImage(heart3Img)
  heart3.scale = 0.4


  zombieGroup = new Group()
  bulletGroup  = new Group()



}

function draw() {
  background(0);

  console.log(player.height)
  if(gameState==="shoot"){

  if (keyDown(UP_ARROW)&&player.y>=player.height/2) {
    player.y = player.y - 30

  }

  if (keyDown(DOWN_ARROW)&&player.y<=height-player.height/2) {
    player.y = player.y + 30
  }

  if (keyDown(RIGHT_ARROW)&&player.x<=width/2-player.width/2) {
    player.x = player.x + 30
  }
  if (keyDown(LEFT_ARROW)&&player.x>=player.width/2) {
    player.x = player.x - 30
  }

  if (keyWentDown("space")) {
    showbullet()
    nb-=1;

    player.addImage(playerShooting)
  }
  else if (keyWentUp("space")) {

    player.addImage(playerImg);
    shootSound.play();

  }
   if (lives==3){
    heart3.visible=true;
    heart2.visible=false;
    heart1.visible=false;
   }

   if (lives==2){
    heart3.visible=false;
    heart2.visible=true;
    heart1.visible=false;
   }

   if (lives==1){
    heart3.visible=false;
    heart2.visible=false;
    heart1.visible=true;
   }

   if ((lives===0)||(nb<=0)){
    heart3.visible=false;
    heart2.visible=false;
    heart1.visible=false;
    gameState="end";
    looseSound.play();
   }
   if(mZ===0){
    heart3.visible=false;
    heart2.visible=false;
    heart1.visible=false;
    gameState="end";
    winSound.play();

   }
if (zombieGroup.isTouching(player)){
  for (var i=0;i<zombieGroup.length;i++ ){
   
      zombieGroup[i].destroy();
      player.x=100;
      player.y=height-100;
      lives-=1;
      killSound.play();
    
  }
}


if (zombieGroup.isTouching(bulletGroup)){
  for (var i=0;i<zombieGroup.length;i++ ){
    
      zombieGroup[i].addImage(zombieDie);
      zombieGroup[i].velocityX=0;
      zombieGroup[i].lifetime=20;
      bulletGroup.destroyEach()
      nz+=1;
      mZ-=1;
      
   
  }
}

  spawnZombie()
  drawSprites()


  stroke("white")
  strokeWeight(4)
  fill("red")
  textSize(25)
  text("Zombies Killed: "+nz,width-330,150)
  text("Bullet Left: "+nb,width-330,200)
  text("Zombie left to be Killed: "+mZ,width-330,250)
}
if(gameState==="end")  {
  stroke("white")
  strokeWeight(4)
  fill("red")
  textSize(50)
  if(mZ!=0){
  text("Game Over",width/2-100,height/2);
  }
  else{
    text("You have finished the mission Successfully!!!!!!",width/2-400,height/2);
  }
  text("Press r to Restart",width/2-150,height/2+100)
if(keyDown("r")){
  reset();
}
}


}

function spawnZombie() {
  if (frameCount % 60 === 0) {
    var zombie = createSprite(random(500, 1200), random(100, 600))
    zombie.addImage(zombieImg)
    zombie.lifetime = 500
    zombie.velocityX = -(3+Math.round(getFrameRate()/10))
    zombie.scale = 0.2
    zombie.debug = true
    zombie.setCollider("rectangle", 0, 0, 250, 550)
    zombieGroup.add(zombie)


  }

}

function showbullet () {
 var bullet=createSprite(150,height-200)
 bullet.x=player.x
 bullet.y=player.y 
 bullet.velocityX=20;
 //bullet.depth=player.depth-2;
 bullet.scale=0.2
 bullet.addImage(bulletImg);
 bullet.lifetime=800;
 bulletGroup.add(bullet);
 
}

function reset(){
  gameState="shoot";
  nb=100;
  lives=3;
  nz=0;
  zombieGroup.destroyEach();
  bulletGroup.destroyEach();
  player.x=100;
  player.y=height-100;
}
