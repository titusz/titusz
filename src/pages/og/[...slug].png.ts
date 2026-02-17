/**
 * Static API endpoint that generates OG images at build time.
 * Covers homepage, section indexes, and all content entries.
 */

import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { generateOgImage, findHeroImage } from "@lib/og-image";
import { STORIES, LAB, OPINION, WORK } from "@consts";

/** Explicit hero image map for entries where slug doesn't match filename. */
const HERO_OVERRIDES: Record<string, string> = {
  "3d-character-animation-in-the-beginnings": "/images/3d-animation-hero.webp",
};

export const getStaticPaths: GetStaticPaths = async () => {
  const stories = (await getCollection("stories")).filter(
    (e) => !e.data.draft
  );
  const labs = (await getCollection("lab")).filter((e) => !e.data.draft);
  const opinions = (await getCollection("opinion")).filter(
    (e) => !e.data.draft
  );

  function heroFor(slug: string): string | undefined {
    return HERO_OVERRIDES[slug] ?? findHeroImage(slug);
  }

  return [
    // Homepage
    {
      params: { slug: "home" },
      props: {
        title: "Sparks, craft, and working code",
        heroImage: "/images/hero-landing.webp",
      },
    },
    // Section indexes
    {
      params: { slug: "stories" },
      props: {
        title: STORIES.DESCRIPTION,
        category: STORIES.TITLE,
        heroImage: "/images/hero-stories.webp",
      },
    },
    {
      params: { slug: "lab" },
      props: {
        title: LAB.DESCRIPTION,
        category: LAB.TITLE,
        heroImage: "/images/lab-hero.webp",
      },
    },
    {
      params: { slug: "opinion" },
      props: { title: OPINION.DESCRIPTION, category: OPINION.TITLE },
    },
    {
      params: { slug: "work" },
      props: { title: WORK.DESCRIPTION, category: WORK.TITLE },
    },
    // Content entries
    ...stories.map((entry) => ({
      params: { slug: `stories/${entry.slug}` },
      props: {
        title: entry.data.title,
        category: "Stories",
        date: entry.data.date,
        heroImage: heroFor(entry.slug),
      },
    })),
    ...labs.map((entry) => ({
      params: { slug: `lab/${entry.slug}` },
      props: {
        title: entry.data.title,
        category: "Lab",
        date: entry.data.date,
        heroImage: heroFor(entry.slug),
      },
    })),
    ...opinions.map((entry) => ({
      params: { slug: `opinion/${entry.slug}` },
      props: {
        title: entry.data.title,
        category: "Opinion",
        date: entry.data.date,
        heroImage: heroFor(entry.slug),
      },
    })),
  ];
};

export const GET: APIRoute = async ({ props }) => {
  const png = await generateOgImage(
    props as {
      title: string;
      category?: string;
      date?: Date;
      heroImage?: string;
    }
  );
  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png" },
  });
};
