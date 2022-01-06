import { IUser, User } from '../user/user';

export interface IShop {
  _id: string;
  name: string;
  description: string;
  owner: IUser;
  imageUrl: string;
}

export class Shop implements IShop {
  constructor(
    public _id = '',
    public name = '',
    public description = '',
    public owner: IUser = new User(),
    public imageUrl = ''
  ) {}

  static Build(shop: IShop): Shop {
    return new Shop(
      shop._id,
      shop.name,
      shop.description,
      shop.owner,
      shop.imageUrl
    );
  }

  static BuildMany(shops: IShop[]): Shop[] {
    return shops.map(Shop.Build);
  }
}
