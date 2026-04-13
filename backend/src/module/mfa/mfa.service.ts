import { models } from "@/src/database/connection";
import speakeasy from "speakeasy";
import QRCode from "qrcode";
import { authToken, DecodedUser } from "../auth/auth.service";


export class MfaService {


    /**
     * Genera un nuevo secreto para MFA y devuelve el QR code para que el usuario lo escanee con su aplicación de autenticación.
     * @param id_user 
     * @returns 
     */
    static async generate(id_user: number) {

        const secret = speakeasy.generateSecret({
            name: `SecureSoft (${id_user})`
        })

        const qr = await QRCode.toDataURL(secret.otpauth_url!);

        // Guardar el secreto en la base de datos
        await models.Auth.update({
            mfa_secret: secret.base32,
            mfa_enabled: false,
        }, {
            where: { id_user }
        })

        return {
            qr,
            secret: secret.base32
        }
    }




    static async enable(id_user: number, code: string) { 

        const auth = await models.Auth.findOne({
            where: { id_user }
        })

        // Verificar si el usuario tiene un secreto configurado
        if (auth?.mfa_enabled) throw new Error("MFA ya habilitado");

        if (!auth || !auth.mfa_secret) throw new Error("Usuario no encontrado o MFA no configurado");

        const verified = speakeasy.totp.verify({
            secret: auth.mfa_secret,
            encoding: "base32",
            token: code
        })

        if (!verified) throw new Error("Código de verificación incorrecto");

        await models.Auth.update({
            mfa_enabled: true
        }, {
            where: { id_user }
        })

        return {
            message: 'MFA habilitado correctamente'
        }

    }





    static async verify(id_user: number, code: string) { 

        const auth = await models.Auth.findOne({
            where: { id_user },
            include: [{ model: models.User, as: "user" }]
        })

        if (!auth || !auth.mfa_secret) throw new Error("Usuario no encontrado o MFA no configurado");

        if (!auth.mfa_enabled) throw new Error("MFA no habilitado");

        const valid = speakeasy.totp.verify({
            secret: auth.mfa_secret,
            encoding: "base32",
            token: code,
        })

        if (!valid) throw new Error("Código de verificación incorrecto");

        const decodedUser: DecodedUser = {
            id_user: auth.user?.id_user,
            firstname_user: auth.user?.firstname_user.split(" ")[0],
            lastname_user: auth.user?.lastname_user.split(" ")[0],
            id_role: auth.user?.id_role,
        }

        const token = await authToken(decodedUser);

        return {
            token
        }

    }


}