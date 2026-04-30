/* ============================================================
   1. CURSOR dot
   ============================================================ */
(function () {
    const dot = document.createElement('div');
    dot.id = 'custom-cursor-dot';
    document.body.appendChild(dot);

    let mx = -300, my = -300;

    document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        dot.style.left = mx + 'px';
        dot.style.top  = my + 'px';
    });

    const targets = 'a,button,input,select,textarea,.btn,.nav-item,.card,.stat-card,label,[role=button]';
    document.addEventListener('mouseover', e => { if (e.target.closest(targets)) { dot.classList.add('cursor-hover'); } });
    document.addEventListener('mouseout',  e => { if (e.target.closest(targets)) { dot.classList.remove('cursor-hover'); } });
    document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; });
})();


/* ============================================================
   2. CURSOR TRAIL
   ============================================================ */
(function () {
    const COUNT = 18;
    const trail = [];

    for (let i = 0; i < COUNT; i++) {
        const el = document.createElement('div');
        el.className = 'cursor-trail-dot';
        const size = Math.max(2, 10 - i * 0.45);
        el.style.width = size + 'px';
        el.style.height = size + 'px';
        document.body.appendChild(el);
        trail.push({ el, x: -300, y: -300, size });
    }

    let mx = -300, my = -300;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

    (function loop() {
        let x = mx, y = my;
        for (let i = 0; i < COUNT; i++) {
            const d = trail[i], px = d.x, py = d.y;
            d.x += (x - d.x) * (0.35 - i * 0.012);
            d.y += (y - d.y) * (0.35 - i * 0.012);
            d.el.style.left    = d.x + 'px';
            d.el.style.top     = d.y + 'px';
            d.el.style.opacity = ((COUNT - i) / COUNT * 0.6).toFixed(2);
            x = px; y = py;
        }
        requestAnimationFrame(loop);
    })();
})();