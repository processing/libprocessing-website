---
title: Processing 5.0 (Java)
description: Build processing4 with the WebGPU renderer.
order: 5
status: draft
languages: [java]
---

Processing 5.0 is the next version of Processing, and it uses libprocessing for rendering. The WebGPU renderer is still experimental, so for now you have to build Processing yourself to try it.

:::note
This is a beta. Things may break. If you get stuck, tell us what happened in an issue so we can improve these steps.
:::

If you only want to use the stable version of Processing, you don't need any of this. Download it from [processing.org](https://processing.org/download).

## Requirements

You need these installed before you build:

- **JDK 25.** Processing uses the Temurin build of OpenJDK. On macOS, install it with `brew install --cask temurin@25`. On other systems, download Temurin 25 from [adoptium.net](https://adoptium.net).
- **Rust.** Install it with [rustup](https://rustup.rs). The build compiles libprocessing, which is written in Rust, for you.
- **jextract.** This tool turns C header files into Java bindings. The processing4 build can fetch it for you. If the build stops with a jextract error, download it from [jdk.java.net/jextract](https://jdk.java.net/jextract/), or install it with [SDKMAN!](https://sdkman.io/) using `sdk install jextract`.
- **Git**, to clone the repository.

:::caution[Windows only]
Rust on Windows needs Microsoft's C++ linker. Without it, the build fails with `linker link.exe not found`. Install **Build Tools for Visual Studio** and tick **Desktop development with C++**. Visual Studio Code is a different product and is not enough.
:::

Check that the tools are available:

```bash
java -version
rustc --version
git --version
```

`java -version` should print version 25.

## Build

Clone processing4 with its submodules. libprocessing comes in as a submodule, so the `--recursive` flag matters:

```bash
git clone --recursive https://github.com/processing/processing4.git
cd processing4
```

Build it with the WebGPU flag turned on:

```bash
./gradlew build -PenableWebGPU=true
```

On Windows, use `gradlew.bat` instead of `./gradlew`.

:::note
The first build is slow. Gradle downloads itself, and then the Rust part downloads and compiles several hundred packages. Keep the terminal open and give it time. Later builds are much faster.
:::

You will probably see a warning that Kotlin does not support JDK 25 yet and falls back to JVM 24. This is expected and does not stop the build.

## Run the WebGPU examples

Start the Processing editor (the PDE) with the WebGPU renderer turned on:

```bash
./gradlew run -PenableWebGPU=true
```

On Windows, use `gradlew.bat run -PenableWebGPU=true`.

When the editor opens, paste this sketch in and press Run:

```java
void setup() {
  size(400, 400, WEBGPU);
}

void draw() {
  background(51);
  fill(255);
  noStroke();
  rect(10, 10, 100, 100);
}
```

You should see a white square on a dark grey background. The `WEBGPU` in `size()` is what switches the sketch to the new renderer.

:::todo
These run steps come from processing4 PR #1582 and have not been tested on Windows yet. If you get the build to finish, please confirm that the editor opens and the sketch runs, and update this page.
:::

:::note
WebGPU is experimental. If the window stays empty or the sketch fails to start, please open an issue and tell us your operating system and graphics card.
:::

## Troubleshooting

### Gradle fails to download itself

```txt
Downloading https://services.gradle.org/distributions/gradle-9.1.0-bin.zip
Exception in thread "main" java.io.IOException: ... failed: timeout (10000ms)
```

The first `gradlew` run downloads Gradle, and on a slow connection it can time out after 10 seconds. Run the command again first. If it keeps failing, open `gradle/wrapper/gradle-wrapper.properties` and raise `networkTimeout=10000` to `networkTimeout=120000`. Don't commit that change if you plan to send a pull request.

### linker `link.exe` not found (Windows)

```txt
error: linker `link.exe` not found
note: the msvc targets depend on the msvc linker but `link.exe` was not found
```

The Rust build needs the Microsoft C++ linker. Open **Visual Studio Installer**, choose **Modify** on Build Tools 2022, tick **Desktop development with C++**, and install. Then close your terminal, open a new one, and run the build again. The Rust packages that were already downloaded are cached, so the second run skips most of the downloading.

### Permission denied or Could not copy file

Clean the project and build again:

```bash
./gradlew clean
```

### The libprocessing folder is missing

You probably cloned without `--recursive`. Fetch the submodule and build again:

```bash
git submodule update --init --recursive
```