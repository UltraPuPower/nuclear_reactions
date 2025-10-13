import { timePrefixDict, atomData, findElementObject, findNucleodeObject, decayOperation, elementName, elementProtonCount } from "./decay_simulator.js";

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

// Disable Further buttons until element is selected (true => disabled)
setState("isotope-select", true);
setState("decay-select", true);
setState("attemptReaction", true);

elementSelect.addEventListener('change', updateIsotopeDropdown());

function updateIsotopeDropdown() {
    isotopeSelect.value = "base";
    isotopeSelect.disabled = true;
    decaySelect.value = "base";
    decaySelect.disabled = true;
    reactionButton.disabled = true;

    let selectedElement = elementSelect.value;
    if (selectedElement == "base") {
        console.log(`Base element selected: ${selectedElement}`);
        return;
    }

    console.log(`Proton Count: ${selectedElement}`);
    let elementObject = findElementObject(selectedElement);
    console.log(`Element object: ${elementObject}`);
    let elementName = atomData[selectedElement-1].elementName;
    console.log(`Element name: ${elementName}`);

    elementObject.forEach(isotope => {
        const option = document.createElement('option');
        option.value = isotope.nucleonCount;
        option.textContent = `${elementName}-${isotope.nucleonCount}`;
        console.log(`Added option: ${option.textContent}`);
        elementSelect.appendChild(option);
    });

    isotopeSelect.disabled = false;
    console.log('You changed the element selector');
};

isotopeSelect.addEventListener('change', updateDecayDropdown());

function updateDecayDropdown() {
    decaySelect.value = "base";
    decaySelect.disabled = true;
    reactionButton.disabled = true;

    if (isotopeSelect.value == "base") return

    decaySelect.disabled = false;
    console.log('You changed the isotope selector');
};

decaySelect.addEventListener('change', updateDecayButton());

function updateDecayButton() {
    reactionButton.disabled = true;

    if (decaySelect.value == "base") return

    reactionButton.disabled = false;
    console.log('You changed the decay selector');
};

reactionButton.addEventListener('click', executeDecayAction());

function executeDecayAction() {
    console.log('You clicked the reaction button');
};

// Base utils
    function changeElementText(element, result) {
        document.getElementById(element).innerHTML =  result;
    };

    function changeButtonText(button, text) {
        button.innerText = text;
    };

    function giveState(searchElement) {
        let text = document.getElementById(searchElement).disabled;
        return text;
    };

    function setState(element, state) {
        document.getElementById(element).disabled=state;
    };

    function switchState(element) {
        let elementState = document.getElementById(element).disabled;
        
        if (elementState) {
            document.getElementById(element).disabled=false;
        } else {
            document.getElementById(element).disabled=true;
        }
    };

    function getInput(element) {
        let input = document.getElementById(element).value;
        return input
    };

    function fillDropDown(element, textArray) {
        textArray.forEach(text => {
            const option = document.createElement('option');
            option.value = text.toLowerCase();
            option.textContent = text;
            element.appendChild(option);
        });
    };