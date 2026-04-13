import { errorCatch } from "@/src/function/error-catch";
import { MfaService } from "./mfa.service";
import { PRODUCTION } from "@/src/enviroment";



export class MfaController {

    static async generate(req: any, res: any) {
        try {
            const user = req.user;

            if (!user || !user.id_user) {
                return res.status(400).json({
                    message: "Usuario no encontrado"
                })
            }

            const result = await MfaService.generate(user.id_user)

            return res.status(200).json({
                message: "Escanea el QR code con tu aplicación de autenticación",
                data: result
            });

        } catch (error) {
            errorCatch(res, error);
        }


    }



    static async enable(req: any, res: any) {
        try {
            const user = req.user;

            if (!user || !user.id_user) {
                return res.status(400).json({
                    message: "Usuario no encontrado"
                })
            }

            const { code } = req.body;

            if (!code) {
                return res.status(400).json({
                    message: "Código de verificación requerido"
                })
            }

            const result = await MfaService.enable(user.id_user, code);

            return res.status(200).json(result);
        } catch (error) {
            errorCatch(res, error);
        }

    }





    static async verify(req: any, res: any) {
        try {

            const { id_user, code } = req.body;

            const result = await MfaService.verify(id_user, code);

            res.cookie("access_token", result.token, {
                httpOnly: true,
                secure: PRODUCTION === 'true' ? true : false,
                sameSite: "strict",
                maxAge: 60 * 60 * 1000, // 1 hora
            })

            return res.status(200).json({
                message: "Login completo"
            });

        }
        catch (error) {
            errorCatch(res, error);
        }
    }


}