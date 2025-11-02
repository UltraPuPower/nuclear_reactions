// ========[ Sandbox isotope input ]========
const fissionSandboxIsotopeEntryButton = document.getElementById('fissionSandboxNucleonEntry');
fissionSandboxIsotopeEntryButton.addEventListener('keydown', function(event) {
    if(event.ctrlKey || event.altKey || typeof event.key !== 'string' || event.key.length !== 1) return;
    
    if(!/[0-9]+/.test(event.key)) {
        event.preventDefault();
    }
});

// ========[ Sandbox decay input ]========
const fissionSandboxDecayEntryButton = document.getElementById('fissionSandboxDecayEntry');
fissionSandboxDecayEntryButton.addEventListener('keydown', function(event) {
    if(event.ctrlKey || event.altKey || typeof event.key !== 'string' || event.key.length !== 1) return;
    
    if(!/[0-9abdnpt\+\-\,]+/.test(event.key)) {
        event.preventDefault();
    }
});