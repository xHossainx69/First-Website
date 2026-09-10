let currentMode = 'particle';

function switchMode() {
  const btn = document.getElementById('modeBtn');
  particles = []; 

  if (currentMode === 'particle') {
    currentMode = 'wave';
    btn.innerText = "Current Mode: Wave Simulation";
  } else {
    currentMode = 'particle';
    btn.innerText = "Current Mode: Particle Simulation";
  }
}

const canvas = document.getElementById('simcanvas');
const ctx = canvas.getContext('2d');

const gun = {
  x: 50,
  y: canvas.height / 2,
  size: 20
};
let particles = [];

function drawgun(){
  ctx.fillStyle = '#666666'; // Gun color set to mid-tone grey (between black and grey)
  ctx.fillRect(gun.x - (gun.size / 2), gun.y - (gun.size / 2), gun.size, gun.size);
}

function topbar() {
  ctx.fillStyle = '#000000'; // Walls set to black
  ctx.fillRect(170, 0, 10, 150);
}
function botbar() {
  ctx.fillStyle = '#000000'; // Walls set to black
  ctx.fillRect(170, 250, 10, 150);
}
function midbar() {
  ctx.fillStyle = '#000000'; // Walls set to black
  ctx.fillRect(170, 175, 10, 50);
}

function spawnparticle(){
  if (currentMode === 'particle') {
    const angle = Math.floor((Math.random() * 60) - 30);
    const rad = angle * (Math.PI / 180);
    const speed = 1.5;
    particles.push({
      x: gun.x,
      y: gun.y,
      vx: speed * Math.cos(rad),
      vy: speed * Math.sin(rad)
    });
  } else {
    const centerAngle = Math.floor((Math.random() * 60) - 30);
    const spread = 50;
    const particleCount = 215;
    const speed = 1.5;
    
    for (let i = 0; i < particleCount; i++) {
      let getang = (centerAngle - spread / 2) + (i / (particleCount - 1)) * spread;
      const rad = getang * (Math.PI / 180);
      particles.push({
        x: gun.x,
        y: gun.y,
        vx: speed * Math.cos(rad),
        vy: speed * Math.sin(rad)
      });
    }
  }
}

setInterval(spawnparticle, 500);

function update(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawgun();
  topbar();
  botbar();
  midbar();

  for(let i = particles.length - 1; i >= 0; i--){
    let p = particles[i];
    
    let prevX = p.x;
    p.x += p.vx;
    p.y += p.vy;

    if(prevX < 170 && p.x >= 170){
      if(p.y <= 150 || (p.y >= 175 && p.y <= 225) || p.y >= 250){
        if (currentMode === 'particle') {
          p.x = prevX;
          p.vx = -p.vx;
        } else {
          particles.splice(i, 1);
          continue;
        }
      }
    }

    if(p.x >= canvas.width - 3){
      p.x = canvas.width - 3;
      p.vx = 0;
      p.vy = 0;
    }

    ctx.fillStyle = '#888888'; // Particles set to grey
    ctx.fillRect(p.x, p.y, 3, 3);
  }
  requestAnimationFrame(update);
}


requestAnimationFrame(update);