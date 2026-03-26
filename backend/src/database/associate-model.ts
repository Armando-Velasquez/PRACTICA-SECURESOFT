export function associateModels(models: ReturnType<typeof import("./init-model").initModels>) {

    // ROLE --< USER 1:N
    models.User.belongsTo(models.Role, { foreignKey: 'id_role', as: 'role' });
    models.Role.hasMany(models.User, { foreignKey: 'id_role', as: 'users' });


    // USER --- AUTH 1:1
    models.Auth.belongsTo(models.User, { foreignKey: 'id_user', as: 'user', onDelete: 'CASCADE' });
    models.User.hasOne(models.Auth, { foreignKey: 'id_user', as: 'auth', onDelete: 'CASCADE' });


    // USER >-< PRODUCT N:M
    models.User.belongsToMany(models.Product, { through: models.User_Product, foreignKey: 'id_user', as: 'products' });
    models.Product.belongsToMany(models.User, { through: models.User_Product, foreignKey: 'id_product', as: 'users' });

}


// | Relación | Sequelize               |
// | -------- | ----------------------- |
// | 1:N      | `belongsTo` + `hasMany` |
// | 1:1      | `hasOne` + `belongsTo`  |
// | N:M      | `belongsToMany`         |