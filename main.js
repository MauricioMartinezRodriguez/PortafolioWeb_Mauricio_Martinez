// Animación del Fondo de Números Binarios Verdes (0 y 1)
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

// Lógica del Menú Móvil
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

// Estados del menú móvil
let menuOpen = false;

menuBtn.addEventListener('click', () => {
  menuOpen = !menuOpen;
  if (menuOpen) {
    mobileMenu.classList.remove('hidden');
    mobileMenu.classList.add('flex');
    // Forzar reflow para la animación de entrada
    void mobileMenu.offsetWidth;
    mobileMenu.style.transition = 'max-height 0.3s ease-out, opacity 0.3s ease-out';
    mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
    mobileMenu.style.opacity = '1';
  } else {
    mobileMenu.style.maxHeight = '0';
    mobileMenu.style.opacity = '0';
    setTimeout(() => {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('flex');
      mobileMenu.style.maxHeight = '';
      mobileMenu.style.opacity = '';
    }, 300);
  }
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.style.maxHeight = '0';
    mobileMenu.style.opacity = '0';
    setTimeout(() => {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('flex');
    }, 300);
  });
});

// Envío de Cotización a WhatsApp directo al número (999)-338-6267
document.getElementById('quoteForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const empresa = document.getElementById('empresa').value;
  const servicio = document.getElementById('servicio').value;
  const mensaje = document.getElementById('mensaje').value;
  
  const texto = `Hola Mauricio, soy ${nombre}${empresa ? ' de ' + empresa : ''}. Me interesa cotizar: ${servicio}. Detalles: ${mensaje}`;
  window.open('https://wa.me/529993386267?text=' + encodeURIComponent(texto), '_blank');
});