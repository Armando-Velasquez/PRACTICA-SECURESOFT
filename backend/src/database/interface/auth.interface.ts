import { Optional } from "sequelize";
import { User } from "./user.interface";


export interface Auth {
    id_auth?: number;
    email_auth: string;
    password_auth: string;
    salt_auth: string;

    id_user: number;

    user?: User;
}

export interface AuthCreationAttributes extends Optional<Auth, "id_auth"> { }