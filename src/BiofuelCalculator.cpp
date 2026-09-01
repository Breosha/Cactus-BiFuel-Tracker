#include "BiofuelCalculator.hpp"
#include <algorithm>

SimulationResult BiofuelCalculator::calculateYield(const CactusSpecies& species, 
                                                   double freshMassKg, 
                                                   double moisturePercent, 
                                                   double conversionRate) {
    // Clamp moisture between 0% and 99.9%
    double moistureRatio = std::clamp(moisturePercent, 0.0, 99.9) / 100.0;
    
    double waterMass = freshMassKg * moistureRatio;
    double dryMass = freshMassKg * (1.0 - moistureRatio);
    double yieldLiters = dryMass * conversionRate;
    double totalEnergy = dryMass * species.energyDensityMJ;

    return {
        freshMassKg,
        dryMass,
        waterMass,
        yieldLiters,
        totalEnergy
    };
}
