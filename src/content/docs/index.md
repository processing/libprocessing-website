---
title: libprocessing
description: An experimental Rust and Bevy implementation of the Processing API.
status: draft
hero:
  eyebrow: Processing Foundation R&D
  tagline: The Processing API on a modern GPU renderer, for Python, Rust, Java and the web.
  actions:
    - label: Get started
      href: /getting-started/
    - label: Browse examples
      href: /examples/
      variant: tertiary
quickstarts:
  - language: python
    title: mewnala
    command: uv add mewnala
    href: /getting-started/mewnala/
  - language: rust
    title: libprocessing
    command: git clone --recursive https://github.com/processing/libprocessing
    href: /getting-started/rust/
  - language: java
    title: Processing 5.0
    command: ./gradlew build -PenableWebGPU=true
    href: /getting-started/processing-5/
  - language: web
    title: WebAssembly
    command: wasm-pack build
    href: /getting-started/web/
---

:::caution[Experimental]
libprocessing is research and development. Nothing here is stable, and APIs change without notice.
:::

:::todo
Two or three sentences on what libprocessing is and who it's for. Link the LGM 2026 talk and the Discord.
:::
