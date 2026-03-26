import { DataTypes, Model, Sequelize } from "sequelize";
import { Product, ProductCreationAttributes } from "../interface/product.interface";

export function defineProductModel(sequelize: Sequelize) {

    class ProductModel extends Model<Product, ProductCreationAttributes> implements Product {
        public id_product?: number;
        public name_product!: string;
        public price_product!: number;
    }

    ProductModel.init({
        id_product: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name_product: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        price_product: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    }, {
        sequelize,
        tableName: "product",
        timestamps: false
    })

    return ProductModel;
}