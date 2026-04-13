
import { createHashSalt, generateSalt } from "@/src/CURSO1/Cryptography/hashing/hashing.cripto";
import { models } from "@/src/database/connection";

export class SeedService {

    static async seedData(): Promise<any> {

        // CREAR ROLES
        await models.Role.bulkCreate([
            { name_role: "ADMIN" },
            { name_role: "USER" },
        ], { updateOnDuplicate: ["name_role"] });

        // CREAR USUARIOS
        await models.User.bulkCreate([
            { firstname_user: "Admin", lastname_user: "User", identification_user: "1234567890", phone_user: "1234567890", id_role: 1 },
            { firstname_user: "Regular", lastname_user: "User", identification_user: "0987654321", phone_user: "0987654321", id_role: 2}
        ], { updateOnDuplicate: ["identification_user"] });

        // CREAR AUTH
        const userAuth = [
            { email: "admin@gmail.com", password: "admin123", id_user: 1 },
            { email: "regular@gmail.com", password: "regular123", id_user: 2 }
        ]

        const authData = userAuth.map(auth => {
            const salt = generateSalt(16);
            const hash = createHashSalt(auth.password, salt);

            return {
                email_auth: auth.email,
                password_auth: hash,
                salt_auth: salt,
                mfa_secret: null,
                mfa_enabled: false,
                id_user: auth.id_user
            }
        })

        await models.Auth.bulkCreate(authData, { updateOnDuplicate: ["email_auth"] });

        return {
            message: "Data seeded successfully",
        }
    }


}