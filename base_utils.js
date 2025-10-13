/**
 * Base Utils is a file with the standard web tools and functions usable across all websites
 * It contains base functions that other files can copy over, and provides usefull examples
 * 
 * All code in this file is free to be copied, redistributed or otherwise used in accordance to the MIT license, but I would appreciate if you left this message in it
 *  - UltraPuPower1
 */

const buttonTest = document.getElementById("attemptReaction");
buttonTest.addEventListener('click', function() {
    
});

const buttonTheme = document.getElementById("buttonTheme");
buttonTheme.addEventListener('click', function() {
    themeSwitcher(themeFlip());
});

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

// Theme switching utils
let getCurrentTheme = getPreferenceTheme();

function getPreferenceTheme() {
    const currentSetting = localStorage.getItem("theme");
    const systemPreferenceDark = window.matchMedia("(prefers-color-scheme: dark)");
    const systemPreferenceLight = window.matchMedia("(prefers-color-scheme: light)");

    if (currentSetting !== null) {
        return currentSetting;
    }

    if (systemPreferenceDark.matches) {
        return "dark";
    }

    if (systemPreferenceLight.matches) {
        return "light";
    }

    return "dark";
};

function updateTheme(theme) {
    document.querySelector("html").setAttribute("data-theme", theme);
};

function themeFlip() {
    const newTheme = getCurrentTheme == "dark" ? "light" : "dark";

    return newTheme;
}

function themeSwitcher(newTheme) {
    const oldTheme = newTheme == "dark" ? "light" : "dark";
    
    localStorage.setItem("theme", newTheme);
    if (newTheme == 'dark') {
        changeButtonText(buttonTheme, '☀︎');
    } else {
        changeButtonText(buttonTheme, '☾');
    }
    updateTheme(newTheme );

    getCurrentTheme = newTheme;
};

// ======[On Load]======

// Set a theme
themeSwitcher(getCurrentTheme);