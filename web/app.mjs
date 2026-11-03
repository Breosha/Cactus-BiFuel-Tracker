import { calculateYield, species } from "./calculator.mjs";

const speciesOptions = document.querySelector("#species-options");
const massInput = document.querySelector("#mass-input");
const massSlider = document.querySelector("#mass-slider");
const moistureInput = document.querySelector("#moisture-input");
const moistureValue = document.querySelector("#moisture-value");
const moistureCaption = document.querySelector("#moisture-caption");
const massError = document.querySelector("#mass-error");
const resultsContent = document.querySelector("#results-content");
const resultsData = document.querySelector("#results-data");
const resultState = document.querySelector("#result-state");
let selectedSpecies = species[0];

const numberFormatter = new Intl.NumberFormat(undefined, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

function updateRangeBackground(input) {
  const progress = ((Number(input.value) - Number(input.min)) / (Number(input.max) - Number(input.min))) * 100;
  input.style.setProperty("--range-progress", `${progress}%`);
}

function setMoisture(value) {
  moistureInput.value = String(value);
  moistureValue.textContent = String(value);
  moistureCaption.textContent = value === selectedSpecies.defaultMoisturePercent
    ? "Typical for this cactus"
    : "Custom moisture setting";
  updateRangeBackground(moistureInput);
}

function renderSpeciesOptions() {
  speciesOptions.replaceChildren();
  for (const [index, item] of species.entries()) {
    const option = document.createElement("button");
    option.type = "button";
    option.className = "species-option";
    option.setAttribute("role", "radio");
    option.setAttribute("aria-checked", String(item.id === selectedSpecies.id));
    option.setAttribute("aria-label", `${item.name}, default moisture ${item.defaultMoisturePercent}%`);
    option.innerHTML = `<span class="species-visual" aria-hidden="true"><i class="tiny-cactus"></i>${index === 0 ? '<i class="tiny-cactus"></i>' : ""}</span><strong>${item.name}</strong><small>${item.defaultMoisturePercent}% moisture</small>`;
    option.addEventListener("click", () => {
      selectedSpecies = item;
      renderSpeciesOptions();
      setMoisture(item.defaultMoisturePercent);
      renderResultsIfVisible();
    });
    speciesOptions.append(option);
  }
  speciesOptions.setAttribute("role", "radiogroup");
  speciesOptions.setAttribute("aria-label", "Cactus variety");
}

function formatNumber(value) {
  return numberFormatter.format(value);
}

function renderResults() {
  const freshMassKg = Number(massInput.value);
  const moisturePercent = Number(moistureInput.value);

  if (!Number.isFinite(freshMassKg) || freshMassKg <= 0 || freshMassKg > Number(massInput.max)) {
    massError.textContent = `Enter a mass greater than 0 and no more than ${Number(massInput.max).toLocaleString()} kg.`;
    massInput.setAttribute("aria-invalid", "true");
    massInput.focus();
    return false;
  }

  massError.textContent = "";
  massInput.removeAttribute("aria-invalid");
  const result = calculateYield(selectedSpecies, freshMassKg, moisturePercent);

  document.querySelector("#result-species").textContent = selectedSpecies.shortName;
  document.querySelector("#result-mass").textContent = formatNumber(result.freshMassKg);
  document.querySelector("#fuel-value").textContent = formatNumber(result.estimatedYieldLiters);
  document.querySelector("#dry-value").textContent = formatNumber(result.dryMassKg);
  document.querySelector("#water-value").textContent = formatNumber(result.waterMassKg);
  document.querySelector("#energy-value").textContent = formatNumber(result.totalEnergyOutputMJ);

  resultsContent.hidden = true;
  resultsData.hidden = false;
  resultState.textContent = "ESTIMATE READY";
  return true;
}

function renderResultsIfVisible() {
  if (!resultsData.hidden) renderResults();
}

massInput.addEventListener("input", () => {
  const value = Number(massInput.value);
  if (Number.isFinite(value)) {
    massSlider.value = String(Math.min(Number(massSlider.max), Math.max(Number(massSlider.min), value)));
    updateRangeBackground(massSlider);
  }
  massError.textContent = "";
  massInput.removeAttribute("aria-invalid");
  renderResultsIfVisible();
});

massSlider.addEventListener("input", () => {
  massInput.value = massSlider.value;
  updateRangeBackground(massSlider);
  massError.textContent = "";
  massInput.removeAttribute("aria-invalid");
  renderResultsIfVisible();
});

moistureInput.addEventListener("input", () => {
  setMoisture(Number(moistureInput.value));
  renderResultsIfVisible();
});

document.querySelector("#reset-moisture").addEventListener("click", () => {
  setMoisture(selectedSpecies.defaultMoisturePercent);
  renderResultsIfVisible();
});

document.querySelector("#calculate-button").addEventListener("click", renderResults);
document.querySelector("#recalculate-button").addEventListener("click", () => {
  massInput.focus();
  massInput.select();
});

renderSpeciesOptions();
updateRangeBackground(massSlider);
setMoisture(selectedSpecies.defaultMoisturePercent);
