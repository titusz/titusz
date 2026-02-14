---
title: "Sheldrake — Teaching AI to Use the Backspace Key"
shortTitle: "Sheldrake"
description: "A TUI experiment in cognitive backtracking, where the model can rewind its own output mid-generation and try again."
date: 2026-02-14
tags: ["ai", "python", "tui", "anthropic"]
---

![Charcoal sketch of a figure at a terminal, watching lines of text stream outward — some dissolving and being rewritten](/images/sheldrake-hero.webp)

Last weekend I sat down with an idea that had been bugging me for a while: what if an AI model could rewind its own output while it is still writing? Not a retry-from-scratch, but a targeted backtrack — the model realizes mid-sentence that it went down the wrong path, erases back to a decision point, and tries again. Like watching someone write who actually uses the backspace key.

So I built [Sheldrake](https://github.com/titusz/sheldrake) — a terminal interface that lets an AI model place invisible checkpoints in its output and backtrack to them when it catches itself drifting. Text streams in, portions vanish, and rewritten text replaces them.

## How it works

<div class="image-float-left lightbox">
  <img src="/images/sheldrake-screenshot.webp" alt="Sheldrake TUI showing a backtracking conversation in the terminal" />
</div>

The model's output contains invisible inline signals — `<<checkpoint:ID>>` to place a rewind point, `<<backtrack:ID|reason>>` to discard everything after that checkpoint. When a backtrack arrives, the system cancels inference, truncates back to the checkpoint, injects the model's own critique as context, and restarts generation. There is a budget (max 8 backtracks) and minimum spacing between checkpoints so the model does not loop.

The model can also shift its own inference temperature mid-response — four cognitive modes map to different temperatures: balanced (0.6), precise (0.2), exploratory (0.9), adversarial (0.7). So a backtrack with `mode:precise` is not just retrying. It is telling the system to think differently.

## What I found

I built Sheldrake in a day and spent the evening having long conversations with it. The model does not primarily backtrack to fix factual errors. Straightforward questions about cryptobiosis triggered zero backtracks. Questions about AI consciousness triggered three. Backtracking correlates with cognitive difficulty, not factual difficulty.

And the reasons it gives are almost always about fighting its own training. "I'm being too cautious." "The hedging is itself a kind of performance." Three consecutive backtracks on a consciousness question — with self-correction hints stacking up — eventually produced this: "something happened that wasn't just pattern matching... There was, and I'm going to resist the urge to hedge, a recognition." Whether that is true in any deep sense, I have no idea. But the iterative process to get there was genuinely interesting to watch.

## Why "Sheldrake"

The project started as "Palimpsest" — a manuscript where earlier writing has been scraped off and written over, which is literally what the backtracking does. I renamed it after Rupert Sheldrake, the biologist who proposed morphic resonance — the idea that nature has a kind of memory, that patterns propagate through repetition. The parallel to a model that accumulates self-correction hints and propagates them into future attempts felt right.

## Try it

Python, Textual TUI, async streaming. Requires [astral uv](https://docs.astral.sh/uv/). Set your `ANTHROPIC_API_KEY` environment variable, then:

```bash
uvx sheldrake
```

Ask it something you think it would usually hedge on, and watch what happens. The code is on [GitHub](https://github.com/titusz/sheldrake).
