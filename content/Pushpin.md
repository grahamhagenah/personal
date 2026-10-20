---
title: Pushpin
socialImage: share/pushpin.png
---
Concerts, films, and talks around Boston, the Bay Area, and Western Mass, gathered from the venues' own listings into one plain list. [Visit Pushpin](https://pushpin.city/) · [Source on GitHub](https://github.com/grahamhagenah/news)

## The problem

What's on in Boston is scattered across dozens of venue websites. The big ticketing sites cover the arenas and miss most of what I actually go to: repertory screenings at the Brattle and the Coolidge, a folk show at Club Passim, a talk at a branch library. I was checking a dozen sites a week, so I built one list that checks them for me.

## What it does

Pushpin reads 58 venues' listings across three cities and shows what's on, day by day, sorted by music, film, and art and talks. A film showing at four theaters is one row ("You Can See Everything, from 6pm at 4 theaters") that opens to every showtime. It rebuilds through the day, and new listings show up in a "Just announced" line at the top.

## Constraints I set

- **Free to run.** It's static pages, built by GitHub Actions and served by GitHub Pages. No server, no database, no bill.
- **No dependencies.** The builder uses only Python's standard library, so there's nothing to update or break.
- **Fast and readable on a phone.** Most people look at it on the way out the door.
- **No accounts.** Nothing to sign up for, and no tracking beyond a privacy-friendly visit count.

## Decisions

**Lead with the event, not the venue.** Each row starts with the title, then the times, with the venue on the right. On a phone the row reads as a sentence. I tried a few layouts against real listings before settling on this one.

<figure class="case-figure">
<img src="/screenshots/case-studies/pushpin-listing.webp" width="1400" height="878" loading="lazy" decoding="async" alt="Pushpin Boston with one film, You Can See Everything, open in a panel beside the list: a still from the film, its showtimes at four theaters with one sold out, and a short description">
<figcaption>One film, four theaters: opening a row shows every showtime, with sold-out ones struck through.</figcaption>
</figure>

**Leave things to the venues.** Pushpin doesn't show ticket prices for films or age limits for shows. Venues change those, and a wrong price is worse than none. Every listing links straight to the venue's own page.

**Say no to features that would quietly fail.** I considered letting people save events. With no accounts, saves would live in the browser, and Safari deletes that storage after a week without a visit, so saves would vanish for anyone who checks in every couple of weeks. I set it aside.

**Fuller coverage over more cities.** After launching the Bay Area, I focused on filling gaps in the cities Pushpin already covers instead of adding new ones. A city missing half its venues isn't much use to anyone.

## What broke, and how I caught it

**A window that wouldn't close, only in Chrome.** Closing an event left an invisible, full-height copy of the panel at the bottom of the page, which swallowed clicks. The cause was a style that overrode the browser's own rule for hiding a closed dialog. Several plausible fixes didn't work until I traced what was actually on the page.

**The Bay Area thought it was tomorrow.** The page decided what "today" meant using Boston's clock, so in California the evening's events disappeared hours early. Each city now carries its own time zone, from the build through to the page.

**Venues change their websites without notice.** Each venue reader is tested against saved copies of real pages, so a change that breaks one fails the tests instead of the live site. If a source keeps failing for hours, the build opens an issue on GitHub, which emails me.

<figure class="case-figure">
<img src="/screenshots/case-studies/pushpin-alert.webp" width="1400" height="1010" loading="lazy" decoding="async" alt="A GitHub issue opened by the build: Source failing: Lizard Lounge (events), saying the venue has failed every build for about six hours with a 504 error, followed by the build's own reply, Lizard Lounge is loading again, and the issue closed">
<figcaption>The build opened this issue when a venue's site went down, and closed it again on its own once the site came back.</figcaption>
</figure>

## How it's built

A reader for each kind of source (venue calendars, ticketing systems, and a few APIs) turns listings into one shape. The build combines them, merges films across theaters, and writes plain HTML for each city, day, and kind of event, along with the structured data Google uses to show events in search. The whole site is rebuilt every few hours, and the newsfeed it shares a codebase with every 15 minutes.

## How I work

I designed Pushpin and directed its development, with the code written using AI (Claude). My part is deciding what to build, how it should look and behave, catching what's wrong, and choosing what ships. Most of the work is in the last two.

## What's next

An alert for a venue that hasn't failed but has gone quiet, and more Bay Area venues: the Fillmore, Freight & Salvage, and a few neighborhood cinemas.
