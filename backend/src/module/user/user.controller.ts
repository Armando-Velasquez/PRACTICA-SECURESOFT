import { Request, Response } from "express";
import { UserService } from "./user.service";

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