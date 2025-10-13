import { timePrefixDict, atomData, findElementObject, findNucleodeObject, decayOperation, elementName, elementProtonCount } from "./decay_simulator.js";

atomData.forEach(element => {
    const option = document.createElement('option');
    option.value = element.protonCount;
    option.textContent = `${element.elementName} (${element.protonCount})`;
    elementSelect.appendChild(option);
});

const elementSelect = document.getElementById('element-select');
elementSelect.addEventListener('change', updateIsotopeDropdown());

function updateIsotopeDropdown() {
    console.log('You changed the element selector');
};

const isotopeSelect = document.getElementById('isotope-select');
isotopeSelect.addEventListener('change', updateDecayDropdown());

function updateDecayDropdown() {
    console.log('You changed the isotope selector');
};

const decaySelect = document.getElementById('decay-select');
decaySelect.addEventListener('change', updateDecayButton());

function updateDecayButton() {
    console.log('You changed the decay selector');
};

const reactionButton = document.getElementById('attemptReaction');
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

    function giveState(searchElement, outputElement) {
        let text = document.getElementById(searchElement).disabled;
        return text;
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