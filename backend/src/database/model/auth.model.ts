import { Association, DataTypes, Model, Sequelize } from "sequelize";
import { defineUserModel } from "./user.model";
import { Auth, AuthCreationAttributes } from "../interface/auth.interface";

export function defineAuthModel(sequelize: Sequelize) {
    const User = defineUserModel(sequelize);
    type UserModel = InstanceType<typeof User>;

    class AuthModel extends Model<Auth, AuthCreationAttributes> implements Auth {
        public id_auth?: number;
        public email_auth!: string;
        public password_auth!: string;
        public salt_auth!: string;
        public mfa_secret!: string | null;
        public mfa_enabled!: boolean;
        public id_user!: number;

        public user?: UserModel;

        public static associations: {
            user: Association<AuthModel, UserModel>;
        }
    }

    AuthModel.init({
        id_auth: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        email_auth: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        password_auth: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        salt_auth: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        mfa_secret: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        mfa_enabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        id_user: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: User,
                key: "id_user"
            }
        }
    }, {
        sequelize,
        tableName: "auth",
        timestamps: false
    })

    return AuthModel;
}