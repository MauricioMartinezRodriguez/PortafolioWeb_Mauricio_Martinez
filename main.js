// --- 1. Animación del Fondo de Números Binarios Verdes (0 y 1) ---
const canvas = document.getElementById('binaryCanvas');
const ctx = canvas.getContext('2d');
let drops = [];
const fontSize = window.innerWidth < 768 ? 14 : 16;
const binaryChars = ['0', '1'];

function initCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const columns = Math.floor(canvas.width / fontSize);
  drops = Array(columns).fill(1);
}

initCanvas();
window.addEventListener('resize', initCanvas);

function drawBinary() {
  ctx.fillStyle = 'rgba(4, 13, 8, 0.09)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = '600 ' + fontSize + 'px "Fira Code", monospace';

  for (let i = 0; i < drops.length; i++) {
    const text = binaryChars[Math.floor(Math.random() * binaryChars.length)];
    const isBright = Math.random() > 0.93;
    ctx.fillStyle = isBright ? '#4ade80' : 'rgba(34, 197, 94, 0.32)';
    ctx.shadowBlur = isBright ? 8 : 0;
    ctx.shadowColor = '#22c55e';
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}
setInterval(drawBinary, 45);


// --- 2. Lógica del Menú Móvil ---
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
  mobileMenu.classList.toggle('flex');
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    mobileMenu.classList.remove('flex');
  });
});


// --- 3. Envío de Cotización a WhatsApp ---
document.getElementById('quoteForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const empresa = document.getElementById('empresa').value;
  const servicio = document.getElementById('servicio').value;
  const mensaje = document.getElementById('mensaje').value;
  
  const texto = `Hola Mauricio, soy ${nombre}${empresa ? ' de ' + empresa : ''}. Me interesa cotizar: ${servicio}. Detalles: ${mensaje}`;
  window.open('https://wa.me/529993386267?text=' + encodeURIComponent(texto), '_blank');
});


// --- 4. Animaciones al hacer Scroll (Intersection Observer) ---
const revealElements = document.querySelectorAll('.reveal');

const revealCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
};

const revealOptions = {
  threshold: 0.15
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
revealElements.forEach(el => revealObserver.observe(el));


// --- 5. Efecto de Máquina de Escribir (Typewriter) ---
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["Desarrollador Frontend.", "QA Tester.", "Project Manager."];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if(textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  if(textArray.length) setTimeout(type, newTextDelay + 250);
});