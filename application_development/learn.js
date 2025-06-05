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
let score_value=0;
let Best_score=0;
let first_time_checker=false;


score=document.getElementById('score');
best_score=document.getElementById('best_score');
back_button=document.getElementById('back_button');

//back to main page button
back_button.addEventListener("click",() =>{
    window.location.href="./Run_ME.html";
});

//to make sure the hammer image is fully loaded into the screen
hammer.onload=() =>
{
    requestAnimationFrame(swing);
}


function swing(){
    //clear the canvas after every frame
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

    //below code makes sure that the strike button code runs only once. After that, it need not go there
    //cause the button click code will be stored in the meemory after run once and the browser will take 
    // the code from there instead of from inside the swing() function
    
    if (!first_time_checker){
        //reset button
        resetbutton=document.getElementById('reset_button');
        resetbutton.addEventListener("click",() =>{
            score.textContent=`Score : 0`;
            best_score.textContent=`Best Score : 0`;
            Best_score=0;
        });

        button_press=document.getElementById('stop');
        button_press.addEventListener("click",() =>{
            if (hammer_stop){
                cancelAnimationFrame(hammer_stop);
                score_value=Math.asin(angle_sin)*180/Math.PI;
                score_value=Math.round(((90-Math.abs(score_value))*100/90));
                score.textContent=`Score : ${score_value}`;
                if (score_value>Best_score){
                    Best_score=score_value;
                    best_score.textContent=`Best Score : ${Best_score}`;
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
}