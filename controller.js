import { timePrefixDict, atomData, findElementObject, findNucleodeObject, decayOperation, elementProtonCount } from "./decay_simulator.js";

// ========[ Declare Buttons ]========
const elementSelect = document.getElementById('element-select');
const isotopeSelect = document.getElementById('isotope-select');
const decaySelect = document.getElementById('decay-select');

const reactionButton = document.getElementById('attemptReaction');
const continueButton = document.getElementById("continueReaction");

// ========[ Fill the element dropdown ]========
atomData.forEach(element => {
    const option = document.createElement('option');
    option.value = element.protonCount;
    option.textContent = `${element.elementName} (${element.protonCount})`;
    elementSelect.appendChild(option);
});

// ========[ Disable other dropdowns ]========
isotopeSelect.disabled = true;
decaySelect.disabled = true;
reactionButton.disabled = true;

// ========[ Handle change to element dropdown ]========
elementSelect.addEventListener('change', updateIsotopeDropdown);
function updateIsotopeDropdown() {
    isotopeSelect.innerHTML = '<option value="base">-- Select Isotope --</option>';
    isotopeSelect.disabled = true;
    decaySelect.innerHTML = '<option value="base">-- Select Decay Type --</option>';
    decaySelect.disabled = true;
    reactionButton.disabled = true;

    let selectedElement = elementSelect.value;
    if (selectedElement == "base") return;

    let elementObject = findElementObject(selectedElement);

    let elementName = atomData[selectedElement-1].elementName;

    let isotopeArray = elementObject.isotopes
    isotopeArray.forEach(isotope => {
        const option = document.createElement('option');
        option.value = isotope.nucleonCount;
        option.textContent = `${elementName}-${isotope.nucleonCount}`;
        isotopeSelect.appendChild(option);
    });

    isotopeSelect.disabled = false;
};

// ========[ Handle change to isotope dropdown ]========
isotopeSelect.addEventListener('change', updateDecayDropdown);
function updateDecayDropdown() {
    decaySelect.innerHTML = '<option value="base">-- Select Decay Type --</option>';
    decaySelect.disabled = true;
    reactionButton.disabled = true;

    let selectedElement = elementSelect.value;
    let selectedIsotope = isotopeSelect.value;
    if (selectedIsotope == "base") return;

    let isotopeObject = findNucleodeObject(selectedElement, selectedIsotope);

    let decayArray = isotopeObject.decay
    if(decayArray == 'stable') {
        const option = document.createElement('option');
        option.value = 'stable';
        option.textContent = `Stable`;
        decaySelect.appendChild(option);
    } else {
        decayArray.forEach(decay => {
            const option = document.createElement('option');
            const type = decay.decayType
            option.value = type;
            option.textContent = `${type}`;
            decaySelect.appendChild(option);
        });
    }

    decaySelect.disabled = false;
};

// ========[ Handle change to decay dropdown ]========
decaySelect.addEventListener('change', updateDecayButton);
function updateDecayButton() {
    reactionButton.disabled = true;

    if (decaySelect.value == "base") return

    reactionButton.disabled = false;
};

// ========[ Execute decay reaction ]========
reactionButton.addEventListener('click', executeDecayAction);
function executeDecayAction() {
    let selectedElement = elementSelect.value;
    let selectedIsotope = isotopeSelect.value;
    let selectedDecayType = decaySelect.value;

    let newIsotopeArray = decayOperation(selectedDecayType, selectedElement, selectedIsotope);
    let elementName = atomData[newIsotopeArray[0]-1].elementName

    localStorage.setItem("latestIsotope", newIsotopeArray);
    changeElementText("result", `You have created the isotope ${elementName}-${newIsotopeArray[1]}`);
};

// ========[ Continue decay of new isotope ]========
continueButton.addEventListener('click', continueReaction())
function continueReaction() {
    const isotopeArray = localStorage.getItem("latestIsotope");
    const protonCount = isotopeArray[0], nucleonCount = isotopeArray[1];

    const nucleodeCheck = findNucleodeObject(protonCount, nucleonCount);
    if (!nucleodeCheck) {
        console.log('nucleode not found')
        return
    }

    elementSelect.value = protonCount;
    updateIsotopeDropdown()
    isotopeSelect.value = nucleonCount;
}

// Base utils
function changeElementText(element, result) {
    document.getElementById(element).innerHTML =  result;
};