import { createHashSalt } from "@/src/CURSO1/Cryptography/hashing/hashing.cripto";
import { models } from "@/src/database/connection";
import jwt, { JwtPayload } from "jsonwebtoken";


export interface DecodedUser extends JwtPayload {
    id_user?: number,
    firstname_user?: string,
    lastname_user?: string,
    id_role?: number,
}

const JWT_SECRET = process.env.SECRET_KEY!;
const DEFAULT_EXPIRATION = Number(process.env.TIME_SESSION) * 60 * 60;

let revokedTokens: any = [];

/**
 * Genera un token JWT para el usuario autenticado
 * @param decodedUser 
 * @returns 
 */
const authToken = async (decodedUser: DecodedUser) => {
    return jwt.sign({
        id_user: decodedUser.id_user,
        firstname_user: decodedUser.firstname_user,
        lastname_user: decodedUser.lastname_user,
        id_role: decodedUser.id_role,
    }, JWT_SECRET, { expiresIn: DEFAULT_EXPIRATION });
}


/**
 * Revocar token
 * @param token 
 */
const revokeToken = async (token: string) => {
    revokedTokens.push(token);
}

/**
 * Verificar si el token ha sido revocado
 * @param token 
 * @returns 
 */
export const isTokenRevoked = async (token: string) => {
    return revokedTokens.includes(token);
}


export class AuthService {

    /**
     * Autenticar usuario y generar token JWT
     * @param email
     * @param password
     * @returns 
     */
    static async authenticate({ email, password }: { email: string, password: string }): Promise<any> {

        const auth = await models.Auth.findOne({
            where: { email_auth: email }, include: [{ model: models.User, as: "user" }]
        })

        if (!auth) throw new Error("El correo o la contraseña son incorrectos");

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



    /**
     * Obtener detalles del token JWT
     * @param decodedUser 
     * @returns 
     */
    static async tokenDetail(decodedUser: DecodedUser | undefined) {

        if (!decodedUser) throw new Error("Unauthorized");

        return {
            message: "Token válido",
            data: decodedUser
        }

    }



    /**
     * Cerrar sesión y revocar token JWT
     * @param authorization 
     * @returns 
     */
    static async logout(authorization: string) {
        const token = authorization.split(" ")[1];

        // Verificar
        if (! (await isTokenRevoked(token)) ) {
            console.log("Revocando token:", token);
            await revokeToken(token);
        }

        return {
            message: "Logout exitoso"
        }


    }



    /**
     * Renovar token JWT
     * @param authorization 
     * @returns 
     */
    static async tokenRenew(authorization: string) {
        const token = authorization.split(" ")[1];

        const decoded = jwt.verify(token, JWT_SECRET)

        const newToken = await authToken(decoded as DecodedUser);

        await revokeToken(token);

        return {
            token: newToken,
            message: "Token renovado exitosamente"
        }
    }
}