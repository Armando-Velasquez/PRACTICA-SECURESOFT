import { createHashSalt, generateSalt } from "../CURSO1/Cryptography/hashing/hashing.cripto";




export function passwordHash(formData: { password_auth: string }) {
    const salt = generateSalt(16);
    const hash = createHashSalt(formData.password_auth, salt);

    return { salt, hash };
}