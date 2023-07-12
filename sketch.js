var cat,catImage
var dog,dogImage
var water,waterImage
var milk,milkImage
var mouse,mouseImage
var gameState = "start"
var score = 0
var bg1,bg2,bg3,bg1Image,bg2Image,bg3Image
var mouseGroup,milkGroup
var obstacleGroup
var button,buttonImage
var restart,restartImg
//var highScore
 

function preload(){
  catImage = loadImage("cat.png")
  dogImage = loadImage("dog.png")
  waterImage = loadImage("water.png")
  mouseImage = loadImage("mouse.png")
  milkImage = loadImage("milk.png")
  bg1Image = loadImage("bg1.jpg")
  bg2Image = loadImage("bg2.jpg")
  bg3Image = loadImage("bg3.webp")
  buttonImage = loadImage("button.webp")
  restartImg = loadImage("restart.png")
  
  
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  bg1 = createSprite (width/2,height/2,50,50)
  bg2 = createSprite (width/2,height/2,50,50)
  bg3 = createSprite(width/2,height/2,50,50)
  edges = createEdgeSprites()
  cat = createSprite(100, 850, 50, 50);
  button = createSprite(width/2,height/2,50,50)
  restart = createSprite(width/2,height/2+350,50,50)
  
  cat.debug = false
  cat.setCollider("rectangle",0,0,100,100)
  cat.addImage(catImage)
  cat.scale = 0.6
  bg1.addImage(bg1Image)
  bg2.addImage(bg2Image)
  bg3.addImage(bg3Image)
  button.addImage(buttonImage)
  restart.addImage(restartImg)
  bg1.scale = 3
  bg2.scale = 11
  bg3.scale = 1
  button.scale = 0.2
  restart.scale=0.2
  cat.visible = false
  bg1.visible = false
  bg2.visible = false
  bg3.visible = false
  button.visible=true
  restart.visible = false
  obstacleGroup = new Group()
  //foodGroup = new Group()
  mouseGroup = new Group()
  milkGroup = new Group()

  
 
}

    function draw() {

      if (gameState == "start"){
        start()
        
      }
      
    
    if (gameState == "PLAY"){
      playGame()
      
      
  }
  if (gameState == "end"&& gameState != "PLAY"){
    endGame()
    

    
    
  
  } 

  
  drawSprites();
  
  if(gameState == "start"){
    fill("black")
    textSize(30)
    text("Life of a cat",width/2 - 70,200)
    
}
if(gameState == "start"){
  fill("black")
  text("Please adopt a cat",width/2 - 100,250)
  textSize(30)
}
if(gameState == "start"){
  fill("black")
  text("This game is designed as such to make you understand the way of a cat.",width/2-500,100)
  textSize(30)
}
    if (gameState == "PLAY"){
      fill("black")
      text("Score:"+ score,50,50)
      



    }
    //if (gameState == "PLAY"){
      //fill("black")
      //text("HighScore:"+ score,1700,50)
      
    
    
  //}
}


  
  
  
  

function controls(){
 
   if (keyDown(DOWN_ARROW)){
    cat.y += 5
    }
     if (keyDown(UP_ARROW)&& cat.y>=770){
      cat.y -= 5

       }

}
function obstacles(){
if (frameCount%100===0){
  water = createSprite(750, 800, 50, 50);
  dog = createSprite(500, 900, 50, 50);
  dog.addImage(dogImage)
  water.addImage(waterImage)
  dog.velocityX = -9
  water.velocityX = -9
  dog.scale = 0.4
  water.scale = 0.2
  dog.visible = true
  water.visible = true
  dog.debug = false
  dog.setCollider("rectangle",0,0,100,100) 
  water.debug = false
  water.setCollider("rectangle",0,0,100,100)
  dog.lifetime=1300
  water.lifetime=1300
  obstacleGroup.add(dog)
  obstacleGroup.add(water)
  cat.depth=water.depth+1
  cat.depth=dog.depth+1


}
}
function mouseCall(){
if (frameCount%100===0){
 mouse = createSprite(1000, 800, 50, 50);
  mouse.debug = false
  mouse.setCollider("rectangle",0,0,100,100) 
  mouse.addImage(mouseImage)
  mouse.scale = 0.2
  mouse.visible = true
  mouse.velocityX = -9
  mouse.lifetime=1300
  mouseGroup.add(mouse)
  cat.depth=mouse.depth+1
  
}
}


function milkCall(){
  if (frameCount%150===0){

  
   milk = createSprite(1190, 950, 50, 50);
   milk.debug = false
  milk.setCollider("rectangle",0,0,100,100)
  milk.addImage(milkImage)
  milk.scale = 0.4
  milk.lifetime=1300
  milk.velocityX = -9
  milk.visible = true
  milkGroup.add(milk)
  cat.depth=milk.depth+1
  }


}
function endGame(){
  if (mousePressedOver(restart)){
    gameState = "start"
    window.location.reload()
    //restart.visible = false
  }
  bg3.visible = true
  bg1.visible = false
  bg2.visible = false
  cat.destroy()
  obstacleGroup.destroyEach()
  mouseGroup.destroyEach()
  milkGroup.destroyEach()
  obstacleGroup.setLifetimeEach(-1)
  mouseGroup.setLifetimeEach(-1)
   milkGroup.setLifetimeEach(-1)
  obstacleGroup.setVelocityXEach(0)
  mouseGroup.setVelocityXEach(0)
  milkGroup.setVelocityXEach(0)
  bg1.velocityX = 0
  bg1.destroy()
  button.visible = false
  restart.visible = true
  
  
}
function playGame (){
  bg1.visible = true
    bg2.visible = false
    bg3.visible = false
    restart.visible = false
    cat.collide(edges)

   
    
     bg1.velocityX = -60
    if(bg1.x < 800){
      bg1.x = width/2}

      
    cat.visible = true
    obstacles()
    mouseCall()
    milkCall()
    
    
    if (cat.isTouching(obstacleGroup)){
     {cat.remove()
    gameState = "end"
    };
    

    }
    cat.overlap(mouseGroup, function(collector, collected){
      collected.remove()
      score +=10

    } )
    
      cat.overlap(milkGroup, function(collector, collected){
            collected.remove()
            score +=10

          } )
          //if (score>highScore){
            //highScore=score

          //}
         
            
          
          button.visible = false
                    controls()
            
            
      
      
     
    
   
   
        

       
        
      
      

    }

  function start(){
    bg2.visible = true
    bg1.visible = false
    bg3.visible = false
    if (mousePressedOver(button)){
      gameState = "PLAY"
      bg2.visible = false
    bg3.visible = false
      bg1.visible = true
    

    }
    restart.visible = false
    button.visible = true
    
    
  }
 
    
    
   
    



  