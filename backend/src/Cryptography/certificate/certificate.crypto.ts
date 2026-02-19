import moduleAlias from 'module-alias';
import forge from 'node-forge';

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


export function generateCertificate(): Certificate {

    const keys = forge.pki.rsa.generateKeyPair(2048);

    // Crear un certificado X.509
    const cert = forge.pki.createCertificate();
    cert.publicKey = keys.publicKey;

    cert.serialNumber = forge.util.bytesToHex(forge.random.getBytesSync(16));

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

    cert.setSubject(attrs);
    cert.setIssuer(attrs);

    cert.setExtensions([
        { name: 'basicConstraints', cA: true },
        { name: 'keyUsage', keyCertSign: true, digitalSignature: true },
        { name: 'extKeyUsage', serverAuth: true }
    ])

    cert.sign(keys.privateKey, forge.md.sha256.create());

    return {
        certificatePem: forge.pki.certificateToPem(cert),
        publicKeyPem: forge.pki.publicKeyToPem(keys.publicKey),
        privateKeyPem: forge.pki.privateKeyToPem(keys.privateKey)
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
        signature: forge.util.bytesToHex(signature),
        certificatePem
    }
}



export function verifySignature(message: string, signature: string, certificatePem: string): boolean {

    const cert = forge.pki.certificateFromPem(certificatePem);

    const now = new Date();
    if (now < cert.validity.notBefore || now > cert.validity.notAfter) {
        throw new Error('El certificado no es válido en este momento');
    }

    if (!cert.verify(cert)) {
        throw new Error('La firma del certificado no es válida');
    }

    const publicKey = cert.publicKey;

    const md = forge.md.sha256.create();
    md.update(message, 'utf8');

    const signatureBytes = forge.util.decode64(signature);

    const isValid = (publicKey as any).verify(md.digest().bytes(), signatureBytes, 'RSASSA-PKCS1-V1_5');

    return isValid;

} 