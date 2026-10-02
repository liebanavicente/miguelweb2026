"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * The page's motion layer, with GSAP. Everything here is off with reduced motion, and the page is complete without it:
 * - the hero assembles itself once the welcome film starts to dissolve;
 * - photos and clips behind the chapters drift slower than the text (any [data-speed] element);
 * - chapter heads and the larger blocks rise in as they reach the screen; the pen strokes draw themselves;
 * - the key numbers count up, and the experience timeline fills with ink as it is read.
 */

/** Rise in as they reach the screen. Nothing with a CSS transform transition: the two would fight. */
const REVEAL = [".chapter > *", ".stats", ".terminal", ".project-reel", ".marquee", ".timeline.jobs > li", ".band-photo figcaption", ".contact-card"].join(", ");

/** Inside a chapter that unfolds: the blocks that come in one after another. */
const FOLD_ITEMS = [
  ".offer-card",
  ".project-card",
  ".more-projects",
  ".fold-inner > div > .tabs",
  ".role-group",
  ".diploma-summary",
  ".diploma-grid",
  ".edu-layout .timeline > li",
  ".edu-side > .sheet",
  ".skills-grid > .sheet",
  ".timeline.jobs > li",
].join(", ");

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const inView = (element: Element) => {
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
};

/** A chapter just unfolded: its blocks rise in, one after another. */
export function riseIn(container: HTMLElement | null) {
  if (!container || reducedMotion()) return;
  const items = container.querySelectorAll(FOLD_ITEMS);
  // Cards lift on hover with a CSS transition on transform; it is switched off while GSAP moves them.
  gsap.set(items, { transition: "none" });
  gsap.fromTo(
    items,
    { y: 26, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 0.6, delay: 0.12, ease: "power3.out", stagger: 0.06, overwrite: true, clearProps: "transform,opacity,visibility,transition" },
  );
}

/** Counts the number inside a stat up from zero, keeping its sign ("+20"). The final text is in the HTML from the start. */
function countUp(element: HTMLElement, trigger: Element) {
  // The original text is kept aside: this can run twice (React's development checks, a motion setting change).
  const text = (element.dataset.text ??= element.textContent ?? "");
  const match = text.match(/\d+/);
  if (!match) return;
  const target = Number(match[0]);
  const counter = { value: 0 };
  const show = (value: number) => {
    element.textContent = text.replace(match[0], String(value));
  };
  show(0);
  gsap.to(counter, {
    value: target,
    duration: 1.4,
    ease: "power2.out",
    onUpdate: () => show(Math.round(counter.value)),
    onComplete: () => show(target),
    scrollTrigger: { trigger, start: "top 85%", once: true },
  });
}

