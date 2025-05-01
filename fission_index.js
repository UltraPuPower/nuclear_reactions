// Index
/**
 * Nuclear Decay Simulation Module
 * Simulates nuclear decay processes
 * By UltraPuPower1, with assistance from friends
 * @module NuclearDecay
 */

/**
 * @typedef {Object} Element
 * @property {string} atomName - Official name of the element
 * @property {number} pCount - Number of protons (atomic number)
 * @property {Isotope[]} atomIsotopes - Array of isotopes for this element
 */

/**
 * @typedef {Object} Isotope
 * @property {number} nucleodeCount - Total number of nucleons (protons + neutrons)
 * @property {string[]} decayType - Array of possible decay types ('a', 'b-', 'b+', 'e', 'g', or 'stable')
 * @property {boolean} natural - Whether isotope occurs naturally
 */

/*
 * Decay Types:
 * a  - Alpha decay: Loss of He-4 nucleus (p -= 2, n -= 4)
 * b- - Beta minus: Neutron → proton conversion (p += 1, n -= 1)
 * b+ - Beta plus: Proton → neutron conversion (p -= 1, n += 1)
 * e  - Electron capture: Similar to b+, with gamma emission due to merger of a positron and an electron
 */

/** @type {Element[]} */
const atoms = [
    {atomName: 'mercury', pCount: 80, atomIsotopes: [
        {nucleodeCount: 206, decayType: ['b-'], natural: true}]},
    {atomName: 'thallium', pCount: 81, atomIsotopes: [
        {nucleodeCount: 205, decayType: ['stable'], natural: true},
        {nucleodeCount: 206, decayType: ['b-'], natural: true},
        {nucleodeCount: 207, decayType: ['b-'], natural: true},
        {nucleodeCount: 208, decayType: ['b-'], natural: true},
        {nucleodeCount: 209, decayType: ['b-'], natural: true},
        {nucleodeCount: 210, decayType: ['b-'], natural: true}]},
    {atomName: 'lead', pCount: 82, atomIsotopes: [
        {nucleodeCount: 204, decayType: ['stable'], natural: true},
        {nucleodeCount: 205, decayType: ['e'], natural: true},
        {nucleodeCount: 206, decayType: ['stable'], natural: true},
        {nucleodeCount: 207, decayType: ['stable'], natural: true},
        {nucleodeCount: 208, decayType: ['stable'], natural: true},
        {nucleodeCount: 209, decayType: ['b-'], natural: true},
        {nucleodeCount: 210, decayType: ['a', 'b-'], natural: true},
        {nucleodeCount: 211, decayType: ['b-'], natural: true},
        {nucleodeCount: 212, decayType: ['b-'], natural: true},
        {nucleodeCount: 214, decayType: ['b-'], natural: true}]},
    {atomName: 'bismuth', pCount: 83, atomIsotopes: [
        {nucleodeCount: 207, decayType: ['b+'], natural: false},
        {nucleodeCount: 208, decayType: ['b+'], natural: false},
        {nucleodeCount: 209, decayType: ['a', 'b-'], natural: true},
        {nucleodeCount: 210, decayType: ['a'], natural: true},
        {nucleodeCount: 211, decayType: ['a', 'b-'], natural: true},
        {nucleodeCount: 212, decayType: ['a', 'b-'], natural: true},
        {nucleodeCount: 213, decayType: ['a', 'b-'], natural: true},
        {nucleodeCount: 214, decayType: ['a', 'b-'], natural: true},
        {nucleodeCount: 215, decayType: ['b-'], natural: true}]},
    {atomName: 'polonium', pCount: 84, atomIsotopes: [
        {nucleodeCount: 208, decayType: ['a', 'b+'], natural: false},
        {nucleodeCount: 209, decayType: ['a', 'b+'], natural: false},
        {nucleodeCount: 210, decayType: ['a'], natural: true},
        {nucleodeCount: 211, decayType: ['a'], natural: true},
        {nucleodeCount: 212, decayType: ['a'], natural: true},
        {nucleodeCount: 213, decayType: ['a'], natural: true},
        {nucleodeCount: 214, decayType: ['b-'], natural: true},
        {nucleodeCount: 215, decayType: ['a', 'b-'], natural: true},
        {nucleodeCount: 216, decayType: ['a'], natural: true},
        {nucleodeCount: 218, decayType: ['a', 'b-'], natural: true}]},
    {atomName: 'astatine', pCount: 85, atomIsotopes: [
        {nucleodeCount: 207, decayType: ['a', 'b+'], natural: false},
        {nucleodeCount: 208, decayType: ['a', 'b+'], natural: false},
        {nucleodeCount: 209, decayType: ['a', 'b+'], natural: false},
        {nucleodeCount: 210, decayType: ['a', 'b+'], natural: false},
        {nucleodeCount: 211, decayType: ['a', 'b+'], natural: false},
        {nucleodeCount: 215, decayType: ['a'], natural: false},
        {nucleodeCount: 217, decayType: ['a'], natural: true},
        {nucleodeCount: 218, decayType: ['a'], natural: true},
        {nucleodeCount: 219, decayType: ['a', 'b-'], natural: true}]},
    {atomName: 'radon', pCount: 86, atomIsotopes: [
        {nucleodeCount: 210, decayType: ['a'], natural: false},
        {nucleodeCount: 211, decayType: ['a', 'e'], natural: false},
        {nucleodeCount: 219, decayType: ['a'], natural: true},
        {nucleodeCount: 220, decayType: ['a'], natural: true},
        {nucleodeCount: 222, decayType: ['a'], natural: true},
        {nucleodeCount: 224, decayType: ['b-'], natural: false}]},
    {atomName: 'francium', pCount: 87, atomIsotopes: [
        {nucleodeCount: 212, decayType: ['a', 'b+'], natural: false},
        {nucleodeCount: 221, decayType: ['a'], natural: true},
        {nucleodeCount: 222, decayType: ['a', 'b-'], natural: false},
        {nucleodeCount: 223, decayType: ['a', 'b-'], natural: true}]},
    {atomName: 'radium', pCount: 88, atomIsotopes: [
        {nucleodeCount: 223, decayType: ['a'], natural: true},
        {nucleodeCount: 224, decayType: ['a'], natural: true},
        {nucleodeCount: 225, decayType: ['b-'], natural: true},
        {nucleodeCount: 226, decayType: ['a'], natural: true},
        {nucleodeCount: 228, decayType: ['b-'], natural: true}]},
    {atomName: 'actinium', pCount: 89, atomIsotopes: [
        {nucleodeCount: 225, decayType: ['a'], natural: true},
        {nucleodeCount: 226, decayType: ['a'], natural: false},
        {nucleodeCount: 227, decayType: ['a', 'b-'], natural: true},
        {nucleodeCount: 228, decayType: ['b-'], natural: true}]},
    {atomName: 'thorium', pCount: 90, atomIsotopes: [
        {nucleodeCount: 227, decayType: ['a'], natural: true},
        {nucleodeCount: 228, decayType: ['a'], natural: true},
        {nucleodeCount: 229, decayType: ['a'], natural: true},
        {nucleodeCount: 230, decayType: ['a'], natural: true},
        {nucleodeCount: 231, decayType: ['b-'], natural: true},
        {nucleodeCount: 232, decayType: ['a'], natural: true},
        {nucleodeCount: 233, decayType: ['b-'], natural: true},
        {nucleodeCount: 234, decayType: ['b-'], natural: true}]},
    {atomName: 'protactinium', pCount: 91, atomIsotopes: [
        {nucleodeCount: 229, decayType: ['e'], natural: false},
        {nucleodeCount: 230, decayType: ['a', 'b-', 'b+'], natural: false},
        {nucleodeCount: 231, decayType: ['a'], natural: true},
        {nucleodeCount: 232, decayType: ['b-'], natural: false},
        {nucleodeCount: 233, decayType: ['b-'], natural: true},
        {nucleodeCount: 234, decayType: ['b-'], natural: true}]},
    {atomName: 'uranium', pCount: 92, atomIsotopes: [
        {nucleodeCount: 232, decayType: ['a'], natural: false},
        {nucleodeCount: 233, decayType: ['a'], natural: true},
        {nucleodeCount: 234, decayType: ['a'], natural: true},
        {nucleodeCount: 235, decayType: ['a'], natural: true},
        {nucleodeCount: 236, decayType: ['a'], natural: true},
        {nucleodeCount: 238, decayType: ['a'], natural: true}]},
    {atomName: 'neptunium', pCount: 93, atomIsotopes: [
        {nucleodeCount: 235, decayType: ['a', 'e'], natural: false},
        {nucleodeCount: 236, decayType: ['a', 'b-', 'e'], natural: false},
        {nucleodeCount: 237, decayType: ['a'], natural: true},
        {nucleodeCount: 239, decayType: ['b-'], natural: true}]},
    {atomName: 'plutonium', pCount: 94, atomIsotopes: [
        {nucleodeCount: 236, decayType: ['a'], natural: false},
        {nucleodeCount: 238, decayType: ['a'], natural: true},
        {nucleodeCount: 239, decayType: ['a'], natural: true},
        {nucleodeCount: 240, decayType: ['a'], natural: true},
        {nucleodeCount: 241, decayType: ['a', 'b-'], natural: false},
        {nucleodeCount: 242, decayType: ['a'], natural: false},
        {nucleodeCount: 244, decayType: ['a'], natural: true}]},
    // Synthetics
    {atomName: 'americium', pCount: 95, atomIsotopes: [
        {nucleodeCount: 241, decayType: ['a'], natural: false},
        {nucleodeCount: 242, decayType: ['a'], natural: false},
        {nucleodeCount: 243, decayType: ['a'], natural: false}]},
    {atomName: 'curium', pCount: 96, atomIsotopes: [
        {nucleodeCount: 242, decayType: ['a'], natural: false},
        {nucleodeCount: 243, decayType: ['a', 'e'], natural: false},
        {nucleodeCount: 244, decayType: ['a'], natural: false},
        {nucleodeCount: 245, decayType: ['a'], natural: false},
        {nucleodeCount: 246, decayType: ['a'], natural: false},
        {nucleodeCount: 247, decayType: ['a'], natural: false},
        {nucleodeCount: 248, decayType: ['a'], natural: false},
        {nucleodeCount: 250, decayType: ['a', 'b-'], natural: false}]},
    {atomName: 'berkelium', pCount: 97, atomIsotopes: [
        {nucleodeCount: 245, decayType: ['a', 'e'], natural: false},
        {nucleodeCount: 246, decayType: ['a', 'b+'], natural: false},
        {nucleodeCount: 247, decayType: ['a'], natural: false},
        {nucleodeCount: 248, decayType: ['a'], natural: false},
        {nucleodeCount: 249, decayType: ['a', 'b-'], natural: false}]},
    {atomName: 'californium', pCount: 98, atomIsotopes: [
        {nucleodeCount: 248, decayType: ['a'], natural: false},
        {nucleodeCount: 249, decayType: ['a'], natural: false},
        {nucleodeCount: 250, decayType: ['a'], natural: false},
        {nucleodeCount: 251, decayType: ['a'], natural: false},
        {nucleodeCount: 252, decayType: ['a'], natural: false},
        {nucleodeCount: 253, decayType: ['a', 'b-'], natural: false},
        {nucleodeCount: 254, decayType: ['a'], natural: false}]},
    {atomName: 'einsteinium', pCount: 99, atomIsotopes: [
        {nucleodeCount: 252, decayType: ['a', 'b-', 'e'], natural: false},
        {nucleodeCount: 253, decayType: ['a'], natural: false},
        {nucleodeCount: 254, decayType: ['a', 'b-', 'e'], natural: false},
        {nucleodeCount: 255, decayType: ['a', 'b-'], natural: false}]},
];

/**
 * Searches the index for an isotope with given proton count and nucleon amount
 * @param {number} protonCount - Number of protons (atomic number)
 * @param {number} nucleodeAmount - Total number of nucleons
 * @returns {Isotope|undefined} Isotope object if found, undefined otherwise
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

console.log('attempting nuclear fission....')
console.log(decayReaction(98, 248, 'a', true));
console.log(decayReaction(83, 209, 'b-', false));    
console.log(decayReaction(91, 230, 'b+', false));    
console.log(decayReaction(93, 235, 'e', true));

console.log('checking isotopes....');
console.log(isotopeCheck(99, 255));
console.log(isotopeCheck(100, 280));