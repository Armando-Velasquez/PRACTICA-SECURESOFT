import { Response } from "express";


export function errorCatch(res: Response, error: any) {
    console.error("Error fetching:", error);
    return res.status(500).json({
        message: "Internal server error",
        error: error instanceof Error ? error.message : error
    });
}