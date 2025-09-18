import requests
from bs4 import BeautifulSoup
import re
from urllib.parse import quote
import json

class SingleElementIsotopeScraper:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
    
    def get_atomic_number(self, element):
        """Get atomic number for element"""
        atomic_numbers = {
            'hydrogen': 1, 'helium': 2, 'lithium': 3, 'beryllium': 4, 'boron': 5,
            'carbon': 6, 'nitrogen': 7, 'oxygen': 8, 'fluorine': 9, 'neon': 10,
            'sodium': 11, 'magnesium': 12, 'aluminium': 13, 'aluminum': 13, 'silicon': 14, 
            'phosphorus': 15, 'sulfur': 16, 'chlorine': 17, 'argon': 18, 'potassium': 19, 
            'calcium': 20, 'scandium': 21, 'titanium': 22, 'vanadium': 23, 'chromium': 24, 
            'manganese': 25, 'iron': 26, 'cobalt': 27, 'nickel': 28, 'copper': 29, 
            'zinc': 30, 'gallium': 31, 'germanium': 32, 'arsenic': 33, 'selenium': 34, 
            'bromine': 35, 'krypton': 36, 'rubidium': 37, 'strontium': 38, 'yttrium': 39, 
            'zirconium': 40, 'niobium': 41, 'molybdenum': 42, 'technetium': 43, 'ruthenium': 44, 
            'rhodium': 45, 'palladium': 46, 'silver': 47, 'cadmium': 48, 'indium': 49, 
            'tin': 50, 'antimony': 51, 'tellurium': 52, 'iodine': 53, 'xenon': 54, 
            'caesium': 55, 'cesium': 55, 'barium': 56, 'lanthanum': 57, 'cerium': 58, 
            'praseodymium': 59, 'neodymium': 60, 'promethium': 61, 'samarium': 62, 
            'europium': 63, 'gadolinium': 64, 'terbium': 65, 'dysprosium': 66, 'holmium': 67, 
            'erbium': 68, 'thulium': 69, 'ytterbium': 70, 'lutetium': 71, 'hafnium': 72, 
            'tantalum': 73, 'tungsten': 74, 'rhenium': 75, 'osmium': 76, 'iridium': 77, 
            'platinum': 78, 'gold': 79, 'mercury': 80, 'thallium': 81, 'lead': 82, 
            'bismuth': 83, 'polonium': 84, 'astatine': 85, 'radon': 86, 'francium': 87, 
            'radium': 88, 'actinium': 89, 'thorium': 90, 'protactinium': 91, 'uranium': 92, 
            'neptunium': 93, 'plutonium': 94, 'americium': 95, 'curium': 96, 'berkelium': 97, 
            'californium': 98, 'einsteinium': 99, 'fermium': 100, 'mendelevium': 101, 
            'nobelium': 102, 'lawrencium': 103, 'rutherfordium': 104, 'dubnium': 105, 
            'seaborgium': 106, 'bohrium': 107, 'hassium': 108, 'meitnerium': 109, 
            'darmstadtium': 110, 'roentgenium': 111, 'copernicium': 112, 'nihonium': 113, 
            'flerovium': 114, 'moscovium': 115, 'livermorium': 116, 'tennessine': 117, 
            'oganesson': 118
        }
        return atomic_numbers.get(element.lower(), 0)
    
    def format_halflife(self, halflife_str):
        """Format halflife according to specifications"""
        if not halflife_str or halflife_str.lower().strip() in ['stable', 'observationally stable', '']:
            return 'stable'
        
        # Skip if this looks like atomic mass data
        if re.match(r'^\d+\.\d{6,}', halflife_str):
            return 'stable'
        
        # Clean the string
        halflife_str = re.sub(r'\[.*?\]', '', halflife_str)  # Remove references
        halflife_str = halflife_str.strip()
        
        # Handle uncertainty notation like (2)
        halflife_str = re.sub(r'\([^)]*\)', '', halflife_str)
        
        # Check for stable indicators
        if any(word in halflife_str.lower() for word in ['stable', 'infinity', '∞']):
            return 'stable'
        
        # Extract number and unit with more flexible regex
        match = re.match(r'([\d.]+)\s*([a-zA-Zμ]*)', halflife_str)
        if not match:
            # If no clear number found, assume stable
            return 'stable'
            
        try:
            value = float(match.group(1))
            unit = match.group(2).lower().strip()
        except ValueError:
            return 'stable'
        
        # Convert to appropriate format
        if unit in ['ms', 'millisecond', 'milliseconds']:
            return f'ms-{value}'
        elif unit in ['μs', 'us', 'microsecond', 'microseconds']:
            return f'μs-{value}'
        elif unit in ['ns', 'nanosecond', 'nanoseconds']:
            return f'ns-{value}'
        elif unit in ['ps', 'picosecond', 'picoseconds']:
            return f'ps-{value}'
        elif unit in ['fs', 'femtosecond', 'femtoseconds']:
            return f'fs-{value}'
        elif unit in ['as', 'attosecond', 'attoseconds']:
            return f'as-{value}'
        elif unit in ['zs', 'zeptosecond', 'zeptoseconds']:
            return f'zs-{value}'
        elif unit in ['min', 'minute', 'minutes']:
            return f'min-{value}'
        elif unit in ['h', 'hour', 'hours']:
            return f'h-{value}'
        elif unit in ['d', 'day', 'days']:
            return f'd-{value}'
        elif unit in ['y', 'year', 'years', 'a']:
            return f'y-{value}'
        elif unit in ['s', 'second', 'seconds'] or unit == '':
            return str(value)
        else:
            return f'{unit}-{value}' if unit else str(value)
    
    def parse_decay_mode(self, decay_str):
        """Parse decay mode string into decay objects"""
        if not decay_str or decay_str.lower().strip() in ['stable', 'observationally stable', '']:
            return 'stable'
        
        # Skip if this looks like atomic mass data
        if re.match(r'^\d+\.\d{6,}', decay_str) or 'exactly' in decay_str.lower():
            return 'stable'
        
        decay_str = re.sub(r'\[.*?\]', '', decay_str)  # Remove references
        decay_str = decay_str.strip()
        
        # Check for stable indicators
        if any(word in decay_str.lower() for word in ['stable', 'infinity', '∞']):
            return 'stable'
        
        # Common decay patterns - more comprehensive
        decay_patterns = {
            'α': 'a',
            'beta-': 'b-',
            'β-': 'b-',
            'β−': 'b-',
            'beta+': 'b+', 
            'β+': 'b+',
            'ec': 'e',
            'ε': 'e',
            'it': 'i',
            'sf': 's',
            'n': 'n',
            '2n': '2n',
            'p': 'p',
            '2p': '2p'
        }
        
        decays = []
        
        # Handle percentage notation like "α (60%), β- (40%)"
        percentage_matches = re.findall(r'([^,(]+?)\s*\(([^)]*?)%\)', decay_str)
        if percentage_matches:
            for decay_type, percentage in percentage_matches:
                decay_type = decay_type.strip().lower()
                
                # Find matching decay type
                matched_type = decay_type
                for pattern, standard_name in decay_patterns.items():
                    if pattern in decay_type:
                        matched_type = standard_name
                        break
                
                try:
                    chance = float(percentage.strip()) / 100.0
                    decays.append({
                        'decayType': matched_type,
                        'chance': chance
                    })
                except ValueError:
                    continue
        else:
            # Simple decay mode without percentages
            decay_type_lower = decay_str.lower()
            matched_type = decay_str
            
            for pattern, standard_name in decay_patterns.items():
                if pattern in decay_type_lower:
                    matched_type = standard_name
                    break
            
            decays.append({
                'decayType': matched_type,
                'chance': 1.0
            })
        
        return decays if decays else 'stable'
    
    def find_table_columns(self, table):
        """Find the correct column indices for different data types"""
        header_row = table.find('tr')
        if not header_row:
            return None
            
        headers = [th.get_text().strip().lower() for th in header_row.find_all(['th', 'td'])]
        
        columns = {
            'mass': -1,
            'halflife': -1,
            'decay': -1
        }
        
        # Look for column headers
        for i, header in enumerate(headers):
            if any(term in header for term in ['mass', 'isotope', 'nuclide']):
                if 'symbol' not in header and 'name' not in header:
                    columns['mass'] = i
            elif any(term in header for term in ['half-life', 'half life', 'halflife', 't½', 't1/2']):
                columns['halflife'] = i
            elif any(term in header for term in ['decay', 'mode', 'disintegration']):
                columns['decay'] = i
        
        return columns

    def scrape_element_isotopes(self, element):
        """Scrape isotope data for a specific element"""
        url = f"https://en.wikipedia.org/wiki/Isotopes_of_{quote(element.lower())}"
        
        try:
            response = self.session.get(url, timeout=10)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Find isotope tables
            tables = soup.find_all('table', class_='wikitable')
            
            isotopes = []
            atomic_number = self.get_atomic_number(element)
            
            if atomic_number == 0:
                print(f"Warning: Unknown element '{element}'")
                return []
            
            for table in tables:
                # Find correct column indices
                columns = self.find_table_columns(table)
                if not columns or columns['mass'] == -1:
                    continue
                
                rows = table.find_all('tr')[1:]  # Skip header row
                
                for row in rows:
                    cells = row.find_all(['td', 'th'])
                    if len(cells) < max(columns['mass'] + 1, 3):
                        continue
                    
                    try:
                        # Extract mass number (nucleon count)
                        mass_cell = cells[columns['mass']].get_text().strip()
                        
                        # Look for mass number - it might be in format like "1H", "3He", "14C", etc.
                        mass_match = re.search(r'(\d+)', mass_cell)
                        if not mass_match:
                            continue
                        nucleon_count = int(mass_match.group(1))
                        
                        # Skip if this looks like it might be atomic mass data instead
                        if '.' in mass_cell and len(mass_cell.replace('.', '').replace('(', '').replace(')', '')) > 6:
                            continue
                        
                        # Extract half-life
                        halflife = 'stable'
                        if columns['halflife'] != -1 and columns['halflife'] < len(cells):
                            halflife_cell = cells[columns['halflife']].get_text().strip()
                            halflife = self.format_halflife(halflife_cell)
                        
                        # Extract decay mode
                        decay = 'stable'
                        if columns['decay'] != -1 and columns['decay'] < len(cells):
                            decay_cell = cells[columns['decay']].get_text().strip()
                            decay = self.parse_decay_mode(decay_cell)
                        
                        # If we have "stable" in halflife, make sure decay is also stable
                        if halflife == 'stable':
                            decay = 'stable'
                        
                        isotope = {
                            'protoncount': atomic_number,
                            'nucleoncount': nucleon_count,
                            'halflife': halflife,
                            'decay': decay
                        }
                        
                        isotopes.append(isotope)
                        
                    except (ValueError, IndexError) as e:
                        continue
            
            print(f"Found {len(isotopes)} isotopes for {element}")
            return isotopes
            
        except Exception as e:
            print(f"Error scraping {element}: {str(e)}")
            return []

    def format_as_javascript(self, isotopes):
        """Format isotope data as JavaScript object string"""
        js_lines = []
        for isotope in isotopes:
            # Format decay properly
            if isotope['decay'] == 'stable':
                decay_str = '"stable"'
            else:
                decay_objects = []
                for decay in isotope['decay']:
                    decay_objects.append(f'{{"decayType": "{decay["decayType"]}", "chance": {decay["chance"]}}}')
                decay_str = '[' + ', '.join(decay_objects) + ']'
            
            # Format the isotope object
            isotope_str = f'    {{"protoncount": {isotope["protoncount"]}, "nucleoncount": {isotope["nucleoncount"]}, "halflife": "{isotope["halflife"]}", "decay": {decay_str}}}'
            js_lines.append(isotope_str)
        
        return '[\n' + ',\n'.join(js_lines) + '\n]'

def main(inputElem):
    scraper = SingleElementIsotopeScraper()
    
    # Get element from user
    if (inputElem):
        element = inputElem
    else:
        element = input("Enter element name (e.g., 'hydrogen', 'carbon', 'uranium'): ").strip()
    
    if not element:
        print("No element specified!")
        return
    
    print(f"Scraping isotopes for {element}...")
    isotopes = scraper.scrape_element_isotopes(element)
    
    if isotopes:
        print(f"\nJavaScript object for {element} isotopes:")
        print("=" * 50)
        js_output = scraper.format_as_javascript(isotopes)
        print(js_output)
    else:
        print(f"No isotopes found for {element}")

    print('Enter a different element to continue')
    decision = input()
    if decision.lower():
        main(decision)

if __name__ == "__main__":
    main(False)