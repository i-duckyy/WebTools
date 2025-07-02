(function(){
	document.title = "slither.io - Modded by iDucky";
    const style=document.createElement('style');
    style.id='modStyle';
    style.innerHTML=`
    #modMenu {
        position: fixed;
        top: 10px;
        left: 10px;
        background: rgba(30,30,30,0.95);
        color: #fff;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
        z-index: 9999;
        font-family: Arial, sans-serif;
        display: none;
        width: 280px;
        user-select: none;
    }
    #modMenu.light {
        background: #f0f0f0;
        color: #222;
        box-shadow: 0 0 10px rgba(0,0,0,0.15);
    }
    #modMenu.classic {
        background: #222;
        color: #ddd;
        box-shadow: none;
    }
    #modMenu.solarized {
        background: #002b36;
        color: #839496;
        box-shadow: 0 0 10px #073642;
    }
    #modMenu.darkpurple {
        background: #2e004f;
        color: #c0b9dd;
        box-shadow: 0 0 10px #5e4b8b;
    }
    #modMenu h3 {
        margin: 0 0 10px 0;
        font-size: 18px;
        text-align: center;
        display: flex;
        justify-content: space-between;
        align-items: center;
        user-select: none;
    }
    #modMenu button {
        border: none;
        border-radius: 4px;
        padding: 4px 10px;
        cursor: pointer;
        font-size: 13px;
        margin-left: 5px;
        user-select: none;
        background: #444;
        color: #eee;
        transition: background-color 0.3s ease;
    }
    #modMenu button:hover {
        background: #666;
    }
    #modMenu.light button {
        background: #ddd;
        color: #222;
    }
    #modMenu.light button:hover {
        background: #bbb;
    }
    #modMenu.classic button {
        background: #555;
        color: #ccc;
    }
    #modMenu.classic button:hover {
        background: #777;
    }
    #modMenu.solarized button {
        background: #586e75;
        color: #eee;
    }
    #modMenu.solarized button:hover {
        background: #657b83;
    }
    #modMenu.darkpurple button {
        background: #5e4b8b;
        color: #ddd;
    }
    #modMenu.darkpurple button:hover {
        background: #7e6bbc;
    }
    #clearConsoleBtn { background: green; color: white; }
    #settingsBtn { background: dodgerblue; color: white; }
    #ejectMod { background: crimson; color: white; }
    #backBtn, #resetBtn {
        background: gray;
        color: white;
    }
    #backBtn:hover, #resetBtn:hover {
        background: #555;
    }
    #modMenu label {
        display: block;
        margin-bottom: 10px;
        font-size: 14px;
        cursor: pointer;
    }
    #modMenu input[type=checkbox] {
        margin-right: 8px;
        transform: scale(1.2);
        vertical-align: middle;
        cursor: pointer;
        accent-color: #4CAF50;
    }
    #modMenu.light input[type=checkbox] {
        accent-color: #2e7d32;
    }
    #modMenu.classic input[type=checkbox] {
        accent-color: #66bb6a;
    }
    #modMenu.solarized input[type=checkbox] {
        accent-color: #859900;
    }
    #modMenu.darkpurple input[type=checkbox] {
        accent-color: #b39ddb;
    }
    #modMenu select, 
    #modMenu textarea,
    #modMenu input[type=range] {
        width: 100%;
        padding: 5px;
        border-radius: 4px;
        border: none;
        font-family: inherit;
        font-size: 14px;
        box-sizing: border-box;
        background: #555;
        color: #eee;
        transition: background-color 0.3s ease;
    }
    #modMenu select:hover,
    #modMenu textarea:hover,
    #modMenu input[type=range]:hover {
        background: #666;
    }
    #modMenu.light select,
    #modMenu.light textarea,
    #modMenu.light input[type=range] {
        background: #eee;
        color: #222;
    }
    #modMenu.light select:hover,
    #modMenu.light textarea:hover,
    #modMenu.light input[type=range]:hover {
        background: #ddd;
    }
    #modMenu.classic select,
    #modMenu.classic textarea,
    #modMenu.classic input[type=range] {
        background: #444;
        color: #ccc;
    }
    #modMenu.classic select:hover,
    #modMenu.classic textarea:hover,
    #modMenu.classic input[type=range]:hover {
        background: #666;
    }
    #modMenu.solarized select,
    #modMenu.solarized textarea,
    #modMenu.solarized input[type=range] {
        background: #073642;
        color: #93a1a1;
    }
    #modMenu.solarized select:hover,
    #modMenu.solarized textarea:hover,
    #modMenu.solarized input[type=range]:hover {
        background: #0b4a5a;
    }
    #modMenu.darkpurple select,
    #modMenu.darkpurple textarea,
    #modMenu.darkpurple input[type=range] {
        background: #4a357a;
        color: #d1c4e9;
    }
    #modMenu.darkpurple select:hover,
    #modMenu.darkpurple textarea:hover,
    #modMenu.darkpurple input[type=range]:hover {
        background: #5e4b8b;
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
        background: rgba(0,0,0,0.8);
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
    #importBtn {
        width: 50%;
        margin: auto;
        display: block;
    }
    #exportBtn {
        width: 100%;
        margin-bottom: 10px;
    }
    `;

    document.head.appendChild(style);

    const modMenu=document.createElement('div');
    modMenu.id='modMenu';
    document.body.appendChild(modMenu);

    const notifications=document.createElement('div');
    notifications.id='modNotifications';
    document.body.appendChild(notifications);

    let showNotification=function(msg){
        console.log('%c[Mod] '+msg,'color: yellow; font-weight: bold;');
        const note=document.createElement('div');
        note.className='modNotification';
        note.textContent=msg;
        notifications.appendChild(note);
        if(notifications.children.length>5) notifications.removeChild(notifications.children[0]);
        setTimeout(()=>note.remove(),notifDuration);
    };

    let modMenuVisible=false, zoomEnabled=false, currentZoom=1, zoomSensitivity=0.1, notifDuration=3000;
    let tracersEnabled=false;
    let dragging=false, dragOffsetX=0, dragOffsetY=0;

    function getMainUI(){return`
        <h3>
            Slither Mod
            <span>
                <button id="clearConsoleBtn">🧹</button>
                <button id="settingsBtn">⚙️</button>
                <button id="ejectMod">Eject</button>
            </span>
        </h3>
        <div style="text-align: left;">
            <label><input type="checkbox" id="zoomToggle"> Enable Zoom (scroll)</label>
            <label><input type="checkbox" id="tracersToggle"> Enable Tracers</label>
        </div>
    `;}


    function getSettingsUI(){return`
        <h3>
            Settings
            <span>
                <button id="backBtn">← Back</button>
                <button id="resetBtn">Reset</button>
            </span>
        </h3>
        <label for="themeSelect">Theme:</label>
        <select id="themeSelect">
            <option value="default">Default (Dark)</option>
            <option value="light">Light</option>
            <option value="classic">Classic</option>
            <option value="solarized">Solarized</option>
            <option value="darkpurple">Dark Purple</option>
        </select>
        <label for="positionSelect">Position:</label>
        <select id="positionSelect">
            <option value="top-left">Top Left</option>
            <option value="top-right">Top Right</option>
            <option value="bottom-left">Bottom Left</option>
            <option value="bottom-right">Bottom Right</option>
            <option value="draggable">Draggable</option>
        </select>
        <label for="zoomSensRange">Zoom Sensitivity: <span id="zoomSensValue">${zoomSensitivity}</span></label>
        <input type="range" id="zoomSensRange" min="0.01" max="0.5" step="0.01" value="${zoomSensitivity}">
        <label for="notifDurRange">Notification Duration (ms): <span id="notifDurValue">${notifDuration}</span></label>
        <input type="range" id="notifDurRange" min="1000" max="10000" step="500" value="${notifDuration}">

        <label>Export Config:</label>
        <textarea id="exportConfig" rows="4" readonly style="width:100%;resize:none;"></textarea>
        <button id="exportBtn">Export Config</button>

        <label>Import Config:</label>
        <textarea id="importConfig" rows="4" style="width:100%;resize:none;"></textarea>
        <button id="importBtn">Import Config</button>
    `;}

    function loadMainUI(){
        modMenu.innerHTML=getMainUI();
        attachMainUIListeners();
        document.getElementById('zoomToggle').checked=zoomEnabled;
        document.getElementById('tracersToggle').checked=tracersEnabled;
    }
    function loadSettingsUI(){
        modMenu.innerHTML=getSettingsUI();
        attachSettingsUIListeners();
        document.getElementById('themeSelect').value=getCurrentTheme();
        document.getElementById('positionSelect').value=getCurrentPosition();
        document.getElementById('zoomSensRange').value=zoomSensitivity;
        document.getElementById('zoomSensValue').textContent=zoomSensitivity.toFixed(2);
        document.getElementById('notifDurRange').value=notifDuration;
        document.getElementById('notifDurValue').textContent=notifDuration;
        updateExportConfig();
    }

    function attachMainUIListeners(){
        document.getElementById('clearConsoleBtn').onclick=()=>{
            console.clear();
            showNotification('Console cleared');
        };
        document.getElementById('settingsBtn').onclick=()=>{
            showNotification('Opening Settings...');
            loadSettingsUI();
        };
        document.getElementById('ejectMod').onclick=()=>{
            showNotification('Ejecting mod...');
            setTimeout(ejectMod,500);
        };
        document.getElementById('zoomToggle').onchange=e=>{
            zoomEnabled=e.target.checked;
            showNotification(zoomEnabled?'Zoom enabled (use scroll)':'Zoom disabled');
            if(!zoomEnabled){
                window.gsc=1;
                currentZoom=1;
            }
        };
        document.getElementById('tracersToggle').onchange=e=>{
            tracersEnabled=e.target.checked;
            showNotification(tracersEnabled?'Tracers enabled':'Tracers disabled');
        };
    }
    function attachSettingsUIListeners(){
        document.getElementById('backBtn').onclick=()=>{
            showNotification('Returning to main menu...');
            loadMainUI();
        };
        document.getElementById('resetBtn').onclick=()=>{
            resetSettings();
            showNotification('Settings reset to defaults');
            loadSettingsUI();
        };
        document.getElementById('themeSelect').onchange=e=>{
            setTheme(e.target.value);
        };
        document.getElementById('positionSelect').onchange=e=>{
            setPosition(e.target.value);
        };
        document.getElementById('zoomSensRange').oninput=e=>{
            zoomSensitivity=parseFloat(e.target.value);
            document.getElementById('zoomSensValue').textContent=zoomSensitivity.toFixed(2);
            showNotification(`Zoom sensitivity set to ${zoomSensitivity.toFixed(2)}`);
        };
        document.getElementById('notifDurRange').oninput=e=>{
            notifDuration=parseInt(e.target.value);
            document.getElementById('notifDurValue').textContent=notifDuration;
            showNotification(`Notification duration set to ${notifDuration}ms`);
        };
        document.getElementById('importBtn').onclick = () => {
            const importTextarea = document.getElementById('importConfig');
            if (!importTextarea.value.trim()) {
                const fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.accept = '.json,application/json';
                fileInput.onchange = e => {
                    const file = e.target.files[0];
                    if (!file) return showNotification('No file selected');
                    const reader = new FileReader();
                    reader.onload = evt => {
                        importTextarea.value = evt.target.result;
                        showNotification('Config loaded from file');
                    };
                    reader.onerror = () => showNotification('Error reading file');
                    reader.readAsText(file);
                };
                fileInput.click();
            } else {
                try {
                    const config = JSON.parse(importTextarea.value);
                    applyConfig(config);
                    showNotification('Config imported successfully!');
                    loadSettingsUI();
                } catch {
                    showNotification('Invalid JSON config!');
                }
            }
        };
        document.getElementById('exportBtn').onclick=()=>{
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(document.getElementById('exportConfig').value);
            const dlAnchorElem = document.createElement('a');
            dlAnchorElem.setAttribute("href", dataStr);
            dlAnchorElem.setAttribute("download", "slither_mod_config.json");
            document.body.appendChild(dlAnchorElem);
            dlAnchorElem.click();
            dlAnchorElem.remove();
            showNotification('Config exported as JSON file');
        };
    }

    function getCurrentTheme(){
        if(modMenu.classList.contains('light')) return 'light';
        if(modMenu.classList.contains('classic')) return 'classic';
        if(modMenu.classList.contains('solarized')) return 'solarized';
        if(modMenu.classList.contains('darkpurple')) return 'darkpurple';
        return 'default';
    }
    function setTheme(theme){
        modMenu.classList.remove('light','classic','solarized','darkpurple');
        if(theme==='light'){
            modMenu.classList.add('light');
            showNotification('Theme set to Light');
        }else if(theme==='classic'){
            modMenu.classList.add('classic');
            showNotification('Theme set to Classic');
        }else if(theme==='solarized'){
            modMenu.classList.add('solarized');
            showNotification('Theme set to Solarized');
        }else if(theme==='darkpurple'){
            modMenu.classList.add('darkpurple');
            showNotification('Theme set to Dark Purple');
        }else{
            showNotification('Theme set to Default (Dark)');
        }
    }

    function getCurrentPosition(){
        if(dragging) return 'draggable';
        if(modMenu.style.top==='10px'&&modMenu.style.left==='10px') return 'top-left';
        if(modMenu.style.top==='10px'&&modMenu.style.right==='10px') return 'top-right';
        if(modMenu.style.bottom==='10px'&&modMenu.style.left==='10px') return 'bottom-left';
        if(modMenu.style.bottom==='10px'&&modMenu.style.right==='10px') return 'bottom-right';
        return 'top-left';
    }
    function resetPositionStyles(){
        modMenu.style.top='';
        modMenu.style.right='';
        modMenu.style.bottom='';
        modMenu.style.left='';
        modMenu.style.cursor='';
    }
    function setPosition(pos){
        dragging=false;
        modMenu.style.userSelect='none';
        resetPositionStyles();
        removeDragListeners();
        modMenu.style.cursor='';
        switch(pos){
            case'top-left':
                modMenu.style.top='10px';modMenu.style.left='10px';showNotification('Position set to Top Left');break;
            case'top-right':
                modMenu.style.top='10px';modMenu.style.right='10px';showNotification('Position set to Top Right');break;
            case'bottom-left':
                modMenu.style.bottom='10px';modMenu.style.left='10px';showNotification('Position set to Bottom Left');break;
            case'bottom-right':
                modMenu.style.bottom='10px';modMenu.style.right='10px';showNotification('Position set to Bottom Right');break;
            case'draggable':
                dragging=true;
                modMenu.style.top='10px';modMenu.style.left='10px';
                modMenu.style.right='';modMenu.style.bottom='';
                modMenu.style.cursor='move';
                addDragListeners();
                showNotification('Position set to Draggable');
                break;
            default:
                modMenu.style.top='10px';modMenu.style.left='10px';showNotification('Position set to Top Left');break;
        }
    }

    function addDragListeners(){
        modMenu.addEventListener('mousedown',dragMouseDown);
        document.addEventListener('mouseup',dragMouseUp);
        document.addEventListener('mousemove',dragMouseMove);
    }
    function removeDragListeners(){
        modMenu.removeEventListener('mousedown',dragMouseDown);
        document.removeEventListener('mouseup',dragMouseUp);
        document.removeEventListener('mousemove',dragMouseMove);
    }
    let draggingActive=false;
    function dragMouseDown(e){
        if(!dragging||e.target.closest('h3')===null) return;
        e.preventDefault();
        dragOffsetX=e.clientX-modMenu.getBoundingClientRect().left;
        dragOffsetY=e.clientY-modMenu.getBoundingClientRect().top;
        draggingActive=true;
    }
    function dragMouseUp(){
        draggingActive=false;
    }
    function dragMouseMove(e){
        if(!draggingActive) return;
        e.preventDefault();
        let newX=e.clientX-dragOffsetX;
        let newY=e.clientY-dragOffsetY;
        const maxX=window.innerWidth-modMenu.offsetWidth-10;
        const maxY=window.innerHeight-modMenu.offsetHeight-10;
        newX=Math.min(Math.max(10,newX),maxX);
        newY=Math.min(Math.max(10,newY),maxY);
        modMenu.style.top=newY+'px';
        modMenu.style.left=newX+'px';
        modMenu.style.right='';
        modMenu.style.bottom='';
    }

    function handleKeyToggle(e){
        if(e.key==='c'){
            modMenuVisible=!modMenuVisible;
            modMenu.style.display=modMenuVisible?'block':'none';
            showNotification(modMenuVisible?'Mod menu opened':'Mod menu closed');
            if(modMenuVisible&&!modMenu.innerHTML.trim()) loadMainUI();
        }
    }
    document.addEventListener('keydown',handleKeyToggle);

    function handleZoomScroll(e){
        if(!zoomEnabled) return;
        if(e.deltaY<0) currentZoom=Math.min(currentZoom+zoomSensitivity,2);
        else currentZoom=Math.max(currentZoom-zoomSensitivity,0.1);
        currentZoom=Math.round(currentZoom*10)/10;
        window.gsc=currentZoom;
        showNotification('Zoom set to '+currentZoom);
    }
    document.addEventListener('wheel',handleZoomScroll);

    function getConfig(){
        return {
            zoomEnabled,
            currentZoom,
            zoomSensitivity,
            notifDuration,
            tracersEnabled,
            theme:getCurrentTheme(),
            position:getCurrentPosition()
        };
    }
    function applyConfig(cfg){
        zoomEnabled=!!cfg.zoomEnabled;
        currentZoom=cfg.currentZoom||1;
        zoomSensitivity=cfg.zoomSensitivity||0.1;
        notifDuration=cfg.notifDuration||3000;
        tracersEnabled=!!cfg.tracersEnabled;
        setTheme(cfg.theme||'default');
        setPosition(cfg.position||'top-left');
        window.gsc=currentZoom;
    }
    function updateExportConfig(){
        const textarea=document.getElementById('exportConfig');
        if(!textarea) return;
        textarea.value=JSON.stringify(getConfig(),null,2);
    }
    function resetSettings(){
        zoomEnabled=false;
        currentZoom=1;
        zoomSensitivity=0.1;
        notifDuration=3000;
        tracersEnabled=false;
        setTheme('default');
        setPosition('top-left');
        window.gsc=1;
    }

    function ejectMod(){
        document.removeEventListener('keydown',handleKeyToggle);
        document.removeEventListener('wheel',handleZoomScroll);
        removeDragListeners();
        window.gsc=1;
        currentZoom=1;
        modMenu.remove();
        notifications.remove();
        style.remove();
        document.title = "slither.io - Modded by iDucky";
        showNotification=function(){};
        console.log('%c[Slither Mod] Ejected and fully reset.','color: red; font-weight: bold;');
        console.clear();
    }

    loadMainUI();
    setTheme('default');
    setPosition('top-left');
})();
