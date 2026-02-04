document.addEventListener("DOMContentLoaded", function(){

// ===== PREGUNTAS =====
const QUESTIONS = [
  {
    title: "mi tuly bb 💖",
    subtitle: "Tengo algo para preguntarte…",
    q: "¿Querés pasar San Valentín conmigo? 💘"
  },
  {
    title: "mi tuly bb 💖",
    subtitle: "Pensalo bien 😌",
    q: "¿Estás segura de lo que estás eligiendo? 💖"
  },
  {
    title: "mi tuly bb 💖",
    subtitle: "Ya sé la respuesta 😏",
    q: "Yo sé que no me podés decir que no… dale tulipán 💕"
  }
];

const PHOTOS = [
  "img/foto1.jpg",
  "img/foto2.jpg",
  "img/foto3.jpg",
  "img/foto4.jpg",
  "img/foto5.jpg"
];

// ===== ELEMENTOS =====
const titleEl = document.getElementById("title");
const subtitleEl = document.getElementById("subtitle");
const qTextEl = document.getElementById("qText");
const qStepEl = document.getElementById("qStep");

const btnYes = document.getElementById("btnYes");
const btnNo = document.getElementById("btnNo");

const finalOverlay = document.getElementById("finalOverlay");
const finalImg = document.getElementById("finalImg");

let idx = 0;

function render(){
  const cur = QUESTIONS[idx];
  titleEl.textContent = cur.title;
  subtitleEl.textContent = cur.subtitle;
  qTextEl.textContent = cur.q;
  qStepEl.textContent = `Pregunta ${idx+1} de ${QUESTIONS.length}`;
}

btnYes.addEventListener("click", ()=>{
  idx++;

  if(idx >= QUESTIONS.length){
    finalOverlay.style.display="grid";

    // foto final al azar
    const randomPhoto = PHOTOS[Math.floor(Math.random()*PHOTOS.length)];
    finalImg.src = randomPhoto;

  } else {
    render();
  }
});

btnNo.addEventListener("mouseover", ()=>{
  const x = Math.random()*window.innerWidth;
  const y = Math.random()*window.innerHeight;

  btnNo.style.position="fixed";
  btnNo.style.left=x+"px";
  btnNo.style.top=y+"px";
});

render();

});
