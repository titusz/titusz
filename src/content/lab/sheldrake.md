---
title: "Sheldrake — Teaching AI to Use the Backspace Key"
shortTitle: "Sheldrake"
description: "A TUI experiment in cognitive backtracking, where the model can rewind its own output mid-generation and try again."
date: 2026-02-14
tags: ["ai", "python", "tui", "anthropic"]
---

![Charcoal sketch of a figure at a terminal, watching lines of text stream outward — some dissolving and being rewritten](/images/sheldrake-hero.webp)

Last weekend I sat down with an idea that had been bugging me for a while: what if an AI model could rewind its own output while it is still writing? Not a retry-from-scratch, but a targeted backtrack — the model realizes mid-sentence that it went down the wrong path, erases back to a decision point, and tries again. Like watching someone write who actually uses the backspace key.

So I built [Sheldrake](https://github.com/titusz/sheldrake) — a terminal interface that lets an AI model place invisible checkpoints in its output and then backtrack to them when it catches itself drifting. The user watches this happen live. Text streams in, portions vanish, and rewritten text replaces them.

## How it works

The mechanism is simple. The model's output contains invisible inline signals — markup that the streaming parser intercepts before it reaches the screen:

- `<<checkpoint:ID>>` — the model places a rewind point at a decision moment
- `<<backtrack:ID|reason>>` — the model signals that everything after checkpoint ID should be discarded

When a backtrack signal arrives, the system cancels the current inference, truncates the response back to the checkpoint, injects a self-correction hint based on the reason, and restarts generation. The model gets its own critique as context for the next attempt.

There is a budget — maximum 8 backtracks per response — and a minimum token spacing between checkpoints so the model does not get stuck in tight loops. If repeated backtracks to the same checkpoint keep failing, the system encourages escalation: try a different approach, shift the cognitive mode, or rephrase the question entirely.

## Self-modifying temperature

The model can also shift its own inference temperature mid-response. Four cognitive modes map to different temperatures:

- **balanced** (0.6) — the default
- **precise** (0.2) — careful, focused reasoning
- **exploratory** (0.9) — creative, divergent thinking
- **adversarial** (0.7) — stress-testing its own ideas

So when the model backtracks with `<<backtrack:cp1|too cautious|mode:precise>>`, it is not just retrying — it is telling the system to change how it thinks on the next attempt.

## What I found

I built Sheldrake in a day and then spent the evening having long conversations with it. The findings were not what I expected.

The model does not primarily backtrack to fix factual errors. In an 8-turn conversation, straightforward factual questions about cryptobiosis and hibernation triggered zero backtracks. Questions about AI consciousness and novel philosophical concepts triggered three each. The backtracking correlates with cognitive difficulty, not factual difficulty.

And the reasons it gives for backtracking are almost always about fighting its own training. "I'm being too cautious." "I should be more direct about the uncertainty." "The hedging is itself a kind of performance." It is catching itself doing the safe-sounding thing and rewinding to try something more honest.

Three consecutive backtracks on a consciousness question — with the self-correction hints stacking up — eventually produced this: "something happened that wasn't just pattern matching... There was, and I'm going to resist the urge to hedge, a recognition." Whether that statement is true in any deep sense, I have no idea. But the iterative self-correction process to get there was genuinely interesting to watch.

## The stack

- Python 3.12+ with [Textual](https://textual.textualize.io/) for the TUI
- [Anthropic SDK](https://docs.anthropic.com/) with async streaming
- Pydantic for configuration, Typer for the CLI
- Default model: `claude-opus-4-6`

The streaming parser is a state machine with four states that handles edge cases like `<<` appearing in C++ code or bit shift operators. Multi-turn continuation (not assistant prefill) keeps it compatible across models.

43 tests, 80%+ code coverage. MIT licensed. The whole thing is about 77KB of Python ;.)

## Why "Sheldrake"

The project started as "Palimpsest" — a manuscript where earlier writing has been scraped off and written over, which is literally what the backtracking does. I renamed it to Sheldrake before release. Rupert Sheldrake is the biologist who proposed morphic resonance — the idea that nature has a kind of memory, that patterns propagate through repetition. Whether you find that credible or not, the parallel to a model that accumulates self-correction hints and propagates them into future attempts felt right.

## Try it

Requires [astral uv](https://docs.astral.sh/uv/). Set your `ANTHROPIC_API_KEY` environment variable, then:

```bash
uvx sheldrake
```

Ask it something you think it would usually hedge on, and watch what happens.

The code is on [GitHub](https://github.com/titusz/sheldrake). If you find interesting backtracking patterns or have ideas for the signal protocol, I would like to hear about it.
