import { NextFunction, Request, Response } from "express";
import { AUDIENCE, DecodedUser, ISSUER, isTokenRevoked } from "../module/auth/auth.service";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.SECRET_KEY!;

export interface AuthenticateRequest extends Request {
    user?: DecodedUser;
    file?: Express.Multer.File;
    clientIp?: string;
}

export async function verifyToken(req: AuthenticateRequest, res: Response, next: NextFunction): Promise<void> {
    try {

        // const token = req.headers.authorization;
        const token = req.cookies?.access_token;

        // if (!token) throw new Error("Token no proporcionado");
        if (!token) {
            res.status(401).json({ message: "Token no proporcionado" });
            return;
        }

        // const transformToken = token.split(" ")[1];

        // if (await isTokenRevoked(transformToken)) throw new Error("Token revocado");

        // // Verificar el token
        // const decoded = jwt.verify(transformToken, JWT_SECRET) as JwtPayload & {
        //     id_user?: number,
        //     firstname_user?: string,
        //     lastname_user?: string,
        //     id_role?: number,
        // };

        const decoded = jwt.verify(token, JWT_SECRET, {
            issuer: ISSUER,
            audience: AUDIENCE,
        }) as DecodedUser;

        // Validar expoiracion
        if ((decoded.exp ?? 0) * 1000 < Date.now()) {
            res.status(401).json({ message: "Token expirado" });
            return;
        }

        // Verificacion de revocacion
        if (decoded.jti && await isTokenRevoked(decoded.jti)) {
            res.status(401).json({ message: "Token revocado" });
            return;
        }

        req.user = decoded;

        next();


    } catch (error: any) {
        console.log("Error verifying token:", error);
        // throw new Error("Token invalido")

        if (error.name === "TokenExpiredError") {
            res.status(401).json({ message: "Token expirado" });
            return;
        }

        if (error.name === "JsonWebTokenError") {
            res.status(401).json({ message: "Token invalido" });
            return;
        }

        if (error.name === "NotBeforeError") {
            res.status(401).json({ message: "Token aun no es valido" });
            return;
        }

        res.status(401).json({ message: "Error de autenticación" });
    }
}