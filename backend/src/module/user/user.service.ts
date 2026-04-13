import { dbConnect, models } from "@/src/database/connection";
import { Auth } from "@/src/database/interface/auth.interface";
import { User } from "@/src/database/interface/user.interface";
import { passwordHash } from "@/src/function/password-hash";
import { Op } from "sequelize";


type FindAllParams = {
    page: number;
    limit: number;
    search: string;
}

export class UserService {

    /**
     * Obtener todos los usuarios con paginación y búsqueda
     * @param page 
     * @param limit 
     * @param search 
     * @returns 
     */
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



    /**
     * Obtener un usuario por ID
     * @param id_user 
     */
    static async findOne(id_user: number): Promise<any> {

        const user = await models.User.findByPk(id_user, {
            include: [{ model: models.Role, as: "role" }]
        });

        if (!user) {
            return {
                message: "Usuario no encontrado"
            }
        }

        return {
            message: "Usuario obtenido exitosamente",
            data: user
        }

    }



    /**
     * Crear un nuevo usuario
     * @param formData 
     * @returns 
     */
    static async create(formData: User & Auth): Promise<any> {
        
        // Transacción
        const transaction = await dbConnect.transaction();

        try {
            // Crear el usuario
            const user = await models.User.create(formData, { transaction });

            // Crear la autenticación
            // const salt = generateSalt(16);
            // const hash = createHashSalt(formData.password_auth, salt);

            const { salt, hash } = passwordHash({ password_auth: formData.password_auth });

            await models.Auth.create({
                email_auth: formData.email_auth,
                password_auth: hash,
                salt_auth: salt,
                mfa_secret: null,
                mfa_enabled: false,
                id_user: user.id_user!
            }, { transaction })

            // Commit
            await transaction.commit();

            return {
                message: "Usuario creado exitosamente",
            }

        } catch (error) {
            // rolback
            await transaction.rollback();

            throw error;
        }

    }



    /**
     * Actualizar un usuario por ID
     * @param id_user 
     * @param formData 
     * @returns 
     */
    static async update(id_user: number, formData: User & Auth): Promise<any> {

        // Buscar registro
        const user = await models.User.findByPk(id_user);

        if (!user) return { message: "Usuario no encontrado" };

        // Actualizar usuario
        await user.update(formData);

        // Actualizar autenticación
        const auth = await models.Auth.findOne({ where: { id_user } });

        const { salt, hash } = passwordHash({ password_auth: formData.password_auth });

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
                mfa_secret: null,
                mfa_enabled: false,
                id_user
            })
        }

        return {
            message: "Usuario actualizado exitosamente",
        }


    }



    /**
     * Actualizar parcialmente un usuario por ID
     * @param id_user 
     * @param formData 
     * @returns 
     */
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



    /**
     * Eliminar un usuario por ID
     * @param id_user 
     */
    static async delete(id_user: number): Promise<any> {

        const user = await models.User.findByPk(id_user);

        if (!user) return { message: "Usuario no encontrado" };

        await user.destroy();

        return {
            message: "Usuario eliminado exitosamente",
        }
    }
}