import isotopeList from "./isotopeData.js"

// Index
/**
 * Nuclear Decay Simulation Module
 * Simulates nuclear decay processes
 * By UltraPuPower1, with assistance from friends
 * @module NuclearDecay
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
 * a    - Alpha decay:          Loss of He-4 nucleus                                (p -= 2, n -= 4)
 * b-   - Beta minus decay:     Neutron → proton conversion                         (p += 1, n)
 * b+   - Beta plus decay:      Proton → neutron conversion                         (p -= 1, n)
 * e    - Electron capture:     Similar to b+, with gamma emission due to merger of a positron and an electron
 * p    - Proton emission:      Emits a proton from the core                        (p -= 1, n -= 1)
 * n    - Neutron emission:     Emits a neutron from the core                       (p, n -= 1)
 * d    - Deuteron emission:    Emission of a hydrogen-2 nucleus                    (p -= 1, n -= 2)
 * t    - Triton emission:      Emission of a hydrogen-3 nucleus                    (p -= 1, n -= 3)
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
 * @typedef {Object} Element
 * @property {number} protonCount - Number of protons (atomic number)
 * @property {string} elementName - Name of an element
 * @property {string} elementSymbol - Symbol of an element
 */
const atomData = [
    {'protonCount': 1, 'elementSymbol': 'H', 'elementName': 'Hydrogen'},
    {'protonCount': 2, 'elementSymbol': 'He', 'elementName': 'Helium'},
    {'protonCount': 3, 'elementSymbol': 'Li', 'elementName': 'Lithium'},
    {'protonCount': 4, 'elementSymbol': 'Be', 'elementName': 'Beryllium'},
    {'protonCount': 5, 'elementSymbol': 'B', 'elementName': 'Boron'},
    {'protonCount': 6, 'elementSymbol': 'C', 'elementName': 'Carbon'},
    {'protonCount': 7, 'elementSymbol': 'N', 'elementName': 'Nitrogen'},
    {'protonCount': 8, 'elementSymbol': 'O', 'elementName': 'Oxygen'},
    {'protonCount': 9, 'elementSymbol': 'F', 'elementName': 'Fluorine'},
    {'protonCount': 10, 'elementSymbol': 'Ne', 'elementName': 'Neon'},
    {'protonCount': 11, 'elementSymbol': 'Na', 'elementName': 'Sodium'},
    {'protonCount': 12, 'elementSymbol': 'Mg', 'elementName': 'Magnesium'},
    {'protonCount': 13, 'elementSymbol': 'Al', 'elementName': 'Aluminium'},
    {'protonCount': 14, 'elementSymbol': 'Si', 'elementName': 'Silicon'},
    {'protonCount': 15, 'elementSymbol': 'P', 'elementName': 'Phosphorus'},
    {'protonCount': 16, 'elementSymbol': 'S', 'elementName': 'Sulfur'},
    {'protonCount': 17, 'elementSymbol': 'Cl', 'elementName': 'Chlorine'},
    {'protonCount': 18, 'elementSymbol': 'Ar', 'elementName': 'Argon'},
    {'protonCount': 19, 'elementSymbol': 'K', 'elementName': 'Potassium'},
    {'protonCount': 20, 'elementSymbol': 'Ca', 'elementName': 'Calcium'},
    {'protonCount': 21, 'elementSymbol': 'Sc', 'elementName': 'Scandium'},
    {'protonCount': 22, 'elementSymbol': 'Ti', 'elementName': 'Titanium'},
    {'protonCount': 23, 'elementSymbol': 'V', 'elementName': 'Vanadium'},
    {'protonCount': 24, 'elementSymbol': 'Cr', 'elementName': 'Chromium'},
    {'protonCount': 25, 'elementSymbol': 'Mn', 'elementName': 'Manganese'},
    {'protonCount': 26, 'elementSymbol': 'Fe', 'elementName': 'Iron'},
    {'protonCount': 27, 'elementSymbol': 'Co', 'elementName': 'Cobalt'},
    {'protonCount': 28, 'elementSymbol': 'Ni', 'elementName': 'Nickel'},
    {'protonCount': 29, 'elementSymbol': 'Cu', 'elementName': 'Copper'},
    {'protonCount': 30, 'elementSymbol': 'Zn', 'elementName': 'Zinc'},
    {'protonCount': 31, 'elementSymbol': 'Ga', 'elementName': 'Gallium'},
    {'protonCount': 32, 'elementSymbol': 'Ge', 'elementName': 'Germanium'},
    {'protonCount': 33, 'elementSymbol': 'As', 'elementName': 'Arsenic'},
    {'protonCount': 34, 'elementSymbol': 'Se', 'elementName': 'Selenium'},
    {'protonCount': 35, 'elementSymbol': 'Br', 'elementName': 'Bromine'},
    {'protonCount': 36, 'elementSymbol': 'Kr', 'elementName': 'Krypton'},
    {'protonCount': 37, 'elementSymbol': 'Rb', 'elementName': 'Rubidium'},
    {'protonCount': 38, 'elementSymbol': 'Sr', 'elementName': 'Strontium'},
    {'protonCount': 39, 'elementSymbol': 'Y', 'elementName': 'Yttrium'},
    {'protonCount': 40, 'elementSymbol': 'Zr', 'elementName': 'Zirconium'},
    {'protonCount': 41, 'elementSymbol': 'Nb', 'elementName': 'Niobium'},
    {'protonCount': 42, 'elementSymbol': 'Mo', 'elementName': 'Molybdenum'},
    {'protonCount': 43, 'elementSymbol': 'Tc', 'elementName': 'Technetium'},
    {'protonCount': 44, 'elementSymbol': 'Ru', 'elementName': 'Ruthenium'},
    {'protonCount': 45, 'elementSymbol': 'Rh', 'elementName': 'Rhodium'},
    {'protonCount': 46, 'elementSymbol': 'Pd', 'elementName': 'Palladium'},
    {'protonCount': 47, 'elementSymbol': 'Ag', 'elementName': 'Silver'},
    {'protonCount': 48, 'elementSymbol': 'Cd', 'elementName': 'Cadmium'},
    {'protonCount': 49, 'elementSymbol': 'In', 'elementName': 'Indium'},
    {'protonCount': 50, 'elementSymbol': 'Sn', 'elementName': 'Tin'},
    {'protonCount': 51, 'elementSymbol': 'Sb', 'elementName': 'Antimony'},
    {'protonCount': 52, 'elementSymbol': 'Te', 'elementName': 'Tellurium'},
    {'protonCount': 53, 'elementSymbol': 'I', 'elementName': 'Iodine'},
    {'protonCount': 54, 'elementSymbol': 'Xe', 'elementName': 'Xenon'},
    {'protonCount': 55, 'elementSymbol': 'Cs', 'elementName': 'Caesium'},
    {'protonCount': 56, 'elementSymbol': 'Ba', 'elementName': 'Barium'},
    {'protonCount': 57, 'elementSymbol': 'La', 'elementName': 'Lanthanum'},
    {'protonCount': 58, 'elementSymbol': 'Ce', 'elementName': 'Cerium'},
    {'protonCount': 59, 'elementSymbol': 'Pr', 'elementName': 'Praseodymium'},
    {'protonCount': 60, 'elementSymbol': 'Nd', 'elementName': 'Neodymium'},
    {'protonCount': 61, 'elementSymbol': 'Pm', 'elementName': 'Promethium'},
    {'protonCount': 62, 'elementSymbol': 'Sm', 'elementName': 'Samarium'},
    {'protonCount': 63, 'elementSymbol': 'Eu', 'elementName': 'Europium'},
    {'protonCount': 64, 'elementSymbol': 'Gd', 'elementName': 'Gadolinium'},
    {'protonCount': 65, 'elementSymbol': 'Tb', 'elementName': 'Terbium'},
    {'protonCount': 66, 'elementSymbol': 'Dy', 'elementName': 'Dysprosium'},
    {'protonCount': 67, 'elementSymbol': 'Ho', 'elementName': 'Holmium'},
    {'protonCount': 68, 'elementSymbol': 'Er', 'elementName': 'Erbium'},
    {'protonCount': 69, 'elementSymbol': 'Tm', 'elementName': 'Thulium'},
    {'protonCount': 70, 'elementSymbol': 'Yb', 'elementName': 'Ytterbium'},
    {'protonCount': 71, 'elementSymbol': 'Lu', 'elementName': 'Lutetium'},
    {'protonCount': 72, 'elementSymbol': 'Hf', 'elementName': 'Hafnium'},
    {'protonCount': 73, 'elementSymbol': 'Ta', 'elementName': 'Tantalum'},
    {'protonCount': 74, 'elementSymbol': 'W', 'elementName': 'Tungsten'},
    {'protonCount': 75, 'elementSymbol': 'Re', 'elementName': 'Rhenium'},
    {'protonCount': 76, 'elementSymbol': 'Os', 'elementName': 'Osmium'},
    {'protonCount': 77, 'elementSymbol': 'Ir', 'elementName': 'Iridium'},
    {'protonCount': 78, 'elementSymbol': 'Pt', 'elementName': 'Platinum'},
    {'protonCount': 79, 'elementSymbol': 'Au', 'elementName': 'Gold'},
    {'protonCount': 80, 'elementSymbol': 'Hg', 'elementName': 'Mercury'},
    {'protonCount': 81, 'elementSymbol': 'Tl', 'elementName': 'Thallium'},
    {'protonCount': 82, 'elementSymbol': 'Pb', 'elementName': 'Lead'},
    {'protonCount': 83, 'elementSymbol': 'Bi', 'elementName': 'Bismuth'},
    {'protonCount': 84, 'elementSymbol': 'Po', 'elementName': 'Polonium'},
    {'protonCount': 85, 'elementSymbol': 'At', 'elementName': 'Astatine'},
    {'protonCount': 86, 'elementSymbol': 'Rn', 'elementName': 'Radon'},
    {'protonCount': 87, 'elementSymbol': 'Fr', 'elementName': 'Francium'},
    {'protonCount': 88, 'elementSymbol': 'Ra', 'elementName': 'Radium'},
    {'protonCount': 89, 'elementSymbol': 'Ac', 'elementName': 'Actinium'},
    {'protonCount': 90, 'elementSymbol': 'Th', 'elementName': 'Thorium'},
    {'protonCount': 91, 'elementSymbol': 'Pa', 'elementName': 'Protactinium'},
    {'protonCount': 92, 'elementSymbol': 'U', 'elementName': 'Uranium'},
    {'protonCount': 93, 'elementSymbol': 'Np', 'elementName': 'Neptunium'},
    {'protonCount': 94, 'elementSymbol': 'Pu', 'elementName': 'Plutonium'}, 
    {'protonCount': 95, 'elementSymbol': 'Am', 'elementName': 'Americium'},
    {'protonCount': 96, 'elementSymbol': 'Cm', 'elementName': 'Curium'},
    {'protonCount': 97, 'elementSymbol': 'Bk', 'elementName': 'Berkelium'},
    {'protonCount': 98, 'elementSymbol': 'Cf', 'elementName': 'Californium'},
    {'protonCount': 99, 'elementSymbol': 'Es', 'elementName': 'Einsteinium'},
    {'protonCount': 100, 'elementSymbol': 'Fm', 'elementName': 'Fermium'},
    {'protonCount': 101, 'elementSymbol': 'Md', 'elementName': 'Mendelevium'},
    {'protonCount': 102, 'elementSymbol': 'No', 'elementName': 'Nobelium'},
    {'protonCount': 103, 'elementSymbol': 'Lr', 'elementName': 'Lawrencium'},
    {'protonCount': 104, 'elementSymbol': 'Rf', 'elementName': 'Rutherfordium'},
    {'protonCount': 105, 'elementSymbol': 'Db', 'elementName': 'Dubnium'},
    {'protonCount': 106, 'elementSymbol': 'Sg', 'elementName': 'Seaborgium'},
    {'protonCount': 107, 'elementSymbol': 'Bh', 'elementName': 'Bohrium'},
    {'protonCount': 108, 'elementSymbol': 'Hs', 'elementName': 'Hassium'},
    {'protonCount': 109, 'elementSymbol': 'Mt', 'elementName': 'Meitnerium'},
    {'protonCount': 110, 'elementSymbol': 'Ds', 'elementName': 'Darmstadtium'},
    {'protonCount': 111, 'elementSymbol': 'Rg', 'elementName': 'Roentgenium'},
    {'protonCount': 112, 'elementSymbol': 'Cn', 'elementName': 'Copernicium'},
    {'protonCount': 113, 'elementSymbol': 'Nh', 'elementName': 'Nihonium'},
    {'protonCount': 114, 'elementSymbol': 'Fl', 'elementName': 'Flerovium'},
    {'protonCount': 115, 'elementSymbol': 'Mc', 'elementName': 'Moscovium'},
    {'protonCount': 116, 'elementSymbol': 'Lv', 'elementName': 'Livermorium'},
    {'protonCount': 117, 'elementSymbol': 'Ts', 'elementName': 'Tennessine'},
    {'protonCount': 118, 'elementSymbol': 'Og', 'elementName': 'Oganesson'}
];

