console.log('%c[Slither Mod] Mod menu loaded!', 'color: cyan; font-weight: bold;');

let modMenuVisible = false;

const modMenu = document.createElement('div');
modMenu.style.position = 'fixed';
modMenu.style.top = '10px';
modMenu.style.left = '10px';
modMenu.style.background = 'rgba(0, 0, 0, 0.8)';
modMenu.style.color = 'white';
modMenu.style.padding = '10px';
modMenu.style.borderRadius = '5px';
modMenu.style.zIndex = 9999;
modMenu.style.display = 'none';
modMenu.innerHTML = `
  <h3>Slither Mod Menu</h3>
  <button id="zoomMod">Toggle Zoom</button><br><br>
  <button id="tracerMod">Toggle Tracers</button>
`;

document.body.appendChild(modMenu);

document.addEventListener('keydown', (e) => {
    if (e.key === '`') {
        modMenuVisible = !modMenuVisible;
        modMenu.style.display = modMenuVisible ? 'block' : 'none';
    }
});

let zoomEnabled = false;
document.getElementById('zoomMod').onclick = () => {
    zoomEnabled = !zoomEnabled;
    window.gsc = zoomEnabled ? 0.3 : 1;
};

let tracerEnabled = false;
document.getElementById('tracerMod').onclick = () => {
    tracerEnabled = !tracerEnabled;
    if (tracerEnabled) startTracers();
};

function startTracers() {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    function draw() {
        if (!tracerEnabled) return requestAnimationFrame(draw);
        ctx.save();
        ctx.beginPath();
        if (window.snakes) {
            for (let s of snakes) {
                if (s && s.xx && s.yy) {
                    ctx.moveTo(s.xx, s.yy);
                    ctx.lineTo(snake.xx, snake.yy);
                }
            }
        }
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
        requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
}

console.log('%c[Slither Mod] Ready. Press ` to open the menu.', 'color: yellow; font-weight: bold;');
