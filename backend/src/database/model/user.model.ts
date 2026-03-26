import { Association, DataTypes, Model, Sequelize } from "sequelize";
import { defineRoleModel } from "./role.model";
import { User, UserCreationAttributes } from "../interface/user.interface";

export function defineUserModel(sequelize: Sequelize) {
    const Role = defineRoleModel(sequelize);
    type RoleModel = InstanceType<typeof Role>;

    class UserModel extends Model<User, UserCreationAttributes> implements User {
        public id_user?: number;
        public firstname_user!: string;
        public lastname_user!: string;
        public identification_user!: string;
        public phone_user!: string
        public location_user?: string | null;
        public id_role!: number;

        public role?: RoleModel;

        public static readonly associations: {
            role: Association<UserModel, RoleModel>;
        }
    }

    UserModel.init({
        id_user: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        firstname_user: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        lastname_user: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        identification_user: {
            type: DataTypes.STRING(10),
            allowNull: false,
            unique: true
        },
        phone_user: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        location_user: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        id_role: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: Role,
                key: "id_role"
            }
        }
    }, {
        sequelize,
        tableName: "user",
        timestamps: false
    })

    return UserModel;
}