import { Response, Request, Router } from 'express';
import { generateKey, signMessage, verifySignature } from '@/src/Cryptography/digital-signature/digital-signture.crypto'

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send('RUTA PRINCIPAL DE DIGITAL SIGNATURE CRYPTO');
})

router.get('/keys', (req: Request, res: Response) => {
    const { publicKey, privateKey } = generateKey();

    return res.status(200).json({
        publicKey,
        privateKey
    })
})


router.post('/sign', (req: Request, res: Response) => {
    const { message, privateKey } = req.body;

    if (!message || !privateKey) {
        return res.status(400).json({
            error: 'Faltan parámetros. Se requiere "message" y "privateKey".'
        });
    }
    // Firmar el mensaje utilizando la clave privada
    const signature = signMessage(message, privateKey);

    return res.status(200).json({
        message,
        signature
    });
})

router.post('/verify', (req: Request, res: Response) => {
    const { message, signature, publicKey } = req.body;

    if (!message || !signature || !publicKey) {
        return res.status(400).json({
            error: 'Faltan parámetros. Se requiere "message", "signature" y "publicKey".'
        });
    }
    // Verificar la firma utilizando la clave pública
    const isValid = verifySignature(message, signature, publicKey);

    return res.status(200).json({
        isValid
    });
})

export default router;