/**
 * Transforms a time prefix into a string that contains the multiplier of the prefix
 * @param {string} timePrefix - A valid type of time prefix
 * @returns {string} A multiplier value in the form of a string for the corresponding prefix
 */
const timePrefixDict = {
    'ys': '10**-24',
    'zs': '10**-21',
    'as': '10**-18',
    /*'fs': '10**-15',*/ // unused
    'ps': '10**-12',
    'ns': '10**-9',
    'μs': '10**-6',
    'ms': '10**-3',
    'min': '60', 
    'h': '3600',
    'd': '86400',
    'y': '31558118.4'
};

/**
 * Transforms a decay type into an array that provides values of changed proton and nucleon values
 * @param {string} decayType - A valid type of decay
 * @returns {number[]} [Proton change, nucleon change] of submitted decay type
 */
const decayTypeDict = {
    'b-': [1, 0],
    'b+': [-1, 0],
    'a': [-2, -4],
    'p': [-1, -1],
    'n': [0, -1],
    'e': [-1, 1],
    'd': [-1, -2],
    't': [-1, -3]
};

/**
 * Searches the index for an element with given proton count
 * @param {number} protonCount - Number of protons (atomic number)
 * @returns {Element|boolean} Element object if found, false otherwise
 */
const findElementObject = (protonCount) => {
    if (protonCount > 118) return false;
    const elementObject = isotopeList[protonCount-1];
    return elementObject
};

