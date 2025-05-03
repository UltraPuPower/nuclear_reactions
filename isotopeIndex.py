import re
from collections import defaultdict
import os

debugging = True

JSON = True

if debugging: print('test')

## Ultra messing around
def isotopeIndexer(filepath):
    # Validate the file path
    if not os.path.isfile(filepath):
        print(f"File not found: {filepath}")
        print("Directory listing:")
        parent_dir = os.path.dirname(filepath)
        print(os.listdir(parent_dir))
        return

    with open(filepath, 'r', encoding='utf-8') as file:
        lines = file.readlines()

    atom_name = None
    print_data = []
    for i, line in enumerate(lines):
        line = line.strip()

        # Detect isotope ID and extract atom name and nucleode count
        if line.startswith('|-id'):
            match = re.search(r'\|-id=(.*?)-(.*?)\s*$', line)
            if match:
                if atom_name is None:
                    atom_name = match.group(1).strip()
                    if not JSON: print(f'const {atom_name} = [')
                    if JSON:
                        print(f'%')
                        print(f'    "{atom_name}": [')
                nucleode_count = match.group(2).strip()
        elif atom_name and line.startswith('| <sup>'):
            # Handle decay type
            decay_line = lines[i - 1].strip()
            decay_types = [dt.strip() for dt in decay_line.split('| ') if dt.strip()]
            decay_type_str = str(decay_types)
            if re.search("[α,γ,β]", decay_type_str) or re.search(r"IT\b", decay_type_str) or re.search(r"EC\b", decay_type_str):
                if not JSON: print_data.append(f'{{nucleodeCount: {nucleode_count}, decayType: {decay_type_str}}},')
                if JSON: print_data.append(f'{{"nucleodeCount": "{nucleode_count}", "decayType": {decay_type_str.replace("'", '"')}}},')

    # Print the collected data
    for entry in print_data:
        print(f'        {entry}')
    
    if not JSON: print(']')
    if JSON:
        print('    ]')
        print('&')

isotopeIndexer(r'C:\Users\Gebruiker\Documents\GitHub\nuclear_reactions\fission_indexes\inputs\thorium.txt')