import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { Notification } from '@/models/notification.model';
import { INotificationService } from '@/service/interface/i.notification.service';
import { ITYPES } from '@/types/interface.types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class NotificationController {
  public common: IBaseCrudController<Notification>;
  private notificationService: INotificationService<Notification>;
  constructor(
    @inject('NotificationService') notificationService: INotificationService<Notification>,
    @inject(ITYPES.Controller) common: IBaseCrudController<Notification>
  ) {
    this.notificationService = notificationService;
    this.common = common;
  }
}
