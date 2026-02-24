---
title: "Docs for AI Coding Agents"
shortTitle: "Docs for Agents"
description: "What to write when the reader is a machine that writes code."
date: 2026-02-22
tags: ["ai", "documentation", "software-engineering"]
draft: false
---

<div class="lightbox">
  <img src="/images/docs-for-agents-hero.avif" alt="Bold expressionist painting of two cute robots side by side — one confused and overwhelmed by dense prose documentation, the other happy and giving a thumbs up while reading clean structured docs" />
</div>

Third time rewriting the same project instructions for a coding agent. Same library, same constraints, same "do not touch the generated files" rule, but the agent started a fresh session and had no idea. The documentation was right there in the repo. It just was not written for the agent.

Most documentation is written for humans. Narrative flow, gradual understanding, cognitive load management. All sensible when a developer reads it once and builds a mental model that persists. AI coding agents do not work that way. They start cold every session, no persistent memory. Whatever survives between sessions is the documentation, the durable context that tells the agent what matters before it reads a single line of code.

## Why not just read the code?

<div class="image-float-right lightbox">
  <img src="/images/docs-agents-layers.avif" alt="Expressionist painting of a cute robot in a blue code world reaching upward toward a warm golden documentation layer with floating concepts — compass, connected nodes, crossed-out path, glowing beacon" />
</div>

Agents read code fast. So why bother with docs at all?

Because context windows are finite. Stuffing them with raw source leads to context rot: the more irrelevant code an agent ingests, the worse its reasoning gets. And even when it reads the right files, code tells you *what* and *how*, but not:

- *Intent* — which inputs are legitimate, what is a bug vs. a feature
- *Choreography* — the correct sequence of operations across module boundaries
- *Rejected approaches* — "we considered X and rejected it because Y"
- *Priority* — "start here, ignore that, this is the critical path"

If code is the database, good documentation is a materialized view: a query-optimized projection of the same truth. Faster to consume, less error-prone under context limits.

## What to write

Skip API references (the code is the reference) and skip tutorials (agents do not need onboarding). Focus on the non-recoverable layer: information that is true about the code but not *in* the code.

### Architecture maps

Which components exist, how they relate, what the dependency flow is. Without this, the agent treats every file as equally important and wastes context on dead corners of the codebase.

### Decision dispatch and constraints

Not explanations, dispatch tables. Explicit conditional logic:

```
Single file under 10MB → process_sync()
Single file over 10MB → process_async()
Batch → process_batch(), max 100 items
```

And the invariants everyone on the team knows but never wrote down. Agents do not just know.

```
NEVER: open the same index from multiple processes — data corruption
NEVER: pass ndim or metric to NphdIndex — computed from max_dim
ALWAYS: call save() before process exit — unsaved data is lost
ALWAYS: use np.uint8 dtype — other dtypes cause silent corruption
```

### Side effects and task recipes

Which methods write to disk, mutate state, trigger events. Agents call functions because the name looks right. A side effects list tells them what actually happens.

Then the step-by-step procedures that cut across modules: "Create index, call `add()` with keys and vectors, call `save()`." The choreography that no single source file reveals.

### Change playbooks

"If you modify the padding logic, also update `sharded_nphd.py`, the round-trip tests, and the architecture docs." Ripple-effect knowledge that prevents locally correct but globally broken changes.

## Editing rules

Beyond documenting *how the system works*, document *how to work on the system*. A project-level instruction file with repo-specific rules:

- Never modify generated files
- All database writes go through the repository layer
- Run these checks before considering a task complete

Every project gets one of these now. Nothing else pays off this well. A well-named test serves the same purpose, a specification that cannot drift out of sync:

```python
test_retries_are_idempotent()
test_null_email_is_rejected()
test_batch_size_exceeds_limit_raises_error()
```

## Stale docs are a solved problem

The classic objection: documentation goes out of date the moment you write it. That used to be legitimate. The same agents that consume your docs can now check them against the implementation and update them. Wire up CI to run the code samples in your documentation, and staleness becomes a failing build instead of a slow rot nobody notices.

## A real example

<div class="image-float-left lightbox">
  <img src="/images/docs-agents-recursive.avif" alt="Expressionist painting of two cute robots at desks forming an ouroboros loop — one writing a document that flows in a golden arc to the other who reads it, with the documents forming a continuous luminous circle" />
</div>

The [agent-targeted documentation for iscc-usearch](https://usearch.iscc.codes/reference/for-coding-agents/) puts all of this into practice: architecture map with class hierarchy, decision dispatch tables, NEVER/ALWAYS constraint catalogs, a side effects matrix, task recipes with working code, and change playbooks mapping ripple effects. No tutorials, no narrative. Pure reference for machines that write code.

Turns out it is quite useful for humans too ;.)

Writing these by hand worked, but the structure is repeatable enough to automate. So the next step was obvious: teach an agent to write the docs. The [docs-for-agents skill](https://github.com/titusz/skills/blob/main/plugins/docs-for-agents/skills/docs-for-agents/SKILL.md) is a reusable agent skill that analyzes a codebase and generates the full reference page, architecture maps, dispatch tables, constraint catalogs, all of it. Point it at a project, it reads the source, and produces the documentation described in this article. Agents writing docs for agents.

The code will be rewritten constantly. The constraints that make it correct, those persist. If you have written agent-facing docs for your own projects, share what worked. This is new territory for all of us.
