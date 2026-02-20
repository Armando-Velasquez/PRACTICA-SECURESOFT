import moduleAlias from 'module-alias';
import crypto from 'crypto';

// ==========================================================
// INSTRUCCIONES PARA EL LABORATORIO SE ENCUENTRAR EN UN TXT EN LA RAIZ DEL PROYECTO
// ==========================================================


const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
});



/**
 * Devuelve la clave pública en formato PEM
 * @returns 
 */
export function getPublicKey() {
    // console.log('Public Key:', publicKey);
    return publicKey;
}



/**
 * Devuelve la clave privada en formato PEM
 * @returns 
 */
export function getPrivateKey(): string {
    // console.log('Private Key:', privateKey);
    return privateKey;
}



/**
 * Firma un texto utilizando la clave privada y devuelve la firma en base64
 * @param text 
 * @returns 
 */
export function signText(text: string): string {
    const signer = crypto.sign('sha256', Buffer.from(text, 'utf-8'), {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
        saltLength: 32
    });
    return signer.toString('base64');
}



/**
 * Verifica una firma utilizando la clave pública, devuelve true si la firma es válida, false en caso contrario
 * @param text 
 * @param signature 
 * @returns 
 */
export function verifySignature(text: string, signature: string): boolean {
    const ok = crypto.verify('sha256', Buffer.from(text, 'utf-8'), {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
        saltLength: 32
    }, Buffer.from(signature, 'base64'));

    return ok;
}