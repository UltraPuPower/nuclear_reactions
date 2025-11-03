import { timePrefixDict, atomData, findElementObject, findNucleodeObject, decayOperation, elementProtonCount } from "./decay_simulator.js";
import { changeElementText, changeButtonText, giveState, setState, switchState, getInput, fillDropDown } from "./utils/base_utils.js";

// ========[ Declare Buttons ]========
const fissionElementSelect = document.getElementById('fissionElementSelect');
const fissionIsotopeSelect = document.getElementById('fissionIsotopeSelect');
const fissionDecaySelect = document.getElementById('fissionDecaySelect');

const fissionReactionButton = document.getElementById('attemptFissionReaction');
const fissionContinueButton = document.getElementById("continueFissionReaction");
const fissionClearHistoryButton = document.getElementById("clearFissionHistory");

// ========[ Fill the element dropdowns ]========
atomData.forEach(element => {
    const option = document.createElement('option');
    option.value = element.protonCount;
    option.textContent = `${element.elementName} (${element.protonCount})`;
    fissionElementSelect.appendChild(option);
});

// ========[ Disable other input elements ]========
fissionIsotopeSelect.disabled = true;
fissionDecaySelect.disabled = true;
fissionReactionButton.disabled = true;

// ========[ Handle change to element dropdown ]========
fissionElementSelect.addEventListener('change', updateIsotopeDropdown);
function updateIsotopeDropdown() {
    fissionIsotopeSelect.innerHTML = '<option value="base">-- Select Isotope --</option>';
    fissionIsotopeSelect.disabled = true;
    fissionDecaySelect.innerHTML = '<option value="base">-- Select Decay Type --</option>';
    fissionDecaySelect.disabled = true;
    fissionReactionButton.disabled = true;

    let selectedElement = fissionElementSelect.value;
    if (selectedElement == "base") return;

    let elementObject = findElementObject(selectedElement);

    let elementName = atomData[selectedElement-1].elementName;

    let isotopeArray = elementObject.isotopes
    isotopeArray.forEach(isotope => {
        const option = document.createElement('option');
        option.value = isotope.nucleonCount;
        option.textContent = `${elementName}-${isotope.nucleonCount}`;
        fissionIsotopeSelect.appendChild(option);
    });

    fissionIsotopeSelect.disabled = false;
    localStorage.setItem("continuedFission", false)
};

// ========[ Handle change to isotope dropdown ]========
fissionIsotopeSelect.addEventListener('change', updateDecayDropdown);
function updateDecayDropdown() {
    fissionDecaySelect.innerHTML = '<option value="base">-- Select Decay Type --</option>';
    fissionDecaySelect.disabled = true;
    fissionReactionButton.disabled = true;

    let selectedElement = fissionElementSelect.value;
    let selectedIsotope = fissionIsotopeSelect.value;
    if (selectedIsotope == "base") return;

    let isotopeObject = findNucleodeObject(selectedElement, selectedIsotope);

    let decayArray = isotopeObject.decay
    if(decayArray == 'stable') {
        const option = document.createElement('option');
        option.value = 'stable';
        option.textContent = `Stable`;
        fissionDecaySelect.appendChild(option);
    } else {
        decayArray.forEach(decay => {
            const option = document.createElement('option');
            const type = decay.decayType
            option.value = type;
            option.textContent = `${type}`;
            fissionDecaySelect.appendChild(option);
        });
    }

    fissionDecaySelect.disabled = false;
    localStorage.setItem("continuedFission", false)
};

// ========[ Handle change to decay dropdown ]========
fissionDecaySelect.addEventListener('change', updateDecayButton);
function updateDecayButton() {
    fissionReactionButton.disabled = true;

    if (fissionDecaySelect.value == "base") return

    fissionReactionButton.disabled = false;
};

// ========[ Execute decay reaction ]========
fissionReactionButton.addEventListener('click', executeDecayAction);
function executeDecayAction() {
    let selectedElement = fissionElementSelect.value;
    let selectedIsotope = fissionIsotopeSelect.value;
    let selectedDecayType = fissionDecaySelect.value;

    let newIsotopeArray = decayOperation(selectedDecayType, selectedElement, selectedIsotope);
    let elementName = atomData[newIsotopeArray[0]-1].elementName

    updateDecayHistory(`${selectedElement}-${selectedIsotope}`, selectedDecayType, `${newIsotopeArray[0]}-${newIsotopeArray[1]}`)

    localStorage.setItem("latestFissionCalculatorIsotope", `${newIsotopeArray[0]}-${newIsotopeArray[1]}`);
    changeElementText("fissionResult", `${elementName}-${newIsotopeArray[1]}`);
};

// ========[ Continue decay of new isotope ]========
fissionContinueButton.addEventListener('click', setLatestProduct)
function setLatestProduct() {
    const latestProduct = localStorage.getItem("latestFissionCalculatorIsotope")
    if (!latestProduct) return

    const isotopeArray = latestProduct.split('-');
    const protonCount = isotopeArray[0], nucleonCount = isotopeArray[1];

    const nucleodeCheck = findNucleodeObject(protonCount, nucleonCount);
    if (!nucleodeCheck) {
        console.log('nucleode not found')
        return
    }

    fissionElementSelect.value = protonCount;
    updateIsotopeDropdown();
    fissionIsotopeSelect.value = nucleonCount;
    updateDecayDropdown();

    localStorage.setItem("continuedFission", true);
};

// ========[ decay history ]========
function updateDecayHistory(oldIsotope, decayType, newIsotope) {
    const currentHistory = localStorage.getItem("fissionCalculatorHistory");
    const historyAddition = `${oldIsotope}>${decayType}>${newIsotope}`;
    const continued = localStorage.getItem("continuedFission");
    /**
     * 92-235>a>90-231|90-231>b->91-231|91-231>b->92-239
     * input>decayType>output
     * | is a continued reaction, / is a new reaction chain
     */
    let newHistory = ''
    if (currentHistory) {
        newHistory += `${currentHistory}${continued == "true" ? '|' : '/'}${historyAddition}`;
    } else {
        newHistory += historyAddition;
    }
    localStorage.setItem("fissionCalculatorHistory", newHistory);
    updateHistory();
};

function updateHistory() {
    const historyData = localStorage.getItem("fissionCalculatorHistory");

    const historyPartArray = historyData.split('/');

    let historyText = '';
    historyPartArray.forEach(chain => {
        let reactionArray = chain.split('|')
        reactionArray.forEach(reaction => {
            historyText += `${reaction}<br>`
        });
        historyText += '<br><br>'
    });

    changeElementText("fissionCalculatorHistory", historyText);
};

fissionClearHistoryButton.addEventListener('click', resetHistory);
function resetHistory() {
    // localStorage.clear() // Clears complete local storage
    localStorage.removeItem("latestFissionCalculatorIsotope");
    localStorage.removeItem("fissionCalculatorHistory");
    updateHistory()
};

setLatestProduct()