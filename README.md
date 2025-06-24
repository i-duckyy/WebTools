# WebTools

A collection of handy scripts for Google Chrome's Developer Tools Console.

---

## Info

These scripts are primarily tested and designed for Google Chrome's DevTools Console. They may not work properly in other browsers' consoles due to differences in JavaScript engines or page behaviors.

We are using loader scripts because the actual code for the scripts are too long and will clutter your Console.

If there are issues, errors or problems, just create a comment in the `Issues` tab and it will be fixed.

---

## Warning

If you do not trust these loader scripts, look through the directed file's code for proof that it is legit and not malicious.

---

## DinoCheatMenu

A cheat menu for the Chrome offline dinosaur game (`chrome://dino/`)

### How to use

Paste the following loader script into the Chrome DevTools Console on `chrome://dino/` to load the full cheat menu:

```js
(() => {
  const url = 'https://raw.githubusercontent.com/i-duckyy/WebTools/refs/heads/main/DinoCheatMenu.js';
  console.log('[Loader] Loading DinoCheatMenu...');
  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      return res.text();
    })
    .then((code) => {
      const fn = new Function(code);
      fn();
      console.log('[Loader] DinoCheatMenu loaded successfully.');
    })
    .catch((err) => {
      console.error('[Loader] Failed to load DinoCheatMenu:', err);
    });
})();
```

---

## Chat GPT Tweaks

Adds themeing to `https://chatgpt.com`

### How to use

Paste the following loader script into the Chrome DevTools Console on  `https://chatgpt.com` to load:

```js
(() => {
  const url = 'https://raw.githubusercontent.com/i-duckyy/WebTools/refs/heads/main/ChatGPT.tweaks.js';
  console.log('[Loader] Loading ChatGPT Tweaks...');
  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      return res.text();
    })
    .then((code) => {
      const fn = new Function(code);
      fn();
      console.log('[Loader] ChatGPT Tweaks loaded successfully.');
    })
    .catch((err) => {
      console.error('[Loader] Failed to load ChatGPT Tweaks:', err);
    });
})();
```
