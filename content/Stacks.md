---
title: Stacks
socialImage: share/stacks.png
---
A lending library for the books you and your friends own: see who has what, borrow and lend, and keep track of where every copy has gone. [Try the demo](https://bookstacks.app/demo) · [Open Stacks](https://bookstacks.app/) · [Source on GitHub](https://github.com/grahamhagenah/bookshelf)

**My role:** sole designer and developer, from the data model to the emails. **Built:** 2023, rebuilt and extended in 2026. **Stack:** Remix, React, TypeScript, Prisma, SQLite, Tailwind CSS, Fly.io.

<figure class="case-figure">
<img src="/screenshots/case-studies/stacks-landing.webp" width="1400" height="875" decoding="async" alt="Stacks' landing page: the headline Your books. Our shelf., a line about cataloging your home library, borrowing from friends' shelves and lending with reminders, buttons to create an account or sign in, and a link to a demo library, beside a collage of a due-soon card, covers tagged Lent out and Borrowed, a control to lend Dune to Sam for 4 weeks, and a Reminder sent to Anika notice">
<figcaption>The landing page: what Stacks is for in one line, with sign-up and the demo a click away.</figcaption>
</figure>

## The problem

Friends lend each other books all the time, and lose track of them just as often. Nobody remembers who has what, and there's no easy way to see what's on a friend's shelf before asking. Reading apps like Goodreads track what you've read, not the physical copies or who's holding them.

## What it does

- **Borrow from friends.** Search once to see which friends own a book, and ask for it with a tap. The owner sets how long you can keep it, and Stacks reminds you both when it's due. If it's already out, you can join a waiting line.
- **Want to read.** Keep a list, and hear as soon as a friend adds one of those books to their shelf.
- **Every copy has a history.** Hearts and short notes stay with a book as it moves between friends, alongside a record of everyone who's borrowed it.
- **Fill a shelf in minutes.** Scan barcodes with a phone's camera, or import a Goodreads or StoryGraph export.
- **Households and sharing.** Housemates can share one shelf with their own logins, and a public link lets anyone browse your books without an account.
- **Reminders that matter.** Notifications before and after a book is due, an email for each borrow request, and a weekly email of what friends did and what's due back.

<figure class="case-figure">
<img src="/screenshots/case-studies/stacks-home.webp" width="1400" height="875" loading="lazy" decoding="async" alt="Stacks' home page: loans in two columns, four books borrowed from friends and six lent out, each with its cover, who it's from or to and when it's due, with Piranesi 5 days late, then a want-to-read row, beside a Friend activity column of notes about Circe, The Overstory and The Poppy War, each with a heart and the book's cover">
<figcaption>Home: your loans in both directions first, then books you want that a friend already has, with what friends are saying beside them.</figcaption>
</figure>

## Constraints I set

- **Physical books only.** No ratings, no recommendation engine, no public profiles. Every feature is about getting a copy into a friend's hands.
- **Easy to say no.** Every request goes to the owner, who can decline. Lending is never automatic.
- **Try it without signing up.** Anyone curious should be able to use every feature in under a minute.

## Decisions

**A demo you can actually use.** "Try the demo" builds a private sandbox for each visitor: a stocked library, friends with their own shelves, loans in both directions (one overdue), and requests waiting to be answered. Demo friends approve requests at once so every flow can be tried. Sandboxes never send email, never appear to real users, and are deleted after 24 hours or when the visitor starts over.

**Answer the question people open it with.** The home page leads with loans in both directions, what's due and what's late, with friends' activity beside them, so the answer to "who has my book?" is on the first screen.

**Mobile as a first-class layout.** People scan barcodes and check loans on their phones, so headers, search, notifications and book pages each have their own phone layout rather than a squeezed desktop page.

<figure class="case-figure case-figure-phone">
<img src="/screenshots/case-studies/stacks-phone.webp" width="700" height="1515" loading="lazy" decoding="async" alt="Stacks on a phone: the home page's loans, three books borrowed from friends, starting with The Ten Thousand Doors of January from Anika Rao due in 2 days, then books lent out, starting with Piranesi, 5 days late with Sam Okafor">
<figcaption>On a phone, the same home page in one column, loans first, with what's due and late called out.</figcaption>
</figure>

**Lighter, not heavier.** The first version leaned on Material UI. In the rebuild I replaced it with plain Tailwind CSS, cutting the bundle so pages load faster on a phone.

## How it's tested and shipped

90 unit tests (Vitest) cover the data models: lending, holds, households, imports, notes, the demo sandbox and more. Every push is linted, including ESLint's accessibility rules, type-checked and tested in GitHub Actions, and a deploy to Fly.io goes out only once the tests pass. Scheduled jobs post daily due-date reminders and send the weekly digest, and database changes go through Prisma migrations.

## How it's built

Remix for the full-stack React app, written in TypeScript; Prisma with SQLite for the data; Tailwind CSS for styling; Resend for email; ZXing for barcode scanning; and the Open Library API for book data and covers. It runs on Fly.io, with light, dark and automatic themes.

## How I work

I built the first version by hand in December 2023: the data model, friends, notifications and the mobile layouts. When I came back to it in 2026, I designed the changes and directed the work, with much of the code written using AI (Claude).
