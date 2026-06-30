/**
 * Auto-generated llms.txt for AI-readable site summary.
 */

import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async () => {
  const stories = (await getCollection("stories"))
    .filter((entry) => !entry.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const lab = (await getCollection("lab"))
    .filter((entry) => !entry.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const site = "https://titusz.org";

  const content = `# Titusz Pan

> Personal website of Titusz Pan — creator of ISCC (ISO 24138:2024), chairman of the ISCC Foundation, CEO of Craft AG, co-founder and CTO of Amlet. 25+ years in digital media technology, content identification, and decentralized systems.

## Stories

${stories.map((p) => `- [${p.data.title}](${site}/stories/${p.id}/): ${p.data.description}`).join("\n")}

## Lab

${lab.map((p) => `- [${p.data.title}](${site}/lab/${p.id}/): ${p.data.description}`).join("\n")}

## Links

- [Home](${site}/): Background, credentials, and contact
- [RSS Feed](${site}/rss.xml): Full-content feed
- [GitHub](https://github.com/titusz): Open source projects
- [LinkedIn](https://www.linkedin.com/in/titusz): Professional profile
`;

  return new Response(content.trim(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
