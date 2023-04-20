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
Wer schon einmal mit dem UI der Fritz!Box in Berührung gekommen ist, weiß das dieses nicht gerade die Schnellste ist. Nachdem ich mich darüber und um den fehlenden Darkmode geärgert habe, dachte ich mir:  
Das muss besser gehen.  
Also habe ich ein eigens UI mit Nextjs erstellt, damit ich alle Router und Smarthome-Geräte im Blick habe. Somit hat man alle Statistiken auf einem Blick.

## Tech Stack

- [Nextjs](https://nextjs.org/)
- [tRPC](https://trpc.io/)
- [TailwindCSS](https://tailwindcss.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [Fritzbox](https://github.com/lukesthl/fritzbox) (Mein eigener kleiner Fritzbox API Wrapper mit TypeScript Support)


## Features
- Dashboard mit Router und Smarthome Statistiken
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