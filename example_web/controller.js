// Data structure for radioactive elements and isotopes
const radioactiveElements = [
    {
        atomName: 'Uranium', 
        symbol: 'U',
        pCount: 92, 
        atomIsotopes: [
            {nucleodeCount: 235, decayType: ['alpha', 'beta'], natural: true},
            {nucleodeCount: 238, decayType: ['alpha'], natural: true}
        ]
    },
    {
        atomName: 'Thorium', 
        symbol: 'Th',
        pCount: 90, 
        atomIsotopes: [
            {nucleodeCount: 232, decayType: ['alpha'], natural: true}
        ]
    },
    {
        atomName: 'Radium', 
        symbol: 'Ra',
        pCount: 88, 
        atomIsotopes: [
            {nucleodeCount: 226, decayType: ['alpha'], natural: true}
        ]
    },
    {
        atomName: 'Radon', 
        symbol: 'Rn',
        pCount: 86, 
        atomIsotopes: [
            {nucleodeCount: 222, decayType: ['alpha'], natural: true}
        ]
    },
    {
        atomName: 'Polonium', 
        symbol: 'Po',
        pCount: 84, 
        atomIsotopes: [
            {nucleodeCount: 210, decayType: ['alpha', 'beta'], natural: true}
        ]
    },
    {
        atomName: 'Bismuth', 
        symbol: 'Bi',
        pCount: 83, 
        atomIsotopes: [
            {nucleodeCount: 209, decayType: ['beta'], natural: true},
            {nucleodeCount: 213, decayType: ['alpha', 'beta'], natural: false}
        ]
    },
    {
        atomName: 'Lead', 
        symbol: 'Pb',
        pCount: 82, 
        atomIsotopes: [
            {nucleodeCount: 206, decayType: [], natural: true},
            {nucleodeCount: 214, decayType: ['beta'], natural: false}
        ]
    },
    {
        atomName: 'Thallium', 
        symbol: 'Tl',
        pCount: 81, 
        atomIsotopes: [
            {nucleodeCount: 201, decayType: ['beta'], natural: false}
        ]
    },
    {
        atomName: 'Cesium', 
        symbol: 'Cs',
        pCount: 55, 
        atomIsotopes: [
            {nucleodeCount: 137, decayType: ['beta'], natural: false}
        ]
    },
    {
        atomName: 'Carbon',
        symbol: 'C',
        pCount: 6,
        atomIsotopes: [
            {nucleodeCount: 14, decayType: ['beta'], natural: true}
        ]
    }
];

// Element symbols for decay products not in our original list
const additionalElements = {
    4: {atomName: 'Beryllium', symbol: 'Be'},
    2: {atomName: 'Helium', symbol: 'He'},
    83: {atomName: 'Bismuth', symbol: 'Bi'},
    84: {atomName: 'Polonium', symbol: 'Po'},
    85: {atomName: 'Astatine', symbol: 'At'},
    86: {atomName: 'Radon', symbol: 'Rn'},
    87: {atomName: 'Francium', symbol: 'Fr'},
    88: {atomName: 'Radium', symbol: 'Ra'},
    89: {atomName: 'Actinium', symbol: 'Ac'},
    90: {atomName: 'Thorium', symbol: 'Th'},
    91: {atomName: 'Protactinium', symbol: 'Pa'},
    92: {atomName: 'Uranium', symbol: 'U'},
    93: {atomName: 'Neptunium', symbol: 'Np'},
    94: {atomName: 'Plutonium', symbol: 'Pu'},
    56: {atomName: 'Barium', symbol: 'Ba'},
    7: {atomName: 'Nitrogen', symbol: 'N'},
    54: {atomName: 'Xenon', symbol: 'Xe'},
};

// UI Elements
const elementSelect = document.getElementById('element-select');
const isotopeSelect = document.getElementById('isotope-select');
const decayTypeSelect = document.getElementById('decay-type');
const decayButton = document.getElementById('decay-button');
const animationArea = document.getElementById('animation-area');
const particlesContainer = document.getElementById('particles');

// Populating Elements Dropdown
radioactiveElements.forEach(element => {
    const option = document.createElement('option');
    option.value = element.atomName.toLowerCase();
    option.textContent = `${element.atomName} (${element.pCount})`;
    elementSelect.appendChild(option);
});

// Event Listeners
elementSelect.addEventListener('change', handleElementChange);
isotopeSelect.addEventListener('change', handleIsotopeChange);
decayTypeSelect.addEventListener('change', handleDecayTypeChange);
decayButton.addEventListener('click', attemptDecay);

