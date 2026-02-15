/**
 * RSS feed including stories, lab, and opinion entries.
 */

import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE, HOME } from "@consts";

type Context = {
  site: string;
};

export async function GET(context: Context) {
  const stories = (await getCollection("stories")).filter(
    (entry) => !entry.data.draft
  );

  const lab = (await getCollection("lab")).filter((entry) => !entry.data.draft);

  const opinion = (await getCollection("opinion")).filter(
    (entry) => !entry.data.draft
  );

  const items = [...stories, ...lab, ...opinion].sort(
    (a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf()
  );

  return rss({
    title: SITE.NAME,
    description: HOME.DESCRIPTION,
    site: context.site,
    items: items.map((item) => ({
      title: item.data.title,
      description: item.data.description,
      pubDate: item.data.date,
      link: `/${item.collection}/${item.slug}/`,
    })),
  });
}
