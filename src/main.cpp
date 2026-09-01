#include <iostream>
#include <iomanip>
#include <vector>
#include "BiofuelCalculator.hpp"

int main() {
    // Preset species based on bioenergy research
    std::vector<CactusSpecies> speciesLibrary = {
        {"Opuntia ficus-indica (Prickly Pear)", 88.0, 0.28, 13.5},
        {"Nopalea cochenillifera (Spineless)", 90.0, 0.25, 12.8},
        {"Opuntia streptacantha", 86.0, 0.30, 14.1}
    };

    std::cout << "========================================\n";
    std::cout << "   🌵 Cactus-BiFuel-Tracker CLI Engine   \n";
    std::cout << "========================================\n\n";

    std::cout << "Select Cactus Feedstock:\n";
    for (size_t i = 0; i < speciesLibrary.size(); ++i) {
        std::cout << "[" << i + 1 << "] " << speciesLibrary[i].name << "\n";
    }

    int choice = 1;
    std::cout << "\nEnter selection (1-" << speciesLibrary.size() << "): ";
    if (!(std::cin >> choice) || choice < 1 || choice > static_cast<int>(speciesLibrary.size())) {
        choice = 1;
    }

    CactusSpecies selected = speciesLibrary[choice - 1];

    double freshMass = 0.0;
    std::cout << "Enter total fresh biomass (kg): ";
    std::cin >> freshMass;

    char customMoisture = 'n';
    std::cout << "Override default moisture (" << selected.defaultMoisturePercent << "%)? [y/N]: ";
    std::cin >> customMoisture;

    double moisture = selected.defaultMoisturePercent;
    if (customMoisture == 'y' || customMoisture == 'Y') {
        std::cout << "Enter custom moisture percentage (0-100%): ";
        std::cin >> moisture;
    }

    SimulationResult result = BiofuelCalculator::calculateYield(
        selected, freshMass, moisture, selected.baseConversionRate
    );

    std::cout << "\n----------------------------------------\n";
    std::cout << "           Simulation Results           \n";
    std::cout << "----------------------------------------\n";
    std::cout << std::fixed << std::setprecision(2);
    std::cout << "Species:              " << selected.name << "\n";
    std::cout << "Fresh Biomass:        " << result.totalFreshMassKg << " kg\n";
    std::cout << "Moisture Content:     " << moisture << " %\n";
    std::cout << "Net Dry Biomass:      " << result.dryMassKg << " kg\n";
    std::cout << "Water Extracted:      " << result.waterMassKg << " kg\n";
    std::cout << "Estimated Biofuel:    " << result.estimatedYieldLiters << " Liters\n";
    std::cout << "Total Energy Output:  " << result.totalEnergyOutputMJ << " MJ\n";
    std::cout << "----------------------------------------\n";

    return 0;
}
