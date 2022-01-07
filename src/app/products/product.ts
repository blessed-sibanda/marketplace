import { IShop, Shop } from '../shops/shop';

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  shop: IShop;
  category: string;
  price: number;
  quantity: number;
  createdAt: string;
}

export class Product implements IProduct {
  constructor(
    public _id = '',
    public name = '',
    public description = '',
    public imageUrl = '',
    public shop: IShop = new Shop(),
    public price = 0,
    public quantity = 0,
    public category = '',
    public createdAt = ''
  ) {}

  static Build(product: IProduct): Product {
    return new Product(
      product._id,
      product.name,
      product.description,
      product.imageUrl,
      product.shop,
      product.price,
      product.quantity,
      product.category,
      product.createdAt
    );
  }

  static BuildMany(products: IProduct[]): Product[] {
    return products.map(Product.Build);
  }
}
