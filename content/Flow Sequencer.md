---
title: Flow Sequencer
socialImage: share/flow-sequencer.png
---
Build a yoga flow one pose at a time, then play it as a class that's read aloud. [Open Flow Sequencer](https://yoga.grahamhagenah.com/) · [Source on GitHub](https://github.com/grahamhagenah/flow-sequencer)

## The problem

Practising yoga at home means either following someone else's video or remembering a sequence yourself. Writing your own flow is hard, because not every pose can follow every other: you can't step from a seated twist straight into Warrior III. I wanted to put a flow together the way a teacher does, move by move, and then have it led for me so I could keep my eyes off the screen.

## What it does

Pick a starting pose and Flow Sequencer offers only the moves that can come next, with the cue for each ("Inhale, sweep arms up"). A flow builds up row by row. Press play and the class is spoken aloud, pose by pose and breath by breath, while the screen shows one pose at a time, large enough to glance at from the mat. There are ready-made flows to start from, from a three-minute wake-up to a 38-minute power flow, and any flow can be shared as a link.

## Constraints I set

- **Every move has to be real.** A flow can only go where a body can.
- **Usable from the mat.** Big, glanceable poses, spoken cues, and controls that work from the phone's lock screen.
- **Nothing to sign up for.** Flows save in the browser and travel as links.

## Decisions

**A map of moves, not a list of poses.** The core of the app is a graph: 88 poses and 365 moves between them, each move with its cue and which side it leaves you on. Building a flow means walking that graph, so it can't produce a sequence that doesn't work.

**One breath, one movement.** Cues and timing follow the breath, the way a vinyasa class is taught, and class lengths are calculated honestly from the breaths rather than rounded to look tidy.

**Drawn poses, not photos.** Every pose is a simple line figure, consistent and readable at any size. I drew some of them myself and redrew others as the set grew.

**The best voice, not the default one.** Browsers default to an old, robotic voice even when better ones are installed. Flow Sequencer ranks the voices on the device and picks the most natural, skipping the novelty voices macOS ships with.

**Share links that survive a text message.** Links compress the whole flow into the address, and are built to arrive intact after being pasted into a message.

## What broke, and how I caught it

**Sides getting crossed.** In a sided pose, "right" means different things: the front foot in a lunge, the standing foot in Tree, the flipped leg in Wild Thing. Getting this wrong sends a class to the wrong side halfway through, so each pose records what its side refers to, and every move records whether it keeps or flips it.

**A pose that wouldn't hold still.** In the one-pose view, the pose shifted on screen from one pose to the next, which is distracting mid-class. It now holds its place, and the player underneath says what's next.

## How it's built

React and TypeScript, built with Vite. Classes are spoken with the browser's own speech synthesis and show on the lock screen through the Media Session API. Every flow and pose has its own page so they can be found in search. 115 automated tests cover the pose graph, the ready-made flows, share links and the player.

## How I work

I designed Flow Sequencer and directed its development, with the code written using AI (Claude). My part is the yoga (which moves belong together and how they're cued), how it should look and feel on the mat, drawing some of the poses, catching what's wrong, and choosing what ships.
