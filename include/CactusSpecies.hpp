#pragma once
#include <string>

struct CactusSpecies {
    std::string name;
    double defaultMoisturePercent;   // 85.0 to 92.0%
    double baseConversionRate;       // Liters biofuel per kg dry mass 
    double energyDensityMJ;          // Specific energy
};
