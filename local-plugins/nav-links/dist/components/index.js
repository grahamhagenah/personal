import { h } from "preact"
import { resolveRelative } from "@quartz-community/utils"

// Which section a page belongs to, for marking the current link: a case study is part of Projects, the agency
// page part of Work.
const SECTION = {
  work: "work",
  "client-work": "work",
  "bartlett-interactive": "work",
  projects: "projects",
  pushpin: "projects",
  "flow-sequencer": "projects",
  bounce: "projects",
  stacks: "projects",
  "retro-blackjack": "projects",
  about: "about",
}

const RESUME = "/graham-hagenah-resume.pdf"

// The site's page links and the resume. On a wide screen they sit in a row; on a narrow one they fold into a
// menu button that opens a small panel, so the header stays on one line. The menu is a <details> element, which
// the browser makes keyboard- and screen-reader-friendly by itself. Styles are in quartz/styles/custom.scss.
export const NavLinks = () => {
  const SiteNavLinks = ({ fileData }) => {
    const current = SECTION[fileData.slug]
    const pages = [
      ["work", "Work"],
      ["projects", "Projects"],
      ["about", "About"],
    ]
    const links = () =>
      pages.map(([slug, label]) =>
        h("a", { href: resolveRelative(fileData.slug, slug), "aria-current": current === slug ? "page" : undefined }, label),
      )
    // Opens in the browser's own PDF viewer; the resume buttons on the pages download it.
    const resume = (cls) => h("a", { href: RESUME, class: cls, target: "_blank", rel: "noopener" }, "Resume")
    return h(
      "nav",
      { class: "site-nav", "aria-label": "Site" },
      h("div", { class: "site-nav-links" }, links(), resume("nav-resume")),
      h(
        "details",
        { class: "site-nav-menu" },
        h(
          "summary",
          { "aria-label": "Menu" },
          h(
            "svg",
            { viewBox: "0 0 24 24", width: 30, height: 30, "aria-hidden": "true", fill: "none", stroke: "currentColor", "stroke-width": 1.6, "stroke-linecap": "round" },
            h("path", { d: "M5 9.5h14M9 14.5h10" }),
          ),
        ),
        h("div", { class: "site-nav-panel" }, links(), resume("panel-resume")),
      ),
    )
  }
  // Set up once per visit. Pages are swapped in place as you move around the site, so every handler looks the
  // header up afresh instead of keeping hold of it.
  SiteNavLinks.afterDOMLoaded = `
    if (!window.__siteNavReady) {
      window.__siteNavReady = true
      const menu = () => document.querySelector(".site-nav-menu")
      const close = () => { const m = menu(); if (m) m.open = false }

      // The menu closes on a tap outside it, on Escape, and on following one of its links.
      document.addEventListener("click", (e) => {
        const m = menu()
        if (!m || !m.open) return
        if (!m.contains(e.target) || e.target.closest(".site-nav-panel a")) close()
      })
      document.addEventListener("keydown", (e) => {
        const m = menu()
        if (e.key === "Escape" && m && m.open) { close(); m.querySelector("summary").focus() }
      })

      // The header sticks to the top; once the page has scrolled, it gains a hairline along its bottom edge.
      const update = () => {
        const bar = document.querySelector(".page-header")
        if (bar) bar.classList.toggle("scrolled", window.scrollY > 8)
      }
      window.addEventListener("scroll", update, { passive: true })
      document.addEventListener("nav", update)

      // Filmstrips: a pair of arrow buttons above each, which page it along by most of its width and grey out
      // at either end. (Pages are swapped in place, so they're added again after each move around the site.)
      const arrow = (d) => '<svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' + d + '"/></svg>'
      const filmstrips = () => {
        for (const strip of document.querySelectorAll(".filmstrip")) {
          if (strip.dataset.ready) continue
          strip.dataset.ready = "true"
          const controls = document.createElement("div")
          controls.className = "filmstrip-controls"
          const make = (label, d, dir) => {
            const b = document.createElement("button")
            b.type = "button"
            b.setAttribute("aria-label", label)
            b.setAttribute("aria-controls", strip.id)
            b.innerHTML = arrow(d)
            b.addEventListener("click", () => {
              const smooth = !matchMedia("(prefers-reduced-motion: reduce)").matches
              strip.scrollBy({ left: dir * strip.clientWidth * 0.7, behavior: smooth ? "smooth" : "auto" })
            })
            return b
          }
          const prev = make("Scroll photos back", "M10 3.5L5.5 8l4.5 4.5", -1)
          const next = make("Scroll photos forward", "M6 3.5L10.5 8 6 12.5", 1)
          controls.append(prev, next)
          strip.before(controls)
          const ends = () => {
            prev.disabled = strip.scrollLeft < 4
            next.disabled = strip.scrollLeft + strip.clientWidth > strip.scrollWidth - 4
          }
          strip.addEventListener("scroll", ends, { passive: true })
          // With a mouse it starts at its middle, so it reads as balanced rather than running off to the right, and
          // stays centred as photos load until someone moves it themselves. On a touch screen it starts at the first
          // photo, lined up with the text, ready to swipe.
          const startCentred = matchMedia("(hover: hover) and (pointer: fine)").matches
          let touched = !startCentred
          for (const ev of ["pointerdown", "wheel", "touchstart", "keydown"]) {
            strip.addEventListener(ev, () => { touched = true }, { passive: true })
          }
          controls.addEventListener("click", () => { touched = true }, true)
          const centre = () => {
            if (!touched) strip.scrollLeft = (strip.scrollWidth - strip.clientWidth) / 2
            ends()
          }
          // Checked again whenever the strip or a photo in it changes size: photos that finish loading after this
          // runs would otherwise leave the arrows judging a strip with nothing in it yet.
          const watch = new ResizeObserver(centre)
          watch.observe(strip)
          strip.querySelectorAll("figure").forEach((f) => watch.observe(f))
          centre()
        }
      }
      filmstrips()
      document.addEventListener("nav", filmstrips)
    }
  `
  return SiteNavLinks
}
