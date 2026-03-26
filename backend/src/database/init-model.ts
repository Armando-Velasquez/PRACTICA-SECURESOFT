import { Sequelize } from "sequelize";
import { associateModels } from "./associate-model";
import { defineRoleModel } from "./model/role.model";
import { defineUserModel } from "./model/user.model";
import { defineAuthModel } from "./model/auth.model";
import { defineProductModel } from "./model/product.model";
import { defineUser_ProductModel } from "./model/user_product.model";

export function initModels(sequelize: Sequelize) { 
    const models = {
        Role: defineRoleModel(sequelize),
        User: defineUserModel(sequelize),
        Auth: defineAuthModel(sequelize),
        Product: defineProductModel(sequelize),
        User_Product: defineUser_ProductModel(sequelize),
    }

    // Asociaciones
    associateModels(models);

    return models;
}