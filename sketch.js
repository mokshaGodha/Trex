var trex,trexRunning,ground,groundImage,invisibleGround,cloudImage,cloudGroup;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,obstacleGroup;
var count,trexCollided,PLAY,END,gamestate,gameOver,restart,gameoverImage,restartImage;
var dieSound,checkPointSound,jumpSound;

function preload(){  
  trexRunning=loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage=loadImage("ground2.png")
  cloudImage=loadImage("cloud.png")
  obstacle1=loadImage("obstacle1.png")
  obstacle2=loadImage("obstacle2.png")
  obstacle3=loadImage("obstacle3.png")
  obstacle4=loadImage("obstacle4.png")
  obstacle5=loadImage("obstacle5.png")
  obstacle6=loadImage("obstacle6.png")
  trexCollided=loadImage("trex_collided.png")
  gameoverImage=loadImage("gameOver.png")
  restartImage=loadImage("restart.png")
  dieSound=loadSound("die.mp3")
  checkPointSound=loadSound("checkPoint.mp3")
  jumpSound=loadSound("jump.mp3")
  
  
}
function setup() {
  gameOver = createSprite(300,100);
  gameOver.addImage("gameOver",gameoverImage)
  restart = createSprite(300,140);
  restart.addImage("restart",restartImage)
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  PLAY=1;
  END=0;
  gamestate=PLAY;
  count=0;
  obstacleGroup=new Group();
  createCanvas(600 ,200);
  trex=createSprite(200,180,50,20);
  trex.addAnimation("running",trexRunning);
  trex.scale=0.5;
  trex.addImage("trex_collided",trexCollided)
  
  ground=createSprite(200,180,400,20)
  ground.addImage("theGround",groundImage);
  ground.x=ground.width/2;
  ground.velocityX=-6;
  
  invisibleGround=createSprite(200,185,400,5)
  invisibleGround.visible=false; 
  
  cloudGroup= new Group();
}

function draw() {
  background(255);
  if(gamestate===PLAY){
    
    spawnObstacles();
    spawnClouds();
    
    if(trex.isTouching(obstacleGroup)){
      dieSound.play();
     gamestate=END;
  }
    count =count+ Math.round(frameRate()/30);
     
    if(keyDown("space") && trex.y >= 159){
      trex.velocityY = -12 ;
      jumpSound.play();

    }
    trex.velocityY = trex.velocityY + 0.8;
    
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if (count>0 && count%100 === 0){
     checkPointSound.play();
    }
  
  }else if(gamestate===END){
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("trex_collided");
    
    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    
              
  }
  if(mousePressedOver(restart)) {
    reset();
  }
  
  text("Score: "+ count, 500, 50);
  
  
  trex.collide(invisibleGround)
  drawSprites();
}
function spawnClouds() {
  
  if (frameCount % 60 === 0) {
    var cloud = createSprite(400,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage("cloudImage",cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudGroup.add(cloud);
  }
  
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(400,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
   case 1:
    obstacle.addImage("o1",obstacle1)
        break;
   case 2:
    obstacle.addImage("o2",obstacle2)
          break;
   case 3:
    obstacle.addImage("o3",obstacle3)
          break;
   case 4:
    obstacle.addImage("o4",obstacle4)
          break;
    case 5:
        obstacle.addImage("o5",obstacle5)
          break;
    case 6:
        obstacle.addImage("o6",obstacle6)
          break;
          default:
        break;
    }
    
    
    
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    
  obstacleGroup.add(obstacle)
  }
}
function reset(){
  gamestate = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  
  trex.changeAnimation("running");
  
  count = 0;
  
}






