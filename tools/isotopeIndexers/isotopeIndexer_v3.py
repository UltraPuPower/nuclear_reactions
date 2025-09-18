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
# Raw debugging wil print a lot more data, but doing so will quickly fill up the console
debuggingRaw = False

def debug(msg, raw):
    if debugging and not raw: print(msg)
    if debugging and debuggingRaw and raw: print(msg)

debug('debugging', False)

debug('debugging raw lines', True)

JS = True
debug('JS', False)

JSON = True
debug('JSON', False)

name_to_symbol = {atom['atomName']: atom['symbol'] for atom in atomLegend}
symbol_to_name = {atom['symbol']: atom['atomName'] for atom in atomLegend}

regexList = [
    r'\|.*\s*<sup>(\d{1,3}m?\d?)</sup>\s*([A-Za-z]{1,2})',
    r'\|.*\s*{{sup\|(\d{1,3}m?\d?)}}\s*([A-Za-z]{1,2})',
    r'\|.*{{SimpleNuclide\|([A-Za-z]+)\|(\d{1,3}m?\d?)}}'
]

def regexSorter(target):

  matchLine = None
  
  for regex in regexList:
    tempMatchLine = re.search(regex, target)
    if tempMatchLine:
      matchLine = tempMatchLine
      break

  if matchLine:
    debug(f'matched a regex:{matchLine.group()}', False)
    tempVal1 = matchLine.group(1).strip()
    tempVal2 = matchLine.group(2).strip()
    try:
      if name_to_symbol[tempVal1]:
        tempElementSymbol = name_to_symbol[tempVal1]
        tempNucleonCount = tempVal2
    except: 1 == 1

    try:
      if symbol_to_name[tempVal1]:
        tempElementSymbol = tempVal1
        tempNucleonCount = tempVal2
    except: 1 == 1

    try:
      if name_to_symbol[tempVal2]:
        tempElementSymbol = name_to_symbol[tempVal2]
        tempNucleonCount = tempVal1
    except: 1 == 1

    try:
      if symbol_to_name[tempVal2]:
        tempElementSymbol = tempVal2
        tempNucleonCount = tempVal1
    except: 1 == 1
    
    return tempElementSymbol, tempNucleonCount

def validateNucleonCount(tempElementSymbol, tempNucleonCount, symbol):
    if tempElementSymbol == symbol:
        nucleonCount = tempNucleonCount
        debug(f'validated nucleonCount:{nucleonCount}', False)
        return nucleonCount

def checkFilePath(filepath):
    if not os.path.isfile(filepath):
        print(f"File not found: {filepath}")
        print("Directory listing:")
        parent_dir = os.path.dirname(filepath)
        print(os.listdir(parent_dir))
        return False
    else:
        return True

def validFileChars(string):
    for part in [{'mesh': '\u03b1','new': 'a'}, {'mesh': '\u03b2', 'new': 'b'}, {'mesh': '\u03b3', 'new': 'g'}, {'mesh': '\u03b5', 'new': 'e'},
                 {'mesh': '\u2212', 'new': '-'}, {'mesh': '\u03bc', 'new': 'MU'}, {'mesh': '×', 'new': 'x'}, {'mesh': '\u2192', 'new': '=>'},
                 {'mesh': '\u2264', 'new': '<=='}, {'mesh': '\u2265', 'new': '>=='}]:
        string = string.replace(part['mesh'], part['new'])
    return string

def validJSONQuotes(string):    
    for part in [{'mesh': '"', 'new': '\u1234'}, {'mesh': "'", 'new': '"'}, {'mesh': '\u1234', 'new': "'"}]:
        string = string.replace(part['mesh'], part['new'])
    return string

def writeConstJS(name, data):
    filename = os.path.join(r'C:\Users\Gebruiker\Documents\GitHub\nuclear_reactions\indexes\js\atoms', f"{name}.js")
    # Check if the file already exists
    if not os.path.exists(filename):
        open(filename, "x")
        with open(filename, 'a') as f:
            f.write(f'const {name} = [\n')
            for entry in data:
                f.write(f'    {entry}')
            f.write(f']\n')
        print(f'File: "{name}.js" written to: {os.path.abspath(r'C:\Users\Gebruiker\Documents\GitHub\nuclear_reactions\indexes\js\atoms')}')
    else:
        print(f'File: "{name}.js" already exists. Skipping write.')

def writeConstJSON(name, data):
    filename = os.path.join(r'C:\Users\Gebruiker\Documents\GitHub\nuclear_reactions\indexes\json\atoms', f"{name}.json")
    # Check if the file already exists
    if not os.path.exists(filename):
        open(filename, "x")
        with open(filename, 'a') as f:
            f.write('{\n')
            f.write(f'    "{name}": [\n')
            for entry in data:
                f.write(f'        {entry}')
            f.write(f'    ]\n')
            f.write('}')
        print(f'File: "{name}.json" written to: {os.path.abspath(r'C:\Users\Gebruiker\Documents\GitHub\nuclear_reactions\indexes\json\atoms')}')
    else:
        print(f'File: "{name}.json" already exists. Skipping write.')

def isotopeIndexer(element):

    filepath = f'C:\\Users\\Gebruiker\\Documents\\GitHub\\nuclear_reactions\\fission_indexes\\inputs\\{element.lower()}.txt'

    if checkFilePath(filepath) == False: return

    symbol = name_to_symbol[element]
    debug(f'symbol: {symbol}', False)

    print_dataJS = []

    print_dataJSON = []

    atom_name = element.lower()

    nucleonCount = None

    with open(filepath, 'r', encoding='utf-8') as file:
        lines = file.readlines()

    debug('----=====----', False)
    
    for i, line in enumerate(lines):
        line = line.strip()
        debug(f'line: {line}', True)

        try:
            sortedRegex = regexSorter(line)
        except: print('Ehh, how did you break this??')

        if sortedRegex:
            tempElementSymbol = sortedRegex[0]
            tempNucleonCount = sortedRegex[1]
            debug(f'found isotope {symbol_to_name[tempElementSymbol]}-{tempNucleonCount}', False)        
            prevLine = lines[i - 1].strip()
            if prevLine.startswith('|-'):
                nucleonCount = validateNucleonCount(tempElementSymbol, tempNucleonCount, symbol)
                debug(f'nucleonCount:{nucleonCount}', True)
            else:
                debug(prevLine, False)
                decayListStr = str([dt.strip() for dt in prevLine.split('|') if dt.strip()])
                decayTypeStr = validFileChars(decayListStr)
                debug(f'nucleodeCount: {nucleonCount}, decayType: {decayTypeStr}', False)
                if JS: print_dataJS.append(f"{{nucleodeCount: '{nucleonCount}', decayType: {decayTypeStr}}},\n")
                if JSON: print_dataJSON.append(f'{{"nucleodeCount": "{nucleonCount}", "decayType": {validJSONQuotes(decayTypeStr)}}},\n')
        debug('----=====----', False)
    
    if not symbol: debug('No symbol found', False)

    if JS: writeConstJS(atom_name, print_dataJS)

    if JSON: writeConstJSON(atom_name, print_dataJSON)

# example
#isotopeIndexer('Thorium')
#'''
for atom in atomLegend:
    isotopeIndexer(atom['atomName'])#'''