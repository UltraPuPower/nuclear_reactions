import isotopeList from "../isotopeData";

const elementCheck = (protonCount) => {
    return protonCount >= 1 && protonCount <= 118 ? true : false
};

const isotopeListCheck = (isotopes) =>{
    let nucleonCountArray = [];
    let logs = [];

    isotopes.forEach(isotope => {
        const {nucleonCount, halflife, decay} = isotope;
        if (!nucleonCountArray.includes(nucleonCount)) {
            nucleonCountArray.push(nucleonCount);
        } else {
            logs.push(`[ERROR]: Duplicate nucleon count detected for nucleon count: ${nucleonCount}`);
        }
    });

    return logs == [] ? false : logs
};

const timePrefixArray = {
    'ys': '10**-24',
    'zs': '10**-21',
    'as': '10**-18',
    /*'fs': '10**-15',*/
    'ps': '10**-12',
    'ns': '10**-9',
    'μs': '10**-6',
    'ms': '10**-3',
    'min': '60', 
    'h': '3600',
    'd': '86400',
    'y': '31558118.4'
};

const timePrefixCheck = (time) => {
    const splitTime = time.split('-');

    if (splitTime.length == 1) return false;

    if (!timePrefixArray.includes(splitTime[0])) return splitTime[0];

    return false;
};

const convertFloatToInt = (float) => {
  	const floatString = String(float);
    const additive0s = 5-floatString.length
  	const parts = floatString.split('.');
    let fused = parts[0]+parts[1]
    for (let i = 0; i < additive0s; i++) {
    	fused += '0'
    }
  	const int = Number(fused);
    return int
};

const compareFloats = (floatArray) => {
    let total = 0;
    floatArray.forEach(float => {
        const newInt = convertFloatToInt(float);
        total += newInt;
    });
    return total
};

const findNucleodeObject = (protonCount, nucleonCount) => {
    if (protonCount > 118) return false;
    const elementObject = isotopeList[protonCount-1];
    const nucleodeObject = elementObject.find(isotope => isotope.nucleonCount == nucleonCount);
    return nucleodeObject
};

const decayTypeHarvester = (decayTypeString) => {

    let harvestArray = decayTypeString.match(/([0-9])?([abdenpt][+-]?)+,?([0-9])?([abdenpt][+-]?)?/);
    harvestArray.shift();

    return harvestArray
};

const decayTypeDict = {// [change protons, change nucleons]
    'b-': [1, -1],
    'b+': [-1, 1],
    'a': [-2, -4],
    'p': [-1, -1],
    'n': [0, -1],
    'e': [-1, 1],
    'd': [-1, -2],
    't': [-1, -3]
};

const decayTypeCheck = (decayType) => {
    const decayTypeArray = decayTypeHarvester(decayType);

    if (!decayTypeDict[decayTypeArray[1]]) return false

    if (decayTypeArray[3] && !decayTypeDict[decayTypeArray[3]]) return false

    return true
};

const arrayMultiplier = (array, multiplier) => {

    for (let i = 0; i < array.length; i++) {
        array[i] = array[i] * multiplier
    }

    return array
};

const decayTransformKey = (decayArray) => {
    const mainDecayMultiplier = decayArray[0];
    const mainDecayType = decayArray[1];
    const secondaryDecayMultiplier = decayArray[2];
    const secondaryDecayType = decayArray[3];

    let mainDecayArray = [];
    let secondaryDecayArray = [];
    let transformKey = [];

    mainDecayArray = decayTypeDict[mainDecayType];
    mainDecayMultiplier ? mainDecayArray = arrayMultiplier(mainDecayArray, mainDecayMultiplier) : mainDecayArray;

    transformKey = mainDecayArray;

    secondaryDecayType ? secondaryDecayArray = decayTypeDict[secondaryDecayType] : false;
    if (secondaryDecayType) {
        secondaryDecayMultiplier ? secondaryDecayArray = arrayMultiplier(secondaryDecayArray, secondaryDecayMultiplier) : secondaryDecayArray;

        for (let i = 0; i < secondaryDecayArray.length; i++) {
            transformKey[i] = secondaryDecayArray[i] + transformKey[i]
        }
    }

    return transformKey
};

