import { Response, Request, Router } from 'express';
import { encrypt, decrypt, ALGORITHM, EncryptedPayload } from '@/src/Cryptography/symmetric/symmetric.crypto';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send('RUTA PRINCIPAL DE SYMMETRIC CRYPTO');
})



// Endpoint para encriptar un texto utilizando la clave secreta
router.post('/encrypt', (req: Request, res: Response) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'El campo "text" es requerido' });
    }

    const result = encrypt(text);

    return res.json({
        algorithm: ALGORITHM,
        ...result,
    });

})



// Endpoint para desencriptar un texto utilizando la clave secreta
router.post('/decrypt', (req: Request, res: Response) => {
    const { encrypted, iv, authTag } = req.body;

    if (!encrypted || !iv || !authTag) {
        return res.status(400).json({ error: 'Los campos "encrypted", "iv" y "authTag" son requeridos' });
    }

    try {
        const payload: EncryptedPayload = { encrypted, iv, authTag }
        const text = decrypt(payload);

        return res.json({
            algorithm: ALGORITHM,
            decifrado: text
        });
    } catch (error) {
        return res.status(400).json({ error: 'Error al desencriptar el texto. Verifica los datos proporcionados.' });
    }

})

export default router;