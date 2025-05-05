import re
from collections import defaultdict
import os

debugging = False
if debugging: print('debugging')

JS = True
if debugging: print('JS')

JSON = True
if debugging: print('JSON')

def isotopeIndexer(filepath):
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

    print_dataJS = []
    print_dataJSON = []
    atom_name = None

    for i, line in enumerate(lines):
        line = line.strip()
        if debugging: print(f'line: {line}')
        # Check for the start of a new isotope section and register the nucleode count
        if line.startswith('|-id'):
            match = re.search(r'\|-id=(.*?)-(.*?)\s*$', line)
            # Validate the atom name
            if atom_name is None:
                atom_name = match.group(1).strip()
            nucleode_count = match.group(2).strip()
        # Check for the decay type line
        elif atom_name and re.search(r'\|\s*(?:<sup>(\d{1,3})<\/sup>|{{sup\|(\d{1,3})}})([A-Za-z]{1,2})', line):
            decay_line = lines[i - 1].strip()
            decay_types = [dt.strip() for dt in decay_line.split('| ') if dt.strip()]
            decay_type_str = str(decay_types)
            # Check if the string contains any of the decay types
            for target in ['α', 'β', 'γ', 'IT\b', 'EC\b', 'CD\b', 'n\b', '2n\b', 'p\b', '2p\b']:
                if re.search(f"{target}", decay_type_str):
                    # Replace special characters that are not valid in JSON or JS
                    decay_type_str = decay_type_str.replace('\u03b1', 'a')
                    decay_type_str = decay_type_str.replace('\u03b2', 'b')
                    decay_type_str = decay_type_str.replace('\u03b3', 'g')
                    decay_type_str = decay_type_str.replace('\u2212', '-')
                    # create a list to store decay type matches with their corresponding nucleode count
                    if JS: print_dataJS.append(f"{{nucleodeCount: '{nucleode_count}', decayType: {decay_type_str}}},\n")
                    if JSON:
                        decay_type_str = decay_type_str.replace('"', '\u1234')
                        decay_type_str = decay_type_str.replace("'", '"')
                        decay_type_str = decay_type_str.replace('\u1234', "'")
                        print_dataJSON.append(f'{{"nucleodeCount": "{nucleode_count}", "decayType": {decay_type_str}}},\n')

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
isotopeIndexer(r'C:\Users\Gebruiker\Documents\GitHub\nuclear_reactions\fission_indexes\inputs\thorium.txt')
'''
atoms =['Hydrogen', 'Helium', 'Lithium', 'Beryllium', 'Boron', 'Carbon', 'Nitrogen', 'Oxygen', 'Fluorine', 'Neon', 'Sodium', 'Magnesium', 'Aluminium', 'Silicon', 'Phosphorus',
        'Sulfur', 'Chlorine', 'Argon', 'Potassium', 'Calcium', 'Scandium', 'Titanium', 'Vanadium', 'Chromium', 'Manganese', 'Iron', 'Cobalt', 'Nickel', 'Copper', 'Zinc', 'Gallium',
        'Germanium', 'Arsenic', 'Selenium', 'Bromine', 'Krypton', 'Rubidium', 'Strontium', 'Yttrium', 'Zirconium', 'Niobium', 'Molybdenum', 'Technetium', 'Ruthenium', 'Rhodium',
        'Palladium', 'Silver', 'Cadmium', 'Indium', 'Tin', 'Antimony', 'Tellurium', 'Iodine', 'Xenon', 'Caesium', 'Barium', 'Lanthanum', 'Cerium', 'Praseodymium', 'Neodymium',
        'Promethium', 'Samarium', 'Europium', 'Gadolinium', 'Terbium', 'Dysprosium', 'Holmium', 'Erbium', 'Thulium', 'Ytterbium', 'Lutetium', 'Hafnium', 'Tantalum', 'Tungsten',
        'Rhenium', 'Osmium', 'Iridium', 'Platinum', 'Gold', 'Mercury', 'Thallium', 'Lead', 'Bismuth', 'Polonium', 'Astatine', 'Radon', 'Francium', 'Radium', 'Actinium', 'Thorium',
        'Protactinium', 'Uranium', 'Neptunium', 'Plutonium', 'Americium', 'Curium', 'Berkelium', 'Californium', 'Einsteinium', 'Fermium', 'Mendelevium', 'Nobelium', 'Lawrencium',
        'Rutherfordium', 'Dubnium', 'Seaborgium', 'Bohrium', 'Hassium', 'Meitnerium', 'Darmstadtium', 'Roentgenium', 'Copernicium', 'Nihonium', 'Flerovium', 'Moscovium', 'Livermorium',
        'Tennessine', 'Oganesson']

for atom in atoms:
    print(f'C:\\Users\\Gebruiker\\Documents\\GitHub\\nuclear_reactions\\fission_indexes\\inputs\\{atom.lower()}.txt') #'''