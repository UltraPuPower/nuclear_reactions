# Nuclear Decay Simulation Documentation
*written by copilot because I was too lazy*

This script provides a simulation of nuclear decay processes for various isotopes, primarily focusing on elements from Mercury (Z=80) to Einsteinium (Z=99).

## Data Structure

The script uses an array of atom objects with the following properties:

- `atomName`: String - Official name of the element
- `pCount`: Number - Number of protons (atomic number)
- `atomIsotopes`: Array of objects containing:
  - `nucleodeCount`: Number - Total nucleons (protons + neutrons)
  - `decayType`: Array - Possible decay types
  - `natural`: Boolean - Whether isotope occurs naturally

### Supported Decay Types

- `a` (Alpha decay): Loss of He-4 nucleus (p -= 2, n -= 4)
- `b-` (Beta minus): Neutron → proton conversion (p += 1, n -= 1)
- `b+` (Beta plus): Proton → neutron conversion (p -= 1, n += 1)
- `e` (Electron capture): Similar to b+, with gamma emission

## Core Functions

### Simulating decay reactions
#### decayReaction(protons, nucleons, type, log)
Simulates a decay reaction for a given isotope and decay type.
- Returns: String (success or failure message)

### Safety nets for various common mistakes
#### decayCheck(type, protonCount, nucleodeAmount)
Verifies if a specific decay type is possible for an isotope.
- Returns: Boolean

#### isotopeCheck(protonCount, nucleodeAmount)
Validates existence of an isotope in the database.
- Returns: Boolean

## Usage Example

```javascript
// Simulate beta minus decay of Thorium-233 and generates logs for it
decayReaction(90, 233, "b-", true)

// Check if an isotope exists
isotopeCheck(92, 235) // true for U-235

// Get isotope name
isotopeName(92, 235) // "uranium-235"
```
