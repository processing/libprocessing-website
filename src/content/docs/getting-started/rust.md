---
title: libprocessing (Rust)
description: Build libprocessing from source and run the Rust examples.
order: 4
languages: [rust]
---

## Install Rust

You'll need to install the Rust toolchain to work on this project. Most users will want to install Rust via [`rustup`](https://rustup.rs/), which helps manage Rust toolchain versions.

### Clone the project and its submodules

When cloning this repo (or your fork), don't forget to install its submodules (eg. Lygia)

```bash
git clone --recurse-submodules git@github.com:processing/libprocessing.git
```

if you already cloned the repo without `--recurse-submodules`, you can run

```bash
git submodule update --init
```

### Build commands

This project uses [just](https://github.com/casey/just) as a command runner:

```bash
cargo install just
```

Run `just` to see available commands.

## Run an example

```bash
cargo run --example # to list out all the available examples
cargo run --example <EXAMPLE_NAME> # to run an example in examples/ directory
```
