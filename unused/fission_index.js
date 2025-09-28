// Index
/**
 * Nuclear Decay Simulation Module
 * Simulates nuclear decay processes
 * By UltraPuPower1, with assistance from friends
 * @module NuclearDecayTest
 */

/**
 * @typedef {Object} Elements
 * @property {number} protonCount - Number of protons (atomic number)
 * @property {Isotopes[]} isotopes - Array of isotopes for this element
 */

/**
 * @typedef {Object} Isotopes
 * @property {number} nucleonCount - Total number of nucleons (protons + neutrons)
 * @property {string} halflife - Array of possible decay types ('a', 'b-', 'b+', 'e', or 'stable')
 * @property {Decay[]|string} decay - Object of decay details 
 */

/**
 * @typedef {Object} Decay
 * @property {number} chance - Float of the chance of decay in 1 = 100% format
 * @property {string} decayType - String of decay type ('a', 'b-', 'b+', 'e', 'n', 'p', 'd', 't' or combinations of the aformentioned)
 */

/*
 * Decay Types:
 * a    - Alpha decay: Loss of He-4 nucleus (p -= 2, n -= 4)
 * b-   - Beta minus: Neutron → proton conversion (p += 1, n -= 1)
 * b+   - Beta plus: Proton → neutron conversion (p -= 1, n += 1)
 * e    - Electron capture: Similar to b+, with gamma emission due to merger of a positron and an electron
 * p    - Proton: Emits a proton from the core (p -= 1, n -= 1)
 * n    - Neutron: Emits a neutron from the core (p, n -= 1)
 * d    - Deuteron: Emission of a hydrogen-2 nucleus (p -= 1, n -= 2)
 * t    - Triton: Emission of a hydrogen-3 nucleus (p -= 1, n -= 3)
 * Combinations:
 * 2e   - Double Electron Capture
 * 2n   - Double Neutron
 * 2p   - Double Proton
 * 3p   - Triple Proton
 * b+,p  - Beta plus and Proton
 * b+,2p - Beta plus and Double Proton
 * b+,3p - Beta plus and Triple Proton
 * b+,a  - Beta plus and Alpha
 * 2b-  - Double Beta minus
 * b-,t  - Beta minus and Triton
 * b-,a  - Beta minus and Alpha
 * b-,n  - Beta minus and Neutron
 * b-,2n - Beta minus and Double Neutron
 * b-,3n - Beta minus and Triple Neutron
 * b-,4n - Beta minus and Quadruple Neutron
 */

/**
 * Searches the index for an isotope with given proton count and nucleon amount
 * @param {number} protonCount - Number of protons (atomic number)
 * @param {number} nucleodeAmount - Total number of nucleons
 * @returns {Isotopes|undefined} Isotope object if found, undefined otherwise
 */
const nucleodeIndex = (protonCount, nucleodeAmount) => {
    if (protonCount-atoms[0].pCount >= atoms.length) return
    return atoms[protonCount-atoms[0].pCount].atomIsotopes.find(item => item.nucleodeCount == nucleodeAmount);
}

/**
 * Generates standard notation name for an isotope (e.g., "uranium-235")
 * @param {number} protonCount - Number of protons (atomic number)
 * @param {number} nucleodeAmount - Total number of nucleons
 * @returns {string} Isotope name in standard notation
 */
const isotopeName = (protonCount, nucleodeAmount) => {
    const isotope = nucleodeIndex(protonCount, nucleodeAmount);
    return `${atoms[protonCount - atoms[0].pCount].atomName}-${isotope?.nucleodeCount}`;
};

/**
 * Verifies if a specific decay type is possible for an isotope
 * @param {string} type - Type of decay ('a', 'b-', 'b+', 'e')
 * @param {number} protonCount - Number of protons
 * @param {number} nucleodeAmount - Total number of nucleons
 * @returns {boolean} Whether decay type is possible
 */
