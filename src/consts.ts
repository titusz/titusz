/**
 * Site-wide constants and metadata.
 */

import type { Site, Metadata, Socials } from "@types";

export const SITE: Site = {
  NAME: "Titusz Pan",
  EMAIL: "tp@craft.de",
  NUM_STORIES_ON_HOMEPAGE: 3,
  NUM_WORKS_ON_HOMEPAGE: 2,
  NUM_LABS_ON_HOMEPAGE: 3,
  NUM_OPINIONS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION:
    "Personal website of Titusz Pan. Chairman of ISCC Foundation, creator of ISCC (ISO 24138:2024), 25+ years in digital media technology.",
};

export const STORIES: Metadata = {
  TITLE: "Stories",
  DESCRIPTION: "Posts, projects, and ideas from the workshop.",
};

export const WORK: Metadata = {
  TITLE: "Work",
  DESCRIPTION: "Where I have worked and what I have done.",
};

export const LAB: Metadata = {
  TITLE: "Lab",
  DESCRIPTION: "Experiments, side-projects, and things I tinker with.",
};

export const OPINION: Metadata = {
  TITLE: "Opinion",
  DESCRIPTION: "What I think about things that matter.",
};

export const SOCIALS: Socials = [
  {
    NAME: "github",
    HREF: "https://github.com/titusz",
  },
  {
    NAME: "linkedin",
    HREF: "https://www.linkedin.com/in/titusz",
  },
  {
    NAME: "twitter",
    HREF: "https://x.com/titusz",
  },
  {
    NAME: "reddit",
    HREF: "https://www.reddit.com/user/titusz",
  },
  {
    NAME: "telegram",
    HREF: "https://t.me/titusz",
  },
];
