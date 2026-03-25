
interface RangeParams {
    num: number;
    min: number;
    max: number;
}

// Numero deve estar entre um intervalo específico
function range({ num, min, max }: RangeParams): boolean {
    return num >= min && num <= max;
}

// console.log(range({ max: 10, min: -10, num: 0 }));

// Edad
function age(age: number) {
    return age > 0 && age <= 120;
}

// console.log(age(200));

// Notas
// entre 0 y 10
function grade(nota: number) {
    return nota >= 0 && nota <= 10;
}

// console.log(grade(0)); 


// Precio
function price(precio: number) {
    return precio >= 0 && precio <= 1000;
}

// console.log(price(500));
