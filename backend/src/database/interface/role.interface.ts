import { Optional } from "sequelize";

export interface Role {
    id_role?: number;
    name_role: string;
}

export interface RoleCreationAttributes extends Optional<Role, "id_role"> { }