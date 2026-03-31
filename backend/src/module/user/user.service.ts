import { createHashSalt, generateSalt } from "@/src/CURSO1/Cryptography/hashing/hashing.cripto";
import { models } from "@/src/database/connection";
import { Auth } from "@/src/database/interface/auth.interface";
import { User } from "@/src/database/interface/user.interface";
import { Op } from "sequelize";


type FindAllParams = {
    page: number;
    limit: number;
    search: string;
}

export class UserService {

    static async findAll(params: FindAllParams): Promise<any> {
        const { page, limit, search } = params;

        const offset = (page - 1) * limit;

        const whereClause = search ? {
            [Op.or]: [
                { firstname_user: { [Op.like]: `%${search}%` } },
                { lastname_user: { [Op.like]: `%${search}%` } },
                { identification_user: { [Op.like]: `%${search}%` } }
            ]
        } : {};

        const { count, rows } = await models.User.findAndCountAll({
            where: whereClause,
            limit,
            offset,
            order: [["id_user", "DESC"]],
            include: [{ model: models.Role, as: "role" }]
        })

        const totalPages = Math.ceil(count / limit);

        return {
            message: "Usuarios obtenidos exitosamente",
            data: rows,
            meta: {
                total: count,
                page,
                limit,
                totalPages
            }
        }

    }



    static async findOne(): Promise<any> {

    }



    static async create(formData: User & Auth): Promise<any> {

        // Crear el usuario
        const user = await models.User.create(formData);

        // Crear la autenticación
        const salt = generateSalt(16);
        const hash = createHashSalt(formData.password_auth, salt);

        await models.Auth.create({
            email_auth: formData.email_auth,
            password_auth: hash,
            salt_auth: salt,
            id_user: user.id_user!
        })

        return {
            message: "Usuario creado exitosamente",
        }
    }



    static async update(id_user: number, formData: User & Auth): Promise<any> {

        // Buscar registro
        const user = await models.User.findByPk(id_user);

        if (!user) return { message: "Usuario no encontrado" };

        // Actualizar usuario
        await user.update(formData);

        // Actualizar autenticación
        const auth = await models.Auth.findOne({ where: { id_user } });

        const salt = generateSalt(16);
        const hash = createHashSalt(formData.password_auth, salt);

        if (auth) {
            await auth.update({
                email_auth: formData.email_auth,
                password_auth: hash,
                salt_auth: salt
            })
        } else {
            await models.Auth.create({
                email_auth: formData.email_auth,
                password_auth: hash,
                salt_auth: salt,
                id_user
            })
        }

        return {
            message: "Usuario actualizado exitosamente",
        }


    }



    static async patch(id_user: number, formData: User): Promise<any> {

        // Buscar registro
        const user = await models.User.findByPk(id_user);

        if (!user) return { message: "Usuario no encontrado" };

        // Actualizar usuario
        await user.update(formData);
   
        return {
            message: "Usuario actualizado exitosamente",
        }

    }



    static async delete(): Promise<any> {

    }




}