export function Motion() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const root = document.documentElement;

      // ---- Hero: the title rises word group by word group, the ink disc swells and the portrait rises into it, the editor slides in.
      const heroPaths = gsap.utils.toArray<SVGPathElement>(".hero-title .scribble path");
      gsap.set(heroPaths, { animation: "none", strokeDashoffset: 1 });
      const hero = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
      hero
        .set(".hero-copy, .hero-visual", { autoAlpha: 1 })
        .from(".hero .kicker", { y: 14, autoAlpha: 0, duration: 0.5 })
        .from(".hero-title .rise", { yPercent: 60, rotate: 2.5, autoAlpha: 0, duration: 0.85, stagger: 0.12, ease: "back.out(1.5)" }, "-=0.25")
        .to(heroPaths, { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut" }, "-=0.15")
        .from(".hero .lede", { y: 18, autoAlpha: 0, duration: 0.6 }, "-=0.7")
        .from(".hero .actions > *", { y: 16, autoAlpha: 0, duration: 0.5, stagger: 0.08, clearProps: "transform" }, "-=0.4")
        .from(".hero-meta", { autoAlpha: 0, duration: 0.6 }, "-=0.2")
        .from(".hero-disc", { scale: 0.4, autoAlpha: 0, duration: 1.1, ease: "back.out(1.4)", clearProps: "transform" }, 0.1)
        // y, not yPercent: yPercent belongs to the scroll drift below.
        .from(".hero-photo img", { y: 60, autoAlpha: 0, duration: 1.1 }, 0.3)
        .from(".code-card", { y: 40, autoAlpha: 0, duration: 0.8 }, 0.6);

      // On a first visit the welcome film covers the page: start as it begins to dissolve, like the CSS animations do.
      let observer: MutationObserver | undefined;
      if (root.dataset.intro === "play") {
        observer = new MutationObserver(() => {
          if (root.dataset.intro === "play") return;
          observer?.disconnect();
          hero.play();
        });
        observer.observe(root, { attributes: true, attributeFilter: ["data-intro"] });
      } else {
        hero.play();
      }

      // ---- Depth: photos drift against the scroll, the portrait a little, the backdrops more.
      gsap.to(".hero-photo img", { yPercent: 6, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((element) => {
        const speed = Number(element.dataset.speed) || 8;
        gsap.fromTo(
          element,
          { yPercent: -speed },
          { yPercent: speed, ease: "none", scrollTrigger: { trigger: element.parentElement, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });

      // ---- Reveal on scroll. What is already on screen stays put: it was painted before this ran.
      const pending = gsap.utils.toArray<HTMLElement>(REVEAL).filter((element) => !inView(element));
      gsap.set(pending, { y: 28, autoAlpha: 0 });
      const show = (batch: Element[]) =>
        gsap.to(batch, { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.08, ease: "power3.out", overwrite: true, clearProps: "transform,opacity,visibility" });
      // Jumping from the menu skips straight past a block; it should still be there when the reader scrolls back.
      ScrollTrigger.batch(pending, { start: "top 90%", once: true, onEnter: show, onLeave: show });

      // ---- Pen strokes under the chapter titles draw themselves when the title comes into view.
      gsap.utils.toArray<SVGPathElement>(".scribble:not(.on-load) path").forEach((path) => {
        gsap.set(path, { animation: "none", strokeDashoffset: 1 });
        gsap.to(path, { strokeDashoffset: 0, duration: 0.9, delay: 0.25, ease: "power2.inOut", scrollTrigger: { trigger: path.closest(".scribble"), start: "top 85%", once: true } });
      });

      // ---- Key numbers count up.
      const stats = document.querySelector(".stats");
      if (stats) gsap.utils.toArray<HTMLElement>(".stat-value").forEach((value) => countUp(value, stats));

      // ---- Experience: the line fills with ink as it is read, and each stop lights up when the ink reaches it.
      const jobs = document.querySelector<HTMLElement>(".timeline.jobs");
      if (jobs) {
        gsap.fromTo(jobs, { "--progress": 0 }, { "--progress": 1, ease: "none", scrollTrigger: { trigger: jobs, start: "top 70%", end: "bottom 70%", scrub: 0.6 } });
        jobs.querySelectorAll(":scope > li").forEach((item) => {
          ScrollTrigger.create({
            trigger: item,
            start: "top 70%",
            onEnter: () => item.classList.add("is-reached"),
            onLeaveBack: () => item.classList.remove("is-reached"),
          });
        });
      }

      // Chapters fold and unfold, which moves everything below them: measure again once the page settles.
      let timer = 0;
      const resize = new ResizeObserver(() => {
        window.clearTimeout(timer);
        timer = window.setTimeout(() => ScrollTrigger.refresh(), 200);
      });
      const main = document.getElementById("contenido");
      if (main) resize.observe(main);

      return () => {
        document.querySelectorAll<HTMLElement>(".stat-value[data-text]").forEach((value) => (value.textContent = value.dataset.text ?? ""));
        observer?.disconnect();
        resize.disconnect();
        window.clearTimeout(timer);
      };
    });
    return () => mm.revert();
  });

  return null;
}
