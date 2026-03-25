// =============================================
// EXPRESIONES REGULARES
// =============================================

// ^ -> Inicio de la cadena
// $ -> Fin de la cadena
// \  -> Carácter de escape cuando se usa es para indicar que el siguiente carácter debe ser interpretado literalmente
// g -> Búsqueda global, encuentra todas las coincidencias en lugar de detenerse en la primera

// ? -> Hace que el elemento anterior sea opcional
// + -> Uno o más caracteres
// * -> Cero o más caracteres
// {n} -> Exactamente n caracteres
// {n,} -> Al menos n caracteres
// {n,m} -> Entre n y m caracteres
// . -> Cualquier carácter excepto salto de línea


// () -> Agrupación de caracteres
// [] -> Conjunto de caracteres
// | -> Operador OR (o)


// .* -> Cualquier secuencia de caracteres antes o después
// ?= -> Lookahead positivo es para asegurar que una cadena contiene un patrón específico
// ?! -> Lookahead negativo es para asegurar que una cadena no contiene un patrón específico
// ?: -> Lookahead sin captura, se usa para agrupar sin capturar el resultado

// a-z -> minúsculas
// A-Z -> mayúsculas
// 0-9 -> dígitos


// \d -> Dígito (equivalente a [0-9])
// \b -> Límite de palabra (inicio o fin de una palabra)
// \w -> Caracter de palabra (letras, dígitos o guiones bajos)
// \s -> Espacio en blanco (espacios, tabulaciones, saltos de línea)


// [abc] -> Cualquiera de los caracteres a, b o c
// [a-z] -> Cualquier letra minúscula
// [A-Z] -> Cualquier letra mayúscula
// [0-9] -> Cualquier dígito



// --------------------------------------------

// VALIDA TODO EL TEXTO -> ^ ... $
// VALIDA PALABRAS COMPLETAS -> \b
// VALIDA TODAS LAS COINCIDENCIAS -> g