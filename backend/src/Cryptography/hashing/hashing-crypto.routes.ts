import { Response, Request, Router } from 'express';
import { generateSalt, createHashSalt } from '@/src/Cryptography/hashing/hashing.cripto'

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send('RUTA PRINCIPAL DE HASHING CRYPTO');
})

/**
 * Generar un hash a partir de una contraseña proporcionada en el cuerpo de la solicitud.
 */
router.post('/hash', (req: Request, res: Response) => {
    const { password } = req.body;

    if (!password) {
        return res.status(400).json({ error: 'Password is required' });
    }

    // Genera una sal aleatoria de 16 bytes (32 caracteres hexadecimales)
    const salt = generateSalt(16); 

    // Crea un hash utilizando la contraseña y la sal generada
    const hash = createHashSalt(password, salt);

    // Devuelve la sal y el hash resultante en la respuesta
    return res.status(200).json({ salt, hash });
})


/**
 * Verificar si una contraseña proporcionada coincide con un hash y una sal específicos.
 */
router.post('/verify', (req: Request, res: Response) => {
    const { password, salt, hash } = req.body;

    if (!password || !salt || !hash) {
        return res.status(400).json({ error: 'La contraseña, sal y hash son requeridos' });
    }

    // Crea un hash utilizando la contraseña y la sal proporcionada
    const computedHash = createHashSalt(password, salt);

    // Compara el hash computado con el hash proporcionado y devuelve el resultado de la verificación
    if (computedHash === hash) {
        return res.status(200).json({ valid: true, message: 'La contraseña es valida' });
    } else {
        return res.status(400).json({ valid: false, message: 'La contraseña no es valida' });
    }
})


export default router;