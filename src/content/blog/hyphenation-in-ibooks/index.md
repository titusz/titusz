---
title: "Hyphenation in iBooks"
description: "How I got JavaScript-based hyphenation working inside ePub files on Apple's iBooks — and the typographic problem it solved."
date: "2010-09-05"
tags: ["epub", "javascript", "typography"]
draft: true
---

![Charcoal sketch of hands holding an e-reader displaying justified text with visible hyphenation](/images/hyphenation-hero.webp)

**Update:** Since iBooks Version 1.2 (December 2010) there is no need for any JavaScript
hacks. iBooks does hyphenation natively.

---

The iBooks eReader software for iPad and iPhone does currently not do any automated
hyphenation. To add to the problem, iBooks comes with a default setting that forces body text
to justified alignment. Typesetting people seem to agree that justified text without
hyphenation is a no-go.

Rick Gordon asked on Twitter if it was possible to use the JavaScript-based
[Hyphenator](https://github.com/mnater/Hyphenator). As iBooks is based on WebKit it should
be possible. So I did a test and it works fine.

The results showed a clear improvement — justified text with proper hyphenation looked
significantly better than the default rendering, and left-aligned text with hyphenation was
also improved.

I wasn't sure if such an ePub would make it into the iBookstore. The implementation was
fairly simple: just stick to the Hyphenator documentation. The hyphenation ePub validated
against epubcheck 1.0.5. I also tested it in Adobe Digital Editions but it did not seem to
work there.

## The licensing question

Steve Shepard raised an interesting point in the comments: the Hyphenator project was licensed
as either GPL or LGPL (the project site listed GPL, the code headers LGPL), both of which
could require making the text of the book available for modification. The LGPL Section 3
regarding "Object Code Incorporating Material from Library Header Files" seemed to offer a
path forward, but the licensing implications for embedding JavaScript libraries in ePub files
were genuinely unclear territory at the time.

## What happened next

The community response was encouraging — people were eager to improve ePub typography. Rick
Gordon worked through implementation issues, and others contributed improvements. Then in
December 2010, Apple shipped iBooks 1.2 with native hyphenation support, making the hack
unnecessary. Sometimes the best outcome for a workaround is that the platform catches up.

---

*Originally published on titusz.de in 2010.*
