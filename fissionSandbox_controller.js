import { timePrefixDict, atomData, findElementObject, findNucleodeObject, decayOperation, elementProtonCount } from "./decay_simulator.js";
import { changeElementText, changeButtonText, giveState, setState, switchState, getInput, fillDropDown } from "./utils/base_utils.js";

// ========[ Declare Buttons ]========
const fissionSandboxElementSelect = document.getElementById('fissionSandboxElementSelect');
const fissionSandboxNucleonEntry = document.getElementById('fissionSandboxNucleonEntry');
const fissionSandboxDecayEntry = document.getElementById('fissionSandboxDecayEntry');

const fissionSandboxReactionButton = document.getElementById('attemptSandboxFissionReaction');
const fissionSandboxContinueButton = document.getElementById('continueSandboxFissionReaction');

// ========[ Fill the element dropdowns ]========
atomData.forEach(element => {
    const option = document.createElement('option');
    option.value = element.protonCount;
    option.textContent = `${element.elementName} (${element.protonCount})`;
    fissionSandboxElementSelect.appendChild(option);
});

// ========[ Handle change to element dropdown ]========
fissionSandboxElementSelect.addEventListener('change', updateSandboxEntries);
function updateSandboxEntries() {
    fissionSandboxNucleonEntry.disabled = true;
    fissionSandboxDecayEntry.disabled = true;
    fissionSandboxReactionButton.disabled = true;

    let selectedElement = fissionSandboxElementSelect.value;
    if (selectedElement == "base") return;

    fissionSandboxNucleonEntry.disabled = false;
    fissionSandboxDecayEntry.disabled = false;
    fissionSandboxReactionButton.disabled = false;
};

// ========[ Execute decay reaction ]========
fissionSandboxReactionButton.addEventListener('click', executeDecayAction);
function executeDecayAction() {
    const selectedElement = fissionSandboxElementSelect.value;
    const nucleonCountEntry = fissionSandboxNucleonEntry.innerHTML;
    const decayEntry = fissionSandboxDecayEntry.innerHTML;

    if(!/[0-9]+/.test(nucleonCountEntry)) {
        changeElementText("fissionSandboxResult", 'Invalid nucleode count');
    }// /([0-9])?([abdenpt][+-]?)/

    const decayEntryArray = decayEntry.split(',');
    decayEntryArray.forEach(entry => {
        if(!/([0-9])?([abdenpt][+-]?)/.test(entry)) {
            changeElementText("fissionSandboxResult", 'Invalid decay type');
        }
    });

    const newIsotopeArray = decayOperation(decayEntry, selectedElement, nucleonCountEntry);
    const protonCount = newIsotopeArray[0]
    const elementName = protonCount <= 118 ? atomData[protonCount].elementName: protonCount;

    localStorage.setItem("latestFissionSandboxIsotope", `${protonCount}-${newIsotopeArray[1]}`);
    changeElementText("fissionSandboxResult", `${elementName}-${newIsotopeArray[1]}`);
};
// ========[ Continue decay of new isotope ]========
fissionSandboxContinueButton.addEventListener('click', setLatestProduct)
function setLatestProduct() {
    const latestProduct = localStorage.getItem("latestFissionSandboxIsotope")
    if (!latestProduct) return

    const isotopeArray = latestProduct.split('-');
    const protonCount = isotopeArray[0], nucleonCount = isotopeArray[1];

    if (protonCount <= 118) {
        fissionSandboxElementSelect.value = protonCount;
        fissionSandboxNucleonEntry.innerHTML = nucleonCount;
    } else {
        changeElementText("fissionSandboxResult", 'An unknown element');
    }
};

// ========[ Startup scripts ]========
    // ========[ Disable other input elements ]========
    fissionSandboxNucleonEntry.disabled = true;
    fissionSandboxDecayEntry.disabled = true;

    // ========[ Continue with last product ]========
    setLatestProduct()