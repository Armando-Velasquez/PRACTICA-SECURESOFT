import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { AuthenticateRequest } from "@/src/middleware/authotization.middleware";
import { errorCatch } from "@/src/function/error-catch";
import { authController } from "@/src/function/authentication-controller";


export class AuthController {

    /**
     * Autenticar usuario y generar token JWT
     * @param req 
     * @param res 
     * @returns 
     */
    static async authenticate(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const formData = { email, password };
            authController(req, res, formData);

            const result = await AuthService.authenticate({ email, password });

            return res.status(200).json(result);

        } catch (error) {
            errorCatch(res, error);
        }

    }



    /**
     * Autenticar usuario administrador y generar token JWT
     * @param req 
     * @param res 
     * @returns 
     */
    static async admin(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const formData = { email, password };
            authController(req, res, formData);
            const result = await AuthService.admin({ email, password });

            return res.status(200).json(result);

        } catch (error) {
            errorCatch(res, error);
        }

    }



    /**
     * Obtener detalles del token JWT
     * @param req 
     * @param res 
     * @returns 
     */
    static async tokenDetail(req: AuthenticateRequest, res: Response) {
        try {
            const user = req.user;
            if (!user) return res.status(401).json({ message: "Unauthorized" });

            const result = await AuthService.tokenDetail(user);

            return res.status(200).json(result);

        } catch (error) {
            errorCatch(res, error);
        }
    }



    /**
     * Cerrar sesión invalidando el token JWT
     * @param req 
     * @param res 
     * @returns 
     */
    static async logout(req: AuthenticateRequest, res: Response) {
        try {
            const authorizaton = req.headers.authorization;

            if (!authorizaton) return res.status(400).json({ message: "El token es requerido" });

            const result = await AuthService.logout(authorizaton);

            return res.status(200).json(result);

        } catch (error) {
            errorCatch(res, error);
        }
    }



    /**
     * Renovar token JWT
     * @param req 
     * @param res 
     * @returns 
     */
    static async tokenRenew(req: AuthenticateRequest, res: Response) {
        try {
            const authorizaton = req.headers.authorization;

            if (!authorizaton) return res.status(400).json({ message: "El token es requerido" });

            const result = await AuthService.tokenRenew(authorizaton);

            return res.status(200).json(result);

        } catch (error) {
            errorCatch(res, error);
        }
    }


}