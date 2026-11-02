const celebration = document.getElementById("celebration");
const wishButton = document.getElementById("wishButton");
const wishPopup = document.getElementById("wishPopup");
const popupBackdrop = document.getElementById("popupBackdrop");
const closePopup = document.getElementById("closePopup");
const visitorName = document.getElementById("visitorName");
const generatedWish = document.getElementById("generatedWish");
const generateButton = document.getElementById("generateButton");
const downloadCardButton = document.getElementById("downloadCardButton");
const shareButton = document.getElementById("shareButton");
const copyStatus = document.getElementById("copyStatus");
const randomWishButton = document.getElementById("randomWishButton");
const fireworksButton = document.getElementById("fireworksButton");
const thaliButton = document.getElementById("thaliButton");
const thaliPanel = document.getElementById("thaliPanel");
const thaliBackdrop = document.getElementById("thaliBackdrop");
const closeThali = document.getElementById("closeThali");
const thaliInfo = document.getElementById("thaliInfo");
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let hasCelebrated = false;
let particles = [];
let currentWish = "નૂતન વર્ષાભિનંદન! આપનું નવું વર્ષ સુખ, શાંતિ અને સમૃદ્ધિથી ભરેલું રહે.";
let lastWishIndex = -1;

const gujaratiWishes = [
  "નૂતન વર્ષાભિનંદન! આપનું નવું વર્ષ સુખ, શાંતિ અને સમૃદ્ધિથી ભરેલું રહે.",
  "આ નવું વર્ષ તમારા જીવનમાં નવી આશાઓ, નવા સપનાઓ અને નવી સફળતાઓ લઈને આવે.",
  "તમારા પરિવાર પર હંમેશાં સુખ, સ્વાસ્થ્ય અને પ્રેમની વર્ષા થતી રહે. સાલ મુબારક!",
  "દરેક દિવસ નવી ખુશી લાવે અને દરેક શરૂઆત સફળતામાં બદલાય. નૂતન વર્ષાભિનંદન!",
  "આવતું વર્ષ તમારા જીવનને આનંદ, ઉમંગ અને અઢળક આશીર્વાદોથી ઝળહળતું બનાવે.",
  "તમારા ઘરમાં હાસ્ય ગુંજતું રહે અને જીવનમાં પ્રગતિના નવા દ્વાર ખૂલતા રહે. સાલ મુબારક!"
];

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(window.innerWidth * dpr);
  canvas.height = Math.floor(window.innerHeight * dpr);
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function createBurst(x = window.innerWidth / 2, y = window.innerHeight / 2, count = 90) {
  const colors = ["#ffe5ad", "#e9bd73", "#fff2dc", "#e99a75"];
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 1.2 + Math.random() * 5;
    particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
      life: 1, size: 1 + Math.random() * 3, color: colors[Math.floor(Math.random() * colors.length)] });
  }
}
function animateParticles() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  particles = particles.filter(p => p.life > 0);
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy; p.vy += 0.035; p.vx *= 0.99; p.life -= 0.012;
    ctx.globalAlpha = Math.max(p.life, 0); ctx.fillStyle = p.color; ctx.shadowBlur = 12; ctx.shadowColor = p.color;
    ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
  });
  ctx.globalAlpha = 1; ctx.shadowBlur = 0;
  requestAnimationFrame(animateParticles);
}
animateParticles();

