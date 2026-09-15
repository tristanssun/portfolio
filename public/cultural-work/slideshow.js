(() => {
  function fitToWindow() {
    const scale = Math.min(1, window.innerWidth / 1440, window.innerHeight / 900);
    const root = document.documentElement;
    root.style.setProperty('--canvas-width', `${window.innerWidth / scale}px`);
    root.style.setProperty('--canvas-height', `${window.innerHeight / scale}px`);
    root.style.setProperty('--canvas-scale', scale);
  }
  fitToWindow();
  window.addEventListener('resize', fitToWindow);

  const slides = Array.from(document.querySelectorAll('.slide'));
  const previous = document.getElementById('previous');
  const next = document.getElementById('next');
  const counter = document.getElementById('counter');
  const progress = document.getElementById('progress-fill');
  let current = 0;
  let lockedUntil = 0;
  let wheelTotal = 0;
  let lastWheel = 0;
  let wheelArmed = true;
  const soundtrack = document.getElementById('soundtrack');
  const musicToggle = document.getElementById('music-toggle');
  let musicPausedByVisitor = false;
  soundtrack.volume = 0.25;
  function updateMusicControl() {
    musicToggle.classList.toggle('is-playing', !soundtrack.paused);
    musicToggle.title = soundtrack.paused ? 'Play music' : 'Pause music';
  }
  function startMusic() {
    if (!musicPausedByVisitor && soundtrack.paused) soundtrack.play().catch(() => {});
  }
  soundtrack.addEventListener('play', updateMusicControl);
  soundtrack.addEventListener('pause', updateMusicControl);
  document.addEventListener('pointerdown', event => {
    if (!event.target.closest('#music-toggle')) startMusic();
  }, { capture: true });
  document.addEventListener('keydown', startMusic, { capture: true });
  musicToggle.addEventListener('click', () => {
    musicPausedByVisitor = !soundtrack.paused;
    if (musicPausedByVisitor) soundtrack.pause();
    else startMusic();
  });
  startMusic();

  function show(index, immediate = false) {
    index = Math.max(0, Math.min(slides.length - 1, index));
    if (!immediate && (index === current || performance.now() < lockedUntil)) return;
    const outgoing = slides[current];
    outgoing.classList.remove('active');
    outgoing.classList.add('leaving');
    setTimeout(() => outgoing.classList.remove('leaving'), 750);
    current = index;
    slides[current].classList.add('active');
    document.body.classList.toggle('on-dark', slides[current].classList.contains('dark'));
    document.body.classList.toggle('on-media', [3, 5].includes(current));
    counter.textContent = `${String(current + 1).padStart(2, '0')} / 15`;
    progress.style.width = `${(current + 1) / slides.length * 100}%`;
    previous.disabled = current === 0;
    next.disabled = current === slides.length - 1;
    lockedUntil = immediate ? 0 : performance.now() + 760;
    wheelTotal = 0;
    if (current === 2 || current === 3) {
      const streetView = document.getElementById('street-view');
      if (!streetView.src) streetView.src = streetView.dataset.src;
    }
  }

  previous.addEventListener('click', () => show(current - 1));
  next.addEventListener('click', () => show(current + 1));
  document.getElementById('restart').addEventListener('click', () => {
    show(0, true);
    window.getSelection().removeAllRanges();
  });
  document.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.repeat) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      show(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  document.addEventListener('click', event => {
    if (event.target.closest('a, button, .navigation, .street-slide') || window.getSelection().toString()) return;
    show(current + 1);
  });
  document.addEventListener('wheel', event => {
    if (event.ctrlKey || current === 3) return;
    event.preventDefault();
    const now = performance.now();
    const gap = now - lastWheel;
    lastWheel = now;
    if (gap > 180) wheelArmed = true;
    if (!wheelArmed) return;
    if (now < lockedUntil) { wheelTotal = 0; return; }
    if (gap > 180) wheelTotal = 0;
    const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1);
    if (Math.sign(delta) !== Math.sign(wheelTotal)) wheelTotal = 0;
    wheelTotal += delta;
    if (Math.abs(wheelTotal) >= 55) {
      show(current + Math.sign(wheelTotal));
      wheelArmed = false;
    }
  }, { passive: false });

  const data = [
    ['2020-05-31', 28], ['2020-06-07', 30], ['2020-06-14', 39],
    ['2020-06-21', 44], ['2020-06-28', 43], ['2020-07-05', 52],
    ['2020-07-12', 61], ['2020-07-19', 71], ['2020-07-26', 84],
    ['2020-08-02', 96]
  ];
  const svg = document.getElementById('ons-chart');
  const NS = 'http://www.w3.org/2000/svg';
  const start = Date.parse('2020-05-24');
  const end = Date.parse('2020-08-09');
  const x = date => 58 + (Date.parse(date) - start) / (end - start) * 1188;
  const y = value => 446 - value / 100 * 384;
  function element(type, attributes, text) {
    const node = document.createElementNS(NS, type);
    Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
    if (text !== undefined) node.textContent = text;
    svg.append(node);
    return node;
  }
  for (let value = 0; value <= 100; value += 25) {
    element('line', { x1:58, x2:1246, y1:y(value), y2:y(value), class:'grid' });
    element('text', { x:39, y:y(value) + 4, 'text-anchor':'end' }, `${value}%`);
  }
  [['2020-05-31','31 May'],['2020-06-14','14 June'],['2020-06-28','28 June'],['2020-07-12','12 July'],['2020-07-26','26 July'],['2020-08-02','2 August']].forEach(([date,label]) => {
    element('text', { x:x(date), y:478, 'text-anchor':'middle' }, label);
  });
  element('path', { d:data.map(([date,value],index) => `${index ? 'L' : 'M'} ${x(date)} ${y(value)}`).join(' '), class:'data-line' });
  data.forEach(([date,value]) => element('circle', { cx:x(date), cy:y(value), r:4, class:'data-point' }));
  show(0, true);
})();
