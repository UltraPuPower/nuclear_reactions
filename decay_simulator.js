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
 * @typedef {Object} Element
 * @property {number} protonCount - Number of protons (atomic number)
 * @property {string} elementName - Name of an element
 * @property {string} elementSymbol - Symbol of an element
 */
const atomData = [
    {'protonCount': 1, 'elementName': 'H', 'elementSymbol': 'Hydrogen'},
    {'protonCount': 2, 'elementName': 'He', 'elementSymbol': 'Helium'},
    {'protonCount': 3, 'elementName': 'Li', 'elementSymbol': 'Lithium'},
    {'protonCount': 4, 'elementName': 'Be', 'elementSymbol': 'Beryllium'},
    {'protonCount': 5, 'elementName': 'B', 'elementSymbol': 'Boron'},
    {'protonCount': 6, 'elementName': 'C', 'elementSymbol': 'Carbon'},
    {'protonCount': 7, 'elementName': 'N', 'elementSymbol': 'Nitrogen'},
    {'protonCount': 8, 'elementName': 'O', 'elementSymbol': 'Oxygen'},
    {'protonCount': 9, 'elementName': 'F', 'elementSymbol': 'Fluorine'},
    {'protonCount': 10, 'elementName': 'Ne', 'elementSymbol': 'Neon'},
    {'protonCount': 11, 'elementName': 'Na', 'elementSymbol': 'Sodium'},
    {'protonCount': 12, 'elementName': 'Mg', 'elementSymbol': 'Magnesium'},
    {'protonCount': 13, 'elementName': 'Al', 'elementSymbol': 'Aluminium'},
    {'protonCount': 14, 'elementName': 'Si', 'elementSymbol': 'Silicon'},
    {'protonCount': 15, 'elementName': 'P', 'elementSymbol': 'Phosphorus'},
    {'protonCount': 16, 'elementName': 'S', 'elementSymbol': 'Sulfur'},
    {'protonCount': 17, 'elementName': 'Cl', 'elementSymbol': 'Chlorine'},
    {'protonCount': 18, 'elementName': 'Ar', 'elementSymbol': 'Argon'},
    {'protonCount': 19, 'elementName': 'K', 'elementSymbol': 'Potassium'},
    {'protonCount': 20, 'elementName': 'Ca', 'elementSymbol': 'Calcium'},
    {'protonCount': 21, 'elementName': 'Sc', 'elementSymbol': 'Scandium'},
    {'protonCount': 22, 'elementName': 'Ti', 'elementSymbol': 'Titanium'},
    {'protonCount': 23, 'elementName': 'V', 'elementSymbol': 'Vanadium'},
    {'protonCount': 24, 'elementName': 'Cr', 'elementSymbol': 'Chromium'},
    {'protonCount': 25, 'elementName': 'Mn', 'elementSymbol': 'Manganese'},
    {'protonCount': 26, 'elementName': 'Fe', 'elementSymbol': 'Iron'},
    {'protonCount': 27, 'elementName': 'Co', 'elementSymbol': 'Cobalt'},
    {'protonCount': 28, 'elementName': 'Ni', 'elementSymbol': 'Nickel'},
    {'protonCount': 29, 'elementName': 'Cu', 'elementSymbol': 'Copper'},
    {'protonCount': 30, 'elementName': 'Zn', 'elementSymbol': 'Zinc'},
    {'protonCount': 31, 'elementName': 'Ga', 'elementSymbol': 'Gallium'},
    {'protonCount': 32, 'elementName': 'Ge', 'elementSymbol': 'Germanium'},
    {'protonCount': 33, 'elementName': 'As', 'elementSymbol': 'Arsenic'},
    {'protonCount': 34, 'elementName': 'Se', 'elementSymbol': 'Selenium'},
    {'protonCount': 35, 'elementName': 'Br', 'elementSymbol': 'Bromine'},
    {'protonCount': 36, 'elementName': 'Kr', 'elementSymbol': 'Krypton'},
    {'protonCount': 37, 'elementName': 'Rb', 'elementSymbol': 'Rubidium'},
    {'protonCount': 38, 'elementName': 'Sr', 'elementSymbol': 'Strontium'},
    {'protonCount': 39, 'elementName': 'Y', 'elementSymbol': 'Yttrium'},
    {'protonCount': 40, 'elementName': 'Zr', 'elementSymbol': 'Zirconium'},
    {'protonCount': 41, 'elementName': 'Nb', 'elementSymbol': 'Niobium'},
    {'protonCount': 42, 'elementName': 'Mo', 'elementSymbol': 'Molybdenum'},
    {'protonCount': 43, 'elementName': 'Tc', 'elementSymbol': 'Technetium'},
    {'protonCount': 44, 'elementName': 'Ru', 'elementSymbol': 'Ruthenium'},
    {'protonCount': 45, 'elementName': 'Rh', 'elementSymbol': 'Rhodium'},
    {'protonCount': 46, 'elementName': 'Pd', 'elementSymbol': 'Palladium'},
    {'protonCount': 47, 'elementName': 'Ag', 'elementSymbol': 'Silver'},
    {'protonCount': 48, 'elementName': 'Cd', 'elementSymbol': 'Cadmium'},
    {'protonCount': 49, 'elementName': 'In', 'elementSymbol': 'Indium'},
    {'protonCount': 50, 'elementName': 'Sn', 'elementSymbol': 'Tin'},
    {'protonCount': 51, 'elementName': 'Sb', 'elementSymbol': 'Antimony'},
    {'protonCount': 52, 'elementName': 'Te', 'elementSymbol': 'Tellurium'},
    {'protonCount': 53, 'elementName': 'I', 'elementSymbol': 'Iodine'},
    {'protonCount': 54, 'elementName': 'Xe', 'elementSymbol': 'Xenon'},
    {'protonCount': 55, 'elementName': 'Cs', 'elementSymbol': 'Caesium'},
    {'protonCount': 56, 'elementName': 'Ba', 'elementSymbol': 'Barium'},
    {'protonCount': 57, 'elementName': 'La', 'elementSymbol': 'Lanthanum'},
    {'protonCount': 58, 'elementName': 'Ce', 'elementSymbol': 'Cerium'},
    {'protonCount': 59, 'elementName': 'Pr', 'elementSymbol': 'Praseodymium'},
    {'protonCount': 60, 'elementName': 'Nd', 'elementSymbol': 'Neodymium'},
    {'protonCount': 61, 'elementName': 'Pm', 'elementSymbol': 'Promethium'},
    {'protonCount': 62, 'elementName': 'Sm', 'elementSymbol': 'Samarium'},
    {'protonCount': 63, 'elementName': 'Eu', 'elementSymbol': 'Europium'},
    {'protonCount': 64, 'elementName': 'Gd', 'elementSymbol': 'Gadolinium'},
    {'protonCount': 65, 'elementName': 'Tb', 'elementSymbol': 'Terbium'},
    {'protonCount': 66, 'elementName': 'Dy', 'elementSymbol': 'Dysprosium'},
    {'protonCount': 67, 'elementName': 'Ho', 'elementSymbol': 'Holmium'},
    {'protonCount': 68, 'elementName': 'Er', 'elementSymbol': 'Erbium'},
    {'protonCount': 69, 'elementName': 'Tm', 'elementSymbol': 'Thulium'},
    {'protonCount': 70, 'elementName': 'Yb', 'elementSymbol': 'Ytterbium'},
    {'protonCount': 71, 'elementName': 'Lu', 'elementSymbol': 'Lutetium'},
    {'protonCount': 72, 'elementName': 'Hf', 'elementSymbol': 'Hafnium'},
    {'protonCount': 73, 'elementName': 'Ta', 'elementSymbol': 'Tantalum'},
    {'protonCount': 74, 'elementName': 'W', 'elementSymbol': 'Tungsten'},
    {'protonCount': 75, 'elementName': 'Re', 'elementSymbol': 'Rhenium'},
    {'protonCount': 76, 'elementName': 'Os', 'elementSymbol': 'Osmium'},
    {'protonCount': 77, 'elementName': 'Ir', 'elementSymbol': 'Iridium'},
    {'protonCount': 78, 'elementName': 'Pt', 'elementSymbol': 'Platinum'},
    {'protonCount': 79, 'elementName': 'Au', 'elementSymbol': 'Gold'},
    {'protonCount': 80, 'elementName': 'Hg', 'elementSymbol': 'Mercury'},
    {'protonCount': 81, 'elementName': 'Tl', 'elementSymbol': 'Thallium'},
    {'protonCount': 82, 'elementName': 'Pb', 'elementSymbol': 'Lead'},
    {'protonCount': 83, 'elementName': 'Bi', 'elementSymbol': 'Bismuth'},
    {'protonCount': 84, 'elementName': 'Po', 'elementSymbol': 'Polonium'},
    {'protonCount': 85, 'elementName': 'At', 'elementSymbol': 'Astatine'},
    {'protonCount': 86, 'elementName': 'Rn', 'elementSymbol': 'Radon'},
    {'protonCount': 87, 'elementName': 'Fr', 'elementSymbol': 'Francium'},
    {'protonCount': 88, 'elementName': 'Ra', 'elementSymbol': 'Radium'},
    {'protonCount': 89, 'elementName': 'Ac', 'elementSymbol': 'Actinium'},
    {'protonCount': 90, 'elementName': 'Th', 'elementSymbol': 'Thorium'},
    {'protonCount': 91, 'elementName': 'Pa', 'elementSymbol': 'Protactinium'},
    {'protonCount': 92, 'elementName': 'U', 'elementSymbol': 'Uranium'},
    {'protonCount': 93, 'elementName': 'Np', 'elementSymbol': 'Neptunium'},
    {'protonCount': 94, 'elementName': 'Pu', 'elementSymbol': 'Plutonium'}, 
    {'protonCount': 95, 'elementName': 'Am', 'elementSymbol': 'Americium'},
    {'protonCount': 96, 'elementName': 'Cm', 'elementSymbol': 'Curium'},
    {'protonCount': 97, 'elementName': 'Bk', 'elementSymbol': 'Berkelium'},
    {'protonCount': 98, 'elementName': 'Cf', 'elementSymbol': 'Californium'},
    {'protonCount': 99, 'elementName': 'Es', 'elementSymbol': 'Einsteinium'},
    {'protonCount': 100, 'elementName': 'Fm', 'elementSymbol': 'Fermium'},
    {'protonCount': 101, 'elementName': 'Md', 'elementSymbol': 'Mendelevium'},
    {'protonCount': 102, 'elementName': 'No', 'elementSymbol': 'Nobelium'},
    {'protonCount': 103, 'elementName': 'Lr', 'elementSymbol': 'Lawrencium'},
    {'protonCount': 104, 'elementName': 'Rf', 'elementSymbol': 'Rutherfordium'},
    {'protonCount': 105, 'elementName': 'Db', 'elementSymbol': 'Dubnium'},
    {'protonCount': 106, 'elementName': 'Sg', 'elementSymbol': 'Seaborgium'},
    {'protonCount': 107, 'elementName': 'Bh', 'elementSymbol': 'Bohrium'},
    {'protonCount': 108, 'elementName': 'Hs', 'elementSymbol': 'Hassium'},
    {'protonCount': 109, 'elementName': 'Mt', 'elementSymbol': 'Meitnerium'},
    {'protonCount': 110, 'elementName': 'Ds', 'elementSymbol': 'Darmstadtium'},
    {'protonCount': 111, 'elementName': 'Rg', 'elementSymbol': 'Roentgenium'},
    {'protonCount': 112, 'elementName': 'Cn', 'elementSymbol': 'Copernicium'},
    {'protonCount': 113, 'elementName': 'Nh', 'elementSymbol': 'Nihonium'},
    {'protonCount': 114, 'elementName': 'Fl', 'elementSymbol': 'Flerovium'},
    {'protonCount': 115, 'elementName': 'Mc', 'elementSymbol': 'Moscovium'},
    {'protonCount': 116, 'elementName': 'Lv', 'elementSymbol': 'Livermorium'},
    {'protonCount': 117, 'elementName': 'Ts', 'elementSymbol': 'Tennessine'},
    {'protonCount': 118, 'elementName': 'Og', 'elementSymbol': 'Oganesson'}
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
 * @returns {number[]} Proton and nucleon change of submitted decay type
 */
const decayTypeDict = {// [change protons, change nucleons]
    'b-': [1, -1],
    'b+': [-1, 1],
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
 * @returns {boolean}
 */
const elementCheck = (protonCount) => {
    return isotopeList.find(element => element.protonCount == protonCount);
};

/**
 * Searches the index for an isotope with given proton count and nucleon amount
 * @param {number} protonCount - Number of protons (atomic number)
 * @param {number} nucleonCount - Total number of nucleons
 * @returns {Isotopes|boolean} Isotope object if found, false otherwise
 */
const findNucleodeObject = (protonCount, nucleonCount) => {
    if (protonCount > 118) return false;
    const elementObject = isotopeList[protonCount-1].isotopes;
    const nucleodeObject = elementObject.find(isotope => isotope.nucleonCount == nucleonCount);
    return nucleodeObject ? nucleodeObject : false;
};

/**
 * Verifies if a specific decay type is possible for an isotope
 * @param {string} decayType - Type of decay ('a', 'b-', 'b+', 'e')
 * @param {number} protonCount - Number of protons
 * @param {number} nucleonCount - Total number of nucleons
 * @returns {boolean}
 */
const decayCheck = (decayType, protonCount, nucleonCount) => {
    const isotope = findNucleodeObject(protonCount, nucleonCount);
    const decayList = isotope.decay;
    if (decayList.find(decayObj => decayObj.decayType == decayType)) return true
    else return false
};

/**
 * Harvests the decay type from the isotopeList form
 * @param {string} decayTypeString - Type of decay ('a', 'b-', 'b+', 'e')
 * @returns {string[]} Returns an array with primary and secondary decay type and multiplier
 */
const decayTypeHarvester = (decayTypeString) => {

    let harvestArray = decayTypeString.match(/([0-9])?([abdenpt][+-]?)+,?([0-9])?([abdenpt][+-]?)?/);
    harvestArray.shift();

    return harvestArray
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
 * @param {string[]} decayArray - An array with primary and secondary decay information as supplied by decayTypeHarvester() 
 * @returns {string[]}
 */
const decayTransformKey = (decayArray) => {
    const mainDecayMultiplier = decayArray[0];
    const mainDecayType = decayArray[1];
    const secondaryDecayMultiplier = decayArray[2];
    const secondaryDecayType = decayArray[3];

    let mainDecayArray = [];
    let secondaryDecayArray = [];
    let transformKey = [];

    mainDecayArray = decayTypeDict[mainDecayType];
    mainDecayMultiplier ? mainDecayArray = arrayMultiplier(mainDecayArray, mainDecayMultiplier) : mainDecayArray;

    transformKey = mainDecayArray;

    secondaryDecayType ? secondaryDecayArray = decayTypeDict[secondaryDecayType] : false;
    if (secondaryDecayType) {
        secondaryDecayMultiplier ? secondaryDecayArray = arrayMultiplier(secondaryDecayArray, secondaryDecayMultiplier) : secondaryDecayArray;

        for (let i = 0; i < secondaryDecayArray.length; i++) {
            transformKey[i] = secondaryDecayArray[i] + transformKey[i]
        }
    }

    return transformKey
};

/**
 * Adjusts a proton and nucleon count according to the transform key as supplied by decayTransformKey()
 * @param {number[]} decayKey - Type of decay ('a', 'b-', 'b+', 'e')
 * @param {number} protonCount - Number of protons
 * @param {number} nucleonCount - Total number of nucleons
 * @returns {number[]} An array consisting of the new proton count and new nucleon count
 */
const decayAction = (protonCount, nucleonCount, decayKey) => {
    protonCount += decayKey[0];
    nucleonCount += decayKey[1];

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
    const decayArray = decayTypeHarvester(decayType);
    
    const transformArray = decayTransformKey(decayArray);

    const newIsotopeValue = decayAction(protonCount, nucleonCount, transformArray);
    const newProtonCount = newIsotopeValue[0];
    const newNucleonCount = newIsotopeValue[1];

    return [newProtonCount, newNucleonCount]
};

/**
 * Returns name and symbol of an element corresponding to the proton count
 * @param {number} protonCount - Number of protons
 * @returns {string[]} An array consisting of the element name and element symbol
 */
const elementName = (protonCount) => {
    const protonObject = atomData.find(element => element.protonCount == protonCount);

    const elementName = protonObject.elementName;
    const elementSymbol = protonObject.elementSymbol;

    return [elementName, elementSymbol]
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
        let elementObject = atomData.find(element => element.elementName == elementName);
    }

    if (!typeof elementName == number) {
        let elementObject = atomData.find(element => element.elementName == elementName);
    }

    const elementProtonCount = elementObject.protonCount;

    return elementProtonCount
};

export default { timePrefixDict, elementCheck }