import moduleAlias from "module-alias";
import crypto from "crypto";

// ==========================================================
// INSTRUCCIONES PARA EL LABORATORIO SE ENCUENTRAR EN UN TXT EN LA RAIZ DEL PROYECTO
// ==========================================================

/**
 * Genera un par de claves RSA (clave privada y clave pública).
 * @returns 
 */
export function generateKey(): { privateKey: string; publicKey: string } {
    return crypto.generateKeyPairSync(
        "rsa", {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: "spki",
            format: "pem"
        },
        privateKeyEncoding: {
            type: "pkcs8",
            format: "pem"
        }
    });
}


/**
 * Firma un mensaje utilizando una clave privada RSA.
 * @param message 
 * @param privateKey 
 * @returns 
 */
export function signMessage(message: string, privateKey: string): string {

    // Firmar el mensaje utilizando la clave privada
    const sign = crypto.createSign("SHA256");
    sign.update(message);
    sign.end();

    // Obtener la firma en formato hexadecimal
    return sign.sign(privateKey, "hex");
}


/**
 * Verifica la firma de un mensaje utilizando la clave pública RSA.
 * @param message 
 * @param signature 
 * @param publicKey 
 * @returns 
 */
export function verifySignature(message: string, signature: string, publicKey: string): boolean {

    // Crea el objeto de verificación y actualiza con el mensaje original
    const verify = crypto.createVerify("SHA256");
    verify.update(message);
    verify.end();

    // Obtener el resultado de la verificación (true si es válida, false si no lo es)
    return verify.verify(publicKey, signature, "hex");
}