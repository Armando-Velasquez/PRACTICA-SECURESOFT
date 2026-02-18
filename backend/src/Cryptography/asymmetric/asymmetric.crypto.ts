import moduleAlias from 'module-alias';
import crypto from 'crypto';

const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
});

export function getPublicKey(): string {
    return publicKey;
}

export function getPrivateKey(): string {
    return privateKey;
}


export function signText(text: string): string {
    const signer = crypto.sign('sha256', Buffer.from(text, 'utf-8'), {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
        saltLength: 32
    });
    return signer.toString('base64');
}



export function verifySignature(text: string, signature: string): boolean {
    const ok = crypto.verify('sha256', Buffer.from(text, 'utf-8'), {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
        saltLength: 32
    }, Buffer.from(signature, 'base64'));

    return ok;
}