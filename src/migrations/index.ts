import {AuthApplication} from '../application';
import {MigrationRepository} from '../repositories';
import {admincreate} from './010-create-admin-account';

export default async (app: AuthApplication) => {
  const migrateRepository = await app.getRepository(MigrationRepository);
  var listMigration = [{name: 'admincreate', func: admincreate}];
  for (var i = 0; i < listMigration.length; i++) {
    let found = await migrateRepository.findOne({
      where: {name: listMigration[i].name},
    });
    if (found) {
      continue;
    } else {
      await listMigration[i].func(app);
      await migrateRepository.create({name: listMigration[i].name});
    }
  }
};
