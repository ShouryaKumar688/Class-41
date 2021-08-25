class Game {
    constructor(){

    }
    getState(){
        var gameStateRef = database.ref("gameState");
        gameStateRef.on("value", function(data){
            gameState = data.val();
        })
    }
    Update(state){
        database.ref("/").update({
            gameState : state,
        });
    }
    Start(){
        if(gameState === 0){
            player = new Player();
            player.getCount();
            form = new Form();
            form.display();
        }
        car1 = createSprite(100,200);
        car1.addImage(cari1);
        car2 = createSprite(300,200);
        car2.addImage(cari2);
        car3 = createSprite(500,200);
        car3.addImage(cari3);
        car4 = createSprite(700,200); 
        car4.addImage(cari4);
        cars = [car1,car2,car3,car4];
        var x = database.ref('rank')
        
    }
    Play(){
        var camY = camera.y
        form.hide();
        textSize(30);
        // text("Game has Started", 120, 100);
        Player.getInfo();
        player.getRank();
        if(allPlayers !== undefined){
            background(ground);
            image(track, 0, -displayHeight*4, displayWidth, displayHeight*5);
            var index = 0;
            var xPos = 200;
            var yPos;
            var displayPos = 100;
            for (var plr in allPlayers) {
                if(plr === "Player" + player.index){
                    fill("red");
                }
                else fill("white");
                displayPos += 200;
                textSize(30);
                text(allPlayers[plr].name + ": " + allPlayers[plr].distance, displayPos, camY-200)}

            for (var plr in allPlayers) {
                index+=1;
                xPos+=200;
                yPos = displayHeight - allPlayers[plr].distance;
                cars[index-1].x = xPos;
                cars[index-1].y = yPos;
                //start of IF
                if(index === player.index){
                    fill(0,0,255);
                    ellipse(cars[index-1].x,cars[index-1].y,200)
                    camera.position.x = displayWidth/2;
                    camera.position.y = cars[index-1].y;
                }
            }    
        }
        if(keyDown("up")&&player.index !== null){
            player.distance += 50;
            player.update();
        }
        
        if(player.distance>=3860){
            gameState=2;
            player.rank+=1;
            Player.updateRank(player.rank);
        }
        drawSprites();
        if(player.distance===3870){
            gameState=3;
        }
        console.log(player.name + "'s rank is " + player.rank);
    }
    End(){
        console.log("GAME ENDED");
        if(gameState===2){
           player.distance = 3700
           alert("Your rank is " + player.rank);
        }
        gameState=3;
    }
}