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
  - language: rust
    title: libprocessing
    command: git clone --recursive https://github.com/processing/libprocessing
    href: /getting-started/rust/
  - language: python
    title: processing-py
    command: uv add processing-py
    href: /getting-started/processing-py/
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

`libprocessing` is a shared core written in Rust. It was first started to serve as a new rendering engine in Processing 5.0,
We are building this in a very lightweight and modular way as to support other projects.
This already is being used for an experimental Python library (mewnala), and we are able to run examples built with libprocessing in the web browser using WASM.

But more than being able to make sketching environments, we would like for `libprocessing`
to support new tools, creative workflows, and enable more interoperability in the open source ecosystem.
