/**
 * Site-wide type definitions.
 */

export type Site = {
  NAME: string;
  EMAIL: string;
  NUM_STORIES_ON_HOMEPAGE: number;
  NUM_WORKS_ON_HOMEPAGE: number;
  NUM_LABS_ON_HOMEPAGE: number;
  NUM_OPINIONS_ON_HOMEPAGE: number;
};

export type Metadata = {
  TITLE: string;
  DESCRIPTION: string;
};

export type Socials = {
  NAME: string;
  HREF: string;
}[];
