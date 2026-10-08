---
title: Roadmap
description: Where libprocessing is headed, from foundations to advanced rendering.
order: 6
status: draft
---

:::note
This page is copied from the [Roadmap on the libprocessing wiki](https://github.com/processing/libprocessing/wiki/Roadmap) for now. If they disagree, the wiki is the current version.
:::

The libprocessing roadmap is split into a few high-level categories, plus a foundation that everything else depends on:

0. **Foundations**: stability, docs, and distribution that make everything else trustworthy.
1. **Core rendering technologies**: exposing engine-level features in Processing's core API.
2. **Bringing historical 3rd-party library functionality into Processing itself**: e.g. audio, MIDI, video, etc.
3. **Narrow features for professionals, installation artists, etc.**: e.g. NDI support, camera SDKs, lasers.
4. **Advanced rendering techniques**: rendering beyond the triangle rasterizer, e.g. SDFs, volumetrics, ray tracing.

Platform targets (desktop, web/WASM, embedded, XR) cut across all of these.

## 0. Foundations

- Stable release on upstream bevy, published to crates.io
- CI with example, visual, and performance regression testing
- Documentation site with architecture, contributing guide, API reference, and tutorials
- Language bindings beyond Rust (Python via mewnala, Java for Processing, JS for p5.js)
- Live coding and hot reload of sketches and shaders

## 1. Core Rendering Technologies

- Full Processing API coverage
- Compute shaders and full-screen post-processing effects
- GPU particles and simulation, like the 3D flocking demo from SIGGRAPH ([#188](https://github.com/processing/libprocessing/issues/188), done)
- HDR pipeline with EXR read/write ([#178](https://github.com/processing/libprocessing/issues/178))
- PBR materials and lighting
- Shadows, bloom, depth of field, and other engine-level effects
- Modern custom shader support (WGSL)
- GPU instancing for drawing very large numbers of shapes
- High-quality text rendering and font outlines
- GUI built on bevy UI
- Web/WASM parity, including p5.js as a libprocessing consumer

## 2. Historical 3rd-Party Libraries → Core

- Audio playback, effects, routing, and analysis via bevy_seedling (replaces Sound/Minim)
- MIDI (replaces The MidiBus)
- Video playback, webcam capture, and video/GIF export (replaces processing-video, VideoExport, gifAnimation)
- OSC and general networking: UDP/TCP, WebSockets, HTTP (replaces oscP5/netP5)
- Serial I/O
- Orbit/easy 3D camera controls (replaces PeasyCam)
- 2D and 3D physics (replaces Box2D for Processing, Fisica, toxiclibs physics)
- Computational geometry and mesh tools: meshing, booleans, subdivision, Voronoi (replaces toxiclibs, HE_Mesh)
- Tweening and animation easing (replaces Ani)
- Computer vision: blob detection, optical flow, face/pose tracking (replaces OpenCV for Processing, BlobDetection)
- Machine learning inference for vision, pose, and generative models
- Depth sensors and hand tracking (replaces SimpleOpenNI, Kinect and Leap Motion libraries)
- 3D model import: glTF and FBX
- PDF/SVG vector import and export, including plotter output (replaces the PDF/SVG libraries, Geomerative)
- Maps and geospatial data (replaces Unfolding)

## 3. Professional & Installation Features

- Show control: DMX, Art-Net/sACN, CAN
- Lasers: ILDA DAC output (Ether Dream, Helios, LaserCube) and ILDA file support
- LED pixel mapping and controllers (e.g. Open Pixel Control, WLED)
- Inter-app video: NDI, Syphon, Spout
- Capture and output cards (Blackmagic DeckLink, AJA)
- Depth cameras and machine-vision camera SDKs
- Motion-capture and tracking systems (OptiTrack, Vicon, VRPN)
- Time sync: LTC/MIDI timecode, Ableton Link, multi-machine frame sync
- IoT and control messaging: MQTT
- Embedded: an Arduino-like interface for microcontrollers (ESP32, RP235x, etc.)
- Multi-display, projection mapping, and edge blending
- XR via OpenXR
- Pressure-sensitive pen tablet input
- Pipeline interchange: USD and Alembic
- Installation-grade runtime: headless/kiosk mode and long-running stability

## 4. Advanced Rendering Techniques

- SDF rendering and ray marching as first-class drawing primitives
- Volumetrics: fog, clouds, volume textures, OpenVDB
- Gaussian splatting via PLY ([#207](https://github.com/processing/libprocessing/issues/207))
- Point cloud rendering at scale
- Real-time ray tracing and global illumination
- Path tracing for offline, high-quality stills
- GPU fluid, cloth, and reaction-diffusion simulation
- Procedural and compute-driven geometry
- Non-photorealistic rendering: toon shading, outlines, hatching, sketchy styles