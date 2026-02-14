import { Response, Request, Router } from 'express';


const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send('RUTA PRINCIPAL DE SYMMETRIC CRYPTO');
})


export default router;