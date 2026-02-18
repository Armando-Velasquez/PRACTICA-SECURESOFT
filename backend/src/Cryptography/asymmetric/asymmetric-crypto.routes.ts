import { Response, Request, Router } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send('RUTA PRINCIPAL DE ASYMMETRIC CRYPTO');
})

export default router;