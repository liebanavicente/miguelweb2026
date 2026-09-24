"use client";

import { useEffect, useRef } from "react";

type Ball = { x: number; y: number; vx: number; vy: number; r: number; fill: [number, number, number] };
type Rect = { left: number; top: number; right: number; bottom: number };

// Light blue tones as [r, g, b]; each ball is a soft glow that fades out towards its edge.
const FILLS: Array<[number, number, number]> = [
  [120, 196, 255],
  [168, 220, 255],
  [76, 170, 245],
  [204, 236, 255],
];
const MAX_DT = 1 / 30;
const POINTER_RADIUS = 120;
// Breathing room between the balls and the words they bounce off.
const TEXT_PADDING = 4;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

/** Line boxes of the hero's text, buttons and photo: the balls treat them as walls so nothing gets covered. */
function measureObstacles(hero: HTMLElement, canvasRect: DOMRect): Rect[] {
  const rects: DOMRect[] = [];
  for (const element of hero.querySelectorAll<HTMLElement>("p, h1, a, [data-obstacle]")) {
    if (element.tagName === "A" || element.hasAttribute("data-obstacle")) {
      rects.push(element.getBoundingClientRect());
      continue;
    }
    // A Range hugs each line of text, unlike the element box that spans the whole column.
    const range = document.createRange();
    range.selectNodeContents(element);
    rects.push(...Array.from(range.getClientRects()));
  }
  return rects
    .filter((rect) => rect.width > 0 && rect.height > 0)
    .map((rect) => ({
      left: rect.left - canvasRect.left - TEXT_PADDING,
      top: rect.top - canvasRect.top - TEXT_PADDING,
      right: rect.right - canvasRect.left + TEXT_PADDING,
      bottom: rect.bottom - canvasRect.top + TEXT_PADDING,
    }));
}

function touches(x: number, y: number, r: number, rect: Rect) {
  return Math.hypot(x - clamp(x, rect.left, rect.right), y - clamp(y, rect.top, rect.bottom)) < r;
}

/** Pushes a ball out of a text box and bounces it off the side it hit. */
function bounceOffRect(ball: Ball, rect: Rect) {
  const closestX = clamp(ball.x, rect.left, rect.right);
  const closestY = clamp(ball.y, rect.top, rect.bottom);
  let nx = ball.x - closestX;
  let ny = ball.y - closestY;
  const distance = Math.hypot(nx, ny);
  if (distance >= ball.r) return;

  if (distance === 0) {
    // The centre got inside the box: leave through the nearest side.
    const exits = [
      { d: ball.x - rect.left, nx: -1, ny: 0 },
      { d: rect.right - ball.x, nx: 1, ny: 0 },
      { d: ball.y - rect.top, nx: 0, ny: -1 },
      { d: rect.bottom - ball.y, nx: 0, ny: 1 },
    ].sort((a, b) => a.d - b.d)[0];
    nx = exits.nx;
    ny = exits.ny;
    ball.x += nx * (exits.d + ball.r);
    ball.y += ny * (exits.d + ball.r);
  } else {
    nx /= distance;
    ny /= distance;
    ball.x = closestX + nx * ball.r;
    ball.y = closestY + ny * ball.r;
  }

  const inward = ball.vx * nx + ball.vy * ny;
  if (inward < 0) {
    ball.vx -= 2 * inward * nx;
    ball.vy -= 2 * inward * ny;
  }
}

function createBalls(width: number, height: number, obstacles: Rect[]): Ball[] {
  // Roughly one ball per 90px of width, a couple of large ones and many small ones; smaller on phones.
  const compact = width < 700;
  const count = compact ? 7 : Math.min(16, Math.round(width / 90));
  const balls: Ball[] = [];
  for (let index = 0; index < count; index += 1) {
    const r = compact ? 8 + Math.random() * (index < 2 ? 18 : 10) : index < 2 ? 56 + Math.random() * 34 : 16 + Math.random() * 32;
    let x = 0;
    let y = 0;
    let placed = false;
    // Start in free space, away from the text and from other balls, so the first frame is calm.
    for (let attempt = 0; attempt < 80 && !placed; attempt += 1) {
      x = r + Math.random() * Math.max(1, width - 2 * r);
      y = r + Math.random() * Math.max(1, height - 2 * r);
      placed =
        obstacles.every((rect) => !touches(x, y, r + 2, rect)) &&
        balls.every((other) => Math.hypot(other.x - x, other.y - y) > other.r + r + 4);
    }
    if (!placed) continue;
    const speed = 14 + Math.random() * 18;
    const angle = Math.random() * Math.PI * 2;
    balls.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, r, fill: FILLS[index % FILLS.length] });
  }
  return balls;
}

