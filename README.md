## My personal site

### Getting started
1. Install the `bun` package manager: https://bun.sh/
2. Run `bun i` in the project directory
3. Run `bun run dev` to start a local developer server


### Environment variables
- `DEFAULT_LOCATION_GEO`, `DEFAULT_LOCATION`, `APPLE_TEAM_ID`, `APPLE_PRIV_KEY_BASE64`, `APPLE_KEY_ID`: required for map snapshot generation on the home page
- `PUBLIC_URL`: for setting the base URL of the site when deployed

### Usage:
- `bun <command>`:
    - `lint`: automatically lints files
    - `dev`: start a local instance with live reloading
    - `build-rss`: generate an RSS feed 
    - `build`: generate an RSS feed and production site
    - `analyze`: generate a bundle you can inspect via @next/bundle-analyzer
    - `start`: start a production instance built via `yarn build`

### Directory structure:
- `components/`: react components
- `services/`: services that fetch data for the site
- `app/`: next.js pages (the actual routes that are rendered)
- `projects/`: markdown files rendered at build time 
- `public/`: images for blog, favicon, built files
- `scripts/`: contain the scripts for building the sitemap and RSS feed