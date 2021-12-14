export function snowStorm({ canvasEl, density = 10000, minFallSpeed = 1, maxHSpeed = 3 }) {
  let ctx;
  let particles;
  let quit = true;

  function start() {
    quit = false;

    ctx = canvasEl.getContext('2d');
    reset();
    window.requestAnimationFrame(render);
    window.addEventListener('resize', reset);
  }

  function reset() {
    const { innerWidth: width, innerHeight: height } = window;
    canvasEl.width = width;
    canvasEl.height = height;

    particles = [];
    const maxParticles = Math.ceil((width * height) / density);

    for (let i = 0; i < maxParticles; i++) {
      const size = Math.random() * 4 + 5;
      particles.push({
        x: Math.random() * width, //x-coordinate
        y: Math.random() * height, //y-coordinate
        w: size,
        h: size,
        vy: minFallSpeed + Math.random(), //density
        vx: Math.random() * maxHSpeed - maxHSpeed / 2,
        fill: '#ffffff',
        s: Math.random() * 0.2 - 0.1,
      });
    }
  }

  function render() {
    const { width, height } = canvasEl;

    ctx.clearRect(0, 0, width, height);
    particles.forEach((p, i) => {
      p.y += p.vy;
      p.x += p.vx;
      ctx.fillStyle = p.fill;
      ctx.fillRect(p.x, p.y, p.w, p.h);
      if (p.x > width + 5 || p.x < -5 || p.y > height) {
        p.x = Math.random() * width;
        p.y = -10;
      }
    });
    if (quit) {
      return;
    }
    requestAnimationFrame(render);
  }

  function stop() {
    quit = true;
  }

  return {
    start,
    stop,
  };
}
