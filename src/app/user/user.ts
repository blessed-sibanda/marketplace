export interface ISignUp {
  name: string;
  email: string;
  password: string;
}

export interface IUser {
  _id: string;
  email: string;
  name: string;
  createdAt: string;
  seller: boolean;
}

export class User implements IUser {
  constructor(
    public _id = '',
    public email = '',
    public name = '',
    public createdAt = '',
    public seller = false
  ) {}

  static Build(user: IUser): User {
    return new User(
      user._id,
      user.email,
      user.name,
      user.createdAt,
      user.seller
    );
  }

  static BuildMany(users: IUser[]): User[] {
    return users.map((u) => User.Build(u));
  }
}
