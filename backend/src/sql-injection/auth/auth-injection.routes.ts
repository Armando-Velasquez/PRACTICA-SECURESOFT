import { Request, Response, Router } from "express";
import { dbConnection } from "@/src/database";

const router = Router();

// Login
router.post("/login", (req: Request, res: Response) => {
    const { username, password } = req.body;

    // Consulta vulnerable a SQL Injection
    // const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

    // Consulta segura utilizando parámetros
    const query = `SELECT * FROM users WHERE username = ? AND password = ?`;

    console.log("Executing query:", query);

    // dbConnection.query(query, (err, results) => {
    dbConnection.query(query, [username, password], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Internal server error" });
        }

        if (results.length > 0) {
            res.json({ message: "Login successful", user: results[0] });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }

    })
})


router.post("/register", (req: Request, res: Response) => {
    const { username, password, email, role } = req.body;

    // Crear consulta vulnerable
    // const query = `INSERT INTO users (username, password, email, role) VALUES ('${username}', '${password}', '${email}', '${role}')`;

    // Consulta segura utilizando parámetros
    const query = `INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)`;

    console.log("Executing query:", query);

    // dbConnection.query(query, (err, results) => {
    dbConnection.query(query, [username, password, email, role], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Internal server error" });
        }

        res.json({ message: "User registered successfully", userId: results.insertId });
    });

})

export default router;