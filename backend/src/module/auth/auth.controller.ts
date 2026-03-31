import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { AuthenticateRequest } from "@/src/middleware/authotization.middleware";


export class AuthController {

    static async authenticate(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    message: "El correo y la contraseña son requeridos"
                });
            }

            const result = await AuthService.authenticate({ email, password });

            return res.status(200).json(result);


        } catch (error) {
            console.error("Error fetching roles:", error);
            return res.status(500).json({
                message: "Internal server error",
                error: error instanceof Error ? error.message : error
            });
        }

    }


    static async tokenDetail(req: AuthenticateRequest, res: Response) {
        try {

            const user = req.user;

            if (!user) return res.status(401).json({ message: "Unauthorized" });

            const result = await AuthService.tokenDetail(user);

            return res.status(200).json(result);

        } catch (error) {
            console.error("Error fetching roles:", error);
            return res.status(500).json({
                message: "Internal server error",
                error: error instanceof Error ? error.message : error
            });
        }
    }


    static async logout(req: AuthenticateRequest, res: Response) {
        try {
            const authorizaton = req.headers.authorization;

            if (!authorizaton) return res.status(400).json({ message: "El token es requerido" });

            const result = await AuthService.logout(authorizaton);

            return res.status(200).json(result);

        } catch (error) {
            console.error("Error fetching roles:", error);
            return res.status(500).json({
                message: "Internal server error",
                error: error instanceof Error ? error.message : error
            });
        }
    }




    static async tokenRenew(req: AuthenticateRequest, res: Response) {
        try {
            const authorizaton = req.headers.authorization;

            if (!authorizaton) return res.status(400).json({ message: "El token es requerido" });

            const result = await AuthService.tokenRenew(authorizaton);

            return res.status(200).json(result);

        } catch (error) {
            console.error("Error fetching roles:", error);
            return res.status(500).json({
                message: "Internal server error",
                error: error instanceof Error ? error.message : error
            });
        }
    }


}