---
author: 'Luke Stahl'
date: '2023-04-16'
title: 'Meine Portfolio Website - lukestahl.de'
description: 'Eine persönliche Landingpage für meine Projekte und Bilder.'
bannerImage: "/assets/projects/testproject.jpg"
icon: "/assets/me-icon.png"
links:
    - https://github.com/lukesthl/lukestahl-frontend
tags:
    - Frontend 
    - Nextjs
    - React Server Components
---

Ich habe bereits seit längerem überlegt eine eigene Portfolio Website zu erstellen. Einfach um meine Projekte und Bilder zu zeigen. Seit dem Release von [Nextjs 13](https://nextjs.org/blog/next-13) und den neuen React Server Components wollte ich ein Projekt damit umsetzen. Generell wird die kleine statische Website nicht 100 prozentig von rsc profitieren, aber vor allem durch die Metadata API ergeben sich einige Vorteile.

## Design

Angefangen mit dem Design habe ich mit der Startseite in [Adobe XD](https://xd.adobe.com/view/de637577-6941-4899-ac8d-90a629c1104f-8b30/?fullscreen) um einen groben Überblick zu bekommen und auszuprobieren. Dabei habe ich als Inspiration das [Portfolio Website Template von TailwindUI](https://tailwindui.com/templates/spotlight) genommen. Ich wollte ein einfaches Design, welches nicht zu überladen ist.

## Tech stack
- [Nextjs 13](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Blog mit Markdown](https://github.com/markdown-it/markdown-it)

## Projekt Blog
Damit ich nicht nur meine Projekte zeigen kann, sondern auch über diese schreiben kann, habe ich einen kleinen Blog mit Markdown erstellt. Damit die nativen Next.js link und Image Components funktionieren, habe ich die experimentelle React Server Components Funktion von `next-mdx-remote` benutzt.

## SEO & Metadata

SEO und Nextjs spielen super zusammen. So musste ich für einen Lighthouse Score von 100 nicht viel tun. Abgesehen von den üblichen Meta Tags, habe ich noch eine Sitemap und einen RSS Feed erstellt.

![todo](/assets/projects/testproject.jpg?width=200&height=200)

Mit der neuen Metadata API von [Nextjs 13.2](https://beta.nextjs.org/docs/api-reference/metadata) wird es immerhin immens vereinfacht die Meta Tags zu erstellen.
Hier ein Beispiel für mein root layout:
```tsx
export const metadata: Metadata = {
	title: {
		template: "%s | Luke Stahl",
		default: "Luke Stahl",
	},
	description: "Frontend Entwickler aus Bamberg",
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#f5f5f5" },
		{ media: "(prefers-color-scheme: dark)", color: "#000" },
	],
	openGraph: {
		title: "Luke Stahl",
		description: "Frontend Entwickler aus Bamberg",
		url: `${url.toString()}`,
		siteName: "Luke Stahl Website",
		locale: "de_DE",
		type: "website",
		images: [
			{
				url: `${url.toString()}/og?title=${encodeURIComponent(
					"Frontend / App Entwickler, Video- und Hobby-Fotograf."
				)}&description=${encodeURIComponent("Ich bin Luke, Frontend Entwickler für Web und Mobile Apps")}`,
				width: 1200,
				height: 630,
				alt: "Luke Stahl Website",
			},
		],
	},
	twitter: {
		title: "Luke Stahl",
		card: "summary_large_image",
		creator: "@lukesthl",
	},
	alternates: {
		types: {
			"application/rss+xml": `${url.toString()}/feed.xml`,
		},
	},
};
```

### Bilder

Die Bilder werden über fast-glob bei build aus dem Image Ordner geladen:
```tsx
await glob(["public/assets/images/**/*.{png,jpg,jpeg,JPG}"]);
```
Da Nextjs keine Möglichkeit bietet die blurDataUrl der Bilder über ein dynamic Import zu erstellen, benutze ich [plaiceholder](https://plaiceholder.co/) um die Platzhalter-Bilder beim Build zu erstellen. Zusätzlich lade ich die EXIF Daten der Bilder damit man die Bilder nach Datum sortieren kann.
```tsx
const [exifrResult, imageBlur] = await Promise.all([
    Exifr.parse(fileBuffer),
    getPlaiceholder(fileBuffer)
]);
```

### Bundle Size
Aktuell kommt man mit Nextjs und React bei der Startseite auf **~ 96 kB**:
![todo](/assets/projects/lukestahl-frontend/bundle-size-before.png?width=800&height=100)

Eine Alternative wäre es Preact anstatt von React zu benutzen, so wie hier erklärt: https://joyofcode.xyz/next-bundle-size

Allerdings funktioniert das ganze noch nicht mit Server Components (https://github.com/preactjs/preact/issues/3793), obwohl man die Bundle Size so auf **~ 53 kB** reduzieren könnte. 



### Open Source
Das Projekt ist übrigens Open Source und kann auf Github gefunden werden: [lukestahl-frontend](https://github.com/lukesthl/lukestahl-frontend)