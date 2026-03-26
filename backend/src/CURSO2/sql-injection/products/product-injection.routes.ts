import { Request, Response, Router } from "express";
import { dbConnection } from "@/src/database";

const router = Router();


router.get("/", (req: Request, res: Response) => {
    const { limit, page } = req.query;

    // Consulta vulnerable
    // const query = `SELECT * FROM products LIMIT ${limit} OFFSET ${page}`;

    // Consulta segura utilizando parámetros
    const query = `SELECT * FROM products LIMIT ? OFFSET ?`;
    const limitValue = Number(limit);
    const offsetValue = Number(page) * limitValue;

    console.log("Executing query:", query);

    dbConnection.query(query, [limitValue, offsetValue], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Internal server error" });
        }

        res.json({ products: results });
    })
 
});



router.get("/search", (req: Request, res: Response) => {
    const { search } = req.query;

    // Consulta vulnerable
    // const query = `SELECT * FROM products WHERE name LIKE '%${search}%'`;

    // Consulta segura utilizando parámetros
    const query = `SELECT * FROM products WHERE name LIKE ?`;

    console.log("Executing query:", query);

    dbConnection.query(query, [`%${search}%`], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Internal server error" });
        }

        res.json({ products: results });
    }) 
})


export default router;