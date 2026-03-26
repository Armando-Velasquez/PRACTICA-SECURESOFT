
export interface Product {
    id_product?: number;
    name_product: string;
    price_product: number;
}

export interface ProductCreationAttributes extends Omit<Product, "id_product"> { }