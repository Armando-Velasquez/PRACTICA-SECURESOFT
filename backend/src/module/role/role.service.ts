import { models } from "@/src/database/connection";
import { Role } from "@/src/database/interface/role.interface";



export class RoleService {

    /**
     * Obtener todos los roles
     * @returns 
     */
    static async findAll(): Promise<any> {
        const result = await models.Role.findAll();

        return {
            message: "Roles obtenidos correctamente",
            data: result
        }
    }



    /**
     * Obtener un rol por su ID
     * @param id_role
     * @return
     */
    static async findOne(id_role: number): Promise<any> {
        const result = await models.Role.findByPk(id_role);
        // const result = await models.Role.findOne({ where: { id_role } });

        if (!result) throw { message: "Role no encontrado" }

        return {
            message: "Role obtenido correctamente",
            data: result
        }
    }



    /**
     * Crear un nuevo rol
     * @param formData 
     * @returns 
     */
    static async create(formData: Role): Promise<any> {

        await models.Role.create(formData);
        // await models.Role.create({ ...formData });

        return {
            message: "Role creado correctamente"
        }

    }



    /**
     * Actualizar un rol existente
     * @param id_role 
     * @param formData 
     * @returns 
     */
    static async update(id_role: number, formData: Role): Promise<any> {
        const role = await models.Role.findByPk(id_role);

        if (!role) throw { message: "Role no encontrado" }

        // await models.Role.update({ ...formData }, { where: { id_role } });
        await role.update(formData);

        return {
            message: "Role actualizado correctamente"
        }

    }



    /**
     * Eliminar un rol por su ID
     * @param id_role 
     * @returns 
     */
    static async delete(id_role: number): Promise<any> {
        const role = await models.Role.findByPk(id_role);

        if (!role) throw { message: "Role no encontrado" }

        // await models.Role.destroy({ where: { id_role } });
        await role.destroy();

        return {
            message: "Role eliminado correctamente"
        }

    }

}