---
title: FAQ
description: Questions that keep coming up on Discord.
order: 7
status: draft
---

These answers are drawn from discussions in #devs-chat on Discord. libprocessing is an experimental R&D project, so treat them as the current thinking rather than settled policy.

## Why Rust and Bevy, instead of using Bevy directly?

The point is the Processing API. It's simple and familiar, and it uses the same way of working in 2D and 3D. That's the same reason you'd use p5.js instead of the Canvas API and WebGL directly. If you're comfortable at a lower level of abstraction, libprocessing may not be for you. It's for people who want to be expressive with code without learning a game engine.

Bevy is there because it gives us GPU-driven programming techniques that we don't have to maintain ourselves. The short version: we want people to be able to write particle systems like the ones you'd build in TouchDesigner, and that takes something closer to an engine. There isn't another open source game engine that can be embedded and gives access to these techniques.

People already make whole games in Processing. Giving them lights, PBR rendering and physics doesn't take anything away, and people who've put years into learning Processing can keep building on what they know.

## Why not Python or C# as the core language?

**Java has to be able to use it.** Processing's long history and its commitment to backwards compatibility are among its biggest strengths, and Java can only call external code written in C, or code that exposes the C ABI. A Python core can't be called from Java in any practical way. Jython compiles to JVM bytecode and can't use system-level native dependencies.

**Graphics drivers and hardware SDKs are C and C++.** The language has to interoperate with the C ABI directly. Most of the hardware SDKs we want to support out of the box are C or C++ too, such as cameras like the Orbbec depth cameras. Python is a great glue language, but every crossing from the interpreter into native code has a cost, so core rendering code shouldn't be written in pure Python.

**One core, many languages.** A Rust core can have bindings in Java, Python, JavaScript (through WebAssembly) and anything else that can call C. A core in Python or C# would bring its runtime everywhere it went, which rules out the web and embedded computers. One shared core is also easier to maintain than several separate ones.

**WebGPU and the web.** The most mature open source WebGPU implementation is written in Rust, and Rust has the best support for compiling to WebAssembly.

**Maintained dependencies.** The Java video library for Processing is about 3,000 lines of low-level Java that wraps GStreamer. libprocessing's video support is about 215 lines of Rust over video-rs, a maintained FFmpeg wrapper. Java code that uses libprocessing never sees those details, so we could switch to GStreamer, which maintains its own Rust bindings, and Java users wouldn't notice.

If Processing were being built from scratch in 2026 with only one language in mind, Python would be a strong choice. But we want to bring along existing Java and JavaScript users, and to let people experiment with Processing in whatever language they like.

:::note
Writing sketches in Rust isn't the goal. Rust is the language for the shared core. Sketches are written in Java, Python, or any other language with bindings.
:::

## Doesn't Rust make it harder to contribute?

There's a real gap between new members of the Processing community and the people who can work on a rendering engine. Graphics programming is a specialised niche, and Processing has had a hard time getting people involved in maintaining its more complicated GLSL code. Rust helps with that in a few ways:

- The Rust community, its learning resources and its tooling are friendly to learners, and committed to openness and access in a way C++ isn't. Unlike C and C++, Rust has modern build and development tooling.
- Building on open source tools lets us bring in people from the wider ecosystem to help with the hard parts, not only existing Processing users. Bevy had 1,500 unique contributors and merged 12,000 pull requests in its sixth year.
- Small, focused wrappers over well-maintained libraries are easier to contribute to than large amounts of low-level code. The video support above is one example.
- The fiddly parts live in one shared core, but contributors can still work in their own language. The Python bindings use the Rust equivalent of the CPython API, and the WebGPU integration in Java looks like regular Java.

This is an open question, and the trade-offs are still being discussed. Feedback and pushback are welcome in #devs-chat.

## How does this relate to Java Processing?

Interoperating with Java is a hard requirement. A shared native library lets us add new capabilities to the existing Java codebase without breaking backwards compatibility. It also leaves room for new things, like p5.js integration or new languages such as Python.

Processing has had trouble with its Java dependencies over the years. Few people outside Processing do graphics in Java, and the OpenGL bindings and media libraries such as GStreamer have been maintained inconsistently. All of Processing's Java libraries already package C or C++ underneath. Doing that packaging once, in Rust, produces a single native binary with a high-level API.

## Which version of libprocessing does Processing 5.0 use?

:::todo
Not covered in the Discord discussion. Explain the submodule pin and link [How Processing 5.0 uses libprocessing](/architecture/processing-5/).
:::

## What's the performance story?

CPU performance isn't the goal. Some Rust code is much faster than the equivalent Java, but each extra layer of abstraction also costs some performance.

What matters is GPU-driven programming, such as compute shaders, which is a step change in performance. Bevy's recent releases include GPU-driven rendering improvements for large scenes.

A text-based approach also avoids some costs of node-based tools. In TouchDesigner, for example, large particle systems can use up GPU memory quickly because data is copied between buffers at every node so each node can show a preview.

## Why wrap native SDKs for cameras and video, instead of using existing Java bindings?

Java has a small graphics community outside Processing, and Java bindings for graphics and media libraries have been maintained inconsistently. Most hardware SDKs are only available in C or C++. Rust has good tools for wrapping C and C++ when no wrapper exists. Wrapping an SDK once in Rust makes it available to every language libprocessing supports, through one native binary.

## Is libprocessing meant to replace Processing? Is it official?

libprocessing is an experimental, technically ambitious R&D project of the Processing Foundation. There's no guarantee it becomes the "next Processing". There are risks and unknowns, but the potential benefits are large enough to be worth trying.

In Processing 5.0, libprocessing is an optional WebGPU renderer alongside the existing OpenGL renderer.

## Where can I read more?

- [libprocessing design principles](https://github.com/processing/libprocessing/blob/main/docs/principles.md), written at the start of the project
- [Bevy's sixth birthday](https://bevy.org/news/bevys-sixth-birthday/), on the size and activity of the Bevy community
- [Bevy 0.19: render big scenes faster](https://bevy.org/news/bevy-0-19/#render-big-scenes-faster), on recent GPU-driven performance improvements
- [Python examples](https://github.com/processing/libprocessing/tree/main/crates/processing_pyo3/examples) and [processing-examples-mewnala](https://github.com/processing/processing-examples-mewnala/)
- Talks on the project's strategy and vision, listed on the [Community](/community/) page
- #devs-chat on Discord
