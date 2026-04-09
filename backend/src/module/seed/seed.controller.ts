import { Request, Response } from "express";
import { SeedService } from "./seed.service";

export class SeedController {


    static async seedData(req: Request, res: Response) {
        try {
            console.log('Seeding data...');
            
            const result = await SeedService.seedData();
            return res.status(200).json(result);

        } catch (error) {
            console.error("Error seeding data:", error);
            return res.status(500).json({ message: "Error seeding data", error });
        }
    }


}