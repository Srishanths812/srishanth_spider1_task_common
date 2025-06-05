const canvas=document.getElementById('board');
const c=canvas.getContext('2d');
canvas.width=400;
canvas.height=400;

//for hammer
const hammer= new Image();
hammer.src="hammer_2.png";


let angle=-Math.PI/2;
let angle_sin=Math.sin(angle);
let hammer_stop=null;
let p1score_value=0;
let p2score_value=0;
let tries=5;
let first_time_checker=false;
let flag=0;


whichplayer=document.getElementById('whichplayer');
score=document.getElementById('score');
player1score=document.getElementById('player1score');
player2score=document.getElementById('player2score');
trycount=document.getElementById('tries');
back_button=document.getElementById('back_button');

//back to main page button
back_button.addEventListener("click",() =>{
    window.location.href="./Run_ME.html";
});


hammer.onload=() =>
{
    requestAnimationFrame(swing);
}


function swing(){
    if (flag%2==0){
        whichplayer.textContent="Player 1";
        whichplayer.style.color='red';
    }
    else if (flag%2==1){
        whichplayer.textContent="Player 2";
        whichplayer.style.color='blue';
    }
    //clears the canvas after every frame
    c.clearRect(0,0,canvas.width,canvas.height);
    c.save();

    const hammer_width=hammer.width*0.35;
    const hammer_height=hammer.height*0.35; 
    const pivotX=canvas.width/2-5;
    const pivotY=canvas.height/2+65;
    c.translate(pivotX,pivotY);

    //Below line ensures that speed at edges is slow and at the centre it is fast
    angle_sin=Math.sin((Math.PI/2)*Math.sin(angle));
    c.rotate(Math.asin(angle_sin));
    c.drawImage(hammer,-hammer_width/2,-hammer_height,hammer_width,hammer_height);
    angle+=0.05;

    c.restore();
    hammer_stop=requestAnimationFrame(swing);

    //below code makes sure that the below code runs only once. After that, it need not go there
    //cause the button click code will be stored in the meemory after run once and the browser will take 
    // the code from there instead of from inside the swing() function

    if (!first_time_checker){
        //reset button
        resetbutton=document.getElementById('reset_button');
        resetbutton.addEventListener("click",() =>{
            player1score.textContent="Player 1 Score : 0";
            player2score.textContent="Player 2 Score : 0";
            trycount.textContent="Tries Left : 5";
            score.textContent=`Score : 0`;
            score.style.display = 'inline-block';
            score.style.marginLeft = '30px';
            flag=0
            whichplayer.textContent="Player 1";
            tries=5;
        });
        button_press=document.getElementById('stop');
        button_press.addEventListener("click",() =>{
            if (hammer_stop){
                cancelAnimationFrame(hammer_stop);
                score_value=Math.asin(angle_sin)*180/Math.PI;
                score_value=Math.round(((90-Math.abs(score_value))*100/90));
                score.textContent=`Score : ${score_value}`;
                score.style.display = 'inline-block';
                score.style.marginLeft = '30px';
                if (flag%2==0){         //for player 1
                    p1score_value+=score_value;
                    player1score.textContent=`Player 1 Score : ${p1score_value}`;
                    flag+=1;
                }
                else if (flag%2==1){    //for player 2
                    p2score_value+=score_value;
                    player2score.textContent=`Player 2 Score : ${p2score_value}`;
                    tries-=1;
                    trycount.textContent=`Tries Left : ${tries}`;
                    flag+=1;
                }
                hammer_stop=null;
                button_press.textContent='Continue';
            }
            else{
                hammer_stop=requestAnimationFrame(swing);
                button_press.textContent="Strike";
            }
        });
        first_time_checker=true;
    }
    if (tries==0){
        if (p2score_value>p1score_value){
            alert("Player 2 Wins !!!");
        }
        else if (p1score_value>p2score_value){
            alert("Player 1 Wins !!!");
        }
        else{
            alert("It's a Tie !!!");
        }
        flag=0;
        tries=5;
        p1score_value=0;
        p2score_value=0;
        trycount.textContent=`Tries Left : ${tries}`;
        score.textContent=`Score : 0`;
        player1score.textContent=`Player 1 Score : ${p1score_value}`;
        player2score.textContent=`Player 2 Score : ${p2score_value}`;
    }    
}