function makePetals(amount = 24) {
  const symbols = ["✿", "❀", "✽", "✧"];
  for (let i = 0; i < amount; i++) {
    const petal = document.createElement("span");
    petal.className = "petal"; petal.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    petal.style.left = `${Math.random() * 100}%`; petal.style.animationDuration = `${5 + Math.random() * 6}s`;
    petal.style.animationDelay = `${Math.random() * 2}s`; petal.style.fontSize = `${12 + Math.random() * 13}px`;
    celebration.appendChild(petal); setTimeout(() => petal.remove(), 13000);
  }
}
function celebrate() {
  hasCelebrated = true; celebration.classList.add("lit");
  createBurst(window.innerWidth / 2, window.innerHeight / 2, 100);
  setTimeout(() => createBurst(window.innerWidth * .25, window.innerHeight * .3, 60), 250);
  setTimeout(() => createBurst(window.innerWidth * .75, window.innerHeight * .3, 60), 500);
  makePetals(28);
}
function lightDiya(diya) {
  diya.classList.toggle("is-lit");
  const isLit = diya.classList.contains("is-lit");
  diya.setAttribute("aria-pressed", String(isLit));
  diya.querySelector(".diya-hint").textContent = isLit ? "GLOWING ✨" : "TAP TO LIGHT";
  if (isLit) {
    celebration.classList.add("lit");
    createBurst(diya.getBoundingClientRect().left + 45, diya.getBoundingClientRect().top + 10, 35);
  }
}
["diyaLeft", "diyaRight"].forEach(id => {
  const diya = document.getElementById(id);
  diya.addEventListener("click", () => lightDiya(diya));
  diya.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") { event.preventDefault(); lightDiya(diya); }
  });
});

function openPopup() {
  celebrate(); wishPopup.classList.add("active"); popupBackdrop.classList.add("active");
  copyStatus.textContent = ""; setTimeout(() => visitorName.focus(), 250);
}
function hidePopup() { wishPopup.classList.remove("active"); popupBackdrop.classList.remove("active"); }
wishButton.addEventListener("click", openPopup);
closePopup.addEventListener("click", hidePopup);
popupBackdrop.addEventListener("click", hidePopup);

randomWishButton.addEventListener("click", () => {
  let index;
  do { index = Math.floor(Math.random() * gujaratiWishes.length); } while (index === lastWishIndex && gujaratiWishes.length > 1);
  lastWishIndex = index;
  currentWish = gujaratiWishes[index];
  document.getElementById("mainWish").textContent = currentWish;
  generatedWish.textContent = currentWish;
  createBurst(window.innerWidth / 2, window.innerHeight * .38, 35);
});

fireworksButton.addEventListener("click", () => {
  celebrate();
  // Several staggered bursts create a simple fireworks-show effect.
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const x = window.innerWidth * (.12 + Math.random() * .76);
      const y = window.innerHeight * (.12 + Math.random() * .45);
      createBurst(x, y, 75);
    }, i * 380);
  }
});

function openThali() {
  celebrate(); thaliPanel.classList.add("active"); thaliBackdrop.classList.add("active");
}
function hideThali() { thaliPanel.classList.remove("active"); thaliBackdrop.classList.remove("active"); }
thaliButton.addEventListener("click", openThali);
closeThali.addEventListener("click", hideThali);
thaliBackdrop.addEventListener("click", hideThali);
document.querySelectorAll(".thali-item").forEach(item => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".thali-item").forEach(button => button.classList.remove("selected"));
    item.classList.add("selected");
    thaliInfo.textContent = item.dataset.item;
    createBurst(item.getBoundingClientRect().left + 30, item.getBoundingClientRect().top + 30, 18);
  });
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") { hidePopup(); hideThali(); }
});

generateButton.addEventListener("click", () => {
  const name = visitorName.value.trim();
  if (!name) {
    visitorName.focus(); visitorName.style.borderColor = "#ff9b9b";
    copyStatus.textContent = "Please enter your name first."; return;
  }
  visitorName.style.borderColor = "";
  currentWish = `પ્રિય ${name}, નૂતન વર્ષાભિનંદન! આ નવું વર્ષ તમારા જીવનમાં સુખ, શાંતિ, સ્વાસ્થ્ય અને સમૃદ્ધિ લઈને આવે. તમારી દરેક નવી શરૂઆત સફળ બને.`;
  generatedWish.textContent = currentWish;
  copyStatus.textContent = "Your personal wish is ready!";
  createBurst(window.innerWidth / 2, window.innerHeight / 2, 45);
});

