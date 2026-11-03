# Cactus Biofuel Tracker

A small C++ command-line simulation that estimates biofuel yield and energy
from cactus biomass. Choose one of three preset feedstocks, enter its fresh
biomass mass, and optionally override the preset moisture content.

## Requirements

- A C++17 compiler (such as GCC, Clang, or MSVC)
- CMake 3.20 or later

The project has no third-party dependencies.

## Build

From the repository root, configure and build with:

```sh
cmake -S . -B build
cmake --build build --config Release
```

The executable is `build/cactus-biofuel-tracker` (add `.exe` on Windows) with
single-configuration generators such as Make or Ninja, or
`build/Release/cactus-biofuel-tracker.exe` with Visual Studio on Windows.

## Run

Run the executable and follow the prompts to select a feedstock and enter its
fresh biomass mass. Accept the feedstock's default moisture or enter a custom
percentage from 0 to 100. The simulator reports dry biomass, water mass,
estimated biofuel in liters, and estimated energy in megajoules.

## Test

Run the calculator regression test through CTest:

```sh
ctest --test-dir build -C Release --output-on-failure
```

## What this project demonstrates

- Modeling feedstocks and calculation results with C++ structs
- Separating yield calculations from the command-line interface
- Using vectors to present a preset species library
- Building and testing a small C++ project with CMake and CTest

## Model scope and limitations

This is an educational estimate, not a validated engineering or production
tool. Species moisture, conversion rates, and energy-density values are fixed
presets in `src/main.cpp`; the model assumes a linear conversion of dry mass
to fuel and energy. It does not model process efficiency, operating costs,
uncertainty, or environmental impacts. Moisture is clamped to 0–100% in the
calculator. The command-line interface is a prototype and does not fully
validate malformed or out-of-range input.
