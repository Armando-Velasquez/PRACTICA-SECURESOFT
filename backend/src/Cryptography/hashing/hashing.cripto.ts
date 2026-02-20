import moduleAlias from "module-alias";
import crypto from 'crypto';

// ==========================================================
// INSTRUCCIONES PARA EL LABORATORIO SE ENCUENTRAR EN UN TXT EN LA RAIZ DEL PROYECTO
// ==========================================================

/**
 * Genera una sal aleatoria de la longitud especificada.
 * @param length 
 * @returns 
 */
export function generateSalt(length: number): string {
    return crypto.randomBytes(length).toString('hex');
}



/**
 * Crea un hash utilizando el algoritmo HMAC con SHA-256, combinando la contraseña y la sal proporcionadas.
 * @param password 
 * @param salt 
 * @returns 
 */
export function createHashSalt(password: string, salt: string): string {

    // Crea un objeto HMAC utilizando el algoritmo SHA-256 y la sal proporcionada
    const hash = crypto.createHmac('sha256', salt);
    hash.update(password);

    // Devuelve el hash resultante en formato hexadecimal
    return hash.digest('hex');
}