/**
 * Searches the index for an isotope with given proton count and nucleon amount
 * @param {number} protonCount - Number of protons (atomic number)
 * @param {number} nucleonCount - Total number of nucleons
 * @returns {Isotopes|boolean} Isotope object if found, false otherwise
 */
const findNucleodeObject = (protonCount, nucleonCount) => {
    const elementObject = findElementObject(protonCount).isotopes;
    const nucleodeObject = elementObject.find(isotope => isotope.nucleonCount == nucleonCount);
    return nucleodeObject ? nucleodeObject : false;
};

/**
 * Multiplies all values in an array
 * @param {string[]} array - An array consisting of only numbers
 * @param {number} multiplier - The multiplier that needs to be applied to the array
 * @returns {string[]}
 */
const arrayMultiplier = (array, multiplier) => {

    for (let i = 0; i < array.length; i++) {
        array[i] = array[i] * multiplier
    }

    return array
};

/**
 * Turns a decay type array into an array detailing the change of protons and nucleons
 * @param {string[]} decayArray - An array with decay type and decay multiplier
 * @returns {string[]}
 */
const decayTransformKey = (decayArray) => {
    const mainDecayMultiplier = decayArray[0];
    const mainDecayType = decayArray[1];

    let mainDecayArray = [];
    let transformKey = [];

    mainDecayArray = decayTypeDict[mainDecayType];
    mainDecayMultiplier ? mainDecayArray = arrayMultiplier(mainDecayArray, mainDecayMultiplier) : mainDecayArray;

    transformKey = mainDecayArray;

    return transformKey
};

