// Index

    /*Legend
        atomName:       String;     Refers to the official name of an element
        pCount:         String;     Refers to the amount of protons the corresponding element has
        atomIsotopes:   Array;      Describes all isotopes of an element
        nucleodeCount:  Integer;    Notes the total amount of nucleodes (protons and neutrons), in it's corresponding isotope
        decayType:      String;     Refers to the type of decay reactions that can take place (expanded upon below with "Radition Types"). If the atom is not capable of reactions, it will instead display 'stable'
        natural:        Boolean;    Whether or not this element can be naturally found (in this usecase whether or not it is possible to create without nuclear reactions)
        
        Radition types => a, b-, b+, g, e, n
            a => Loss of a single Helium-4 nucleus from the inner atom nucleus
                effect: p -= 2, n -= 4
            b- => Elektron, created by conversion of a neutron into a proton
                effect: p += 1, n -= 1
            b+ => Positron, created by conversion of a proton into a neutron
                effect: p -= 1, n += 1
            Note: b radiation can exist in doubles => 2b-/2b+
            e => Electron capture, the process of a proton rich nucleon absorbing an elektron instead of releasing a positron (b-), only sending out a neutrino and a gamma ray (g) instead
                effect: p -= 1, n += 1
            g => A gamma ray, a photon containing extremely large amounts of energy
    */

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
            {nucleodeCount: 238, decayType: ['a', '2b-'], natural: true}]},
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

// Logic

    // Propose a reaction


    // Calculate a reaction
    const decayAlpha = (protons, nucleons) => {protons -= 2; nucleons -= 4}; // Alpha decay (a)
    const decayBetaMin = (protons, nucleons) => {protons += 1; nucleons -= 1}; // Beta Min decay (b-)
    const decayBetaPlus = (protons, nucleons) => {protons -= 1; nucleons += 1}; // Beta Plus decay (b+)

    // Validate a reaction and return an output
    const protonIndex = protonCount => {atoms.findIndex(item => item.pCount === protonCount)}; // search atoms for index with corresponding proton count
    const nucleodeIndex = (index, nucleodeAmount) => {atoms[index].atomIsotopes.find(item => item.nucleodeCount == nucleodeAmount)}; // search index for corresponding nucleode count
    const nucleode = (index, nucleodeAmount) => {atoms[index].atomIsotopes[nucleodeIndex(index, nucleodeAmount)]};

// Isotope finder function by Trulyno for whether a reaction produces an existing isotope
let PROTON_COUNT = 93;
let NUCLEODE_COUNT = 235;
let index = atoms.findIndex(item => item.pCount === PROTON_COUNT);
if (index !== -1 && atoms[index].atomIsotopes.find(item => item.nucleodeCount === NUCLEODE_COUNT)) {
    let isotopeName = `${atoms[index].atomName}-${NUCLEODE_COUNT}`
    console.log(isotopeName);
}

// alpha decay function by Voxelerror
const alpha_decay = (atomic_number, atom_isotope) => {
    const index = (num) => atoms.findIndex(elem => elem.pCount == num) // finds the index of the original atom

    const iso_index = (elem, num) => elem.atomIsotopes.findIndex(iso => iso.nucleodeCount == num) // finds the index of the original isotope
    if (!iso1) return "ERROR: isotope does not exist" // checks whether the isotope of the original atom exists
    if (!iso1.decayType.includes('a')) return "ERROR: alpha decay is not allowed" // checks whether the original isotope is allowed to perform Alpha decay

    const atom1 = atoms[index(atomic_number)] // finds index of the original atom
    const iso1 = atom1.atomIsotopes[iso_index(atom1, atom_isotope)] // finds the isotope array of the original atom
    
    const atom2 = atoms[index(atomic_number - 2)] // finds index of the new atom
    const iso2 = atom2.atomIsotopes[iso_index(atom2, atom_isotope - 4)] // finds the isotope array of the new atom

    if (iso2) return [atom2, iso2] // if the new isotope exists,  give the array of the atom and the isotope in question
    if (iso2) return `${atom2.atomName}-${iso2.nucleodeCount}` // if the new isotope exists, give the atom name in the standard written notation
    
    else return "ERROR: catastrophic failure, idk man, fix it"
}

// Test case: Californium-248
console.log(alpha_decay(98, 248)); // Returns curium-244 via array
console.log(atoms[18].atomIsotopes.find(item => item.nucleodeCount == 248));
console.log(nucleodeIndex(18, 248));