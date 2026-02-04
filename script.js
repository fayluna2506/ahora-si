document.addEventListener("DOMContentLoaded", function(){

// ===== PREGUNTAS =====
const QUESTIONS = [
  {
    title: "mi tuly bb 💖",
    subtitle: "Tengo algo para preguntarte…",
    q: "¿Querés pasar San Valentín conmigo? 💘"
  },
  {
    title: "daleeee amorrrrrrrr 💖",
    subtitle: "Fijate bien ee.... 😌",
    q: "¿Estás segura de lo que estás eligiendo? 💖"
  },
  {
    title: "💖",
    subtitle: "Yo creo qye ya me sé la respuesta 😏",
    q: "Yo sé que no me podés decir que no… dale tulipán 💕"
  }
];

const PHOTOS = [
  "imagen/foto1.jpg",
  "imagen/foto2.jpg",
  "imagen/foto3.jpg",
  "imagen/foto4.jpg",
  "imagen/foto5.jpg"
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

const photoField = document.getElementById("photoField");
const heartsWrap = document.getElementById("hearts");

let idx = 0;


// ===== FUNCIONES =====

function shuffle(arr){
  return arr.sort(()=>Math.random()-0.5);
}

function render(){
  const cur = QUESTIONS[idx];
  titleEl.textContent = cur.title;
  subtitleEl.textContent = cur.subtitle;
  qTextEl.textContent = cur.q;
  qStepEl.textContent = `Pregunta ${idx+1} de ${QUESTIONS.length}`;

  btnYes.style.transform = `scale(${1 + idx*0.2})`;
}


// ===== BOTON SI =====
btnYes.addEventListener("click", ()=>{
  spawnHearts(8);

  idx++;

  if(idx >= QUESTIONS.length){
    finalOverlay.style.display="grid";

    const randomPhoto = PHOTOS[Math.floor(Math.random()*PHOTOS.length)];
    finalImg.src = randomPhoto;

  } else {
    render();
  }
});


// ===== BOTON NO =====
btnNo.addEventListener("mouseover", moveNo);
btnNo.addEventListener("click", moveNo);

function moveNo(){
  const x = Math.random()*window.innerWidth;
  const y = Math.random()*window.innerHeight;

  btnNo.style.position="fixed";
  btnNo.style.left=x+"px";
  btnNo.style.top=y+"px";
}


// ===== FOTOS DISPERSAS =====
function buildPolaroids(){

  if(!photoField) return;

  const fotos = shuffle([...PHOTOS]);

  const posiciones = [
    ["5vw","10vh"],
    ["70vw","15vh"],
    ["8vw","70vh"],
    ["75vw","65vh"],
    ["40vw","5vh"]
  ];

  for(let i=0;i<5;i++){

    const fig = document.createElement("figure");
    fig.className="polaroid";

    fig.style.left = posiciones[i][0];
    fig.style.top = posiciones[i][1];
    fig.style.setProperty("--rot",`${-15+Math.random()*30}deg`);

    const img = document.createElement("img");
    img.src=fotos[i];

    fig.appendChild(img);
    photoField.appendChild(fig);
  }
}


// ===== CORAZONES =====
function createHeart(){
  const h=document.createElement("div");
  h.className="heart";

  h.style.left=Math.random()*100+"vw";
  h.style.top=(100+Math.random()*30)+"vh";
  h.style.animationDuration=(6+Math.random()*10)+"s";

  heartsWrap.appendChild(h);

  setTimeout(()=>h.remove(),10000);
}

function spawnHearts(n){
  for(let i=0;i<n;i++){
    createHeart();
  }
}

function startHearts(){
  for(let i=0;i<12;i++){
    createHeart();
  }
}


// ===== INICIO =====
buildPolaroids();
startHearts();
render();

});
