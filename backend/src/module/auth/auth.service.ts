import { authService } from "@/src/function/authentication-controller";
import jwt, { JwtPayload } from "jsonwebtoken";
import crypto from "crypto";

export interface DecodedUser extends JwtPayload {
    id_user?: number,
    firstname_user?: string,
    lastname_user?: string,
    id_role?: number,

    jti?: string,
    iss?: string,
    aud?: string,
    exp?: number,

}

const JWT_SECRET = process.env.SECRET_KEY!;
const DEFAULT_EXPIRATION = Number(process.env.TIME_SESSION) * 60 * 60;

let revokedTokens: any = [];

export const ISSUER = "secure-soft-api"
export const AUDIENCE = "secure-soft-client"

let revokedTokenIds: string[] = [];


/**
 * Genera un token JWT para el usuario autenticado
 * @param decodedUser 
 * @returns 
 */
export const authToken = async (decodedUser: DecodedUser) => {
    return jwt.sign({
        id_user: decodedUser.id_user,
        firstname_user: decodedUser.firstname_user,
        lastname_user: decodedUser.lastname_user,
        id_role: decodedUser.id_role,
        jti: crypto.randomUUID(),
        iss: ISSUER,
        aud: AUDIENCE,
    }, JWT_SECRET, { expiresIn: DEFAULT_EXPIRATION });
}


/**
 * Revocar token
 * @param token 
 */
// const revokeToken = async (token: string) => {
//     revokedTokens.push(token);
// }
const revokeToken = async (jti: string) => {
    revokedTokenIds.push(jti);
}

/**
 * Verificar si el token ha sido revocado
 * @param token 
 * @returns 
 */
// export const isTokenRevoked = async (token: string) => {
//     return revokedTokens.includes(token);
// }
export const isTokenRevoked = async (jti: string) => {
    return revokedTokenIds.includes(jti);
}


export class AuthService {

    /**
     * Autenticar usuario y generar token JWT
     * @param email
     * @param password
     * @returns 
     */
    static async authenticate({ email, password }: { email: string, password: string }): Promise<any> {
        return await authService(email, password);
    }



    /**
     * Autenticar usuario administrador y generar token JWT
     * @param email
     * @param password
     * @returns 
     */
    static async admin({ email, password }: { email: string, password: string }): Promise<any> {
        return await authService(email, password, true);
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
     * @param token 
     * @returns 
     */
    static async logout(token: string) {
        // const token = authorization.split(" ")[1];

        // // Verificar
        // if (!(await isTokenRevoked(token))) {
        //     console.log("Revocando token:", token);
        //     await revokeToken(token);
        // }

        const decoded = jwt.verify(token, JWT_SECRET, {
            issuer: ISSUER,
            audience: AUDIENCE,
        }) as DecodedUser;

        if (decoded.jti) {
            await revokeToken(decoded.jti);
        }

        return {
            message: "Logout exitoso"
        }
    }



    /**
     * Renovar token JWT
     * @param token 
     * @returns 
     */
    static async tokenRenew(token: string) {
        // const token = authorization.split(" ")[1];

        // const decoded = jwt.verify(token, JWT_SECRET)

        // const newToken = await authToken(decoded as DecodedUser);

        // await revokeToken(token);

        const decoded = jwt.verify(token, JWT_SECRET, {
            issuer: ISSUER,
            audience: AUDIENCE,
        }) as DecodedUser;

        // Validar que el token no haya sido revocado
        if (decoded.jti && await isTokenRevoked(decoded.jti)) {
            throw new Error("Token revocado");
        }

        const newToken = await authToken(decoded);

        // Revocar el token antiguo
        if (decoded.jti) {
            await revokeToken(decoded.jti);
        }

        return {
            token: newToken,
            message: "Token renovado exitosamente"
        }
    }
}