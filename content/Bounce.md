---
title: Bounce
---
A sketchpad for song demos in the browser: pick a key, build a chord progression, loop it, sing over it, and take the idea into a full DAW when it's worth keeping. [Open Bounce](https://bounce.grahamhagenah.com/) · [Source on GitHub](https://github.com/grahamhagenah/sketchpad)

## The problem

A song idea usually starts as a few chords and a melody, and it's gone in minutes if it isn't caught. A full DAW like Logic is the wrong tool for that moment: it asks for a project, tracks, instruments and settings before you hear a single chord. Bounce is for the first ten minutes of a song, the part a DAW makes slow.

## What it does

You choose a key, mode, tempo and time signature, and Bounce offers the chords that belong in that key, grouped by what they do. Drop them on a timeline, drag to reorder or resize them, and loop the progression with drums and a bass line that follow along. Songs are written in sections (verse, chorus, bridge and so on), each with its own chords, vocals and lyrics, and played through as a whole song. You can record vocal takes over the loop, keep several, and trim them. When an idea is worth keeping, it exports to MIDI and WAV for a real DAW.

## Constraints I set

- **A sketchpad, not a DAW.** Every feature had to serve getting an idea down quickly. Anything that belonged in Logic stayed in Logic, and export is the bridge.
- **Nothing to install or sign up for.** It runs in the browser, and work is saved there.
- **As usable on a phone as at a desk.** Ideas arrive away from the desk, so the whole song can be built by touch.

## Decisions

**Musicians' terms, musicians' layouts.** The song view stacks sections top to bottom like a lead sheet, and the chord palette groups chords by function rather than listing every chord in the key. Timeline tracks take vivid colours the way Logic's do, so they feel familiar to anyone coming from a DAW.

**Cut what doesn't earn its place.** At one point Bounce had a rack of synth effects: width, resonance, delay, chorus and drive. After an audit I kept only reverb, the one that mattered for a demo. Section colours and dots went the same way.

**Be honest about where work is stored.** Work lives in the browser, and browsers can clear it. Bounce says plainly when work isn't being stored, keeps backups and a list of recently deleted sketches, and makes export to a file one step away.

**Phone first, not phone too.** On a phone, settings open as sheets from the bottom, the controls move to the top within reach, and track names sit above the tracks instead of beside them, where there's no room.

## What broke, and how I caught it

**Chords dropping out on slow devices.** On slower phones, a note scheduled a moment too late could take its whole chord with it. Playback now handles late notes instead of dropping them.

**The microphone and plain http.** Browsers only allow microphone access over https. Rather than failing silently, Bounce loads either way and says when recording needs a secure address.

**Recordings filling up storage.** Vocal takes are stored once, in 16-bit, so recording several takes doesn't eat the browser's storage.

## How it's built

React and TypeScript, built with Vite. Sound comes from Tone.js: a sampled grand piano, an electric piano, strings, a bell, and a synth with presets, plus drums and an arpeggiator. App state is kept with Zustand and saved in the browser's IndexedDB. 179 automated tests cover the music theory, timing, song arrangement, recording and export.

## How I work

I designed Bounce and directed its development, with the code written using AI (Claude). My part is deciding what a sketchpad should and shouldn't do, how it should feel to a musician, catching what's wrong, and choosing what ships.
