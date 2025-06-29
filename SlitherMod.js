console.log('%c[Slither Mod] Loaded', 'color: cyan; font-weight: bold;');

// ==================== CSS Styling ====================
const style = document.createElement('style');
style.innerHTML = `
#modMenu {
    position: fixed;
    top: 10px;
    left: 10px;
    background: rgba(30, 30, 30, 0.95);
    color: white;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    z-index: 9999;
    font-family: Arial, sans-serif;
    display: none;
    width: 200px;
}
#modMenu h3 {
    margin: 0 0 10px 0;
    font-size: 18px;
    text-align: center;
}
#modMenu label {
    display: block;
    margin-bottom: 5px;
}
#modMenu input[type="range"] {
    width: 100%;
}
#modNotifications {
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 10000;
}
.modNotification {
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    margin-top: 5px;
    font-size: 14px;
    animation: fadeInOut 3s forwards;
}
@keyframes fadeInOut {
    0% { opacity: 0; transform: translateY(10px); }
    10% { opacity: 1; transform: translateY(0); }
    90% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(-10px); }
}
`;
document.head.appendChild(style);

// ==================== Mod Menu ====================
const modMenu = document.createElement('div');
modMenu.id = 'modMenu';
modMenu.innerHTML = `
    <h3>Slither Mod Menu</h3>
    <label><input type="checkbox" id="zoomToggle"> Enable Zoom</label>
    <div id="zoomControls" style="display:none;">
        <label>Zoom Level: <span id="zoomValue">1</span></label>
        <input type="range" id="zoomSlider" min="0.1" max="2" step="0.1" value="1">
    </div>
`;
document.body.appendChild(modMenu);

// ==================== Notifications ====================
const notifications = document.createElement('div');
notifications.id = 'modNotifications';
document.body.appendChild(notifications);

function showNotification(message) {
    console.log('%c[Mod] ' + message, 'color: yellow; font-weight: bold;');
    const note = document.createElement('div');
    note.className = 'modNotification';
    note.textContent = message;
    notifications.appendChild(note);
    setTimeout(() => { note.remove(); }, 3000);
}

// ==================== Controls ====================
let modMenuVisible = false;
let zoomEnabled = false;

document.addEventListener('keydown', (e) => {
    if (e.key === '`') {
        modMenuVisible = !modMenuVisible;
        modMenu.style.display = modMenuVisible ? 'block' : 'none';
        showNotification(modMenuVisible ? 'Mod menu opened' : 'Mod menu closed');
    }
});

const zoomToggle = document.getElementById('zoomToggle');
const zoomControls = document.getElementById('zoomControls');
const zoomSlider = document.getElementById('zoomSlider');
const zoomValue = document.getElementById('zoomValue');

zoomToggle.addEventListener('change', () => {
    zoomEnabled = zoomToggle.checked;
    zoomControls.style.display = zoomEnabled ? 'block' : 'none';
    showNotification(zoomEnabled ? 'Zoom enabled' : 'Zoom disabled');

    if (!zoomEnabled) window.gsc = 1;
});

zoomSlider.addEventListener('input', () => {
    const zoom = parseFloat(zoomSlider.value);
    zoomValue.textContent = zoom;
    if (zoomEnabled) window.gsc = zoom;
    showNotification('Zoom set to ' + zoom);
});
