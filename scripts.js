// ====== PREGUNTAS ======
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

const FINAL_TEXT = "Ves que nunca me podes decir que no, gracias por todo te amo con mi vida entera prometo hacerte feliz siempre...❤️ ";

// ====== FOTOS DISPONIBLES (NO CAMBIES LOS NOMBRES) ======
const PHOTOS = [
  "img/foto1.jpg",
  "img/foto2.jpg",
  "img/foto3.jpg",
  "img/foto4.jpg",
  "img/foto5.jpg"
];

// ====== UTIL ======
function shuffle(arr){
  const a = arr.slice();
  for(let i=a.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function clamp(n, min, max){ return Math.max(min, Math.min(max, n)); }

// ====== ELEMENTOS ======
const titleEl = document.getElementById("title");
const subtitleEl = document.getElementById("subtitle");
const qTextEl = document.getElementById("qText");
const qStepEl = document.getElementById("qStep");

const btnYes = document.getElementById("btnYes");
const btnNo  = document.getElementById("btnNo");

const finalOverlay = document.getElementById("finalOverlay");
const finalTextEl = document.getElementById("finalText");
const finalImgEl = document.getElementById("finalImg");
const closeFinal = document.getElementById("closeFinal");

const toast = document.getElementById("toast");
const photoField = document.getElementById("photoField");

let idx = 0;

// ====== TOAST ======
function showToast(msg){
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove("show"), 1200);
}

// ====== RENDER ======
function render() {
  const cur = QUESTIONS[idx];
  titleEl.textContent = cur.title;
  subtitleEl.textContent = cur.subtitle;
  qTextEl.textContent = cur.q;
  qStepEl.textContent = `Pregunta ${idx + 1} de ${QUESTIONS.length}`;

  // Sí crece cada pregunta
  btnYes.style.transform = `scale(${1 + idx * 0.18})`;
}

// ====== NO NO FUNCIONA + SE ESCAPA ======
btnNo.addEventListener("mouseenter", moveNo);
btnNo.addEventListener("mousedown", moveNo);
btnNo.addEventListener("click", () => {
  showToast("No no sirve 😌 Tu única opción es Sí 💘");
  moveNo();
});

function moveNo() {
  const pad = 12;
  const bw = btnNo.offsetWidth || 120;
  const bh = btnNo.offsetHeight || 50;

  const x = pad + Math.random() * (window.innerWidth - bw - pad*2);
  const y = pad + Math.random() * (window.innerHeight - bh - pad*2);

  btnNo.style.position = "fixed";
  btnNo.style.left = x + "px";
  btnNo.style.top  = y + "px";

  btnNo.animate(
    [{ transform:"translateX(0)" }, { transform:"translateX(-6px)" }, { transform:"translateX(6px)" }, { transform:"translateX(0)" }],
    { duration: 200, iterations: 1 }
  );
}

// ====== SÍ AVANZA + MÁS CORAZONES ======
btnYes.addEventListener("click", () => {
  spawnHeartsBurst(10);

  idx++;
  if (idx >= QUESTIONS.length) openFinal();
  else render();
});

// ====== FOTOS DISPERSAS AL AZAR ======
function buildRandomPolaroids(){
  photoField.innerHTML = "";

  const picks = shuffle(PHOTOS); // al azar, sin orden
  const isMobile = window.matchMedia("(max-width: 820px)").matches;

  // posiciones aleatorias (evitar el centro para no tapar el cartel)
  const zones = [
    { xMin: 2,  xMax: 26, yMin: 6,  yMax: 28 }, // arriba-izq
    { xMin: 74, xMax: 98, yMin: 8,  yMax: 30 }, // arriba-der
    { xMin: 2,  xMax: 28, yMin: 68, yMax: 92 }, // abajo-izq
    { xMin: 72, xMax: 98, yMin: 66, yMax: 92 }, // abajo-der
    { xMin: 36, xMax: 64, yMin: 2,  yMax: 18 }  // arriba-centro
  ];

  for(let i=0;i<5;i++){
    const fig = document.createElement("figure");
    fig.className = "polaroid";
    fig.style.setProperty("--rot", `${-14 + Math.random()*28}deg`);

    const z = zones[i] || zones[zones.length-1];

    // en mobile achicamos y dejamos más aire
    const x = (isMobile ? clamp(z.xMin + Math.random()*(z.xMax-z.xMin), 4, 96) : z.xMin + Math.random()*(z.xMax-z.xMin));
    const y = (isMobile ? clamp(z.yMin + Math.random()*(z.yMax-z.yMin), 4, 94) : z.yMin + Math.random()*(z.yMax-z.yMin));

    fig.style.left = x + "vw";
    fig.style.top  = y + "vh";

    const img = document.createElement("img");
    img.src = picks[i];
    img.alt = `foto ${i+1}`;
    img.loading = "lazy";
    img.decoding = "async";

    fig.appendChild(img);
    photoField.appendChild(fig);
  }
}

// ====== FINAL (foto final al azar) ======
function openFinal() {
  finalTextEl.textContent = FINAL_TEXT;

  const finalPick = PHOTOS[Math.floor(Math.random() * PHOTOS.length)];
  finalImgEl.src = finalPick;

  finalOverlay.style.display = "grid";
  finalOverlay.setAttribute("aria-hidden","false");

  runConfetti(1500);
  spawnHeartsBurst(18);
}

function closeFinalFn(){
  finalOverlay.style.display = "none";
  finalOverlay.setAttribute("aria-hidden","true");
}

closeFinal.addEventListener("click", closeFinalFn);
finalOverlay.addEventListener("click", (e)=>{ if(e.target === finalOverlay) closeFinalFn(); });

// ====== CORAZONES (SIEMPRE + BURST) ======
const heartsWrap = document.getElementById("hearts");
const HEARTS = 14; // si se traba en celu bajalo a 10

function makeHeart(xVw=null, startYvh=null, duration=null){
  const h = document.createElement("div");
  h.className = "heart";

  const x = (xVw!==null) ? xVw : (Math.random()*100);
  const y = (startYvh!==null) ? startYvh : (100 + Math.random()*30);

  h.style.left = x + "vw";
  h.style.top  = y + "vh";
  h.style.animationDuration = (duration!==null ? duration : (6 + Math.random()*10)) + "s";
  h.style.animationDelay = (-Math.random()*10) + "s";

  const s = (0.7 + Math.random()*1.4);
  h.style.transform = `rotate(45deg) scale(${s})`;

  heartsWrap.appendChild(h);

  setTimeout(()=>{ if(h.parentNode) h.parentNode.removeChild(h); }, 12000);
}

function startHearts(){
  for(let i=0;i<HEARTS;i++) makeHeart();
}

function spawnHeartsBurst(n=10){
  for(let i=0;i<n;i++){
    makeHeart(
      50 + (-12 + Math.random()*24),
      95 + Math.random()*8,
      4 + Math.random()*5
    );
  }
}

// ====== CONFETTI ======
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
let pieces = [];
let timer = null;

function resizeCanvas(){
  canvas.width = window.innerWidth * devicePixelRatio;
  canvas.height = window.innerHeight * devicePixelRatio;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
}
window.addEventListener("resize", () => {
  resizeCanvas();
  buildRandomPolaroids(); // reacomoda en resize
});
resizeCanvas();

function makePiece(){
  return {
    x: Math.random()*window.innerWidth,
    y: -10,
    vx: -2 + Math.random()*4,
    vy:  2 + Math.random()*5,
    r: 3 + Math.random()*5,
    rot: Math.random()*Math.PI,
    vr: -0.2 + Math.random()*0.4,
    c: `hsl(${Math.floor(Math.random()*360)}, 90%, 60%)`,
    a: 1
  };
}

function draw(){
  ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
  for(const p of pieces){
    ctx.save();
    ctx.globalAlpha = p.a;
    ctx.translate(p.x,p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = p.c;
    ctx.fillRect(-p.r,-p.r,p.r*2,p.r*2);
    ctx.restore();
    p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.a -= 0.006;
  }
  pieces = pieces.filter(p => p.a>0 && p.y < window.innerHeight + 40);
  if(pieces.length) requestAnimationFrame(draw);
  else canvas.style.display = "none";
}

function runConfetti(ms=1200){
  canvas.style.display = "block";
  pieces = [];
  for(let i=0;i<120;i++) pieces.push(makePiece());
  draw();
  clearTimeout(timer);
  timer = setTimeout(()=>{ pieces=[]; }, ms);
}

// ====== START ======
window.addEventListener("load", () => {
  buildRandomPolaroids(); // fotos dispersas al azar
  startHearts();
  render();
});
