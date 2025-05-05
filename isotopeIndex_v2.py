import re
from collections import defaultdict
import os

# elemental database
atomLegend = [
    {'atomName': 'Hydrogen', 'symbol': 'H'},
    {'atomName': 'Helium', 'symbol': 'He'},
    {'atomName': 'Lithium', 'symbol': 'Li'},
    {'atomName': 'Beryllium', 'symbol': 'Be'},
    {'atomName': 'Boron', 'symbol': 'B'},
    {'atomName': 'Carbon', 'symbol': 'C'},
    {'atomName': 'Nitrogen', 'symbol': 'N'},
    {'atomName': 'Oxygen', 'symbol': 'O'},
    {'atomName': 'Fluorine', 'symbol': 'F'},
    {'atomName': 'Neon', 'symbol': 'Ne'},
    {'atomName': 'Sodium', 'symbol': 'Na'},
    {'atomName': 'Magnesium', 'symbol': 'Mg'},
    {'atomName': 'Aluminium', 'symbol': 'Al'},
    {'atomName': 'Silicon', 'symbol': 'Si'},
    {'atomName': 'Phosphorus', 'symbol': 'P'},
    {'atomName': 'Sulfur', 'symbol': 'S'},
    {'atomName': 'Chlorine', 'symbol': 'Cl'},
    {'atomName': 'Argon', 'symbol': 'Ar'},
    {'atomName': 'Potassium', 'symbol': 'K'},
    {'atomName': 'Calcium', 'symbol': 'Ca'},
    {'atomName': 'Scandium', 'symbol': 'Sc'},
    {'atomName': 'Titanium', 'symbol': 'Ti'},
    {'atomName': 'Vanadium', 'symbol': 'V'},
    {'atomName': 'Chromium', 'symbol': 'Cr'},
    {'atomName': 'Manganese', 'symbol': 'Mn'},
    {'atomName': 'Iron', 'symbol': 'Fe'},
    {'atomName': 'Cobalt', 'symbol': 'Co'},
    {'atomName': 'Nickel', 'symbol': 'Ni'},
    {'atomName': 'Copper', 'symbol': 'Cu'},
    {'atomName': 'Zinc', 'symbol': 'Zn'},
    {'atomName': 'Gallium', 'symbol': 'Ga'},
    {'atomName': 'Germanium', 'symbol': 'Ge'},
    {'atomName': 'Arsenic', 'symbol': 'As'},
    {'atomName': 'Selenium', 'symbol': 'Se'},
    {'atomName': 'Bromine', 'symbol': 'Br'},
    {'atomName': 'Krypton', 'symbol': 'Kr'},
    {'atomName': 'Rubidium', 'symbol': 'Rb'},
    {'atomName': 'Strontium', 'symbol': 'Sr'},
    {'atomName': 'Yttrium', 'symbol': 'Y'},
    {'atomName': 'Zirconium', 'symbol': 'Zr'},
    {'atomName': 'Niobium', 'symbol': 'Nb'},
    {'atomName': 'Molybdenum', 'symbol': 'Mo'},
    {'atomName': 'Technetium', 'symbol': 'Tc'},
    {'atomName': 'Ruthenium', 'symbol': 'Ru'},
    {'atomName': 'Rhodium', 'symbol': 'Rh'},
    {'atomName': 'Palladium', 'symbol': 'Pd'},
    {'atomName': 'Silver', 'symbol': 'Ag'},
    {'atomName': 'Cadmium', 'symbol': 'Cd'},
    {'atomName': 'Indium', 'symbol': 'In'},
    {'atomName': 'Tin', 'symbol': 'Sn'},
    {'atomName': 'Antimony', 'symbol': 'Sb'},
    {'atomName': 'Tellurium', 'symbol': 'Te'},
    {'atomName': 'Iodine', 'symbol': 'I'},
    {'atomName': 'Xenon', 'symbol': 'Xe'},
    {'atomName': 'Caesium', 'symbol': 'Cs'},
    {'atomName': 'Barium', 'symbol': 'Ba'},
    {'atomName': 'Lanthanum', 'symbol': 'La'},
    {'atomName': 'Cerium', 'symbol': 'Ce'},
    {'atomName': 'Praseodymium', 'symbol': 'Pr'},
    {'atomName': 'Neodymium', 'symbol': 'Nd'},
    {'atomName': 'Promethium', 'symbol': 'Pm'},
    {'atomName': 'Samarium', 'symbol': 'Sm'},
    {'atomName': 'Europium', 'symbol': 'Eu'},
    {'atomName': 'Gadolinium', 'symbol': 'Gd'},
    {'atomName': 'Terbium', 'symbol': 'Tb'},
    {'atomName': 'Dysprosium', 'symbol': 'Dy'},
    {'atomName': 'Holmium', 'symbol': 'Ho'},
    {'atomName': 'Erbium', 'symbol': 'Er'},
    {'atomName': 'Thulium', 'symbol': 'Tm'},
    {'atomName': 'Ytterbium', 'symbol': 'Yb'},
    {'atomName': 'Lutetium', 'symbol': 'Lu'},
    {'atomName': 'Hafnium', 'symbol': 'Hf'},
    {'atomName': 'Tantalum', 'symbol': 'Ta'},
    {'atomName': 'Tungsten', 'symbol': 'W'},
    {'atomName': 'Rhenium', 'symbol': 'Re'},
    {'atomName': 'Osmium', 'symbol': 'Os'},
    {'atomName': 'Iridium', 'symbol': 'Ir'},
    {'atomName': 'Platinum', 'symbol': 'Pt'},
    {'atomName': 'Gold', 'symbol': 'Au'},
    {'atomName': 'Mercury', 'symbol': 'Hg'},
    {'atomName': 'Thallium', 'symbol': 'Tl'},
    {'atomName': 'Lead', 'symbol': 'Pb'},
    {'atomName': 'Bismuth', 'symbol': 'Bi'},
    {'atomName': 'Polonium', 'symbol': 'Po'},
    {'atomName': 'Astatine', 'symbol': 'At'},
    {'atomName': 'Radon', 'symbol': 'Rn'},
    {'atomName': 'Francium', 'symbol': 'Fr'},
    {'atomName': 'Radium', 'symbol': 'Ra'},
    {'atomName': 'Actinium', 'symbol': 'Ac'},
    {'atomName': 'Thorium', 'symbol': 'Th'},
    {'atomName': 'Protactinium', 'symbol': 'Pa'},
    {'atomName': 'Uranium', 'symbol': 'U'},
    {'atomName': 'Neptunium', 'symbol': 'Np'},
    {'atomName': 'Plutonium', 'symbol': 'Pu'},
    {'atomName': 'Americium', 'symbol': 'Am'},
    {'atomName': 'Curium', 'symbol': 'Cm'},
    {'atomName': 'Berkelium', 'symbol': 'Bk'},
    {'atomName': 'Californium', 'symbol': 'Cf'},
    {'atomName': 'Einsteinium', 'symbol': 'Es'},
    {'atomName': 'Fermium', 'symbol': 'Fm'},
    {'atomName': 'Mendelevium', 'symbol': 'Md'},
    {'atomName': 'Nobelium', 'symbol': 'No'},
    {'atomName': 'Lawrencium', 'symbol': 'Lr'},
    {'atomName': 'Rutherfordium', 'symbol': 'Rf'},
    {'atomName': 'Dubnium', 'symbol': 'Db'},
    {'atomName': 'Seaborgium', 'symbol': 'Sg'},
    {'atomName': 'Bohrium', 'symbol': 'Bh'},
    {'atomName': 'Hassium', 'symbol': 'Hs'},
    {'atomName': 'Meitnerium', 'symbol': 'Mt'},
    {'atomName': 'Darmstadtium', 'symbol': 'Ds'},
    {'atomName': 'Roentgenium', 'symbol': 'Rg'},
    {'atomName': 'Copernicium', 'symbol': 'Cn'},
    {'atomName': 'Nihonium', 'symbol': 'Nh'},
    {'atomName': 'Flerovium', 'symbol': 'Fl'},
    {'atomName': 'Moscovium', 'symbol': 'Mc'},
    {'atomName': 'Livermorium', 'symbol': 'Lv'},
    {'atomName': 'Tennessine', 'symbol': 'Ts'},
    {'atomName': 'Oganesson', 'symbol': 'Og'},
]

