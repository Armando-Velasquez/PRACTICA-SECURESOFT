import mysql from 'mysql';
import { BD_HOST, BD_PASSWORD, BD_USER, DB_NAME } from './enviroment';

// Configuración de la conexión a la base de datos
const dbConnection = mysql.createConnection({
    host: BD_HOST,
    user: BD_USER,
    password: BD_PASSWORD,
    database: DB_NAME,
    multipleStatements: true // Permite ejecutar múltiples consultas en una sola llamada
});

// Función para conectar a la base de datos
export function connectDB(): void {
    dbConnection.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        console.log('Connected to the database', DB_NAME);
    })
}

// Exportar conexion
export { dbConnection };