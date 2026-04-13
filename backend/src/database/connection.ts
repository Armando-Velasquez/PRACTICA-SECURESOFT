
import { PoolOptions, Sequelize } from "sequelize";
import { initModels } from "./init-model";
import { BDO_DIALECT, BDO_HOST, BDO_PASSWORD, BDO_USER, DBO_NAME, TIMEZONE } from "../enviroment";

const poolDB: PoolOptions = {
    max: 50,
    min: 0,
    acquire: 30000,
    idle: 10000
}

export const dbConnect: Sequelize = new Sequelize(
    DBO_NAME,
    BDO_USER,
    BDO_PASSWORD,
    {
        host: BDO_HOST,
        dialect: BDO_DIALECT,
        logging: false,
        timezone: TIMEZONE,
        pool: poolDB
    }
)

/**
 * Función para conectar a la base de datos y sincronizar los modelos. Se llama al iniciar la aplicación.
 */
export const connection = async () => {
    try {

        // await dbConnect.sync({ alter: true });
        await dbConnect.sync({ force: false });
        console.log("Conexión a la base de datos: ", DBO_NAME);

    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
    }
}

// Exportar los modelos inicializados
export const models = initModels(dbConnect);
