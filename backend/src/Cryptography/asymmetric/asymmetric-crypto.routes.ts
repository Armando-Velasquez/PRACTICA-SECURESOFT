import { Response, Request, Router } from 'express';
import { getPublicKey, getPrivateKey, signText, verifySignature } from '@/src/Cryptography/asymmetric/asymmetric.crypto';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send('RUTA PRINCIPAL DE ASYMMETRIC CRYPTO');
})


router.get('/public-key', (req: Request, res: Response) => {
    return res.status(200).json({ 
        publicKey: getPublicKey() 
    });
})

// Solo para pruebas, no se recomienda exponer la clave privada en un endpoint
router.get('/private-key', (req: Request, res: Response) => {
    return res.status(200).json({ 
        privateKey: getPrivateKey() 
    });
})



router.post('/sign', (req: Request, res: Response) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'Text es requerido' });
    }

    const signature = signText(text);

    return res.status(200).json({ 
        algorithm: 'rsa-pss-sha256',
        text,
        signature 
    });
})


router.post('/verify', (req: Request, res: Response) => {
    const { text, signature } = req.body;

    if (!text || !signature) {
        return res.status(400).json({ error: 'Text y signature son requeridos' });
    }

    const valid = verifySignature(text, signature);

    return res.status(200).json({ 
        algorithm: 'rsa-pss-sha256',
        valid 
    });
})

export default router;