#include "BiofuelCalculator.hpp"

#include <cmath>
#include <iostream>

namespace {

bool check(const char* label, double actual, double expected) {
    if (std::abs(actual - expected) < 1e-9) {
        return true;
    }

    std::cerr << label << ": expected " << expected << ", got " << actual << '\n';
    return false;
}

} // namespace

int main() {
    const CactusSpecies species{"Test cactus", 90.0, 0.3, 10.0};
    const SimulationResult result =
        BiofuelCalculator::calculateYield(species, 100.0, 100.0, 0.3);

    bool passed = true;
    passed &= check("dry mass", result.dryMassKg, 0.0);
    passed &= check("water mass", result.waterMassKg, 100.0);
    passed &= check("fuel yield", result.estimatedYieldLiters, 0.0);
    passed &= check("energy output", result.totalEnergyOutputMJ, 0.0);
    return passed ? 0 : 1;
}
