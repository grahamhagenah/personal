import { h } from "preact"
import { resolveRelative } from "@quartz-community/utils"

const css = `
.site-nav-links {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}
`

export const NavLinks = () => {
  const SiteNavLinks = ({ fileData }) => {
    const work = resolveRelative(fileData.slug, "work")
    const projects = resolveRelative(fileData.slug, "projects")
    const about = resolveRelative(fileData.slug, "about")
    return h(
      "div",
      { class: "site-nav-links" },
      h("a", { href: work }, "Work"),
      h("a", { href: projects }, "Projects"),
      h("a", { href: about }, "About"),
    )
  }
  SiteNavLinks.css = css
  return SiteNavLinks
}
