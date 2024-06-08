import { AbstractRepository } from '~/libs/modules/database/database.js';

import { type User as TUser, type UserRepository } from './libs/types/types.js';
import { type User as UserModel } from './user.model.js';

type Constructor = Record<'userModel', typeof UserModel>;

class User
  extends AbstractRepository<typeof UserModel, TUser>
  implements UserRepository
{
  public constructor({ userModel }: Constructor) {
    super(userModel);
  }

  public async getByEmail(email: string): Promise<TUser | null> {
    const user = await this.model
      .query()
      .modify('withoutPassword')
      .findOne({ email });

    return user ?? null;
  }

  public async getByUsername(username: string): Promise<TUser | null> {
    const user = await this.model.query().select().findOne({ username });

    return user ?? null;
  }
}

export { User };