/**
 * Harvests the decay type from the isotopeList form
 * @param {string} decayTypeString - Type of decay ('a', 'b-', 'b+', 'e')
 * @returns {string[]} Returns an array proton and nucleon change values
 */
const decayTypeHarvester = (decayTypeString) => {
    const decayTypeArray = decayTypeString.split(',')
    let protonchange = 0, nucleonChange = 0;
    
    console.log(`DecayData => decayTypeString: ${decayTypeString}; decayTypeArray: ${decayTypeArray}`)
    decayTypeArray.forEach(decayType => {
        let harvestArray = decayType.match(/([0-9])?([abdenpt][+-]?)/);
        harvestArray.shift();
        console.log(`   decayType: ${decayType}; harvestArray: ${harvestArray}`)
        let transformArray = decayTransformKey(harvestArray);
        console.log(`   transformArray => "${transformArray}"`)
        protonchange += transformArray[0]
        nucleonChange += transformArray[1]
    })

    console.log(`Change => protonchange: "${protonchange}"; nucleonChange: "${nucleonChange}"`)
    return [protonchange, nucleonChange]
};

/**
 * Adjusts a proton and nucleon count according to the transform key as supplied by decayTransformKey()
 * @param {number[]} decayKey - Type of decay ('a', 'b-', 'b+', 'e')
 * @param {number} protonCount - Number of protons
 * @param {number} nucleonCount - Total number of nucleons
 * @returns {number[]} An array consisting of the new proton count and new nucleon count
 */
