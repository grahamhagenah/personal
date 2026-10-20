import { h } from "preact"
import { resolveRelative } from "@quartz-community/utils"

// Which section a page belongs to, for marking the current link: a case study is part of Projects, the agency
// page part of Work.
const SECTION = {
  work: "work",
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

// The site's page links and the résumé. On a wide screen they sit in a row; on a narrow one they fold into a
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
    // Opens in the browser's own PDF viewer; the résumé buttons on the pages download it.
    const resume = (cls) => h("a", { href: RESUME, class: cls, target: "_blank", rel: "noopener" }, "Résumé")
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

      // The header sticks to the top: it slides away while you scroll down to read, and comes back as soon as you
      // scroll up. It stays put while its menu is open or something in it has keyboard focus.
      let lastY = window.scrollY
      const update = () => {
        const bar = document.querySelector(".page-header")
        if (!bar) return
        const y = Math.max(window.scrollY, 0)
        const busy = (menu() && menu().open) || bar.contains(document.activeElement)
        bar.classList.toggle("scrolled", y > 8)
        if (y < 80 || busy || y < lastY - 2) bar.classList.remove("tucked")
        else if (y > lastY + 2) bar.classList.add("tucked")
        lastY = y
      }
      window.addEventListener("scroll", update, { passive: true })
      document.addEventListener("focusin", update)
      document.addEventListener("nav", () => { lastY = 0; update() })
    }
  `
  return SiteNavLinks
}
