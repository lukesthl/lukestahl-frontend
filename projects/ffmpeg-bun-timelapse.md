---
author: 'Luke Stahl'
date: '2024-02-24'
title: 'Zeitraffer Generator mit FFmpeg & bun' 
description: '300 GB (350k Bilder) innerhalb von 20 Minuten zu einem Timelapse Video konvertieren.'
bannerImage: "/assets/projects/ffmpeg-bun-timelapse/banner.png"
icon: "/assets/projects/ffmpeg-bun-timelapse/logo.png"
links:
    - https://github.com/lukesthl/timelapse-generator
tags:
    - FFmpeg
    - bun
    - timelapse
---

## Die Herausforderung
Meine Idee war es den Abriss eines Hauses neben an zu dokumentieren. Dafür habe ich eine alte Actioncam genutzt, die alle 60 Sekunden ein Bild aufgenommen hat. Alle 2 Wochen musste ich die SD-Karte wechseln, da die Kamera nur maximal 20.000 Bilder speichern konnte. Nach 6 Monaten hatte ich 300 GB an Bildern, die ich zu einem Timelapse Video konvertieren wollte. Das Problem war jedoch das die Bilder teilweise in unterschiedlichen Ordnerstrukturen gespeichert waren und ich keine Lust hatte die Bilder manuell zu sortieren.
Also habe ich ein kleines Tool geschrieben, dass alle Bilder zusammenführt und zu einem Timelapse Video konvertiert.  
[Zum Ergebnis](#ergebnis)

## Tools

Ich habe zwei Tools genutzt. Zum einen natürlich [FFmpeg](https://FFmpeg.org/), um die Bilder zu einem Video zu konvertieren.  
Zum anderen [bun](https://bun.sh), welches ich als CLI-Tool genutzt habe um die Bilder zu sortieren, exif-Daten auszulesen und dann in dem für FFmpeg benötigten Format zu speichern. Am Ende wurde noch manuell in Premiere Pro das Video bearbeitet.

## Implementierung

### 1. Bilder sortieren

Erster Schritt war es alle Bilder in einem Ordner zu sammeln. Dafür habe ich glob genutzt um alle Bilder zu finden und dann mit bun die Bilder zu sortieren.
```ts
const glob = new Glob(baseDir + "/**/*.JPG");
const scannedFiles = await Array.fromAsync(glob.scan("."));
```

### 2. EXIF-Daten auslesen und Bilder sortieren
Um die Bilder auch wirklich chronologisch zu sortieren, habe ich die exif-Daten der Bilder ausgelesen und dann nach dem Aufnahmedatum sortiert.
```ts
const readExifData = async (file: BunFile) => {
  try {
    const buffer = await file.arrayBuffer();
    const data = await ExifReader.load(buffer);
    return data;
  } catch (error) {
    console.error(`Error reading EXIF data from ${file.name}: ${error}`);
    return null;
  }
};

const files: { name: string; date: Date }[] = [];
await Promise.all(
    scannedFiles.map((filePath) => {
        const file = Bun.file(filePath);
        return readExifData(file).then((exifData) => {
            if (exifData && Array.isArray(exifData.DateTime?.value)) {
                const [dateString] = exifData.DateTime?.value;
                const date = parseExifDate(dateString as string);
                files.push({ name: file.name, date });
            } else {
                console.log("No exif data for " + file.name);
            }
        });
    })
);
files.sort((a, b) => a.date.getTime() - b.date.getTime());
```

### 3. Filter nach Aufnahmezeit
Da ich nur die Bilder vom Tag wollte, habe ich die Bilder nach Sonnenuntergang und Sonnenaufgang gefiltert. Dafür habe ich suncalc genutzt, die Library berechnet anhand von Längen- und Breitengrad den Auf und Untergang. Ein Offset von 1 Stunde habe ich hinzugefügt, da es Abends im Winter schon vor Sonnenuntergang schnell dunkel wird.
```ts
import SunCalc from "suncalc";

const latitude = 0; // Your latitude
const longitude = 0; // Your longitude

const isNightDate = (date: Date) => {
    const sunTimes = SunCalc.getTimes(date, latitude, longitude);
    const offset = 1000 * 60 * 60 * 1; // 1 hour
    return (
        date.getTime() < sunTimes.sunrise.getTime() + offset ||
        date.getTime() > sunTimes.sunset.getTime() - offset
    );
};
```

### 4. Bilder zu Video Chunks konvertieren
Zum Schluss wurden alle Bilder eines Ordners zu einem Video konvertiert. Dafür habe ich ffmpeg genutzt.
- s:v 1920x1080 ist die Auflösung des Videos.
- h264_videotoolbox ist ein Hardware Encoder, der auf meinem Macbook Pro die CPU entlastet und die Konvertierung beschleunigt.
- framerate 30 ist die Bildrate des Videos.
- crf 0 ist ein Lossless Codec, der die Qualität der Bilder beibehält.

```
ffmpeg -f concat \
    -safe 0 \
    -i 2014-0-1-2023-6-17.txt \
    -s:v 1920x1080 \
    -c:v h264_videotoolbox \
    -framerate 30 \
    -crf 0 \
    2014-0-1-2023-6-17.mp4
```

Die 2014-0-1-2023-6-17.txt Datei sieht so aus:
```txt
file '/SSD/11-09-23--28-09-23/100MSDCF/DSC03403.JPG'
file '/SSD/11-09-23--28-09-23/100MSDCF/DSC03404.JPG'
file '/SSD/11-09-23--28-09-23/100MSDCF/DSC03405.JPG'
...
```

### 5. Chunk Videos zu einem großen Video zusammenfügen
Zum Schluss habe ich alle Chunk Videos zu einem großen Video zusammengefügt.
```sh
ffmpeg -f concat \
    -safe 0 \
    -i chunks.txt \
    -c copy \
    output.mp4
```

### Optimierung mit Premiere Pro
Das Video ist dabei bewusst noch nicht beschleunigt, da ich das Video in Premiere Pro nochmal bearbeitet habe um die interessanten Stellen zu verlangsamen und die langweiligen Stellen zu beschleunigen.

## Ergebnis
![](https://github.com/lukesthl/lukestahl-frontend/raw/main/public/assets/projects/ffmpeg-bun-timelapse/timlapse.mp4)

## Source Code
Das gesamte Projekt ist auf [GitHub](https://github.com/lukesthl/timelapse-generator) verfügbar.