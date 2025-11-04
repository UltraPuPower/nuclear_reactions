/**
 * Base Utils is a file with the standard web tools and functions usable across all websites
 * It contains base functions that other files can copy over, and provides usefull examples
 * 
 * All code in this file is free to be copied, redistributed or otherwise used in accordance to the MIT license, but I would appreciate if you left this message in it
 *  - UltraPuPower1
 */

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

export { changeElementText, changeButtonText, giveState, setState, switchState, getInput, fillDropDown };