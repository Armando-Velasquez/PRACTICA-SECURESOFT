// Longitud po string
// Nombre entre 3 y 10 caracteres
function validName(name: string) {
    return name.length >= 3 && name.length <= 10;
}


function validCI(ci: string) {
    return ci.length === 10;
}

// console.log(validCI("2350793210"));


// Validar longitud de un arreglo
function validArray(arr: any[]) {
    return arr.length > 0 && arr.length <= 5;
}

console.log(validArray([141, 2, 3, 4]));