const decayAction = (protonCount, nucleonCount, decayKey) => {
    protonCount += decayKey[0];
    nucleonCount += decayKey[1];

    return [protonCount, nucleonCount];
};

const decayOperationOutputCheck = (decayType, protonCount, nucleonCount) => {
    const decayArray = decayTypeHarvester(decayType);
    
    const transformArray = decayTransformKey(decayArray);

    const newIsotopeValue = decayAction(protonCount, nucleonCount, transformArray);
    const newProtonCount = newIsotopeValue[0];
    const newNucleonCount = newIsotopeValue[1];

    const newIsotope = findNucleodeObject(newProtonCount, newNucleonCount);

    return newIsotope ? true : false;

};

const elementCheckLoop = (element) => {
    const {protonCount, isotopes} = element;
    let log = [];

    log.push(`[INFO]: Proton count: ${protonCount}`);

    const protonCountValid = elementCheck(protonCount);
    if (!protonCountValid) { // Check whether proton number is inside valid range
        log.push(`    [ERROR]: Proton count validity check failed`);
    }

    const nucleonCountsValid = isotopeListCheck(isotopes);
    if (nucleonCountsValid) { // Check whether nucleons are duplicated for elements
        nucleonCountsValid.forEach(logMessage => {
            log.push(`    ${logMessage}`);
        });
    }

    isotopes.forEach(isotope => {
        const passedLog = isotopeCheckLoop(isotope);
        passedLog.forEach(message => {
            log.push(message)
        });
    });

    return log
};

const isotopeCheckLoop = (isotope) => {
    const {nucleonCount, halflife, decay} = isotope;
    let log = [];

    let oddsArray = [];
    let chanceArray = [];
    let decayArray = [];

    if ((decay == 'stable' && halflife != 'stable') || (halflife == 'stable' && decay != 'stable')) { // Check whether stable is consistent
        log.push(`    [ERROR]: Stable isotope check failed for nucleon: ${nucleonCount} => halflife: ${halflife}, decay: ${decay}`);
    }
    // Isotope Checks
    const timePrefixWrong = timePrefixCheck(halflife);
    if (timePrefixWrong) { // Check for valid time notation
        log.push(`    [ERROR]: Time prefix check failed for nucleon: ${nucleonCount} => ${halflife}`);
    }

    if (!decay == 'stable') {
        decay.forEach(decay => {
            const {decayType, chance} = decay;

            oddsArray.push(convertFloatToInt(chance)); // Check whether odds add up to 1 pt.1
            chanceArray.push(chance)

            if (decayArray.includes(decayType)) { // Check for duplicate decay types in a decay group
                log.push(`    [ERROR]: Decay type originality check failed for nucleon: ${nucleonCount} => ${decayType}`);
            } else {
                decayArray.push(decayType);
            }

            // Decay Checks
            const decayTypeValid = decayTypeCheck(decayType)
            if (!decayTypeValid) { // Check for valid decay types (create a regex to extract them all)
                log.push(`    [ERROR]: Decay type validity check failed for nucleon: ${nucleonCount} => ${decayType}`);
            } else {                    
                const decayOutputValid = decayOperationOutputCheck(decayType, protonCount, nucleonCount)
                if (!decayOutputValid) { // Check possibility of all decay types into existing isotopes
                    log.push(`    [ERROR]: Decay type output check failed for nucleon: ${nucleonCount} => ${decayType}`);
                }
            }

        });
    }

    if (!compareFloats(oddsArray) == 1000) { // Check whether odds add up to 1 pt.2
        log.push(`    [ERROR]: Chance completion check failed for nucleon: ${nucleonCount} => ${chanceArray}`);
    }

    return log
};

const checkLoop = (dataObject) => {
    let log = [];

    dataObject.forEach(element => {
        const passedLog = elementCheckLoop(element);
        passedLog.forEach(message => {
            log.push(message)
        });
    });

    return log
};

console.log(checkLoop(isotopeList));