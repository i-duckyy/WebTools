(() => {
  const logPrefix = '%c[DinoCheatMenu]';
  const logStyle = 'color: cyan; font-weight: bold;';
  const log = (msg, style = 'color:white;') =>
    console.log(`${logPrefix} %c${msg}`, logStyle, style);

  log('Initializing cheat menu...');

  const existing = document.getElementById('dino-cheat-menu');
  if (existing) {
    existing.remove();
    log('Removed old menu', 'color:orange;');
  }

  const original = {
    bodyBg: document.body.style.backgroundColor || '',
    bodyColor: document.body.style.color || '',
    speed: window.Runner?.instance_?.currentSpeed || 10,
    dist: window.Runner?.instance_?.distanceRan || 0,
    gameOver: Runner.prototype.gameOver,
  };

  let danceInterval,
    fpsCounterEl,
    jumpCounterEl,
    frameCount = 0,
    jumpCount = 0,
    lastTime = 0,
    flightEnabled = false,
    menuVisible = true;

  const themes = [
    {
      name: 'Light',
      menuBg: '#f0f0f0',
      menuColor: '#000',
      pageBg: '#fff',
      pageColor: '#000',
    },
    {
      name: 'Dark',
      menuBg: '#222',
      menuColor: '#eee',
      pageBg: '#333',
      pageColor: '#fff',
    },
    {
      name: 'Ocean',
      menuBg: '#004466',
      menuColor: '#a0eef0',
      pageBg: '#006688',
      pageColor: '#a0eef0',
    },
    {
      name: 'Sunset',
      menuBg: '#ff5f5f',
      menuColor: '#000',
      pageBg: '#ff7f7f',
      pageColor: '#000',
    },
    {
      name: 'Forest',
      menuBg: '#224d22',
      menuColor: '#b8d8b8',
      pageBg: '#2a662a',
      pageColor: '#b8d8b8',
    },
    {
      name: 'Purple',
      menuBg: '#4b0082',
      menuColor: '#d0c0ff',
      pageBg: '#5a1090',
      pageColor: '#d0c0ff',
    },
    {
      name: 'Neon',
      menuBg: '#0f0',
      menuColor: '#000',
      pageBg: '#070',
      pageColor: '#000',
    },
    {
      name: 'Mono',
      menuBg: '#555',
      menuColor: '#ddd',
      pageBg: '#888',
      pageColor: '#fff',
    },
  ];
  let themeIndex = 0;

  const menu = document.createElement('div');
  menu.id = 'dino-cheat-menu';
  Object.assign(menu.style, {
    position: 'fixed',
    bottom: '30px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: themes[themeIndex].menuBg,
    color: themes[themeIndex].menuColor,
    padding: '20px',
    borderRadius: '12px',
    zIndex: 100000,
    width: '320px',
    maxWidth: '90vw',
    fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
    boxShadow: '0 0 20px rgba(0,0,0,0.8)',
    userSelect: 'none',
  });

  const titleBar = document.createElement('div');
  Object.assign(titleBar.style, {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
  });

  const title = document.createElement('h2');
  title.textContent = 'Dino Cheat Menu ';
  title.style.flex = '1';
  title.style.margin = '0';
  title.style.userSelect = 'text';

  const shortcutInfo = document.createElement('span');
  shortcutInfo.textContent = '(ALT+T to toggle)';
  shortcutInfo.style.fontSize = '0.75rem';
  shortcutInfo.style.marginLeft = '10px';
  shortcutInfo.style.color = '#aaa';
  title.appendChild(shortcutInfo);

  const clearBtn = document.createElement('button');
  clearBtn.textContent = '🧹';
  Object.assign(clearBtn.style, {
    margin: '0 5px',
    padding: '5px',
    cursor: 'pointer',
    fontSize: '1.2rem',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#444',
    color: '#fff',
    transition: 'background-color 0.3s ease',
  });
  clearBtn.title = 'Clear Console';
  clearBtn.addEventListener('mouseenter', () =>
    (clearBtn.style.backgroundColor = '#666')
  );
  clearBtn.addEventListener('mouseleave', () =>
    (clearBtn.style.backgroundColor = '#444')
  );
  clearBtn.addEventListener('click', () => {
    console.clear();
    log('Console cleared', 'color:orange;');
  });

  const closeBtn = document.createElement('button');
  closeBtn.textContent = '×';
  Object.assign(closeBtn.style, {
    background: 'transparent',
    border: 'none',
    fontSize: '1.8rem',
    cursor: 'pointer',
    color: themes[themeIndex].menuColor,
    userSelect: 'none',
    padding: '0 5px',
    lineHeight: '1',
  });
  closeBtn.title = 'Close Menu';
  closeBtn.addEventListener('mouseenter', () =>
    (closeBtn.style.color = 'red')
  );
  closeBtn.addEventListener('mouseleave', () =>
    (closeBtn.style.color = themes[themeIndex].menuColor)
  );

  closeBtn.addEventListener('click', () => {
    hideMenu();
  });

  function hideMenu() {
    menu.style.display = 'none';
    menuVisible = false;
    log('Menu hidden (ALT+T to show)', 'color:yellow;');
  }
  function showMenu() {
    menu.style.display = '';
    menuVisible = true;
    log('Menu shown', 'color:lime;');
  }

  document.addEventListener('keydown', function(e) {
    if (e.altKey && (e.key === 't' || e.key === 'T')) {
      if (menuVisible) {
        hideMenu();
      } else {
        showMenu();
      }
      e.preventDefault();
    }
  });

  titleBar.append(title, clearBtn, closeBtn);
  menu.append(titleBar);

  function createCategory(name) {
    const container = document.createElement('div');
    container.style.marginBottom = '12px';

    const header = document.createElement('h3');
    header.textContent = name;
    header.style.cursor = 'pointer';
    header.style.userSelect = 'none';
    header.style.margin = '0 0 6px 0';

    const content = document.createElement('div');
    content.style.display = 'block';

    header.addEventListener('click', () => {
      const isHidden = content.style.display === 'none';
      content.style.display = isHidden ? 'block' : 'none';
    });

    container.append(header, content);
    menu.append(container);
    return content;
  }

  function createCheckbox(label, callback) {
    const wrapper = document.createElement('label');
    wrapper.style.display = 'flex';
    wrapper.style.alignItems = 'center';
    wrapper.style.cursor = 'pointer';
    wrapper.style.marginBottom = '8px';
    wrapper.style.userSelect = 'none';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    Object.assign(checkbox.style, {
      marginRight: '10px',
      cursor: 'pointer',
      transform: 'scale(1.2)',
    });

    checkbox.addEventListener('change', e => callback(e.target.checked));

    const labelText = document.createElement('span');
    labelText.textContent = label;
    labelText.style.fontSize = '14px';

    wrapper.append(checkbox, labelText);
    return wrapper;
  }

  function createSlider(label, min, max, step, callback, initial = 10) {
    const wrapper = document.createElement('div');
    wrapper.style.marginBottom = '10px';
    wrapper.style.userSelect = 'none';

    const lbl = document.createElement('label');
    lbl.textContent = label;
    lbl.style.display = 'block';
    lbl.style.marginBottom = '4px';

    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = min;
    slider.max = max;
    slider.step = step;
    slider.value = initial;
    slider.style.width = '100%';
    slider.style.cursor = 'pointer';

    slider.addEventListener('input', e => callback(parseFloat(e.target.value)));

    wrapper.append(lbl, slider);
    return wrapper;
  }

  const dinoCat = createCategory('Dino');

  dinoCat.append(
    createCheckbox('God Mode', on => {
      Runner.prototype.gameOver = on ? () => {} : original.gameOver;
      log(`God Mode ${on ? 'enabled' : 'disabled'}`, 'color:lime;');
    })
  );

  let flightSpeed = 5;
  dinoCat.append(
    createCheckbox('Flight', on => {
      flightEnabled = on;
      if (on) document.addEventListener('keydown', flightHandler);
      else document.removeEventListener('keydown', flightHandler);
      log(`Flight ${on ? 'enabled' : 'disabled'}`, 'color:deepskyblue;');
    })
  );

  function flightHandler(e) {
    if (!flightEnabled) return;
    const r = Runner.instance_;
    if (!r || !r.tRex) return;
    if (!flightHandler.last || Date.now() - flightHandler.last > 30) {
      if (e.code === 'ArrowUp') {
        r.tRex.yPos = Math.max(r.tRex.yPos - flightSpeed, 0);
      }
      if (e.code === 'ArrowDown') {
        r.tRex.yPos = Math.min(r.tRex.yPos + flightSpeed, window.innerHeight);
      }
      flightHandler.last = Date.now();
    }
  }

  dinoCat.append(
    createSlider('Jump Height', 5, 20, 0.5, val => {
      if (Runner.instance_?.tRex) Runner.instance_.tRex.setJumpVelocity(val);
      log(`Jump height set to ${val}`, 'color:pink;');
    }, 10)
  );

  dinoCat.append(
    createSlider('Flight Speed', 1, 20, 1, val => {
      flightSpeed = val;
    }, flightSpeed)
  );

  dinoCat.append(
    createCheckbox('Dance', on => {
      const r = Runner.instance_;
      if (!r || !r.tRex) return;

      if (on) {
        const baseY = r.tRex.yPos;
        danceInterval = setInterval(() => {
          r.tRex.yPos = baseY + Math.sin(Date.now() / 200) * 10;
        }, 50);
        log('Dance enabled', 'color:magenta;');
      } else {
        clearInterval(danceInterval);
        r.tRex.yPos = r.tRex.groundYPos || 93;
        log('Dance disabled', 'color:orange;');
      }
    })
  );

  const visualsCat = createCategory('Visuals');

  visualsCat.append(
    createCheckbox('Show FPS', on => {
      if (on) startFPS();
      else stopFPS();
    })
  );

  visualsCat.append(
    createCheckbox('Show Jump Count', on => {
      if (on) startJumpCounter();
      else stopJumpCounter();
    })
  );

  const themeBtn = document.createElement('button');
  themeBtn.textContent = 'Rotate Theme';
  Object.assign(themeBtn.style, {
    margin: '6px 0',
    padding: '6px',
    cursor: 'pointer',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#666',
    color: '#fff',
    width: '100%',
    fontWeight: '600',
    userSelect: 'none',
    transition: 'background-color 0.3s ease',
  });
  themeBtn.title = 'Cycle through themes';

  themeBtn.addEventListener('mouseenter', () => {
    themeBtn.style.backgroundColor = '#888';
  });
  themeBtn.addEventListener('mouseleave', () => {
    themeBtn.style.backgroundColor = '#666';
  });

  themeBtn.addEventListener('click', () => {
    themeIndex = (themeIndex + 1) % themes.length;
    const t = themes[themeIndex];
    menu.style.background = t.menuBg;
    menu.style.color = t.menuColor;
    document.body.style.backgroundColor = t.pageBg;
    document.body.style.color = t.pageColor;
    closeBtn.style.color = t.menuColor;
    log(`Theme changed to ${t.name}`, 'color:magenta;');
  });

  visualsCat.append(themeBtn);

  document.body.append(menu);
  log('Menu loaded', 'color:lime;');

  function startFPS() {
    if (fpsCounterEl) return;
    fpsCounterEl = document.createElement('div');
    Object.assign(fpsCounterEl.style, {
      position: 'fixed',
      top: '10px',
      right: '10px',
      backgroundColor: 'rgba(0,0,0,0.7)',
      color: 'lime',
      padding: '5px 10px',
      borderRadius: '6px',
      fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
      fontWeight: '700',
      zIndex: '100000',
      userSelect: 'none',
      minWidth: '55px',
      textAlign: 'center',
    });
    document.body.append(fpsCounterEl);
    frameCount = 0;
    lastTime = performance.now();
    updateFPS();
  }

  function updateFPS() {
    frameCount++;
    const now = performance.now();
    if (now - lastTime >= 1000) {
      fpsCounterEl.textContent = `FPS: ${frameCount}`;
      frameCount = 0;
      lastTime = now;
    }
    if (fpsCounterEl) requestAnimationFrame(updateFPS);
  }

  function stopFPS() {
    if (!fpsCounterEl) return;
    fpsCounterEl.remove();
    fpsCounterEl = null;
  }

  function startJumpCounter() {
    if (jumpCounterEl) return;
    jumpCounterEl = document.createElement('div');
    Object.assign(jumpCounterEl.style, {
      position: 'fixed',
      top: '40px',
      right: '10px',
      backgroundColor: 'rgba(0,0,0,0.7)',
      color: 'orange',
      padding: '5px 10px',
      borderRadius: '6px',
      fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
      fontWeight: '700',
      zIndex: '100000',
      userSelect: 'none',
      minWidth: '85px',
      textAlign: 'center',
    });
    document.body.append(jumpCounterEl);
    jumpCount = 0;
    jumpCounterEl.textContent = `Jumps: ${jumpCount}`;
    document.addEventListener('keydown', jumpListener);
  }

  function jumpListener(e) {
    if (e.code === 'Space') {
      jumpCount++;
      if (jumpCounterEl)
        jumpCounterEl.textContent = `Jumps: ${jumpCount}`;
    }
  }

  function stopJumpCounter() {
    if (!jumpCounterEl) return;
    jumpCounterEl.remove();
    jumpCounterEl = null;
    document.removeEventListener('keydown', jumpListener);
  }

  window.dcm = {
    eject: () => {
      menu.remove();
      stopFPS();
      stopJumpCounter();
      document.body.style.backgroundColor = original.bodyBg;
      document.body.style.color = original.bodyColor;
      Runner.prototype.gameOver = original.gameOver;
      log('DinoCheatMenu ejected', 'color:red;');
      delete window.dcm;
    },
    theme_rotate: () => {
      themeBtn.click();
    },
    show: showMenu,
    hide: hideMenu,
    godmode: (on = true) => {
      Runner.prototype.gameOver = on ? () => {} : original.gameOver;
      log(`God Mode ${on ? 'enabled' : 'disabled'}`, 'color:lime;');
    },
    flight: (on = true) => {
      flightEnabled = on;
      if (on) document.addEventListener('keydown', flightHandler);
      else document.removeEventListener('keydown', flightHandler);
      log(`Flight ${on ? 'enabled' : 'disabled'}`, 'color:deepskyblue;');
    }
  };
})();
