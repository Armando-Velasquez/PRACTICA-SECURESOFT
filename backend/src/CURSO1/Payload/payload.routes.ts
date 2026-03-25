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
 * Ejemplo de ruta con query
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
 * Ejemplo de ruta con params
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


/**
 * Ejemplo de ruta con body
 */
router.post('/createPayload', (req: Request, res: Response) => {
    const { name, age } = req.body;

    if (!name || !age) {
        return res.status(400).json({
            message: 'Faltan parámetros "name" o "age" en el body'
        })
    }

    return res.status(200).json({
        message: `Payload creado con nombre ${name} y edad ${age}`
    })
})


import jwt from 'jsonwebtoken';

const SECRET_KEY = (process.env.SECRET_KEY as string);

router.post('/login', (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (username === 'admin' && password === 'password') {
        
        const token = jwt.sign({ username, role: 1 }, SECRET_KEY, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ username, role: 1 }, SECRET_KEY, { expiresIn: '2h' });

        return res.status(200).json({ token, refreshToken });
    } else {
        return res.status(401).json({ message: 'Credenciales inválidas' });
    }
})

router.get('/protected', (req: Request, res: Response) => {
    const authHeader = req.headers['authorization']?.split(' ')[1]; // Bearer <token>

    if (!authHeader) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    jwt.verify(authHeader, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        return res.status(200).json({ message: `Acceso concedido a ${decoded}` });
    })

})



import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('file'), (req: Request, res: Response) => {

    if (!req.file?.buffer) {
        return res.status(400).json({ message: 'Archivo no proporcionado' });
    }

    return res.status(200).json({ 
        message: `Archivo ${req.file.originalname} recibido con éxito`,
        file: req.file,
    });
})

export default router;