---
title: mewnala (Python)
description: Install mewnala with uv and run a sketch.
order: 2
languages: [python]
---

Inside of our `processing_pyo3` crate we have created a python package that you can easily install with pip.
Again, we are still very nascent, but let us know what kinds of snags you may run into while getting this set up.
Try running the examples in the [processing_pyo3 examples directory](crates/processing_pyo3/examples).

We are big fans of [uv](https://github.com/astral-sh/uv) and this is the easiest way to get started using `mewnala`

## Setting up uv on linux or macOS
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

## For Windows users:
```bash
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

## Install a mewnala

We're going to create a folder named `mewnala-sketchbook` and install the `mewnala` package inside:

```bash
# Initialize a project with uv
uv init mewnala-sketchbook && cd mewnala-sketchbook

# add the package
uv add mewnala
```

Now create a file named `sketch.py` at the root of `mewnala-sketchbook`.

You can use this code to test

```python
from mewnala import *

def setup():
    size(400, 400)
    background(255)

def draw():
    push_matrix()
    translate(mouse_x, mouse_y)
    fill(255, 100, 200)
    circle(0, 0, 50)
    pop_matrix()

run()
```

Now run your sketch using:

```bash
# run a sketch
uv run sketch.py
```

:::note
you can use any file name you want for your sketch
:::
