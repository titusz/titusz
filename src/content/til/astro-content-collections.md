---
title: "Astro content collections support type-safe frontmatter"
description: "Astro's content collections provide Zod-based schema validation for markdown frontmatter, catching errors at build time."
date: "2026-02-13"
tags: ["astro", "typescript"]
---

While building this site with Astro, I discovered that content collections validate
frontmatter against a Zod schema at build time. If you define a schema in
`src/content/config.ts`, any markdown file with missing or incorrectly typed frontmatter
fields will cause a build error with a clear message pointing to the offending file.

This means you get the same level of type safety for your content as you do for your
application code. For a site with multiple content types (blog, projects, publications,
TIL), this is valuable — it catches mistakes before they reach production.

```typescript
const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional(),
  }),
});
```

The `z.coerce.date()` is particularly useful — it accepts date strings in frontmatter and
coerces them to `Date` objects automatically.
