import { BaseCrudController } from '@/controller/base/base-crud.controller';
import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { AppDataSourceSingleton } from '@/database/db.datasource';
import { BaseRepository } from '@/repository/base/base.repository';
import { IBaseRepository } from '@/repository/interface/i.base.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IBaseCrudService } from '@/service/interface/i.base.service';
import { ITYPES } from '@/types/interface.types';
import { Container } from 'inversify';
import { DataSource, Repository } from 'typeorm';

export class BaseContainer {
  protected container!: Container;
  protected baseController!: IBaseCrudController<any>;
  protected model: any;
  constructor(model: any) {
    this.model = model;
    this.container = new Container();
    this.baseController = BaseContainer.get(this.model).controller;
    this.container.bind<DataSource>(ITYPES.Datasource).toConstantValue(AppDataSourceSingleton.getInstance());
    this.container.bind<IBaseCrudController<any>>(ITYPES.Controller).toConstantValue(this.baseController);
  }

  static get(model: any) {
    const container = new Container();

    container.bind<DataSource>(ITYPES.Datasource).toConstantValue(AppDataSourceSingleton.getInstance());

    container
      .bind<Repository<typeof model>>(ITYPES.OrmRepository)
      .toConstantValue(AppDataSourceSingleton.getInstance().getRepository(model));

    container.bind<IBaseRepository<typeof model>>(ITYPES.Repository).to(BaseRepository<typeof model>);

    container.bind<IBaseCrudService<typeof model>>(ITYPES.Service).to(BaseCrudService<typeof model>);

    container.bind<IBaseCrudController<typeof model>>('BaseCrudController').to(BaseCrudController<typeof model>);

    return {
      controller: container.get<BaseCrudController<typeof model>>('BaseCrudController'),
      service: container.get<IBaseCrudService<typeof model>>(ITYPES.Service)
    };
  }
}
