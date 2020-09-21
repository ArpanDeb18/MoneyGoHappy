var PLAY = 1;
var END = 0;
var monkey, monkey_running;
var bananaImage, obstacleImage;
var FoodGroup, ObstacleGroup;
var score = 0;
var survivalTime = 0;
var gameState = PLAY;

var invisibleGround, ground;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {

  createCanvas(400, 400);

  monkey = createSprite(50, 325, 10, 10);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;



  /*invisibleGround = createSprite(200,404,400,10);
  invisibleGround.visible = false;*/

  ground = createSprite(200, 325, 800, 20);
  ground.x = ground.width / 2;
  //ground.visible = false;

  ObstacleGroup = createGroup();
  FoodGroup = createGroup();
  
  //monkey.debug = true;
}


function draw() { 

  background("lightGreen");
  
  fill("black");
  textSize(15);
  text("Bananas Eaten : " + score, 20, 50);
  



  if (gameState === PLAY) {

    ground.velocityX = -(4);

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if (keyDown("space") && monkey.y >= 250) {
      monkey.velocityY = -12;
    }

    monkey.velocityY = monkey.velocityY + 0.8;

    monkey.collide(ground);
    
    spawnObstacle();
    spawnBanana();
    
    if(FoodGroup.isTouching(monkey)){
      score = score + 1;
      FoodGroup.destroyEach();
    }
    
    if(ObstacleGroup.isTouching(monkey)){
      gameState = END;
    }
    
    
  fill("black");
  textSize(15);
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time : " + survivalTime, 250, 50);
  
} else if (gameState === END){
    ground.velocityX = 0;
    FoodGroup.destroyEach();
    ObstacleGroup.destroyEach();
    monkey.destroy();
    fill("red");
    stroke(5);
    textSize(60);
    text("GAME OVER", 20, 200);
        
  }

    drawSprites();

  }

  function spawnObstacle() {


    if (frameCount % 300 === 0) {
      var obstacle = createSprite(400, 287.5, 10, 10);
      obstacle.addImage("obsImg", obstacleImage);
      obstacle.scale = 0.15;
      obstacle.lifetime = 200;
      //obstacle.collide(ground);
      obstacle.velocityX = -5;
      
      /*obstacle.depth = monkey.depth;
      monkey.depth = monkey.depth + 1;*/
      
      ObstacleGroup.add(obstacle);

    }

  }

function spawnBanana() {
  
  if(frameCount % 120 === 0) {  
     var banana = createSprite(400, 200, 10, 10);
    banana.addImage("bananaImg", bananaImage);
    banana.scale = 0.085;
    banana.lifetime = 200;
    banana.velocityX = -(3 + score/100);
    
    banana.y = Math.round(random(125, 225));
    
    
    
    FoodGroup.add(banana);
  }
  
  
}