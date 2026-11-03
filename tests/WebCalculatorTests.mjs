import assert from "node:assert/strict";
import { calculateYield, species } from "../web/calculator.mjs";

const pricklyPear = species[0];

assert.deepEqual(
  calculateYield(pricklyPear, 100, pricklyPear.defaultMoisturePercent),
  {
    freshMassKg: 100,
    dryMassKg: 12,
    waterMassKg: 88,
    estimatedYieldLiters: 3.3600000000000003,
    totalEnergyOutputMJ: 162
  }
);

assert.deepEqual(
  calculateYield(pricklyPear, 100, 100),
  {
    freshMassKg: 100,
    dryMassKg: 0,
    waterMassKg: 100,
    estimatedYieldLiters: 0,
    totalEnergyOutputMJ: 0
  }
);

assert.deepEqual(
  calculateYield(pricklyPear, 50, 0),
  {
    freshMassKg: 50,
    dryMassKg: 50,
    waterMassKg: 0,
    estimatedYieldLiters: 14.000000000000002,
    totalEnergyOutputMJ: 675
  }
);
assert.equal(calculateYield(pricklyPear, 10, 125).dryMassKg, 0);
assert.equal(calculateYield(pricklyPear, 10, -5).waterMassKg, 0);
assert.throws(() => calculateYield(pricklyPear, -1, 50), RangeError);
assert.throws(() => calculateYield(pricklyPear, Number.NaN, 50), RangeError);
assert.throws(() => calculateYield(pricklyPear, 1, Number.NaN), RangeError);

console.log("Web calculator tests passed.");
