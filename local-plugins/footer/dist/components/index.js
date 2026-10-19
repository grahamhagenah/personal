import { h } from "preact"
import { resolveRelative } from "@quartz-community/utils"

// The footer: set apart from the page by a hairline and space, then the site's own pages, the projects,
// and where else to find or reach Graham, in columns that wrap on a phone. The credit last, as fine print.
// Its styles are in quartz/styles/custom.scss, beside the rules they have to win over.

const column = (title, links) =>
  h("div", null, h("h2", null, title),
    h("ul", null, links.map(([label, href]) => h("li", null, h("a", { href }, label)))))

export const Footer = () => {
  const SiteFooter = ({ fileData, displayClass }) => {
    const to = slug => resolveRelative(fileData.slug, slug)
    return h(
      "footer",
      { class: `site-footer ${displayClass ?? ""}` },
      h("div", { class: "footer-inner" },
      h("div", { class: "footer-columns" },
        h("div", { class: "footer-intro" },
          h("p", { class: "footer-name" }, "Graham Hagenah"),
          h("p", { class: "footer-blurb" }, "Full-stack developer making fast, accessible websites and applications."),
        ),
        column("Site", [["Home", to("index")], ["Work", to("work")], ["Projects", to("projects")], ["About", to("about")]]),
        column("Projects", [
          ["Pushpin", "https://pushpin.city/"],
          ["Flow Sequencer", "https://yoga.grahamhagenah.com/"],
          ["Bounce", "https://bounce.grahamhagenah.com/"],
        ]),
        column("Contact", [
          ["Email", "mailto:gwhagenah@gmail.com"],
          ["GitHub", "https://github.com/grahamhagenah"],
        ]),
      ),
      h("p", { class: "footer-credit" },
        "© ", new Date().getFullYear(), " Graham Hagenah. Built with ",
        h("a", { href: "https://quartz.jzhao.xyz/" }, "Quartz"), "."),
      ),
    )
  }
  return SiteFooter
}
