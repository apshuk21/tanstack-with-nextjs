export interface IUpdateProductDto {
  productId: string;
  price: number;
  inventory: number;
}

export interface IProduct {
  id: string;
  name: string;
  price: number;
  inventory: number;
  slug: string;
}
