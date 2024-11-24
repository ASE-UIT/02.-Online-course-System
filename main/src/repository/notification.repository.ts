import { Notification } from '@/models/notification.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { INotificationRepository } from '@/repository/interface/i.notification.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class NotificationRepository
  extends BaseRepository<Notification>
  implements INotificationRepository<Notification>
{
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(Notification));
  }
}
