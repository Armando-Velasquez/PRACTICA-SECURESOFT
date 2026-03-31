import { Request, Response, Router } from "express";
import { exec } from "child_process";
import { spawn } from "child_process";

const router = Router();

router.get("/test-command", async (req: Request, res: Response) => {
    const { ip } = req.body

    if (!ip || !isValidIP(ip)) {
        return res.status(400).json({ error: "Invalid IP address" });
    }

    const process = spawn("ping", ["-n", "1", ip]);

    let output = "";
    let errorOutput = "";

    // Escucha de la salida del proceso
    process.stdout.on("data", (data) => {
        output += data.toString();
    })

    process.stderr.on("data", (data) => {
        errorOutput += data.toString();
    })

    process.on("close", () => {
        res.json({
            output,
            error: errorOutput || null
        })
    })

    // exec(`ping -n 1 ${ip}`, (error, stdout, stderr) => {
    //     return res.json({
    //         error: error ? error.message : null,
    //         stdout: stdout,
    //         stderr: stderr
    //     })
    // })

});


export default router;


function isValidIP(ip: string): boolean {
    const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipRegex.test(ip);

}