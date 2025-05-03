import re
from collections import defaultdict
import os

## Ultra messing around
def isotopeIndexer(filepath):
    # Check if filepath is valid
    if not os.path.isfile(filepath):
        print(f"File not found: {filepath}")
        print("Directory listing:")
        parent_dir = os.path.dirname(filepath)
        print(os.listdir(parent_dir))
        return

    with open(filepath, 'r', encoding='utf-8') as file:
        lines = file.readlines()

    atomName = 'undefined'
    j = 0
    while j < len(lines):
        current_line = lines[j].strip()
        if current_line.startswith('|-id'):
            regexElemLine = re.search(r'\|-id=(.*?)-(.*?)\s*$', current_line)
            if regexElemLine:
                if atomName == 'undefined':
                    atomName = regexElemLine.group(1).strip()
                    print(f'const {atomName} = [')
                nucleode_count = regexElemLine.group(2).strip()
        else:
            if atomName != 'undefined':
                if current_line.startswith('| <sup>'):
                    if lines[j - 1] == r'\|-id=Thorium-(.*)\s*$':
                        j += 1
                    else:
                        decayLine = lines[j - 1]
                        decay_type = decayLine.split('| ')
                        decay_type = [dt.strip() for dt in decay_type if dt.strip()]
                        decayType = str(decay_type)
                        findall1 = re.findall("[α,γ,β]", decayType)
                        findall2 = re.findall(r"IT\b", decayType)
                        findall3 = re.findall(r"EC\b", decayType)
                        if findall1 or findall2 or findall3:
                            print(f'{{nucleodeCount: {nucleode_count}, decayType: {decayType}}},')
                        j += 1
        j += 1

    print(']')

isotopeIndexer(r'C:\Users\Gebruiker\Documents\GitHub\nuclear_reactions\fission_indexes\inputs\thorium.txt')