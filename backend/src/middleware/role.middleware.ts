import { NextFunction, Response } from "express"
import { AuthenticateRequest } from "./authotization.middleware"


export const verifyRole = (permitRole: number[]) => {
    return (req: AuthenticateRequest, res: Response, next: NextFunction) => {

        if (!req.user) {
            const message = "Usuario no autenticado";
            console.log(message);
            return res.status(401).json({ message });
        }

        const { id_role } = req.user;

        if (!id_role) {
            const message = "Usuario sin rol asignado";
            console.log(message);
            return res.status(403).json({ message });
        }

        if (!permitRole.includes(id_role)) {
            const message = "Acceso denegado: rol no permitido";
            console.log(message);
            return res.status(403).json({ message });
        }

        next();
    }
}