import { Sequelize, DataTypes, Model } from "sequelize";
import { Role, RoleCreationAttributes } from "../interface/role.interface";

export function defineRoleModel(sequelize: Sequelize) {

    class RoleModel extends Model<Role, RoleCreationAttributes> implements Role {
        public id_role?: number;
        public name_role!: string;
    }

    RoleModel.init({
        id_role: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name_role: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true
        }
    }, {
        sequelize,
        tableName: "role",
        timestamps: false
    })

    return RoleModel;
}