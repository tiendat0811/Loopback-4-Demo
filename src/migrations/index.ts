import {AuthApplication} from '../application';
import {admincreate} from './010-create-admin-account';

export default async (app: AuthApplication) => {
  await admincreate(app);
};
