/**
 * Ambient module declarations for Fontsource packages imported for
 * their CSS side effects. These packages ship no type declarations, so
 * the bare side-effect imports need declaring under TypeScript's
 * noUncheckedSideEffectImports check (enabled by default in TS 6).
 *
 * Declared by exact specifier rather than a wildcard so the `/files/*.woff2`
 * asset imports keep resolving to their string-URL types from astro/client.
 */
declare module "@fontsource-variable/readex-pro";
declare module "@fontsource-variable/newsreader";