function handleElementChange() {
    isotopeSelect.innerHTML = '<option value="">-- Select Isotope --</option>';
    decayTypeSelect.innerHTML = '<option value="">-- Select Decay Type --</option>';
    isotopeSelect.disabled = true;
    decayTypeSelect.disabled = true;
    decayButton.disabled = true;
    
    if (elementSelect.value) {
        const selectedElement = radioactiveElements.find(
            el => el.atomName.toLowerCase() === elementSelect.value
        );
        
        selectedElement.atomIsotopes.forEach(isotope => {
            const option = document.createElement('option');
            option.value = isotope.nucleodeCount;
            option.textContent = `${selectedElement.atomName}-${isotope.nucleodeCount}`;
            isotopeSelect.appendChild(option);
        });
        
        isotopeSelect.disabled = false;
        
        updateDisplay({
            type: 'element',
            elementName: selectedElement.atomName,
            elementSymbol: selectedElement.symbol,
            protonCount: selectedElement.pCount
        });
    } else {
        updateDisplay({ type: 'default' });
    }
}

function handleIsotopeChange() {
    decayTypeSelect.innerHTML = '<option value="">-- Select Decay Type --</option>';
    decayTypeSelect.disabled = true;
    decayButton.disabled = true;
    
    if (isotopeSelect.value) {
        const selectedElement = radioactiveElements.find(
            el => el.atomName.toLowerCase() === elementSelect.value
        );
        
        const selectedIsotope = selectedElement.atomIsotopes.find(
            iso => iso.nucleodeCount == isotopeSelect.value
        );
        
        selectedIsotope.decayType.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = type === 'alpha' ? 'Alpha Decay' : 'Beta Decay';
            decayTypeSelect.appendChild(option);
        });
        
        decayTypeSelect.disabled = selectedIsotope.decayType.length === 0;
        
        updateDisplay({
            type: 'isotope',
            elementName: selectedElement.atomName,
            elementSymbol: selectedElement.symbol,
            protonCount: selectedElement.pCount,
            nucleonCount: selectedIsotope.nucleodeCount
        });
    }
}

function handleDecayTypeChange() {
    decayButton.disabled = !decayTypeSelect.value;
}

function attemptDecay() {
    const selectedElement = radioactiveElements.find(
        el => el.atomName.toLowerCase() === elementSelect.value
    );
    
    const selectedIsotope = selectedElement.atomIsotopes.find(
        iso => iso.nucleodeCount == isotopeSelect.value
    );
    
    const decayType = decayTypeSelect.value;
    
    // Disable controls during animation
    elementSelect.disabled = true;
    isotopeSelect.disabled = true;
    decayTypeSelect.disabled = true;
    decayButton.disabled = true;
    
    // Show attempting decay animation
    updateDisplay({
        type: 'attempting',
        elementName: selectedElement.atomName,
        elementSymbol: selectedElement.symbol,
        protonCount: selectedElement.pCount,
        nucleonCount: selectedIsotope.nucleodeCount,
        decayType: decayType
    });
    
    // Check if decay is possible (it's in the decayType array)
    const canDecay = selectedIsotope.decayType.includes(decayType);
    
    // Create decay particles
    createParticles(decayType);
    
    // After animation time, show result
    setTimeout(() => {
        if (canDecay) {
            let newElement, newIsotope;
            let newProtonCount, newNucleonCount, newElementName, newElementSymbol;
            
            if (decayType === 'alpha') {
                // Alpha decay: pCount -2, nucleonCount -4
                newProtonCount = selectedElement.pCount - 2;
                newNucleonCount = selectedIsotope.nucleodeCount - 4;
                
                // Find the resulting element (or create a placeholder if not in our list)
                newElement = radioactiveElements.find(el => el.pCount === newProtonCount);
                
                if (newElement) {
                    newElementName = newElement.atomName;
                    newElementSymbol = newElement.symbol;
                    newIsotope = newElement.atomIsotopes.find(
                        iso => iso.nucleodeCount === newNucleonCount
                    );
                } else if (additionalElements[newProtonCount]) {
                    // Check our additional elements list
                    newElementName = additionalElements[newProtonCount].atomName;
                    newElementSymbol = additionalElements[newProtonCount].symbol;
                } else {
                    newElementName = 'Unknown Element';
                    newElementSymbol = '??';
                }
                
                updateDisplay({
                    type: 'success',
                    originalElement: selectedElement.atomName,
                    originalSymbol: selectedElement.symbol,
                    originalProtonCount: selectedElement.pCount,
                    originalNucleonCount: selectedIsotope.nucleodeCount,
                    newElement: newElementName,
                    newElementSymbol: newElementSymbol,
                    newProtonCount: newProtonCount,
                    newNucleonCount: newNucleonCount,
                    decayType: 'alpha'
                });
            } else if (decayType === 'beta') {
                // Beta decay: pCount +1, nucleonCount same
                newProtonCount = selectedElement.pCount + 1;
                newNucleonCount = selectedIsotope.nucleodeCount;
                
                // Find the resulting element
                newElement = radioactiveElements.find(el => el.pCount === newProtonCount);
                
                if (newElement) {
                    newElementName = newElement.atomName;
                    newElementSymbol = newElement.symbol;
                    newIsotope = newElement.atomIsotopes.find(
                        iso => iso.nucleodeCount === newNucleonCount
                    );
                } else if (additionalElements[newProtonCount]) {
                    // Check our additional elements list
                    newElementName = additionalElements[newProtonCount].atomName;
                    newElementSymbol = additionalElements[newProtonCount].symbol;
                } else {
                    newElementName = 'Unknown Element';
                    newElementSymbol = '??';
                }
                
                updateDisplay({
                    type: 'success',
                    originalElement: selectedElement.atomName,
                    originalSymbol: selectedElement.symbol,
                    originalProtonCount: selectedElement.pCount,
                    originalNucleonCount: selectedIsotope.nucleodeCount,
                    newElement: newElementName,
                    newElementSymbol: newElementSymbol,
                    newProtonCount: newProtonCount,
                    newNucleonCount: newNucleonCount,
                    decayType: 'beta'
                });
            }
        } else {
            // Decay failed
            updateDisplay({
                type: 'failed',
                elementName: selectedElement.atomName,
                elementSymbol: selectedElement.symbol,
                protonCount: selectedElement.pCount,
                nucleonCount: selectedIsotope.nucleodeCount,
                decayType: decayType
            });
        }
        
        // Re-enable controls after animation
        setTimeout(() => {
            elementSelect.disabled = false;
            isotopeSelect.disabled = false;
            decayTypeSelect.disabled = false;
            decayButton.disabled = false;
        }, 3000);
        
    }, 3000);  // 3 second animation time
}

