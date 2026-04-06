import { Product } from "./product.interface";
import { User } from "./user.interface";

export interface User_Product {
    id_user: number;
    id_product: number;

    user?: User;
    product?: Product;
}