// Create a downloadable greeting-card PNG using Canvas (no external library required).
downloadCardButton.addEventListener("click", () => {
  const name = visitorName.value.trim() || "તમારા પરિવાર તરફથી";
  const card = document.createElement("canvas");
  card.width = 1200; card.height = 1500;
  const c = card.getContext("2d");

  const bg = c.createLinearGradient(0, 0, 1200, 1500);
  bg.addColorStop(0, "#210812"); bg.addColorStop(.55, "#501526"); bg.addColorStop(1, "#210812");
  c.fillStyle = bg; c.fillRect(0, 0, 1200, 1500);

  // Ornamental borders and mandala-inspired rings.
  c.strokeStyle = "#e9bd73";
  for (let inset = 38; inset <= 66; inset += 14) {
    c.lineWidth = inset === 38 ? 4 : 1.5;
    c.strokeRect(inset, inset, 1200 - inset * 2, 1500 - inset * 2);
  }
  c.save(); c.translate(600, 360);
  [95, 135, 175, 215].forEach((r, i) => {
    c.beginPath(); c.arc(0, 0, r, 0, Math.PI * 2);
    c.setLineDash(i % 2 ? [5, 10] : []); c.lineWidth = 2; c.stroke();
  });
  c.setLineDash([]);
  for (let i = 0; i < 24; i++) {
    c.save(); c.rotate((Math.PI * 2 * i) / 24);
    c.beginPath(); c.ellipse(0, -155, 18, 55, 0, 0, Math.PI * 2); c.stroke();
    c.restore();
  }
  c.restore();

  c.textAlign = "center";
  c.fillStyle = "#e9bd73"; c.font = "600 30px 'DM Sans', sans-serif";
  c.fillText("ROYAL UTSAV  •  BESTU VARAS 2026", 600, 690);
  c.fillStyle = "#fff2dc"; c.font = "700 76px 'Noto Serif Gujarati', serif";
  c.fillText("નૂતન વર્ષાભિનંદન", 600, 830);
  c.fillStyle = "#ffe5ad"; c.font = "600 42px 'Noto Serif Gujarati', serif";
  c.fillText(`પ્રિય ${name}`, 600, 960);

  const wishLines = [
    "આ નવું વર્ષ તમારા જીવનમાં સુખ, શાંતિ,",
    "સ્વાસ્થ્ય અને સમૃદ્ધિ લઈને આવે.",
    "તમારી દરેક નવી શરૂઆત સફળ બને."
  ];
  c.fillStyle = "#fff2dc"; c.font = "30px 'Noto Serif Gujarati', serif";
  wishLines.forEach((line, i) => c.fillText(line, 600, 1055 + i * 58));

  c.fillStyle = "#e9bd73"; c.font = "28px 'DM Sans', sans-serif";
  c.fillText("WISHING YOU A YEAR FULL OF LIGHT & JOY", 600, 1320);
  c.font = "35px serif"; c.fillText("✦   ✺   ✦", 600, 1400);

  const link = document.createElement("a");
  link.download = "Royal-Bestu-Varas-Greeting.png";
  link.href = card.toDataURL("image/png");
  link.click();
  copyStatus.textContent = "Your greeting card PNG has been downloaded!";
  createBurst(window.innerWidth / 2, window.innerHeight / 2, 50);
});

shareButton.addEventListener("click", async () => {
  try {
    if (navigator.share) {
      await navigator.share({ title: "નૂતન વર્ષાભિનંદન", text: currentWish });
      copyStatus.textContent = "Thanks for sharing the festive joy!";
    } else if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(currentWish);
      copyStatus.textContent = "Wish copied! Paste it into WhatsApp or a message.";
    } else {
      const temp = document.createElement("textarea");
      temp.value = currentWish; document.body.appendChild(temp); temp.select();
      document.execCommand("copy"); temp.remove();
      copyStatus.textContent = "Wish copied! Paste it into WhatsApp or a message.";
    }
  } catch (error) {
    if (error.name !== "AbortError") copyStatus.textContent = "Sharing was not available. Please try again.";
  }
});

// Floating golden dust.
setInterval(() => {
  if (document.hidden) return;
  const p = document.createElement("span"); p.className = "petal"; p.textContent = "✦";
  p.style.left = `${Math.random() * 100}%`; p.style.animationDuration = `${6 + Math.random() * 5}s`;
  p.style.opacity = ".55"; celebration.appendChild(p); setTimeout(() => p.remove(), 12000);
}, 650);

setTimeout(() => { if (!hasCelebrated) createBurst(window.innerWidth / 2, window.innerHeight * .72, 28); }, 900);
