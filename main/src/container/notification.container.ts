import { NotificationController } from '@/controller/notification.controller';
import { NotificationService } from '@/service/notification.service';
import { Notification } from '@/models/notification.model';
import { NotificationRepository } from '@/repository/notification.repository';
import { INotificationService } from '@/service/interface/i.notification.service';
import { INotificationRepository } from '@/repository/interface/i.notification.repository';
import { BaseContainer } from '@/container/base.container';
import { IEmployeeRepository } from '@/repository/interface/i.employee.repository';
import { employeeRepository } from '@/container/employee.container';

class NotificationContainer extends BaseContainer {
  constructor() {
    super(Notification);
    this.container.bind<INotificationService<Notification>>('NotificationService').to(NotificationService);
    this.container.bind<INotificationRepository<Notification>>('NotificationRepository').to(NotificationRepository);
    this.container.bind<NotificationController>(NotificationController).toSelf();

    //Import
    this.container.bind<IEmployeeRepository<any>>('EmployeeRepository').toConstantValue(employeeRepository);
  }

  export() {
    const notificationController = this.container.get<NotificationController>(NotificationController);
    const notificationService = this.container.get<INotificationService<any>>('NotificationService');
    return { notificationController, notificationService };
  }
}

const notificationContainer = new NotificationContainer();
const { notificationController, notificationService } = notificationContainer.export();
export { notificationController, notificationService };
