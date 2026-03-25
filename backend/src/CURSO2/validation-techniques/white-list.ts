

const listCountries = [
    'United States',
    'Canada',
    'Ecuador',
    'Mexico',
]

/**
 * Validacion de pais
 * @param country 
 * @returns 
 */
function isValidCountry(country: string): boolean {
    // Valida que sea indistinto de mayúsculas o minúsculas
    country = country.toLowerCase();

    // La lista se haga minuscula para comparar
    const lowerCaseList = listCountries.map((c) => c.toLowerCase());

    return lowerCaseList.includes(country);
}

// console.log(isValidCountry('EcuadoR'));



/**
 * Validacion de caracteres permitidos
 */
const listPermit = ["a", "b", "c", "d", "e", "1", "2", "3", "4", "5"];

function isValidUsername(username: string): boolean {

    for (let i = 0; i < username.length; i++) {
        if (!listPermit.includes(username[i].toLowerCase())) {
            return false;
        }
    }

    return true;
}

// console.log(isValidUsername('abcde12345'));
// console.log(isValidUsername('abcde12346'));
// console.log(isValidUsername('ab1234cde'));


/**
 * Subdominios de una url
 */
const listSubDominios = [".com", ".org", ".edu" ]

function isValidSubDomain(url: string): boolean {
    const hostname = new URL(url).hostname;
    return listSubDominios.some(subDomain => hostname.endsWith(subDomain));
}

// console.log(isValidSubDomain('https://www.example.org'));


/**
 * Validacion de direcciones de correo electrónico
 */
const listEmailDomains = ["gmail.com", "yahoo.com", "outlook.com"];

function isValidEmail(email: string): boolean {
    const domain = email.split('@')[1];
    return listEmailDomains.some(validDomain => domain.includes(validDomain));
}

console.log(isValidEmail('user@gmail.com'));
console.log(isValidEmail('user@claro.com'));