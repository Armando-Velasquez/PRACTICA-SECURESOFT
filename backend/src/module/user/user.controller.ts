import { Request, Response } from "express";
import { UserService } from "./user.service";
import { UserSchema, UserSchema2, validateUser } from "./user.validator";
import { paginate } from "@/src/function/paginator";
import { errorCatch } from "@/src/function/error-catch";
import { validateZod } from "@/src/function/validate-zod";

export class UserController {

    /**
     * Obtener todos los usuarios con paginación y búsqueda
     * @param req 
     * @param res 
     * @returns 
     */
    static async findAll(req: Request, res: Response): Promise<any> {
        try {
            const { page, limit, search } = req.query;
            const { page: pageNum, limit: limitNum, search: searchStr } = paginate(Number(page), Number(limit), String(search));

            const result = await UserService.findAll({
                page: pageNum,
                limit: limitNum,
                search: searchStr
            })

            return res.status(200).json(result);

        } catch (error) {
            errorCatch(res, error);
        }
    }



    /**
     * Obtener un usuario por ID
     * @param req 
     * @param res 
     */
    static async findOne(req: Request, res: Response): Promise<any> {
        try {
            const id_user = Number(req.params.id);

            // Validar entero positivo
            if (isNaN(id_user) || id_user <= 0) {
                return res.status(400).json({
                    message: "ID de usuario inválido"
                });
            }

            // Validacion de regex
            const numberRegex = /^\d+$/
            if (!numberRegex.test(id_user.toString())) {
                return res.status(400).json({
                    message: "ID de usuario inválido"
                });
            }

            const result = await UserService.findOne(id_user);

            return res.status(200).json(result);

        } catch (error) {
            errorCatch(res, error);
        }
    }



    /**
     * Crear un nuevo usuario
     * @param req 
     * @param res 
     * @returns 
     */
    static async create(req: Request, res: Response): Promise<any> {
        try {
            const fromData = req.body;

            const error = validateUser(fromData);

            if (error.length > 0) {
                return res.status(400).json({
                    message: "Datos invalidos",
                    errors: error
                })
            }

            const result = await UserService.create(fromData);

            return res.status(200).json(result);


        } catch (error) {
            errorCatch(res, error);
        }
    }



    /**
     * Actualizar un usuario por ID
     * @param req 
     * @param res 
     * @returns 
     */
    static async update(req: Request, res: Response): Promise<any> {
        try {
            const id_user = Number(req.params.id);
            const fromData = req.body;

            const zResult = UserSchema.safeParse(fromData);
            validateZod(res, zResult);

            const result = await UserService.update(id_user, fromData);

            return res.status(200).json(result);

        } catch (error) {
            errorCatch(res, error);
        }
    }



    /**
     * Actualizar parcialmente un usuario por ID
     * @param req 
     * @param res 
     * @returns 
     */
    static async patch(req: Request, res: Response): Promise<any> {
        try {

            const id_user = Number(req.params.id);
            const fromData = req.body;

            const zResult = UserSchema2.safeParse(fromData);
            validateZod(res, zResult);

            const result = await UserService.patch(id_user, fromData);

            return res.status(200).json(result);

        } catch (error) {
            errorCatch(res, error);
        }
    }



    /**
     * Eliminar un usuario por ID
     * @param req 
     * @param res 
     */
    static async delete(req: Request, res: Response): Promise<any> {
        try {
            const id_user = Number(req.params.id);

            // Validar entero positivo
            if (isNaN(id_user) || id_user <= 0) {
                return res.status(400).json({
                    message: "ID de usuario inválido"
                });
            }

            // Validacion de regex
            const numberRegex = /^\d+$/
            if (!numberRegex.test(id_user.toString())) {
                return res.status(400).json({
                    message: "ID de usuario inválido"
                });
            }

            const result = await UserService.delete(id_user);

            return res.status(200).json(result);


        } catch (error) {
            errorCatch(res, error);
        }
    }

}