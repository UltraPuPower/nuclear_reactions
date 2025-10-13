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
    console.log('You changed the element selector');
    setState("isotope-select", false);
    setState("decay-select", true);
    setState("attemptReaction", true);
};

isotopeSelect.addEventListener('change', updateDecayDropdown());

function updateDecayDropdown() {
    console.log('You changed the isotope selector');
    setState("decay-select", false);
    setState("attemptReaction", true);
};

decaySelect.addEventListener('change', updateDecayButton());

function updateDecayButton() {
    console.log('You changed the decay selector');
    setState("attemptReaction", false);
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