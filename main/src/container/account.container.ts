import { AccountController } from '@/controller/account.controller';
import { AccountService } from '@/service/account.service';
import { Account } from '@/models/account.model';
import { AccountRepository } from '@/repository/account.repository';
import { IAccountService } from '@/service/interface/i.account.service';
import { IAccountRepository } from '@/repository/interface/i.account.repository';
import { BaseContainer } from '@/container/base.container';

class AccountContainer extends BaseContainer {
  constructor() {
    super(Account);

    this.container.bind<IAccountService<Account>>('AccountService').to(AccountService);

    this.container.bind<IAccountRepository<Account>>('AccountRepository').to(AccountRepository);

    this.container.bind<AccountController>(AccountController).toSelf();
  }

  export() {
    const accountController = this.container.get<AccountController>(AccountController);
    const accountService = this.container.get<IAccountService<Account>>('AccountService');
    return { accountController, accountService };
  }
}

const accountContainer = new AccountContainer();
const { accountController, accountService } = accountContainer.export();
export { accountController, accountService };
