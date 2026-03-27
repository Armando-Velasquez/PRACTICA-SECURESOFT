import { models } from "@/src/database/connection";
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
            include: [ { model: models.Role, as: "role" } ]
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



    static async create(): Promise<any> {

    }



    static async update(): Promise<any> {

    }



    static async patch(): Promise<any> {

    }



    static async delete(): Promise<any> {

    }




}