import { Response } from "express";



/**
 * Validar el resultado de Zod y enviar una respuesta de error si no es válido
 * @param res 
 * @param zResult 
 * @returns 
 */
export function validateZod(res: Response, zResult: any) {

    if (!zResult.success) {

        const error = zResult.error.issues.map((err: any) => ({
            field: err.path.join("."),
            message: err.message,
            code: err.code
        }));

        return res.status(400).json({
            message: "Datos invalidos",
            errors: error
        });

    }

}