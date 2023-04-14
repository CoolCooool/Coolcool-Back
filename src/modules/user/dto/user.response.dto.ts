import { Exclude, Expose } from 'class-transformer';
import { User } from '@root/modules/user/entity/user.entity';

export class UserResponseDto {
  // (1)
  @Exclude() private readonly _id: number;

  @Exclude() private readonly _email: string;

  @Exclude() private readonly _userName: string;

  @Exclude() private readonly _password: string;

  constructor(user: User) {
    this._id = user.id;
    this._email = user.email;
    this._userName = user.userName;
    this._password = user.password;
  }

  df;

  @Expose() // (3)
  get id(): number {
    return this._id;
  }

  @Expose()
  get email(): string {
    return this._email;
  }

  @Expose()
  get userName(): string {
    return this._userName;
  }

  @Expose()
  get password(): string {
    return this._password;
  }
}
