import { Request, Response } from "express";
import { RoleService } from "./role.service";
import { errorCatch } from "@/src/function/error-catch";


export class RoleController {

    /**
     * Obtener todos los roles
     * @param req 
     * @param res 
     * @returns 
     */
    static async findAll(req: Request, res: Response): Promise<any> {
        try {
            const result = await RoleService.findAll();

            return res.status(200).json(result);

        } catch (error: any) {
            errorCatch(res, error);
        }
    }



    /**
     * Obtener un rol por su ID
     * @param req 
     * @param res 
     * @returns 
     */
    static async findOne(req: Request, res: Response): Promise<any> {
        try {

            // const { id } = req.params;
            const id_role = Number(req.params.id);

            if (!id_role) return res.status(400).json({ message: "Id invalido" })
            
            const result = await RoleService.findOne(id_role);

            return res.status(200).json(result);

        } catch (error) {
            errorCatch(res, error);
        }
    }


    /**
     * Crear un nuevo rol
     * @param req 
     * @param res 
     * @returns 
     */
    static async create(req: Request, res: Response): Promise<any> {
        try {
            const formData = req.body;

            const result = await RoleService.create(formData);

            return res.status(200).json(result)

        } catch (error) {
            errorCatch(res, error);
        }
    }



    /**
     * Actualizar un rol existente
     * @param req 
     * @param res 
     * @returns 
     */
    static async update(req: Request, res: Response): Promise<any> {
        try {

            const id_role = Number(req.params.id);
            const formData = req.body;

            const result = await RoleService.update(id_role, formData);

            return res.status(200).json(result);

        } catch (error) {
            errorCatch(res, error);
        }
    }



    /**
     * Eliminar un rol por su ID
     * @param req 
     * @param res 
     * @returns 
     */
    static async delete(req: Request, res: Response): Promise<any> {
        try {
            const id_role = Number(req.params.id);

            const result = await RoleService.delete(id_role);

            return res.status(200).json(result);

        } catch (error) {
            errorCatch(res, error);
        }
    }


}