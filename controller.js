import { timePrefixDict, atomData, findElementObject, findNucleodeObject, decayOperation, elementProtonCount } from "./decay_simulator.js";

const elementSelect = document.getElementById('element-select');
const isotopeSelect = document.getElementById('isotope-select');
const decaySelect = document.getElementById('decay-select');
const reactionButton = document.getElementById('attemptReaction');

atomData.forEach(element => {
    const option = document.createElement('option');
    option.value = element.protonCount;
    option.textContent = `${element.elementName} (${element.protonCount})`;
    elementSelect.appendChild(option);
});

isotopeSelect.disabled = true;
decaySelect.disabled = true;
reactionButton.disabled = true;

elementSelect.addEventListener('change', updateIsotopeDropdown);

function updateIsotopeDropdown() {
    isotopeSelect.innerHTML = '<option value="">-- Select Isotope --</option>';
    isotopeSelect.disabled = true;
    decaySelect.innerHTML = '<option value="">-- Select Decay Type --</option>';
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

isotopeSelect.addEventListener('change', updateDecayDropdown);

function updateDecayDropdown() {
    decaySelect.innerHTML = '<option value="">-- Select Decay Type --</option>';
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

decaySelect.addEventListener('change', updateDecayButton);

function updateDecayButton() {
    reactionButton.disabled = true;

    if (decaySelect.value == "base") return

    reactionButton.disabled = false;
};

reactionButton.addEventListener('click', executeDecayAction);

function executeDecayAction() {
    let selectedElement = elementSelect.value;
    let selectedIsotope = isotopeSelect.value;
    let selectedDecayType = decaySelect.value;

    let newIsotopeArray = decayOperation(selectedDecayType, selectedElement, selectedIsotope);
    let elementName = atomData[newIsotopeArray[0]-1].elementName

    changeElementText("result", `You have created the isotope ${elementName}-${newIsotopeArray[1]}`);
};

// Base utils
function changeElementText(element, result) {
    document.getElementById(element).innerHTML =  result;
};