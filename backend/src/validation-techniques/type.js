
// numerico
function isNumeric(value) {
    return typeof value === 'number' && !isNaN(value);
}

// string
function isString(value) {
    return typeof value === 'string';
}

// boolean
function isBoolean(value) {
    return typeof value === 'boolean';
}

// array
function isArray(value) {
    return Array.isArray(value);
}


// object
function isObject(value) {
    return typeof value === 'object' && !Array.isArray(value) && value !== null && !(value instanceof Date);
}

// null
function isNull(value) {
    return value === null;
}

// undefined
function isUndefined(value) {
    return typeof value === 'undefined';
}


// Date
function isDate(value) {
    return value instanceof Date && !isNaN(value);
}

// Symbol
function isSymbol(value) {
    return typeof value === 'symbol';
}

// BigInt
function isBigInt(value) {
    return typeof value === 'bigint';
}
