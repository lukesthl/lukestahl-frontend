---
author: 'Luke Stahl'
date: '2023-04-10'
title: 'Fritz-UI - Moderne Ansicht für die Fritz!Box'
description: 'Dashboard mit Statistiken für Netzwerk und Smarthome Geräte der Fritz!Box.'
bannerImage: "/assets/projects/fritz-ui/banner.png"
icon: "/assets/projects/fritz-ui/logo.png"
links:
    - https://github.com/lukesthl/fritz-ui
tags:
    - Frontend
    - NextJS
---

## Die Idee
Nachdem ich immer wieder mit dem langsamen UI der Fritz!Box zu tun hatte, um verschiedene Statistiken anzuschauen. Hatte ich mir gedacht, dass es es doch viel besser mit einer Nextjs App gebaut ist. So kam die Idee alle Statistiken des Routers und der Smart Home-Geräte anzuzeigen.

## Tech Stack
###

- [Nextjs](https://nextjs.org/)
- [tRPC](https://trpc.io/)
- [TailwindCSS](https://tailwindcss.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [Fritzbox](https://github.com/lukesthl/fritzbox) (Mein eigener kleiner Fritzbox API Wrapper mit TypeScript Support)


## Features
- Dashboard mit Router, SmartHome-Geräte Statistiken
- Mobile Responsive
- Alle Ihre Netzwerkgeräte in einer Liste
- SmartHome-Geräte mit aktueller Temperatur, Batteriestatus und mehr
- Anmeldung mit Ihren fritzbox-Benutzerdaten
- PWA-Unterstützung


## Deployment

Wenn du die App selbst hosten möchten, kannst du das ganz einfach über docker tun:

```bash
docker run -d --restart=always -p 3000:3000 --name fritz-ui ghcr.io/lukesthl/fritz-ui:latest
```