(() => {
  if (window._themeMenuInjected) return;
  window._themeMenuInjected = true;

  const themes = {
    light: {
      '--bg': '#fff',
      '--fg': '#000',
      '--accent': '#0078d7',
      '--menu-bg': '#eee',
      '--menu-fg': '#000',
    },
    dark: {
      '--bg': '#121212',
      '--fg': '#eee',
      '--accent': '#0af',
      '--menu-bg': '#222',
      '--menu-fg': '#eee',
    },
    colorful: {
      '--bg': '#2a1a4d',
      '--fg': '#ff6f91',
      '--accent': '#4ee8ca',
      '--menu-bg': '#3b2167',
      '--menu-fg': '#ffe9f0',
    },
    solarized: {
      '--bg': '#fdf6e3',
      '--fg': '#657b83',
      '--accent': '#b58900',
      '--menu-bg': '#eee8d5',
      '--menu-fg': '#586e75',
    },
    monokai: {
      '--bg': '#272822',
      '--fg': '#f8f8f2',
      '--accent': '#f92672',
      '--menu-bg': '#3e3d32',
      '--menu-fg': '#f8f8f2',
    },
    forest: {
      '--bg': '#1b2f23',
      '--fg': '#c7d3c8',
      '--accent': '#8fb28f',
      '--menu-bg': '#2e4d30',
      '--menu-fg': '#d3e0d3',
    },
  };

  const handlers = {};

  const style = document.createElement('style');
  style.id = 'theme-menu-styles';
  style.textContent = `
    :root {
      --bg: #fff;
      --fg: #000;
      --accent: #0078d7;
    }
    body, .main, .chat, .text-area, .btn-primary {
      background-color: var(--bg) !important;
      color: var(--fg) !important;
    }
    a, .link, .btn-primary {
      color: var(--accent) !important;
    }
    #theme-menu {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--menu-bg);
      color: var(--menu-fg);
      padding: 10px 15px;
      border-radius: 8px;
      box-shadow: 0 0 12px rgba(0,0,0,0.4);
      font-family: system-ui, sans-serif;
      z-index: 999999;
      display: none;
      min-width: 180px;
    }
    #theme-menu label {
      display: block;
      margin-bottom: 8px;
      cursor: pointer;
      user-select: none;
    }
    #theme-menu label:hover {
      color: var(--accent);
    }
    #theme-notification {
      position: fixed;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0,0,0,0.8);
      color: white;
      padding: 8px 16px;
      border-radius: 6px;
      font-family: system-ui, sans-serif;
      font-size: 14px;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.5s ease;
      z-index: 1000000;
      user-select: none;
    }
    #theme-notification.show {
      opacity: 1;
      pointer-events: auto;
    }
    #eject-button {
      margin-top: 10px;
      width: 100%;
      padding: 6px 8px;
      border: none;
      border-radius: 5px;
      background: var(--accent);
      color: var(--fg);
      cursor: pointer;
      font-weight: bold;
      font-size: 14px;
      user-select: none;
    }
    #eject-button:hover {
      opacity: 0.85;
    }
  `;
  document.head.appendChild(style);

  const menu = document.createElement('div');
  menu.id = 'theme-menu';

  menu.innerHTML = `
    <strong>Choose Theme</strong>
    <label><input type="radio" name="theme" value="light"> Light</label>
    <label><input type="radio" name="theme" value="dark" checked> Dark</label>
    <label><input type="radio" name="theme" value="colorful"> Colorful</label>
    <label><input type="radio" name="theme" value="solarized"> Solarized</label>
    <label><input type="radio" name="theme" value="monokai"> Monokai</label>
    <label><input type="radio" name="theme" value="forest"> Forest</label>
    <small style="display:block; margin-top:10px; font-size:12px; opacity:0.7;">Press Alt+T to toggle</small>
  `;

  const ejectBtn = document.createElement('button');
  ejectBtn.id = 'eject-button';
  ejectBtn.textContent = 'Eject Script';
  menu.appendChild(ejectBtn);

  document.body.appendChild(menu);

  const notif = document.createElement('div');
  notif.id = 'theme-notification';
  document.body.appendChild(notif);

  function showNotification(text) {
    notif.textContent = text;
    notif.classList.add('show');
    clearTimeout(notif._timeout);
    notif._timeout = setTimeout(() => {
      notif.classList.remove('show');
    }, 2000);
  }

  function applyTheme(name) {
    const theme = themes[name];
    if (!theme) return;
    for (const [varName, val] of Object.entries(theme)) {
      document.documentElement.style.setProperty(varName, val);
    }
    showNotification(`Theme switched to: ${name.charAt(0).toUpperCase() + name.slice(1)}`);
  }

  const radios = menu.querySelectorAll('input[name="theme"]');
  radios.forEach(radio => {
    const handler = e => applyTheme(e.target.value);
    radio.addEventListener('change', handler);
    handlers[`radio_${radio.value}`] = handler;
  });

  handlers.toggleMenu = e => {
    if (e.altKey && e.key.toLowerCase() === 't') {
      e.preventDefault();
      menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
    }
  };
  window.addEventListener('keydown', handlers.toggleMenu);

  function eject() {
    console.clear();
    if (style.parentNode) style.parentNode.removeChild(style);
    if (menu.parentNode) menu.parentNode.removeChild(menu);
    if (notif.parentNode) notif.parentNode.removeChild(notif);
    ['--bg', '--fg', '--accent', '--menu-bg', '--menu-fg'].forEach(v =>
      document.documentElement.style.removeProperty(v)
    );
    radios.forEach(radio => {
      radio.removeEventListener('change', handlers[`radio_${radio.value}`]);
    });
    window.removeEventListener('keydown', handlers.toggleMenu);
    delete window._themeMenuInjected;
    console.log('[ThemeMenu] Script ejected and cleaned up.');
  }

  ejectBtn.addEventListener('click', eject);

  applyTheme('dark');
  showNotification('Press Alt+T to open theme menu');
})();