const decayCheck = (type, protonCount, nucleodeAmount) => {
    const isotope = nucleodeIndex(protonCount, nucleodeAmount);
    const decayTypes = isotope.decayType;
    if (decayTypes.includes(type)) return true
    else return false
}
/**
 * Checks if an isotope exists in the database
 * @param {number} protonCount - Number of protons
 * @param {number} nucleodeAmount - Total number of nucleons
 * @returns {boolean} Whether isotope exists
 */
const isotopeCheck = (protonCount, nucleodeAmount) => {
    if (!nucleodeIndex(protonCount, nucleodeAmount)) {console.log(`ERROR: Isotope ${protonCount}-${nucleodeAmount} => This isotope does not seem to be catagorized`); return false;}
    else {return true}
}

/**
 * Searches the index for the proton count of the atom given.
 * @param {string} atomName - Name of the atom
 * @returns {number|string} Proton count if found, error string otherwise
 */
const protonCountFinder = (atomName) => {
    const atomLocation = atoms.find(item => item.atomName == atomName.toLowerCase());
    if (!atomLocation) return 'Error, Atom not found'
    return `${atomLocation.pCount}`;
}

/**
 * Simulates a decay reaction for a given isotope
 * @param {number} protons - Number of protons
 * @param {number} nucleons - Total number of nucleons
 * @param {string} type - Type of decay ('a', 'b-', 'b+', 'e')
 * @param {boolean} log - Generate log messages or not
 * @returns {string} Result message describing the reaction or failure
 */
const decayReaction = (protons, nucleons, type, log) => {
    // Propose a reaction
    if (!isotopeCheck(protons, nucleons)) return 'Failure at stage 1, refer to line above for specifics'
    if (!decayCheck(type, protons, nucleons)) return `Failure: ${isotopeName(protons, nucleons)} is not capable of decay type: ${type}`
    
    // Calculate a reaction
    let newProtons;
    let newNucleons;
    let decayName;

    switch (type) {
        case 'a':
            decayName = 'Alpha decay'
            if (log == true) console.log(`Attempting Alpha decay for ${isotopeName(protons, nucleons)}`);
            newProtons = protons - 2;
            newNucleons = nucleons - 4;
            break;
        case 'b-':
            decayName = 'Beta- decay'
            if (log == true) console.log(`Attempting Beta- decay for ${isotopeName(protons, nucleons)}`);
            newProtons = protons + 1;
            newNucleons = nucleons;
            break;
        case 'b+':
            decayName = 'Beta+ decay'
            if (log == true) console.log(`Attempting Beta+ decay for ${isotopeName(protons, nucleons)}`);
            newProtons = protons - 1;
            newNucleons = nucleons;
            break;
        case 'e':
            decayName = 'Electron Capture'
            if (log == true) console.log(`Attempting Electron Capture for ${isotopeName(protons, nucleons)}`);
            newProtons = protons - 1;
            newNucleons = nucleons;
            break;
    }
    if (log == true) console.log(`Attempt at ${decayName} for ${isotopeName(protons, nucleons)} succeeded`);

    // Validate a reaction and return an output
    if (!isotopeCheck(newProtons, newNucleons)) return 'Failure at stage 4, refer to line above for specifics'

    if (log == true) console.log(`You have succesfully applied ${decayName} to ${isotopeName(protons, nucleons)}, and created ${isotopeName(newProtons, newNucleons)} by doing so.`);
    return isotopeName(newProtons, newNucleons);

}

// Web testing
const testButton = document.getElementById('nc_reaction_test');

testButton.addEventListener('click', function() {
    console.log(nucleodeIndex(99,252));
    console.log(protonCountFinder('Uranium'));
    reactionResult = decayReaction(93, 235, 'e', true);
    // document.body.classList.toggle('dark-mode');
    document.getElementById("result").innerHTML = `The reaction succesfully produced ${reactionResult}`;
    
});