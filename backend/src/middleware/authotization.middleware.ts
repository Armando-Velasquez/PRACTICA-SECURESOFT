import { NextFunction, Request, Response } from "express";
import { DecodedUser, isTokenRevoked } from "../module/auth/auth.service";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.SECRET_KEY!;

export interface AuthenticateRequest extends Request {
    user?: DecodedUser;
    file?: Express.Multer.File;
    clientIp?: string;
}

export async function verifyToken(req: AuthenticateRequest, res: Response, next: NextFunction): Promise<void> {
    try {

        const token = req.headers.authorization;

        if (!token) throw new Error("Token no proporcionado");

        const transformToken = token.split(" ")[1];

        if (await isTokenRevoked(transformToken)) throw new Error("Token revocado");

        // Verificar el token
        const decoded = jwt.verify(transformToken, JWT_SECRET) as JwtPayload & {
            id_user?: number,
            firstname_user?: string,
            lastname_user?: string,
            id_role?: number,
        };

        req.user = decoded;

        next();


    } catch (error) {
        console.log("Error verifying token:", error);
        throw new Error("Token invalido")
    }
}