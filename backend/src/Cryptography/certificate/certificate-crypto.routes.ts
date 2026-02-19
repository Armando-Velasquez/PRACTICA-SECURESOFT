import { Response, Request, Router } from 'express';
import { Certificate, SignedMessage, generateCertificate, signMessage, verifySignature } from '@/src/Cryptography/certificate/certificate.crypto'

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send('RUTA PRINCIPAL DE CERTIFICATE CRYPTO');
})


router.get('/generate', (req: Request, res: Response) => {
    const certificate = generateCertificate();

    res.status(200).json(certificate);
})


router.post('/sign', (req: Request, res: Response) => {
    const { message, privateKeyPem, certificatePem } = req.body;

    if (!message || !privateKeyPem || !certificatePem) {
        return res.status(400).json({ error: 'Faltan parámetros: message, privateKeyPem, certificatePem' });
    }

    const sign = signMessage(message, privateKeyPem, certificatePem);

    return res.status(200).json(sign);
})



router.post('/verify', (req: Request, res: Response) => {
    const { message, signature, certificatePem } = req.body;

    if (!message || !signature || !certificatePem) {
        return res.status(400).json({ error: 'Faltan parámetros: message, signature, certificatePem' });
    }

    try {
        const valid = verifySignature(message, signature, certificatePem);
        return res.status(200).json({ valid });
    } catch (error) {
        return res.status(400).json({ error: 'Error al verificar firma' });
    }
})


export default router;
