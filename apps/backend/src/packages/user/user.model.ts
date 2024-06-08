import {
  AbstractModel,
  DatabaseTableName
} from '~/libs/modules/database/database.js';

class User extends AbstractModel {
  public email!: string;

  public username!: string;

  public password!: string;

  public imageId!: number | null;

  public static get tableName(): typeof DatabaseTableName.USERS {
    return DatabaseTableName.USERS;
  }
}

export { User };
