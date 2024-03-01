---
author: 'Luke Stahl'
date: '2024-02-29'
title: 'Digital Break: Die App zur Reduzierung der Bildschirmzeit' 
description: 'Führt eine kurze Pause zwischen dir und deinen Social Media Apps ein.'
bannerImage: "/assets/projects/digital-break/banner.png"
icon: "/assets/projects/digital-break/logo.png"
links:
    - https://github.com/lukesthl/digital-break-app
tags:
    - React Native
    - App
    - Tamagui
---

## Idee
Ursprünglich bin ich durch one-sec auf die Idee gekommen. One-sec ist eine App, die es ermöglicht, durch bewusste Pausen vor öffnen von Apps, das Nutzungsverhalten zu ändern, um Habits wie Doomscrooling zu vermeiden.  
Nur leider kann man die App ohne Abo nur mit einer App gleichzeit blockieren. Ich habe nichts dagegen das der Entwickler auch sein Geld verdienen will, aber ich wollte eine kostenlose Alternative ohne Abo schaffen und direkt als Experiment nutzen, um die [Expo Config Plugins](https://docs.expo.dev/config-plugins/introduction/) auszuprobieren. 
Da ich schon länger keine App mehr entwickelt habe, war das mal wieder eine gute Gelegenheit.

## Kernfunktionen

- **App-Blockierung**: Führt eine kurze Pause zwischen dir und deinen Social Media Apps ein.
- **Statistiken**: Trackt die Anzahl an Pausen und die ungefähre Zeit, die durch die Pausen eingespart wurde.
- **Datenschutz**: 100% lokal, keine Daten werden gesammelt. Import / Export von Einstellungen und Statistiken.

## TechStack

- **React Native**: Die App ist in React Native in Kombination mit [Expo](https://expo.dev/) entwickelt.
- **Expo Router**: [Expo App Router](https://docs.expo.dev/router/introduction/) für die Navigation in der App.
- **AppIntent**: Die App verwendet das [AppIntent](https://developer.apple.com/documentation/appintents)-Framework, um das Öffnen der App zu unterbrechen.
- **Expo Config Plugins**: Die App verwendet die [Expo Config Plugins](https://docs.expo.dev/config-plugins/introduction/) um die App Intents einzubinden.
- **Tamagui**: Design und UI-Elemente wurden mit [Tamagui](https://tamagui.dev/) erstellt.
- **AsyncStorage**: Die App speichert die Einstellungen und Statistiken lokal mit [AsyncStorage](https://react-native-async-storage.github.io/async-storage/).

## Architektur

<div className="bg-black rounded-lg p-6">
<img src="https://lukesthl.github.io/digital-break-app/public/architecture.png" alt="Architektur" />
</div>

Die App verwendet das [AppIntent](https://developer.apple.com/documentation/appintents)-Framework, um das Öffnen der App zu unterbrechen.
Wenn der User eine App öffnet, wird die Aktion unterbrochen und mit dem installierten Shortcut wird ein Break-Dialog anzeigt. Wenn die Pause vorbei ist, kann der Benutzer entscheiden, ob er die App über das definierte URL-Schema öffnen oder die App schließen möchte.


## Open Source

Der gesamte Projektcode ist auf [GitHub](https://github.com/lukesthl/digital-break-app) verfügbar. 
Mehr technische Details und Informationen zur Implementierung findet man in der [README](https://github.com/lukesthl/digital-break-app/blob/main/README.md).

