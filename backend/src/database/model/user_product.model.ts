import { Association, DataTypes, Model, Sequelize } from "sequelize";
import { defineUserModel } from "./user.model";
import { defineProductModel } from "./product.model";
import { User_Product, User_ProductCreationAttributes } from "../interface/user_product.interface";

export function defineUser_ProductModel(sequelize: Sequelize) {
    const User = defineUserModel(sequelize);
    type UserModel = InstanceType<typeof User>;

    const Product = defineProductModel(sequelize);
    type ProductModel = InstanceType<typeof Product>;

    class User_ProductModel extends Model<User_Product, User_ProductCreationAttributes> implements User_Product {
        public id_user!: number;
        public id_product!: number;

        public readonly user?: UserModel;
        public readonly product?: ProductModel;

        public static readonly associate: {
            user: Association<User_ProductModel, UserModel>;
            product: Association<User_ProductModel, ProductModel>;
        }
    }

    User_ProductModel.init({
        id_user: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: User,
                key: "id_user"
            }
        },
        id_product: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: Product,
                key: "id_product"
            }
        }
    }, {
        sequelize,
        tableName: "user_product",
        timestamps: false
    })

    return User_ProductModel;
}