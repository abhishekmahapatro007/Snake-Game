//game constants and variables
let inputDir={x: 0, y: 0};
const foodSound=new Audio('eatfood.mp3')
const gameOverSound=new Audio('gameover.mp3')
const moveSound=new Audio('turnsound.mp3')
const musicSound=new Audio('bgm.mp3')
let speed=4;
let score=0;
let lastPaintTime=0;
let snakeArr=[
    {x: 13,y: 15}
]
food={x: 6,y: 7}
//game functions
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000 < 1/speed){    //to cap the fps
          return;
    }
    lastPaintTime=ctime;
    gameEngine();
}
function isCollide(snake){
    //if u hit urself
    for(let i = 1;i < snakeArr.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    //if u hit the wall
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
            return true;
    }
}
function gameEngine(){
    musicSound.play();
    //part1:-updating the snake array and food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir={x: 0, y: 0};
        alert("Game Over!!Press Reload To Restart The Game!")
        snakeArr={x: 13,y: 15};
        score=0;
    }
   //if snake have eaten the food,increase the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score+=1;
        if(score>hiscoreval){
            hiscoreval=score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML="HIGH SCORE:"+hiscoreval;
        }
        scoreBox.innerHTML="Score:"+score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x,y: snakeArr[0].y + inputDir.y})    //unshift adds element in front
        let a=2;
        let b=16;
        food={x: Math.round(a + (b-a)*Math.random()),y: Math.round(a + (b-a)*Math.random())}    
        }

    //moving the snake
    for( let i = snakeArr.length-2; i >= 0; i--){
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    //part2:-render the snake and food
    board.innerHTML="";
    snakeArr.forEach((e, index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
        //display the food
        foodElement=document.createElement('div');
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
    
}

let hiscore=localStorage.getItem("hiscore");
if(hiscore===null){
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}
else{
    hiscoreval=JSON.parse(hiscore);
    hiscoreBox.innerHTML="HIGH SCORE:"+hiscore;
}
//main game logic
window.requestAnimationFrame(main);
window.addEventListener('keydown',e => {
     inputDir = {x: 0,y: 1}   //start the game
     moveSound.play();
     switch(e.key){
        case "ArrowUp":
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown":
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowRight":
            inputDir.x=1;
            inputDir.y=0;
            break;
        case "ArrowLeft":
            inputDir.x=-1;
            inputDir.y=0;
            break;
        default:
            break;
     }
});
