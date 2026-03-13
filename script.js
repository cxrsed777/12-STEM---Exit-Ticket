const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
const wrapper = document.getElementById("wrapper");
const ticket = document.getElementById("ticket");
const ticket2 = document.getElementById("ticket2");
const button = document.getElementById("enterBtn");
const caption = document.getElementById("caption");
const title = document.getElementById("exitTitle");

/* PARTICLES */

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for(let i=0;i<120;i++){

particles.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
vx:(Math.random()-0.5)*0.4,
vy:(Math.random()-0.5)*0.4,
size:Math.random()*2+0.5
});

}

function animateParticles(){

ctx.clearRect(0,0,canvas.width,canvas.height);

particles.forEach(p=>{

p.x+=p.vx;
p.y+=p.vy;

if(p.x<0||p.x>canvas.width)p.vx*=-1;
if(p.y<0||p.y>canvas.height)p.vy*=-1;

ctx.beginPath();
ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
ctx.fillStyle="rgba(255,255,255,0.6)";
ctx.fill();

});

requestAnimationFrame(animateParticles);
}

animateParticles();


/* CLICK COMMANDS */

let stage = 0;

const gravity = document.querySelector(".gravity-field");
wrapper,ticket,ticket2.addEventListener("click", async () => {


if(stage === 0){

wrapper.classList.add("stopfloatSpin");
ticket.classList.add("focus");
ticket2.classList.add("focus");

gravity.classList.add("active");

await deleteText();
await typeText("Click to scan the ticket.");

stage = 1;

}

else if(stage === 1){

wrapper.classList.add("ripped");

await deleteText();
await typeText("Click to proceed.");

stage = 2;

}

else if(stage === 2){

wrapper.classList.add("closed");

await deleteText();

caption.style.display="none";
title.classList.add("show");
button.classList.add("show");

stage = 3;

}
});


/* TYPE COMMANDS */

function typeText(text,speed=40){
return new Promise(resolve=>{

caption.textContent="";
let i=0;

function type(){
if(i<text.length){
caption.textContent+=text.charAt(i);
i++;
setTimeout(type,speed);
}
else resolve();
}

type();

});
}

function deleteText(speed=25){
return new Promise(resolve=>{

let text=caption.textContent;

function erase(){
if(text.length>0){
text=text.slice(0,-1);
caption.textContent=text;
setTimeout(erase,speed);
}
else resolve();
}

erase();

});
}



function openCard(title,text){

document.getElementById("popup").style.display="flex";

document.getElementById("popupTitle").innerText = title;

document.getElementById("popupText").innerText = text;

}

function closePopup(){

document.getElementById("popup").style.display="none";

}