function updateDisplay(info) {
    // Clear previous content
    animationArea.innerHTML = '';
    
    switch(info.type) {
        case 'default':
            animationArea.innerHTML = `
                <div class="element-display">Select an Element</div>
                <div class="element-info">Choose an element and isotope to begin</div>
            `;
            break;
            
        case 'element':
            animationArea.innerHTML = `
                <div class="element-display">${info.elementName}</div>
                <div class="element-symbol pulse">${info.elementSymbol}</div>
                <div class="element-info">Protons: ${info.protonCount}</div>
                <div class="element-info">Select an isotope to continue</div>
            `;
            break;
            
        case 'isotope':
            animationArea.innerHTML = `
                <div class="element-display">${info.elementName}-${info.nucleonCount}</div>
                <div class="element-symbol pulse">
                    ${info.elementSymbol}
                    <div class="isotope-number">${info.nucleonCount}</div>
                </div>
                <div class="element-info">Protons: ${info.protonCount}, Nucleons: ${info.nucleonCount}</div>
                <div class="element-info">Select a decay type to continue</div>
            `;
            break;
            
        case 'attempting':
            animationArea.innerHTML = `
                <div class="element-display fade-in-out">Attempting ${info.decayType} decay...</div>
                <div class="element-symbol pulse">
                    ${info.elementSymbol}
                    <div class="isotope-number">${info.nucleonCount}</div>
                </div>
                <div class="element-info">Energy is building up...</div>
            `;
            break;
            
        case 'success':
            animationArea.innerHTML = `
                <div class="element-display fade-in-out">Successful ${info.decayType} decay!</div>
                <div class="element-symbol">
                    ${info.newElementSymbol}
                    <div class="isotope-number">${info.newNucleonCount}</div>
                </div>
                <div class="element-info">${info.originalElement}-${info.originalNucleonCount} → ${info.newElement}-${info.newNucleonCount}</div>
                <div class="element-info">New Element: ${info.newElement} (Protons: ${info.newProtonCount})</div>
            `;
            break;
            
        case 'failed':
            animationArea.innerHTML = `
                <div class="element-display fade-in-out">${info.decayType} decay failed!</div>
                <div class="element-symbol">
                    ${info.elementSymbol}
                    <div class="isotope-number">${info.nucleonCount}</div>
                </div>
                <div class="element-info">This isotope cannot undergo ${info.decayType} decay</div>
                <div class="element-info">Try a different decay type</div>
            `;
            break;
    }
}

function createParticles(decayType) {
    // Clear existing particles
    particlesContainer.innerHTML = '';
    
    const particleCount = decayType === 'alpha' ? 15 : 30;
    const particleClass = decayType === 'alpha' ? 'alpha-particle' : 'beta-particle';
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle', particleClass);
        
        // Set random size (alpha particles are larger)
        const size = decayType === 'alpha' ? 
            Math.random() * 15 + 10 : // 10-25px for alpha
            Math.random() * 8 + 4;    // 4-12px for beta
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Set starting position (center of container)
        const centerX = particlesContainer.offsetWidth / 2;
        const centerY = particlesContainer.offsetHeight / 2;
        particle.style.left = `${centerX}px`;
        particle.style.top = `${centerY}px`;
        
        // Add to container
        particlesContainer.appendChild(particle);
        
        // Animate the particle
        setTimeout(() => {
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 400 + 100; // 100-500px distance
            const speed = Math.random() * 2 + 1; // 1-3 second duration
            
            const targetX = centerX + Math.cos(angle) * distance;
            const targetY = centerY + Math.sin(angle) * distance;
            
            particle.style.transition = `all ${speed}s ease-out`;
            particle.style.left = `${targetX}px`;
            particle.style.top = `${targetY}px`;
            particle.style.opacity = '0';
        }, Math.random() * 500); // Stagger animation start
    }
}