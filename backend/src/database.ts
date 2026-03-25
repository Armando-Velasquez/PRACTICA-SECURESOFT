import mysql from 'mysql';

// Configuración de la conexión a la base de datos
const dbConnection = mysql.createConnection({
    host: process.env.BD_HOST,
    user: process.env.BD_USER,
    password: process.env.BD_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true // Permite ejecutar múltiples consultas en una sola llamada
});

// Función para conectar a la base de datos
export function connectDB(): void {
    dbConnection.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        console.log('Connected to the database', process.env.DB_NAME);
    })
}

// Exportar conexion
export { dbConnection };