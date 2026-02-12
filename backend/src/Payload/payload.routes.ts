import { Request, Response, Router } from "express";

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send('RUTA PRINCIPAL DE PAYLOAD');
});

// router.get('/:id/:code', (req: Request, res: Response) => {
//     const { id, code } = req.params
//     res.send('RUTA PRINCIPAL DE PAYLOAD');
// });

// router.post('/dos/:id/:code', (req: Request, res: Response) => {
//     const { id, code } = req.params
//     const { id1, code1 } = req.body
//     res.send('RUTA PRINCIPAL DE PAYLOAD DOS');
// });

// router.put('/dos/:id', (req: Request, res: Response) => {
//     const { id, code } = req.params
//     const { id1, code1 } = req.body
//     res.send('RUTA PRINCIPAL DE PAYLOAD DOS');
// });

// router.delete('/dos/:id', (req: Request, res: Response) => {
//     const { id } = req.params
//     res.send('RUTA PRINCIPAL DE PAYLOAD DOS');
// });

// router.patch('/dos/:id', (req: Request, res: Response) => {
//     const { id } = req.params
//     res.send('RUTA PRINCIPAL DE PAYLOAD DOS');
// });


/**
 * Ejemplo de ruta con query params
 */
router.get('/getPayload', (req: Request, res: Response) => {
    const { name, age } = req.query;

    if (!name || !age) {
        return res.status(400).json({
            message: 'Faltan parámetros "name" o "age"'
        })
    }

    return res.status(200).json({
        message: `Hola ${name}, tienes ${age} años`
    })
})


/**
 * 
 */
router.get('/getPayload/:id', (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            message: 'Falta el parámetro "id"'
        })
    }

    return res.status(200).json({
        message: `El id que has enviado es ${id}`
    })
})


export default router;