import { timePrefixDict, atomData, findElementObject, findNucleodeObject, decayOperation, fusionOperation } from "./reaction_calculator.js";
import { changeElementText, changeButtonText, giveState, setState, switchState, getInput, fillDropDown } from "./utils/base_utils.js";

// ========[ Declare Buttons ]========
const fusionCalculatorFirstElementSelect = document.getElementById('fusionCalculatorFirstElementSelect');
const fusionCalculatorFirstNucleonEntry = document.getElementById('fusionCalculatorFirstNucleonEntry');
const fusionCalculatorSecondElementSelect = document.getElementById('fusionCalculatorSecondElementSelect');
const fusionCalculatorSecondNucleonEntry = document.getElementById('fusionCalculatorSecondNucleonEntry');

const attemptFusionCalculatorReaction = document.getElementById('attemptFusionCalculatorReaction');
const continueFusionCalculatorReaction = document.getElementById('continueFusionCalculatorReaction');

// ========[ Fill the element dropdowns ]========
atomData.forEach(element => {
    const option = document.createElement('option');
    option.value = element.protonCount;
    option.textContent = `${element.elementName} (${element.protonCount})`;
    fusionCalculatorFirstElementSelect.appendChild(option);
});

atomData.forEach(element => {
    const option = document.createElement('option');
    option.value = element.protonCount;
    option.textContent = `${element.elementName} (${element.protonCount})`;
    fusionCalculatorSecondElementSelect.appendChild(option);
});

// ========[ Disable other input elements ]========
fusionCalculatorFirstNucleonEntry.disabled = true;
fusionCalculatorSecondNucleonEntry.disabled = true;
attemptFusionCalculatorReaction.disabled = true;

// ========[ Handle change to element dropdowns ]========
fusionCalculatorFirstElementSelect.addEventListener('change', updateIsotopeEntries);
fusionCalculatorSecondElementSelect.addEventListener('change', updateIsotopeEntries);
function updateIsotopeEntries() {const firstSelectedElement = fusionCalculatorFirstElementSelect.value;
    const secondSelectedElement = fusionCalculatorSecondElementSelect.value;

    let firstEntry = false;
    let secondEntry = false;

    fusionCalculatorFirstNucleonEntry.disabled = true;
    fusionCalculatorSecondNucleonEntry.disabled = true;
    attemptFusionCalculatorReaction.disabled = true;

    if (firstSelectedElement != "base") {
        fusionCalculatorFirstNucleonEntry.disabled = false;
        firstEntry = true
    }

    if (secondSelectedElement != "base") {
        fusionCalculatorSecondNucleonEntry.disabled = false;
        secondEntry = true
    }

    if (firstEntry && secondEntry) fissionSandboxReactionButton.disabled = false;
};

// ========[ Execute fusion reaction ]========
attemptFusionCalculatorReaction.addEventListener('click', executeFusionAction);
function executeFusionAction() {
    const firstSelectedElement = fusionCalculatorFirstElementSelect.value;
    const firstSelectedNucleon = fusionCalculatorFirstNucleonEntry.value;
    const secondSelectedElement = fusionCalculatorSecondElementSelect.value;
    const secondSelectedNucleon = fusionCalculatorSecondNucleonEntry.value;

    if(!/[0-9]+/.test(firstSelectedNucleon)) {
        changeElementText("fusionCalculatorResult", 'Invalid first nucleode count');
    }
    if(!/[0-9]+/.test(secondSelectedNucleon)) {
        changeElementText("fusionCalculatorResult", 'Invalid second nucleode count');
    }

    const newIsotopeArray = fusionOperation(firstSelectedElement, firstSelectedNucleon, secondSelectedElement, secondSelectedNucleon);
    const protonCount = newIsotopeArray[0], nucleonCount = newIsotopeArray[1];

    if (nucleonCount > 0 && protonCount > 0 && protonCount < nucleonCount) {
        changeElementText("fusionCalculatorResult", `${protonCount <= 118 ? atomData[protonCount-1].elementName : protonCount}-${newIsotopeArray[1]}`);
        localStorage.setItem("latestFusionCalculatorIsotope", `${protonCount}-${newIsotopeArray[1]}`);
    } else {
        changeElementText("fusionCalculatorResult", 'An unknown element');
        localStorage.removeItem("latestFusionCalculatorIsotope");
    }
};

// ========[ Continue fusion with new isotope ]========
continueFusionCalculatorReaction.addEventListener('click', setLatestProduct)
function setLatestProduct() {
    const latestProduct = localStorage.getItem("latestFusionCalculatorIsotope");
    if (!latestProduct) return

    const isotopeArray = latestProduct.split('-');
    const protonCount = isotopeArray[0], nucleonCount = isotopeArray[1];

    if (protonCount <= 118 || protonCount < 0 || nucleonCount  < 0 || nucleonCount < protonCount) {
        fusionCalculatorFirstElementSelect.value = protonCount;
        fusionCalculatorFirstNucleonEntry.value = nucleonCount;
        fusionCalculatorSecondElementSelect.value = "base";
        fusionCalculatorSecondNucleonEntry.value = "";
    } else {
        changeElementText("fusionCalculatorResult", 'An unknown element');
    }
    updateIsotopeEntries();
};

setLatestProduct()