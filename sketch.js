var PLAY = 1;
var END = 0;
var gameState = PLAY;

var dog,dog_Img;

var boneImg,boneGroup;

var stoneImg,grassImg,grassGroup, stoneGroup;

var Score ;

var gameOver, gameOverImg;

var ground,invisibleGround;

var score = 0;

var restart,restartImg;

localStorage["HighestScore"] = 0;

function preload()
{
	dog_Img = loadImage("running.png");
	boneImg = loadImage("BONE-removebg-preview.png");
	stoneImg = loadImage("STONE-removebg-preview.png")
	restartImg = loadImage("restart.png");
	gameOverImg = loadImage("gameOver.png");
	grassImg = loadImage("Grass-removebg-preview.png");
	
}

function setup() {
	createCanvas(1500,500);

	dog = createSprite(300,500,20,20);
	dog.addImage(dog_Img);
	dog.scale = 0.2;
	dog.setCollider("rectangle", 0, 0, dog.width,dog.height);
    dog.debug = false;

	ground = createSprite(750,490,1500,20);
	ground.x = ground.width /2;
	ground.shapeColor = "brown";

	invisibleGround = createSprite(750,500,1500,20);
	invisibleGround.x = invisibleGround.width/2;
	invisibleGround.visible = false;

	gameOver = createSprite(750,250);
	gameOver.addImage(gameOverImg);
	gameOver.visible = false;

	stoneGroup = new Group();
	boneGroup = new Group();
	grassGroup = new Group();

	Score = 0;

}


function draw() {

background("gainsboro");
 
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && dog.y >= 159) {
      dog.velocityY = -12;
    }
  
    dog.velocityY = dog.velocityY + 0.8

    
  if (ground.x < 1450){
	ground.x = ground.width/2;
  }

  if (invisibleGround.x < 1450){
	 invisibleGround.x = invisibleGround.width/2;

	 if(boneGroup.isTouching(dog)){
		Score = Score + 10;
	    boneGroup.destroyEach();
		 
	 }

	 if(score===500){
		 textSize(40);
		 fill("black");
		 text("Good",750,150);
	 }
	 else if(score === 1500){
		textSize(40);
		fill("black");
		text("Keep it up",750,150)
	 }
	 else if (score===2000){
		 textSize(40);
		 fill("black");
		 text("Awesome",750,150)
	 }
	 else if (score===2500){
		textSize(40);
		fill("black");
		text("Superb",750,150)
	 }
	 else if (score === 4000){
		textSize(40);
		fill("black");
		text("100+points",750,150);
		Score = Score + 100;
	 }

  }

  if(stoneGroup.isTouching(dog)||grassGroup.isTouching(dog)){
	gameOver.visible = true;
	gameState = END;

  ground.velocityX = 0;
  invisibleGround.velocityX = 0;
  dog.velocityX = 0;

stoneGroup.setVelocityXEach(0);
boneGroup.setVelocityXEach(0);
grassGroup.setVelocityXEach(0);


stoneGroup.setLifetimeEach(-1);
boneGroup.setLifetimeEach(-1);
grassGroup.setLifetimeEach(-1);

}
   
  dog.collide(invisibleGround);
  spawnStone();
  spawnBones();
  spawnGrass();

 }
 fill("black")
textSize(30)
text("Distance: "+ score, 50,50);

fill("black")
textSize(30)
text("Score: "+ Score, 1300,50);

drawSprites();

}

  
  function spawnStone(){
   if (frameCount % 180 === 0){
	 var stone = createSprite(1450,445,70,70);
		 stone.addImage(stoneImg);
		 stone.scale = 0.4;
		 stone.velocityX = -(6+score/100)
		 stone.lifetime = 450;
	 
	  stoneGroup.add(stone);
   }
  }
  

  function spawnGrass(){
	if (frameCount % 130 === 0){
		var grass = createSprite(1450,440,70,70);
			grass.addImage(grassImg);
			grass.scale = 0.5;
			grass.velocityX = -(6+score/100)
			grass.lifetime = 450;
		
		 grassGroup.add(grass);
	  }
  }
  

  function spawnBones() {
  
	if (frameCount % 100 === 0) {
	  var bone = createSprite(1500,180,20,20);
	  bone.addImage(boneImg);
	  bone.scale = 0.3;
	  bone.velocityX = -(6+score/100);
      bone.lifetime = 450;
	
	  boneGroup.add(bone);
	}
  }
  
  
  