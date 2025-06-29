console.log('%c[Slither Mod] Loaded', 'color: cyan; font-weight: bold;');

// ==================== CSS Styling ====================
const style = document.createElement('style');
style.id = 'modStyle';
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
    width: 220px;
}
#modMenu h3 {
    margin: 0 0 10px 0;
    font-size: 18px;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
#modMenu button {
    background: crimson;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 2px 8px;
    cursor: pointer;
    font-size: 12px;
}
#modMenu label {
    display: block;
    margin-bottom: 5px;
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
    <h3>Slither Mod <button id="ejectMod">Eject</button></h3>
    <label><input type="checkbox" id="zoomToggle"> Enable Zoom (scroll)</label>
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

    if (notifications.children.length > 5) {
        notifications.removeChild(notifications.children[0]);
    }

    setTimeout(() => { note.remove(); }, 3000);
}

// ==================== Controls ====================
let modMenuVisible = false;
let zoomEnabled = false;
let currentZoom = 1;

function handleKeyToggle(e) {
    if (e.key === '`') {
        modMenuVisible = !modMenuVisible;
        modMenu.style.display = modMenuVisible ? 'block' : 'none';
        showNotification(modMenuVisible ? 'Mod menu opened' : 'Mod menu closed');
    }
}

document.addEventListener('keydown', handleKeyToggle);

const zoomToggle = document.getElementById('zoomToggle');

zoomToggle.addEventListener('change', () => {
    zoomEnabled = zoomToggle.checked;
    showNotification(zoomEnabled ? 'Zoom enabled (use scroll)' : 'Zoom disabled');

    if (!zoomEnabled) window.gsc = 1;
});

function handleZoomScroll(e) {
    if (!zoomEnabled) return;

    if (e.deltaY < 0) {
        currentZoom = Math.min(currentZoom + 0.1, 2);
    } else {
        currentZoom = Math.max(currentZoom - 0.1, 0.1);
    }
    currentZoom = Math.round(currentZoom * 10) / 10;
    window.gsc = currentZoom;
    showNotification('Zoom set to ' + currentZoom);
}

document.addEventListener('wheel', handleZoomScroll);

// ==================== Eject Mod ====================
function ejectMod() {
    document.removeEventListener('keydown', handleKeyToggle);
    document.removeEventListener('wheel', handleZoomScroll);
    modMenu.remove();
    notifications.remove();
    style.remove();
    console.clear();
    showNotification = function() {};
}

document.getElementById('ejectMod').addEventListener('click', () => {
    showNotification('Ejecting mod...');
    setTimeout(() => ejectMod(), 500);
});
