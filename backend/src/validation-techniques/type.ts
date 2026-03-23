
// numerico
function isNumeric(value: number) {
    if (!isNaN(value)) return;
    return value;
}

// string
function isString(value: string) {
    return value;
}

// boolean
function isBoolean(value: boolean) {
    return value;
}


// array
function isArray(value: string[]) {
    return value;
}


// object
function isObject(value: any) {
    return value;
}

// null
function isNull(value: null) {
    return value === null;
}

// undefined
function isUndefined(value: undefined) {
    return value;
}


// Date
function isDate(value: Date) {
    return value;
}

// Symbol
function isSymbol(value: Symbol) {
    return value;
}

// BigInt
function isBigInt(value: bigint) {
    return value;
}


// JSON PARSE
const textJson: string = `
{ "name":"josue", "isStudent": false, "hobbies": ["reading", "coding", "gaming"] }
`
console.log(JSON.parse(textJson));