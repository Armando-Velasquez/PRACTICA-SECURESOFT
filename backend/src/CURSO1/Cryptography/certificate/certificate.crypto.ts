import moduleAlias from 'module-alias';
import forge from 'node-forge';

// ==========================================================
// INSTRUCCIONES PARA EL LABORATORIO SE ENCUENTRAR EN UN TXT EN LA RAIZ DEL PROYECTO
// ==========================================================

export type Certificate = {
    certificatePem: string;
    publicKeyPem: string;
    privateKeyPem: string;
}

export type SignedMessage = {
    message: string;
    signature: string;
    certificatePem: string;
}


/**
 * Genera un certificado X.509 auto-firmado con una clave RSA de 2048 bits
 */
export function generateCertificate(): Certificate {

    const keys = forge.pki.rsa.generateKeyPair(2048);

    // Crear un certificado X.509
    const cert = forge.pki.createCertificate();
    cert.publicKey = keys.publicKey;

    // Serial number aleatorio
    cert.serialNumber = forge.util.bytesToHex(forge.random.getBytesSync(16));

    // Validez del certificado (1 año)
    cert.validity.notBefore = new Date();
    cert.validity.notAfter = new Date();
    cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);

    // Identidad del certificado
    const attrs = [
        { name: 'commonName', value: 'example.com' },
        { name: 'countryName', value: 'EC' },
        { shortName: 'ST', value: 'Santo Domingo' },
        { name: 'localityName', value: 'Santo Domingo' },
        { name: 'organizationName', value: 'SecureSoft' }
    ]

    // El certificado se auto-firma, por lo que el emisor es el mismo que el sujeto
    cert.setSubject(attrs);
    cert.setIssuer(attrs);

    // Extensiones del certificado
    cert.setExtensions([
        { name: 'basicConstraints', cA: true },
        { name: 'keyUsage', digitalSignature: true, keyEncipherment: true },
        { name: 'extKeyUsage', serverAuth: true }
    ])

    // Firmar el certificado con la clave privada
    cert.sign(keys.privateKey, forge.md.sha256.create());

    return {
        certificatePem: forge.pki.certificateToPem(cert),
        privateKeyPem: forge.pki.privateKeyToPem(keys.privateKey),
        publicKeyPem: forge.pki.publicKeyToPem(keys.publicKey),
    }
}



/**
 * Firma un mensaje utilizando la clave privada y el certificado
 * @param message 
 * @param privateKeyPem 
 * @param certificatePem 
 * @returns 
 */
export function signMessage(message: string, privateKeyPem: string, certificatePem: string): SignedMessage {

    // Cargar la clave privada desde PEM
    const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);

    // Crear un hash del mensaje
    const md = forge.md.sha256.create();
    md.update(message, 'utf8');

    // Firmar el hash con la clave privada
    const signature = privateKey.sign(md);

    return {
        message,
        signature: forge.util.encode64(signature),  // Utilizamos encode64 no exadecimal
        // signature: forge.util.bytesToHex(signature), // TODO: Aqui estaba el error
        // Luego de que arreglen este problema pueden utilizar el postman para verificar el funcionamiento con las apis
        certificatePem
    }
}



/**
 * Verifica la firma de un mensaje utilizando el certificado
 * @param message 
 * @param signature 
 * @param certificatePem 
 * @returns 
 */
export function verifySignature(message: string, signature: string, certificatePem: string): boolean {

    // Cargar el certificado desde PEM
    const cert = forge.pki.certificateFromPem(certificatePem);

    // Verificar que el certificado es válido (no expirado y con firma válida)
    const now = new Date();
    if (now < cert.validity.notBefore || now > cert.validity.notAfter) {
        throw new Error('El certificado no es válido en este momento');
    }

    // Verificar la firma del certificado (auto-firmado en este caso)
    if (!cert.verify(cert)) {
        throw new Error('La firma del certificado no es válida');
    }

    // Obtener la clave pública del certificado
    const publicKey = cert.publicKey;

    // Crear un hash del mensaje
    const md = forge.md.sha256.create();
    md.update(message, 'utf8');

    // Verificar la firma utilizando la clave pública
    const signatureBytes = forge.util.decode64(signature);

    // El método verify de forge espera la firma en formato de bytes, no en hexadecimal
    const isValid = (publicKey as any).verify(md.digest().bytes(), signatureBytes, 'RSASSA-PKCS1-V1_5');

    return isValid;

} 