// Isotope finder function by Trulyno for an isotope exists
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

    const atom1 = atoms[index(atomic_number)] // finds index of the original atom
    const iso1 = atom1.atomIsotopes[iso_index(atom1, atom_isotope)] // finds the isotope array of the original atom
    
    if (!iso1) return "ERROR: isotope does not exist" // checks whether the isotope of the original atom exists
    if (!iso1.decayType.includes('a')) return "ERROR: alpha decay is not allowed" // checks whether the original isotope is allowed to perform Alpha decay
    
    const atom2 = atoms[index(atomic_number - 2)] // finds index of the new atom
    const iso2 = atom2.atomIsotopes[iso_index(atom2, atom_isotope - 4)] // finds the isotope array of the new atom

    //if (iso2) return [atom2, iso2] // if the new isotope exists,  give the array of the atom and the isotope in question
    if (iso2) return `${atom2.atomName}-${iso2.nucleodeCount}` // if the new isotope exists, give the atom name in the standard written notation
    
    else return "ERROR: catastrophic failure, idk man, fix it"
}