import {
  AbstractModel,
  DatabaseTableName
} from '~/libs/modules/database/database.js';

class User extends AbstractModel {
  public email!: string;

  public imageId!: null | number;

  public password!: string;

  public username!: string;

  public static get tableName(): typeof DatabaseTableName.USERS {
    return DatabaseTableName.USERS;
  }
}

export { User };
