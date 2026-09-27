/** sessionStorage key: the welcome film plays once per visit, not on every language switch or reload. */
export const INTRO_SEEN_KEY = "intro-seen";

/**
 * Runs in <head> before first paint and marks <html data-intro="play"> when the welcome film should show, so the
 * overlay covers the page from the very first frame and returning visitors never see it flash.
 */
export const INTRO_SCRIPT = `try{if(!sessionStorage.getItem("${INTRO_SEEN_KEY}")&&!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.intro="play"}catch(e){}`;
