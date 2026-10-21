---
title: Stacks
socialImage: share/stacks.png
---
A lending library for your own books: catalog what you own, connect with friends, and lend and borrow. [Open Stacks](https://bookstacks.site/) · [Source on GitHub](https://github.com/grahamhagenah/bookshelf)

## The problem

Friends lend each other books all the time, and lose track of them just as often. Nobody remembers who has what, and there's no easy way to see what's on a friend's shelf before asking. Stacks puts your library online so friends can browse it and ask to borrow, and keeps track of where every book has gone.

## What it does

You add books by searching the Open Library catalog, and they appear on your shelf with their covers. Friends can browse your shelf, request a book, and get an email when you approve it. Stacks records who has each book, when it's due back, and its lending history. A public link lets anyone browse your shelf without an account.

<figure class="case-figure">
<img src="/screenshots/case-studies/stacks-home.webp" width="1400" height="875" loading="lazy" decoding="async" alt="Stacks' home page in dark mode: a Coming up line noting Piranesi is 5 days overdue with Sam Okafor and another book is due back in 2 days, then Loans in two columns, four books borrowed and five lent out, each with its cover, who has it and when it's due, and a Friend activity feed beside them, with Maya Chen's note on Circe and friends adding new books">
<figcaption>Home: what's due back soon, every loan in both directions, and what friends are reading and adding.</figcaption>
</figure>

## History

I built the first version by hand in December 2023: the data model, friends, notifications, and the mobile layouts. I came back to it in January 2026 and rebuilt much of it, adding book requests and due dates, email notifications, public share links, dark mode, and a lighter, faster interface.

## Decisions

**Lighter, not heavier.** The first version leaned on Material UI. In the rebuild I removed it in favour of plain Tailwind CSS, cutting the bundle size so pages load faster on a phone.

**Search you can narrow.** Open Library's catalog is enormous, so search filters by type and language and pages through results, rather than showing one long list.

**Mobile as a first-class layout.** Headers, search, notifications and shared shelves each have their own phone layout instead of a squeezed desktop page.

**Sharing without signing up.** The people most likely to look at your shelf aren't users yet, so a public link shows it to anyone.

## How it's built

Remix for the full-stack React app, Prisma with SQLite for the data, Tailwind CSS for styling, Resend for email, the Open Library API for book data and covers, all deployed on Fly.io.

## How I work

The first version was written by hand. For the 2026 rebuild, I designed the changes and directed the work, with much of the code written using AI (Claude).
