import { Request, Response } from "express";
import { UserService } from "./user.service";
import { UserSchema, UserSchema2, validateUser } from "./user.validator";

export class UserController {


    static async findAll(req: Request, res: Response): Promise<any> {
        try {

            const { page = "1", limit = "10", search = "" } = req.query;

            const result = await UserService.findAll({
                page: Number(page),
                limit: Number(limit),
                search: String(search)
            })

            return res.status(200).json(result);

        } catch (error) {
            console.error("Error fetching roles:", error);
            return res.status(500).json({
                message: "Internal server error",
                error: error instanceof Error ? error.message : error
            });
        }
    }


    static async findOne(req: Request, res: Response): Promise<any> {
        try {

        } catch (error) {
            console.error("Error fetching roles:", error);
            return res.status(500).json({
                message: "Internal server error",
                error: error instanceof Error ? error.message : error
            });
        }



    }


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
            console.error("Error fetching roles:", error);
            return res.status(500).json({
                message: "Internal server error",
                error: error instanceof Error ? error.message : error
            });
        }



    }


    static async update(req: Request, res: Response): Promise<any> {
        try {
            const id_user = Number(req.params.id);
            const fromData = req.body;

            const zResult = UserSchema.safeParse(fromData);

            if (!zResult.success) {

                const error = zResult.error.issues.map(err => ({
                    field: err.path.join("."),
                    message: err.message,
                    code: err.code
                }));

                return res.status(400).json({
                    message: "Datos invalidos",
                    errors: error
                });

            }

            const result = await UserService.update(id_user, fromData);

            return res.status(200).json(result);

        } catch (error) {
            console.error("Error fetching roles:", error);
            return res.status(500).json({
                message: "Internal server error",
                error: error instanceof Error ? error.message : error
            });
        }



    }


    static async patch(req: Request, res: Response): Promise<any> {
        try {

            const id_user = Number(req.params.id);
            const fromData = req.body;

            const zResult = UserSchema2.safeParse(fromData);

            if (!zResult.success) {

                const error = zResult.error.issues.map(err => ({
                    field: err.path.join("."),
                    message: err.message,
                    code: err.code
                }));

                return res.status(400).json({
                    message: "Datos invalidos",
                    errors: error
                });

            }

            const result = await UserService.patch(id_user, fromData);

            return res.status(200).json(result);

        } catch (error) {
            console.error("Error fetching roles:", error);
            return res.status(500).json({
                message: "Internal server error",
                error: error instanceof Error ? error.message : error
            });
        }

    }


    static async delete(req: Request, res: Response): Promise<any> {
        try {

        } catch (error) {
            console.error("Error fetching roles:", error);
            return res.status(500).json({
                message: "Internal server error",
                error: error instanceof Error ? error.message : error
            });
        }
    }

}