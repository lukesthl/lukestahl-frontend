---
author: 'Luke Stahl'
date: '2023-01-15'
title: 'Motion Detector für den Raspberry Pi'
description: "Eine App, die Bewegungen aufzeichnet, um bestimmte Aktionen auszulösen."
bannerImage: "/assets/projects/motion-detector/motion-detector.png"
icon: "/assets/projects/motion-detector/logo.png"
links:
    - https://github.com/lukesthl/motion-detector
tags:
    - Svelte
    - Tauri
    - Bun
---

## Die Idee

Die Idee für dieses Projekt kam mir, als ich einen Bewegungsmelder für mein Zimmer gesucht habe. Da ich eine Lösung mit Anbindung an die Yeelight API gesucht habe, um das Licht automatisch einzuschalten, wenn ich in mein Zimmer komme, habe ich nichts brauchbares gefunden.
Also dachte ich es wäre ein gutes Sideproject, ein neuen Techstack auszuprobieren und gleichzeitig etwas nützliches zu bauen.  
Vorallem wollte ich mit diesem Projekt Tauri und Svelte ausprobieren. In Kombination mit Bun als Backend Nodejs Alternative.

## Preview der App
![](https://user-images.githubusercontent.com/44963006/212476461-877e338d-739c-4798-a310-51b64a1e9e24.mp4)

## Tech Stack

#### Frontend (App)

- [Tauri](https://tauri.app/)
- [SvelteKit](https://kit.svelte.dev/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)

#### Backend (Raspberry Pi Server)

- [Bun](https://bun.sh/)
- [SQLite](https://www.sqlite.org/)

## Features
- Actions für Yeelight Lampen, Webhooks und App Benachrichtigungen
- Schlafmodus für die Nacht
- Benachrichtigungen
- Aktivitätshistorie

## Installation

Eine Anleitung zur Installation und Konfiguration findest du im [Github Repository](https://github.com/lukesthl/motion-detector)