function collide(a: Ball, b: Ball) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const distance = Math.hypot(dx, dy) || 0.001;
  const overlap = a.r + b.r - distance;
  if (overlap <= 0) return;

  const nx = dx / distance;
  const ny = dy / distance;
  const ma = a.r * a.r;
  const mb = b.r * b.r;

  // Separate them in proportion to their mass so neither sinks into the other.
  a.x -= nx * overlap * (mb / (ma + mb));
  a.y -= ny * overlap * (mb / (ma + mb));
  b.x += nx * overlap * (ma / (ma + mb));
  b.y += ny * overlap * (ma / (ma + mb));

  const approaching = (a.vx - b.vx) * nx + (a.vy - b.vy) * ny;
  if (approaching <= 0) return;
  // Elastic collision along the line between centres.
  const impulse = (2 * approaching) / (ma + mb);
  a.vx -= impulse * mb * nx;
  a.vy -= impulse * mb * ny;
  b.vx += impulse * ma * nx;
  b.vy += impulse * ma * ny;
}

/** Soft blue glows drifting behind the home heading, bouncing off each other, the edges and the words. */
export function HeroBalls() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let balls: Ball[] = [];
    let obstacles: Rect[] = [];
    const hero = canvas.parentElement!;
    let frame = 0;
    let last = 0;
    let visible = true;
    const pointer = { x: -9999, y: -9999 };

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const firstLayout = width === 0;
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.round(width * ratio);
      canvas!.height = Math.round(height * ratio);
      context!.setTransform(ratio, 0, 0, ratio, 0, 0);
      obstacles = measureObstacles(hero, rect);
      if (firstLayout) balls = createBalls(width, height, obstacles);
      for (const ball of balls) {
        ball.x = clamp(ball.x, ball.r, Math.max(ball.r, width - ball.r));
        ball.y = clamp(ball.y, ball.r, Math.max(ball.r, height - ball.r));
        for (const obstacle of obstacles) bounceOffRect(ball, obstacle);
      }
      draw();
    }

    function step(dt: number) {
      for (const ball of balls) {
        const dx = ball.x - pointer.x;
        const dy = ball.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        if (distance < POINTER_RADIUS + ball.r && distance > 0) {
          const push = (1 - distance / (POINTER_RADIUS + ball.r)) * 420 * dt;
          ball.vx += (dx / distance) * push;
          ball.vy += (dy / distance) * push;
        }
        // Gentle drag keeps pushed balls from racing forever, with a floor so nothing stops.
        const speed = Math.hypot(ball.vx, ball.vy);
        const target = speed > 45 ? speed * (1 - 1.2 * dt) : Math.max(speed, 12);
        if (speed > 0) {
          ball.vx *= target / speed;
          ball.vy *= target / speed;
        }

        ball.x += ball.vx * dt;
        ball.y += ball.vy * dt;
        if (ball.x < ball.r) [ball.x, ball.vx] = [ball.r, Math.abs(ball.vx)];
        if (ball.x > width - ball.r) [ball.x, ball.vx] = [width - ball.r, -Math.abs(ball.vx)];
        if (ball.y < ball.r) [ball.y, ball.vy] = [ball.r, Math.abs(ball.vy)];
        if (ball.y > height - ball.r) [ball.y, ball.vy] = [height - ball.r, -Math.abs(ball.vy)];
      }
      for (let i = 0; i < balls.length; i += 1) {
        for (let j = i + 1; j < balls.length; j += 1) collide(balls[i], balls[j]);
      }
      // Text goes last: a bump from another ball must never leave one drawn over the words.
      for (const ball of balls) for (const obstacle of obstacles) bounceOffRect(ball, obstacle);
    }

    function draw() {
      context!.clearRect(0, 0, width, height);
      for (const ball of balls) {
        const [red, green, blue] = ball.fill;
        const glow = context!.createRadialGradient(ball.x - ball.r * 0.3, ball.y - ball.r * 0.3, ball.r * 0.1, ball.x, ball.y, ball.r);
        glow.addColorStop(0, `rgba(${red}, ${green}, ${blue}, 0.55)`);
        glow.addColorStop(0.6, `rgba(${red}, ${green}, ${blue}, 0.28)`);
        glow.addColorStop(1, `rgba(${red}, ${green}, ${blue}, 0)`);
        context!.beginPath();
        context!.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
        context!.fillStyle = glow;
        context!.fill();
      }
    }

    function loop(time: number) {
      const dt = last ? Math.min((time - last) / 1000, MAX_DT) : 0;
      last = time;
      step(dt);
      draw();
      frame = requestAnimationFrame(loop);
    }

    function start() {
      if (reduceMotion || frame || !visible || document.hidden) return;
      last = 0;
      frame = requestAnimationFrame(loop);
    }

    function stop() {
      cancelAnimationFrame(frame);
      frame = 0;
    }

    const onVisibility = () => (document.hidden ? stop() : start());
    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };
    const onPointerLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    // Web fonts change the width of the lines, so measure again once they are in.
    void document.fonts?.ready.then(() => {
      obstacles = measureObstacles(hero, canvas.getBoundingClientRect());
      for (const ball of balls) for (const obstacle of obstacles) bounceOffRect(ball, obstacle);
    });
    // Nothing runs while the hero is scrolled out of view or the tab is hidden.
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    intersectionObserver.observe(canvas);
    document.addEventListener("visibilitychange", onVisibility);
    hero.addEventListener("pointermove", onPointerMove);
    hero.addEventListener("pointerleave", onPointerLeave);

    resize();
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      hero.removeEventListener("pointermove", onPointerMove);
      hero.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return <canvas aria-hidden className="hero-balls" ref={canvasRef} />;
}
