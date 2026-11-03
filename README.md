# Cactus Biofuel Tracker

A small C++ command-line simulator and browser-based calculator for estimating
biofuel yield and energy from cactus biomass. The browser interface is a
dependency-free static site with a friendly, block-inspired design.

## Requirements

- A C++17 compiler (such as GCC, Clang, or MSVC)
- CMake 3.20 or later
- Node.js (optional; runs the browser calculator regression test through CTest)

The C++ project has no third-party dependencies. The browser calculator needs
no install or build step.

## Build

From the repository root, configure and build with:

```sh
cmake -S . -B build
cmake --build build --config Release
```

The executable is `build/cactus-biofuel-tracker` (add `.exe` on Windows) with
single-configuration generators such as Make or Ninja, or
`build/Release/cactus-biofuel-tracker.exe` with Visual Studio on Windows.

## Run the command-line calculator

Run the executable and follow the prompts to select a feedstock and enter its
fresh biomass mass. Accept the feedstock's default moisture or enter a custom
percentage from 0 to 100. The simulator reports dry biomass, water mass,
estimated biofuel in liters, and estimated energy in megajoules.

## Run the browser calculator

From the repository root, start a local static web server:

```sh
python -m http.server 8000 --directory web
```

Then open [http://localhost:8000](http://localhost:8000) in a browser. No
packages need to be installed; the calculations run locally in the browser.
To share the interface, publish the contents of `web/` with any static hosting
service (for example, GitHub Pages) and share its published URL.

## Test

Run the C++ calculator regression test through CTest:

```sh
ctest --test-dir build -C Release --output-on-failure
```

When Node.js is available, CTest also runs the browser calculator's focused
regression tests. You can run those directly with:

```sh
node tests/WebCalculatorTests.mjs
```

## What this project demonstrates

- Modeling feedstocks and calculation results with C++ structs
- Separating yield calculations from the command-line interface
- Using vectors to present a preset species library
- Building and testing a small C++ project with CMake and CTest
- Offering the same biomass estimate in a responsive, browser-based interface

## Model scope and limitations

This is an educational estimate, not a validated engineering or production
tool. Species moisture, conversion rates, and energy-density values are fixed
presets in the C++ command-line app and browser calculator; the model assumes
a linear conversion of dry mass to fuel and energy. It does not model process
efficiency, operating costs, uncertainty, or environmental impacts. Moisture
is clamped to 0–100% in both calculators. At 100% moisture there is no dry
biomass, so estimated fuel and energy are zero.
