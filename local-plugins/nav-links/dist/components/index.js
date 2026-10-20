import { h } from "preact"
import { resolveRelative } from "@quartz-community/utils"

// The site's page links. On a wide screen they sit in a row; on a narrow one they fold into a menu button that
// opens a small panel, so the header stays on one line. The menu is a <details> element, which the browser makes
// keyboard- and screen-reader-friendly by itself. Styles are in quartz/styles/custom.scss.
export const NavLinks = () => {
  const SiteNavLinks = ({ fileData }) => {
    const pages = [
      ["Work", resolveRelative(fileData.slug, "work")],
      ["Projects", resolveRelative(fileData.slug, "projects")],
      ["About", resolveRelative(fileData.slug, "about")],
    ]
    const links = () => pages.map(([label, href]) => h("a", { href }, label))
    return h(
      "nav",
      { class: "site-nav", "aria-label": "Site" },
      h("div", { class: "site-nav-links" }, links()),
      h(
        "details",
        { class: "site-nav-menu" },
        h(
          "summary",
          null,
          "Menu",
          h(
            "svg",
            { viewBox: "0 0 12 12", width: 11, height: 11, "aria-hidden": "true", fill: "none", stroke: "currentColor", "stroke-width": 1.5, "stroke-linecap": "round", "stroke-linejoin": "round" },
            h("path", { d: "M3 4.5l3 3 3-3" }),
          ),
        ),
        h("div", { class: "site-nav-panel" }, links()),
      ),
    )
  }
  SiteNavLinks.afterDOMLoaded = `
    const menu = document.querySelector(".site-nav-menu")
    if (menu) {
      const close = () => { menu.open = false }
      document.addEventListener("click", (e) => { if (menu.open && !menu.contains(e.target)) close() })
      document.addEventListener("keydown", (e) => { if (e.key === "Escape" && menu.open) { close(); menu.querySelector("summary").focus() } })
      menu.querySelectorAll(".site-nav-panel a").forEach((a) => a.addEventListener("click", close))
    }
  `
  return SiteNavLinks
}
