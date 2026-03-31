import { Response } from "express";
import { AuthenticateRequest } from "../middleware/authotization.middleware";
import { createHashSalt } from "../CURSO1/Cryptography/hashing/hashing.cripto";
import { models } from "../database/connection";
import { authToken, DecodedUser } from "../module/auth/auth.service";


export function authController(req: AuthenticateRequest, res: Response, formData: { email: string, password: string }) {

    // Valdacion de existencia
    if (!formData.email || !formData.password) {
        return res.status(400).json({
            message: "El correo y la contraseña son requeridos"
        });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    // Validación de formato de correo electrónico
    if (!emailRegex.test(formData.email)) {
        return res.status(400).json({
            message: "El correo no es válido"
        });
    }
}


export async function authService(email: string, password: string, isAdmin: boolean = false) {

    const auth = await models.Auth.findOne({
        where: { email_auth: email }, include: [{ model: models.User, as: "user" }]
    })

    if (!auth) throw new Error("El correo o la contraseña son incorrectos");

    // Validar rol de administrador
    if (isAdmin && auth.user?.id_role !== 1) throw new Error("Acceso denegado: Solo administradores pueden acceder");

    // Verificacion de contraseña
    const hashCompare = createHashSalt(password, auth.salt_auth)

    if (hashCompare !== auth.password_auth) throw new Error("El correo o la contraseña son incorrectos");

    // Generar token JWT
    const decodedUser: DecodedUser = {
        id_user: auth.id_user,
        firstname_user: auth.user?.firstname_user.split(" ")[0],
        lastname_user: auth.user?.lastname_user.split(" ")[0],
        id_role: auth.user?.id_role,
    }

    const token = await authToken(decodedUser);

    return {
        token,
        message: "Autenticación exitosa"
    }

}