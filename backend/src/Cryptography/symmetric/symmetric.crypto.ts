import moduleAlias from 'module-alias';
import crypto from 'crypto';

export const ALGORITHM = 'aes-256-gcm';

const KEY = crypto.randomBytes(32);

export type EncryptedPayload = {
    encrypted: string;
    iv: string;
    authTag: string;
}


/**
 * Encriptar un texto utilizando AES-256-GCM
 * @param text 
 * @returns 
 */
export function encrypt(text: string): EncryptedPayload {
    // Inicializador del vector
    const iv = crypto.randomBytes(12);
    // Objeto de cifrado
    const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);
    // Encriptar el texto
    const encrypted = Buffer.concat([
        cipher.update(text, 'utf8'),
        cipher.final()
    ])
    // Obtener el tag de autenticación
    const authTag = cipher.getAuthTag();

    return {
        encrypted: encrypted.toString('hex'),
        iv: iv.toString('hex'),
        authTag: authTag.toString('hex')
    }
}



/**
 * Desencriptar un texto utilizando AES-256-GCM
 * @param payload 
 * @returns 
 */
export function decrypt(payload: EncryptedPayload): string {

    // Objeto decifrador
    const decipher = crypto.createDecipheriv(
        ALGORITHM, 
        KEY, 
        Buffer.from(payload.iv, 'hex')
    );

    // Verificar el tag de autenticación
    decipher.setAuthTag(Buffer.from(payload.authTag, 'hex'));
    
    // Desencriptar el texto
    const decrypted = Buffer.concat([
        decipher.update(Buffer.from(payload.encrypted, 'hex')),
        decipher.final()
    ]);

    // Texto legible
    return decrypted.toString('utf8');
}