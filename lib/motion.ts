/**
 * Runs in <head> before first paint and marks <html data-motion> when GSAP will animate the page, so the hero can
 * stay hidden until it is assembled instead of flashing in its final place first. Never with reduced motion.
 */
export const MOTION_SCRIPT = `try{if(!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.motion="on"}catch(e){}`;
