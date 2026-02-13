/**
 * Site-wide constants and metadata.
 */

import type { Site, Metadata, Socials } from "@types";

export const SITE: Site = {
  NAME: "Titusz Pan",
  EMAIL: "tp@craft.de",
  NUM_POSTS_ON_HOMEPAGE: 3,
  NUM_WORKS_ON_HOMEPAGE: 2,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
  NUM_TILS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION:
    "Personal website of Titusz Pan. Chairman of ISCC Foundation, creator of ISCC (ISO 24138:2024), 25+ years in digital media technology.",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "Thoughts on digital media, content identification, and open standards.",
};

export const WORK: Metadata = {
  TITLE: "Work",
  DESCRIPTION: "Where I have worked and what I have done.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION: "Open source projects and initiatives.",
};

export const PUBLICATIONS: Metadata = {
  TITLE: "Publications",
  DESCRIPTION: "Academic papers, articles, and technical publications.",
};

export const TIL: Metadata = {
  TITLE: "TIL",
  DESCRIPTION: "Today I Learned — short notes on things I discover.",
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
];
