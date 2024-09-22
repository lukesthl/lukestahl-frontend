---
author: 'Luke Stahl'
date: '2023-05-01'
title: 'Meine Portfolio Website - lukestahl.de'
description: 'Eine persönliche Landingpage für meine Projekte und Bilder.'
bannerImage: "/assets/projects/lukestahl-frontend/lukestahl-frontend.png"
icon: "/assets/me-icon.png"
links:
    - https://github.com/lukesthl/lukestahl-frontend
tags:
    - Frontend 
    - Nextjs
    - React Server Components
---

Ich habe bereits seit längerem überlegt eine eigene Portfolio Website zu erstellen. Einfach um meine Projekte und Bilder zu zeigen. Seit dem Release von [Nextjs 13](https://nextjs.org/blog/next-13) und den neuen React Server Components wollte ich ein Projekt damit umsetzen. Generell wird die kleine statische Website nicht 100 prozentig von rsc profitieren, aber vor allem durch die Metadata API macht es Sinn die neue Appdir zu verwenden.

## Design

Angefangen mit dem Design habe ich mit der Startseite in [Adobe XD](https://xd.adobe.com/view/de637577-6941-4899-ac8d-90a629c1104f-8b30/?fullscreen) um einen groben Überblick zu bekommen und ein paar Designs auszuprobieren. Dabei habe ich als Inspiration das [Portfolio Website Template von TailwindUI](https://tailwindui.com/templates/spotlight) genommen. Ich wollte ein einfaches Design, welches nicht zu überladen ist.

## Tech stack
- [Nextjs 13](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Blog mit Markdown](https://github.com/markdown-it/markdown-it)

## Projekt Blog
Damit ich nicht nur meine Projekte zeigen kann, sondern auch über diese schreiben kann, habe ich einen kleinen Blog mit Markdown erstellt. Die Markdown Seiten profitieren dabei am meisten von den React Server Components, da die serverseitig gerendert werden und somit perfekt für SEO sind.

## Bilder

Damit ich alle Bilder anzeigen kann, benutzte ich fast-glob, welches die Bilder bei build aus dem Image Ordner lädt.
```tsx
await glob(["public/assets/images/**/*.{png,jpg,jpeg,JPG}"]);
```
Da Nextjs aktuell keine Möglichkeit bietet die geblurte base64 Vorschau der Bilder automatisch über ein dynamic Import zu erstellen, benutze ich [plaiceholder](https://plaiceholder.co/) um die Platzhalter-Bilder zu generieren. Zusätzlich werden die EXIF-Daten der Bilder ausgelesen, damit man diese nach Datum sortieren kann.    
In Zukunft will ich hier vielleicht noch ein S3 Bucket anbinden, damit ich die Bilder nicht mehr in das Repository pushen muss.

## SEO & Metadata

SEO und Nextjs spielen mit SSR super zusammen. So musste ich für einen Lighthouse Score von 100 nicht viel tun. Abgesehen von den üblichen Meta Tags habe ich noch eine Sitemap und einen RSS Feed erstellt.

![lukestahl.de lighthouse score](/assets/projects/lukestahl-frontend/lighthouse-performance.png?width=700&height=200)

Mit der neuen Metadata API von [Nextjs 13.2](https://beta.nextjs.org/docs/api-reference/metadata) wird es immerhin immens vereinfacht die Meta Tags zu erstellen.
Hier ein Beispiel für mein root layout:
```tsx
export const metadata: Metadata = {
	title: {
		template: "%s | Luke Stahl",
		default: "Luke Stahl",
	},
	description: "Frontend-Entwickler aus Bamberg",
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#f5f5f5" },
		{ media: "(prefers-color-scheme: dark)", color: "#000" },
	],
	openGraph: {
		title: "Luke Stahl",
		description: "Frontend-Entwickler aus Bamberg",
		url: `${url.toString()}`,
		siteName: "Luke Stahl Website",
		locale: "de_DE",
		type: "website",
		images: [
			{
				url: `${url.toString()}og?title=${encodeURIComponent(
					"Frontend-Entwickler und Hobby-Fotograf."
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
			"application/rss+xml": `${url.toString()}feed.xml`,
		},
	},
};
```

### Bundle Size
Aktuell kommt man mit Nextjs und React bei der Startseite auf **~96 kB**:
![lukestahl.de bundle size](/assets/projects/lukestahl-frontend/bundle-size-before.png?width=800&height=100)

Da Nextjs allein schon initial **~85 kB** groß ist, wird man da auch nicht viel kleiner kommen.  
Meine Idee war ursprünglich Preact anstatt von React zu benutzen, da man so die Bundlesize auf **~53 kB** drücken könnte. Allerdings funktioniert das ganze noch nicht mit Server Components (https://github.com/preactjs/preact/issues/3793)

### Weiterentwicklung
Generell bin ich mit dem Ergebnis sehr zufrieden. Der Syntax von React Server Components verringert den boilerplate Code und die neue Metadata API macht es sehr einfach Meta Tags zu erstellen.  
In Zukunft will ich noch ein paar kleine Features hinzufügen. Zum Bespiel die Bilder mit Tags versehen, um diese dann filtern. Außerdem will ich die Bilder mit einem S3 Bucket verbinden, damit ich diese nicht mehr in das Repository pushen muss.

### Open Source
Das Projekt ist übrigens Open Source und kann auf Github gefunden werden: [lukestahl-frontend](https://github.com/lukesthl/lukestahl-frontend)