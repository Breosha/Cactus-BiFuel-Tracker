#pragma once
#include "CactusSpecies.hpp"

struct SimulationResult {
    double totalFreshMassKg;
    double dryMassKg;
    double waterMassKg;
    double estimatedYieldLiters;
    double totalEnergyOutputMJ;
};

class BiofuelCalculator {
public:
    static SimulationResult calculateYield(const CactusSpecies& species, 
                                           double freshMassKg, 
                                           double moisturePercent, 
                                           double conversionRate);
};
