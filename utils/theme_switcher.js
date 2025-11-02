const buttonTheme = document.getElementById("buttonTheme");
buttonTheme.addEventListener('click', function() {
    themeSwitcher(themeFlip());
});

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
    localStorage.setItem("theme", newTheme);
    if (newTheme == 'dark') {
        buttonTheme.innerText = '☀︎'
    } else {
        buttonTheme.innerText = '☾'
    }
    updateTheme(newTheme );

    getCurrentTheme = newTheme;
};

// ======[On Load]======

// Set a theme
themeSwitcher(getCurrentTheme);