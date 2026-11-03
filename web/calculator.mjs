export const species = [
  {
    id: "prickly-pear",
    name: "Prickly pear",
    scientificName: "Opuntia ficus-indica",
    shortName: "Opuntia ficus-indica",
    defaultMoisturePercent: 88,
    conversionRate: 0.28,
    energyDensityMJ: 13.5
  },
  {
    id: "spineless",
    name: "Spineless",
    scientificName: "Nopalea cochenillifera",
    shortName: "Nopalea cochenillifera",
    defaultMoisturePercent: 90,
    conversionRate: 0.25,
    energyDensityMJ: 12.8
  },
  {
    id: "streptacantha",
    name: "Streptacantha",
    scientificName: "Opuntia streptacantha",
    shortName: "Opuntia streptacantha",
    defaultMoisturePercent: 86,
    conversionRate: 0.3,
    energyDensityMJ: 14.1
  }
];

export function calculateYield(selectedSpecies, freshMassKg, moisturePercent) {
  if (!Number.isFinite(freshMassKg) || freshMassKg < 0) {
    throw new RangeError("Fresh mass must be a non-negative number.");
  }
  if (!Number.isFinite(moisturePercent)) {
    throw new RangeError("Moisture must be a finite number.");
  }

  const moistureRatio = Math.min(100, Math.max(0, moisturePercent)) / 100;
  const waterMassKg = freshMassKg * moistureRatio;
  const dryMassKg = freshMassKg * (1 - moistureRatio);

  return {
    freshMassKg,
    dryMassKg,
    waterMassKg,
    estimatedYieldLiters: dryMassKg * selectedSpecies.conversionRate,
    totalEnergyOutputMJ: dryMassKg * selectedSpecies.energyDensityMJ
  };
}