const decayAction = (protonCount, nucleonCount, decayKey) => {
    protonCount = Number(protonCount) + Number(decayKey[0]);
    nucleonCount = Number(nucleonCount) + Number(decayKey[1]);

    return [protonCount, nucleonCount];
};

/**
 * Applies decay from isotopeList to an isotope
 * @param {string} decayType - Decay string 
 * @param {number} protonCount - Number of protons
 * @param {number} nucleonCount - Total number of nucleons
 * @returns {number[]} An array consisting of the new proton count and new nucleon count
 */
const decayOperation = (decayType, protonCount, nucleonCount) => {
    const transformArray = decayTypeHarvester(decayType);

    const newIsotopeValue = decayAction(protonCount, nucleonCount, transformArray);
    const newProtonCount = newIsotopeValue[0];
    const newNucleonCount = newIsotopeValue[1];

    return [newProtonCount, newNucleonCount]
};

/**
 * Returns the proton count of an element corresponding to the element name or symbol. When both a name and symbol are entered the name takes precedent
 * @param {string} elementName A name representing an element
 * @param {string} elementSymbol A symbol representing an element
 * @returns {number} Number of protons of an element
 */
const elementProtonCount = (elementName = 0, elementSymbol = 0) => {
    let elementObject = '';

    if (!typeof elementSymbol == number) {
        let elementObject = atomData.find(element => element.elementSymbol == elementSymbol);
    }

    if (!typeof elementName == number) {
        let elementObject = atomData.find(element => element.elementName == elementName);
    }

    const elementProtonCount = elementObject.protonCount;

    return elementProtonCount
};

export { timePrefixDict, atomData, findElementObject, findNucleodeObject, decayOperation, elementProtonCount };