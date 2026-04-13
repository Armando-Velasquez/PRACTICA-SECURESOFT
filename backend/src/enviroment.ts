import 'dotenv/config';

interface EnvPromps {
    PORT: string;
    TIMEZONE: string;
    TIME_SESSION: string;
    PRODUCTION: string;

    SECRET_KEY: string;
    GOOGLE_CLIENT_ID: string;
    
    BD_HOST: string;
    BD_USER: string;
    BD_PASSWORD: string;
    DB_NAME: string;

    BDO_DIALECT: "mysql" | "postgres" | "sqlite" | "mariadb" | "mssql";
    BDO_HOST: string;
    BDO_USER: string;
    BDO_PASSWORD: string;
    DBO_NAME: string;
}

export const {
    PORT,
    TIMEZONE,
    TIME_SESSION,
    PRODUCTION,

    SECRET_KEY,
    GOOGLE_CLIENT_ID,
    
    BD_HOST,
    BD_USER,
    BD_PASSWORD,
    DB_NAME,

    BDO_DIALECT,
    BDO_HOST,
    BDO_USER,
    BDO_PASSWORD,
    DBO_NAME
} = process.env as unknown as EnvPromps;