debugging = False
if debugging: print('debugging')

debuggingRaw = False
if debuggingRaw: print('debugging raw lines')

JS = True
if debugging: print('JS')

JSON = True
if debugging: print('JSON')

def isotopeIndexer(element):

    name_to_symbol = {atom['atomName']: atom['symbol'] for atom in atomLegend}
    symbol_to_name = {atom['symbol']: atom['atomName'] for atom in atomLegend}

    symbol = name_to_symbol[element]
    if debugging: print(f'symbol: {symbol}')

    filepath = f'C:\\Users\\Gebruiker\\Documents\\GitHub\\nuclear_reactions\\fission_indexes\\inputs\\{element.lower()}.txt'

    print_dataJS = []

    print_dataJSON = []

    atom_name = element.lower()

    nucleonCount = None

    # Check if the file path is valid
    if not os.path.isfile(filepath):
        print(f"File not found: {filepath}")
        print("Directory listing:")
        parent_dir = os.path.dirname(filepath)
        print(os.listdir(parent_dir))
        return

    # Read the file
    with open(filepath, 'r', encoding='utf-8') as file:
        lines = file.readlines()
    
    for i, line in enumerate(lines):
        line = line.strip()
        if debuggingRaw: print(f'line: {line}')

        # Pattern searches for isotopes lines
        # Pattern 1: <sup>207</sup>Th
        match1 = re.search(r'\|.*\s*<sup>(\d{1,3}m?\d?)</sup>\s*([A-Za-z]{1,2})', line)
        if match1:
            if debugging: print(f'match1: {match1.group()}')
            tempNucleonCount = match1.group(1).strip()
            tempElement_symbol = match1.group(2).strip()
            if debugging: print(f'tempNucleonCount: {tempNucleonCount}, tempElement_symbol: {tempElement_symbol}')
            if tempElement_symbol == symbol:
                nucleonCount = tempNucleonCount
                continue

        # Pattern 2: {{sup|75}}Ni
        match2 = re.search(r'\|.*\s*{{sup\|(\d{1,3}m?\d?)}}\s*([A-Za-z]{1,2})', line)
        if match2:
            if debugging: print(f'match2: {match2.group()}')
            tempNucleonCount = match2.group(1).strip()
            tempElement_symbol = match2.group(2).strip()
            if debugging: print(f'tempNucleonCount: {tempNucleonCount}, tempElement_symbol: {tempElement_symbol}')
            if tempElement_symbol == symbol:
                nucleonCount = tempNucleonCount
                continue

        # Pattern 3: {{SimpleNuclide|Copper|68}}
        match3 = re.search(r'\|.*{{SimpleNuclide\|([A-Za-z]+)\|(\d{1,3}m?\d?)}}', line)
        if match3:
            if debugging: print(f'match3: {match3.group()}')
            element_name = match3.group(1).strip()
            tempNucleonCount = match3.group(2).strip()
            for atom in atomLegend:
                if atom['atomName'] == element_name:
                    tempElement_symbol = atom['symbol']
                    if debugging: print(f'Mapped {element_name} to symbol {tempElement_symbol}')
                    if tempElement_symbol == symbol:
                        nucleonCount = tempNucleonCount
                        break
        
        if debuggingRaw: print(f'nucleonCount:{nucleonCount}')
        # Check for decay lines
        decay_line = lines[i - 1].strip()
        if debuggingRaw: print(f'prevLine:{decay_line}')
        if not decay_line.startswith('|-') and nucleonCount != None:
            decay_types = [dt.strip() for dt in decay_line.split('|') if dt.strip()]
            decay_type_str = str(decay_types)
            if debugging: print(f'prevLineStr:{decay_type_str}')
            # Check if the string contains any of the decay types
            for target in ['α', 'β', 'γ', 'IT\b', 'EC\b', 'CD\b', 'n\b', '2n\b', 'p\b', '2p\b']:
                if re.search(f"{target}", decay_type_str):
                    # Replace special characters that are not valid in JSON or JS
                    for part in [{'fi': '\u03b1','ne': 'a'}, {'fi': '\u03b2', 'ne': 'b'}, {'fi': '\u03b3', 'ne': 'g'}, {'fi': '\u2212', 'ne': '-'}]:
                        decay_type_str = decay_type_str.replace(part['fi'], part['ne'])
                    # create a list to store decay type matches with their corresponding nucleode count
                    if JS: print_dataJS.append(f"{{nucleodeCount: '{nucleonCount}', decayType: {decay_type_str}}},\n")
                    if JSON:
                        for part in [{'fi': '"','ne': '\u1234'}, {'fi': "'", 'ne': '"'}, {'fi': '\u1234', 'ne': "'"}]:
                            decay_type_str = decay_type_str.replace(part['fi'], part['ne'])
                        print_dataJSON.append(f'{{"nucleodeCount": "{nucleonCount}", "decayType": {decay_type_str}}},\n')
    
    if not symbol and debugging: print('No symbol found')

    # Print the collected data
    if JS:
        filename = os.path.join(r'C:\Users\Gebruiker\Documents\GitHub\nuclear_reactions\indexes\js\atoms', f"{atom_name}.js")
        # Check if the file already exists
        if not os.path.exists(filename):
            open(filename, "x")
            with open(filename, 'a') as f:
                f.write(f'const {atom_name} = [\n')
                for entry in print_dataJS:
                    f.write(f'    {entry}')
                f.write(f']\n')
            print(f'File: "{atom_name}.js" written to: {os.path.abspath(r'C:\Users\Gebruiker\Documents\GitHub\nuclear_reactions\indexes\js\atoms')}')
        else:
            print(f'File: "{atom_name}.js" already exists. Skipping write.')

    if JSON:
        filename = os.path.join(r'C:\Users\Gebruiker\Documents\GitHub\nuclear_reactions\indexes\json\atoms', f"{atom_name}.json")
        # Check if the file already exists
        if not os.path.exists(filename):
            open(filename, "x")
            with open(filename, 'a') as f:
                f.write(f'%\n')
                f.write(f'    "{atom_name}": [\n')
                for entry in print_dataJSON:
                    f.write(f'        {entry}')
                f.write(f'    ]\n')
                f.write('&')
            print(f'File: "{atom_name}.json" written to: {os.path.abspath(r'C:\Users\Gebruiker\Documents\GitHub\nuclear_reactions\indexes\json\atoms')}')
        else:
            print(f'File: "{atom_name}.json" already exists. Skipping write.')

# example
isotopeIndexer('Thorium')
'''
for atom in atoms:
    print(f'C:\\Users\\Gebruiker\\Documents\\GitHub\\nuclear_reactions\\fission_indexes\\inputs\\{atom.lower()}.txt') #'''