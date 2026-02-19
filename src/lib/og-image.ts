/**
 * Dynamic OG image generation using satori + sharp.
 * Renders social card images at build time for all content pages.
 * Hero images show at full brightness with text on a bottom gradient panel.
 * Non-hero cards use a warm dark background with the same text layout.
 */

import satori from "satori";
import sharp from "sharp";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const READEX_DIR = join(
  process.cwd(),
  "node_modules/@fontsource/readex-pro/files"
);

const readexLight = readFileSync(
  join(READEX_DIR, "readex-pro-latin-300-normal.woff")
);
const readexRegular = readFileSync(
  join(READEX_DIR, "readex-pro-latin-400-normal.woff")
);
const readexSemiBold = readFileSync(
  join(READEX_DIR, "readex-pro-latin-600-normal.woff")
);

const NEWSREADER_DIR = join(
  process.cwd(),
  "node_modules/@fontsource/newsreader/files"
);

const newsreaderRegular = readFileSync(
  join(NEWSREADER_DIR, "newsreader-latin-400-normal.woff")
);

const avatarPng = readFileSync(
  join(process.cwd(), "public/images/avatar.png")
);
const avatarBase64 = `data:image/png;base64,${avatarPng.toString("base64")}`;

const WIDTH = 1200;
const HEIGHT = 630;

type OgImageProps = {
  title: string;
  category?: string;
  date?: Date;
  heroImage?: string;
};

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/** Try to find a hero image for a content entry by slug convention. */
export function findHeroImage(slug: string): string | undefined {
  const candidates = [
    `/images/${slug}-hero.avif`,
    `/images/${slug}-hero.webp`,
    `/images/${slug}-hero.jpg`,
    `/images/${slug}-hero.png`,
  ];
  for (const candidate of candidates) {
    if (existsSync(join(process.cwd(), "public", candidate))) {
      return candidate;
    }
  }
  return undefined;
}

/** Unified text layout anchored to the bottom of the card. */
function buildCardText({ title, category, date }: OgImageProps) {
  const children: unknown[] = [];

  // Category badge + date
  const metaChildren: unknown[] = [];
  if (category) {
    metaChildren.push({
      type: "span",
      props: {
        style: {
          fontSize: "20px",
          fontWeight: 400,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "#d0d0d0",
          border: "1px solid rgba(255,255,255,0.3)",
          borderRadius: "4px",
          padding: "5px 14px 7px",
        },
        children: category,
      },
    });
  }
  if (date) {
    metaChildren.push({
      type: "span",
      props: {
        style: { fontSize: "20px", color: "#b0b0b0" },
        children: formatDate(date),
      },
    });
  }
  if (metaChildren.length > 0) {
    children.push({
      type: "div",
      props: {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "14px",
          marginBottom: "12px",
        },
        children: metaChildren,
      },
    });
  }

  // Title
  children.push({
    type: "div",
    props: {
      style: {
        fontFamily: "Newsreader",
        fontSize: category ? "56px" : "64px",
        fontWeight: 400,
        color: "#ffffff",
        lineHeight: 1.25,
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
      children: title,
    },
  });

  // Footer with avatar
  children.push({
    type: "div",
    props: {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginTop: "20px",
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "12px",
            },
            children: [
              {
                type: "img",
                props: {
                  src: avatarBase64,
                  width: 38,
                  height: 38,
                  style: { borderRadius: "50%" },
                },
              },
              {
                type: "span",
                props: {
                  style: {
                    fontSize: "22px",
                    fontWeight: 400,
                    letterSpacing: "0.1em",
                    color: "#c0c0c0",
                  },
                  children: "TITUSZ PAN",
                },
              },
            ],
          },
        },
        {
          type: "span",
          props: {
            style: { fontSize: "21px", color: "#909090" },
            children: "titusz.org",
          },
        },
      ],
    },
  });

  return {
    type: "div",
    props: {
      style: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        width: "100%",
        height: "100%",
        padding: "40px 56px",
        fontFamily: "Readex Pro",
      },
      children,
    },
  };
}

const satoriOptions = {
  width: WIDTH,
  height: HEIGHT,
  fonts: [
    { name: "Readex Pro", data: readexLight, weight: 300 as const, style: "normal" as const },
    { name: "Readex Pro", data: readexRegular, weight: 400 as const, style: "normal" as const },
    { name: "Readex Pro", data: readexSemiBold, weight: 600 as const, style: "normal" as const },
    { name: "Newsreader", data: newsreaderRegular, weight: 400 as const, style: "normal" as const },
  ],
};

/** Bottom-fading gradient overlay for hero images. */
function gradientSvg(): Buffer {
  const svg = `<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="black" stop-opacity="0"/>
        <stop offset="35%" stop-color="black" stop-opacity="0"/>
        <stop offset="70%" stop-color="black" stop-opacity="0.65"/>
        <stop offset="100%" stop-color="black" stop-opacity="0.88"/>
      </linearGradient>
    </defs>
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#g)"/>
  </svg>`;
  return Buffer.from(svg);
}

async function renderWithHero(
  props: OgImageProps,
  heroPath: string
): Promise<Buffer> {
  const textSvg = await satori(buildCardText(props), satoriOptions);

  const hero = await sharp(join(process.cwd(), "public", heroPath))
    .resize(WIDTH, HEIGHT, { fit: "cover" })
    .png()
    .toBuffer();

  return sharp(hero)
    .composite([
      { input: gradientSvg() },
      { input: Buffer.from(textSvg) },
    ])
    .png()
    .toBuffer();
}

async function renderPlain(props: OgImageProps): Promise<Buffer> {
  const bg = await sharp({
    create: {
      width: WIDTH,
      height: HEIGHT,
      channels: 4,
      background: { r: 28, g: 30, b: 42, alpha: 255 },
    },
  })
    .png()
    .toBuffer();

  const textSvg = await satori(buildCardText(props), satoriOptions);

  return sharp(bg)
    .composite([{ input: Buffer.from(textSvg) }])
    .png()
    .toBuffer();
}

export async function generateOgImage(props: OgImageProps): Promise<Buffer> {
  if (props.heroImage) {
    return renderWithHero(props, props.heroImage);
  }
  return renderPlain(props);
}
