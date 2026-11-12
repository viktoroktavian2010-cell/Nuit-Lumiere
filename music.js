(() => {
  const button = document.querySelector('[data-site-music]');
  if (!button) return;

  const audio = new Audio('/nuit-lumiere-theme.mp3');
  audio.loop = true;
  audio.preload = 'auto';
  audio.volume = 0.48;

  const setState = (playing) => {
    button.textContent = playing ? 'Pause music' : 'Play music';
    button.setAttribute('aria-pressed', String(playing));
    button.dataset.playing = String(playing);
  };

  const play = async () => {
    try {
      await audio.play();
      localStorage.setItem('nuit-lumiere-music', 'on');
      setState(true);
      return true;
    } catch {
      setState(false);
      return false;
    }
  };

  const pause = () => {
    audio.pause();
    localStorage.setItem('nuit-lumiere-music', 'off');
    setState(false);
  };

  button.addEventListener('click', async () => {
    if (audio.paused) await play();
    else pause();
  });

  // Try autoplay; browsers that block it leave the visible Play music control ready.
  // Always request playback on every page load (including navigation to the collection).
  // The browser may still block audible autoplay until a user gesture is made.
  localStorage.removeItem('nuit-lumiere-music');
  play();

  // A first genuine user gesture can satisfy browser autoplay policies.
  const startAfterGesture = (event) => {
    if (event.target === button || !audio.paused) return;
    play();
    window.removeEventListener('pointerup', startAfterGesture, true);
    window.removeEventListener('keydown', startAfterGesture, true);
  };
  window.addEventListener('pointerup', startAfterGesture, true);
  window.addEventListener('keydown', startAfterGesture, true);
})();
