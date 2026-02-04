document.addEventListener("DOMContentLoaded",()=>{

const QUESTIONS=[
"¿Querés tener una cita y pasar San Valentín conmigo? 💘",
"¿Estás segura de lo que estás eligiendo? 💖",
"Yo sé que no me podés decir que no… dale tulipán 💕"
];

const PHOTOS=[
"img/foto1.jpg",
"img/foto2.jpg",
"img/foto3.jpg",
"img/foto4.jpg",
"img/foto5.jpg"
];

let index=0;

const qText=document.getElementById("qText");
const qStep=document.getElementById("qStep");
const btnYes=document.getElementById("btnYes");
const btnNo=document.getElementById("btnNo");
const finalOverlay=document.getElementById("finalOverlay");
const finalImg=document.getElementById("finalImg");
const closeFinal=document.getElementById("closeFinal");
const photoField=document.getElementById("photoField");
const hearts=document.getElementById("hearts");

function render(){
qText.textContent=QUESTIONS[index];
qStep.textContent=`Pregunta ${index+1} de ${QUESTIONS.length}`;
}

btnYes.onclick=()=>{
spawnHearts(10);
index++;

if(index>=QUESTIONS.length){
finalOverlay.style.display="grid";
finalImg.src=PHOTOS[Math.floor(Math.random()*PHOTOS.length)];
}else{
render();
}
};

btnNo.onmouseover=()=>{
btnNo.style.position="fixed";
btnNo.style.left=Math.random()*window.innerWidth+"px";
btnNo.style.top=Math.random()*window.innerHeight+"px";
};

function buildPhotos(){
const pos=[
["5vw","10vh"],
["70vw","15vh"],
["8vw","70vh"],
["75vw","65vh"],
["40vw","5vh"]
];

PHOTOS.sort(()=>Math.random()-0.5);

for(let i=0;i<5;i++){
let fig=document.createElement("figure");
fig.className="polaroid";
fig.style.left=pos[i][0];
fig.style.top=pos[i][1];
fig.style.setProperty("--rot",`${-15+Math.random()*30}deg`);

let img=document.createElement("img");
img.src=PHOTOS[i];

fig.appendChild(img);
photoField.appendChild(fig);
}
}

function createHeart(){
let h=document.createElement("div");
h.className="heart";
h.style.left=Math.random()*100+"vw";
h.style.top=(100+Math.random()*30)+"vh";
h.style.animationDuration=(6+Math.random()*10)+"s";
hearts.appendChild(h);
setTimeout(()=>h.remove(),10000);
}

function spawnHearts(n){
for(let i=0;i<n;i++)createHeart();
}

buildPhotos();
spawnHearts(12);
render();

closeFinal.onclick=()=>{
finalOverlay.style.display="none";
};

});