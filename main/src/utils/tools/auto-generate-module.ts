import * as readline from 'readline';
import { writeFile } from 'fs';

function camelToSnakeCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
}

function pascalToCamelCase(str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

function createService() {
  return `import { ${ModuleInPascal} } from '@/models/${module_in_snake_case}.model';
import { I${ModuleInPascal}Repository } from '@/repository/interface/i.${module_in_snake_case}.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { I${ModuleInPascal}Service } from '@/service/interface/i.${module_in_snake_case}.service';
import { inject, injectable } from 'inversify';

@injectable()
export class ${ModuleInPascal}Service extends BaseCrudService<${ModuleInPascal}> implements I${ModuleInPascal}Service<${ModuleInPascal}> {
private ${moduleInCamelCase}Repository: I${ModuleInPascal}Repository<${ModuleInPascal}>;

constructor(@inject('${ModuleInPascal}Repository') ${moduleInCamelCase}Repository: I${ModuleInPascal}Repository<${ModuleInPascal}>) {
super(${moduleInCamelCase}Repository);
this.${moduleInCamelCase}Repository = ${moduleInCamelCase}Repository;
}
}
`;
}

function createIService() {
  return `import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';

export interface I${ModuleInPascal}Service<T extends BaseModelType> extends IBaseCrudService<T> {}
`;
}

function createRepository() {
  return `import { ${ModuleInPascal} } from '@/models/${module_in_snake_case}.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { I${ModuleInPascal}Repository } from '@/repository/interface/i.${module_in_snake_case}.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class ${ModuleInPascal}Repository extends BaseRepository<${ModuleInPascal}> implements I${ModuleInPascal}Repository<${ModuleInPascal}> {
constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
super(dataSource.getRepository(${ModuleInPascal}));
}
}
`;
}

function createIRepository() {
  return `import { IBaseRepository } from '@/repository/interface/i.base.repository';

export interface I${ModuleInPascal}Repository<T> extends IBaseRepository<T> {}
`;
}

function createController() {
  return `import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { ${ModuleInPascal} } from '@/models/${module_in_snake_case}.model';
import { I${ModuleInPascal}Service } from '@/service/interface/i.${module_in_snake_case}.service';
import { ITYPES } from '@/types/interface.types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class ${ModuleInPascal}Controller {
public common: IBaseCrudController<${ModuleInPascal}>;
private ${moduleInCamelCase}Service: I${ModuleInPascal}Service<${ModuleInPascal}>;
constructor(
@inject('${ModuleInPascal}Service') ${moduleInCamelCase}Service: I${ModuleInPascal}Service<${ModuleInPascal}>,
@inject(ITYPES.Controller) common: IBaseCrudController<${ModuleInPascal}>
) {
this.${moduleInCamelCase}Service = ${moduleInCamelCase}Service;
this.common = common;
}
}
`;
}

function createContainer() {
  return `
import { ${ModuleInPascal}Controller } from '@/controller/${module_in_snake_case}.controller';
import { ${ModuleInPascal}Service } from '@/service/${module_in_snake_case}.service';
import { ${ModuleInPascal} } from '@/models/${module_in_snake_case}.model';
import { ${ModuleInPascal}Repository } from '@/repository/${module_in_snake_case}.repository';
import { I${ModuleInPascal}Service } from '@/service/interface/i.${module_in_snake_case}.service';
import { I${ModuleInPascal}Repository } from '@/repository/interface/i.${module_in_snake_case}.repository';
import { BaseContainer } from '@/container/base.container';

class ${ModuleInPascal}Container extends BaseContainer {
  constructor() {
    super(${ModuleInPascal});
this.container.bind<I${ModuleInPascal}Service<${ModuleInPascal}>>('${ModuleInPascal}Service').to(${ModuleInPascal}Service);
this.container.bind<I${ModuleInPascal}Repository<${ModuleInPascal}>>('${ModuleInPascal}Repository').to(${ModuleInPascal}Repository);
this.container.bind<${ModuleInPascal}Controller>(${ModuleInPascal}Controller).toSelf();
}

export() {
const ${moduleInCamelCase}Controller = this.container.get<${ModuleInPascal}Controller>(${ModuleInPascal}Controller);
    const ${moduleInCamelCase}Service = this.container.get<I${ModuleInPascal}Service<any>>('${ModuleInPascal}Service');
return { ${moduleInCamelCase}Controller, ${moduleInCamelCase}Service };
}
}

const ${moduleInCamelCase}Container = new ${ModuleInPascal}Container();
const { ${moduleInCamelCase}Controller, ${moduleInCamelCase}Service } = ${moduleInCamelCase}Container.export();
export { ${moduleInCamelCase}Controller, ${moduleInCamelCase}Service };
`;
}

function createRoute() {
  return `import express from 'express';
const ${moduleInCamelCase}Router = express.Router();

export default ${moduleInCamelCase}Router;
`;
}

let moduleInCamelCase: string;
let ModuleInPascal: string;
let module_in_snake_case: string;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function createFile(content: string, path: string) {
  writeFile(path, content.trim(), (err) => {
    if (err) {
      console.error('Có lỗi xảy ra khi ghi file:', err);
    } else {
      console.log(`Đã tạo file ${path} thành công!`);
    }
    rl.close();
  });
}

rl.question('Nhập tên Module dạng PascalCase, ví dụ CourseCategory: ', (input: string) => {
  ModuleInPascal = input;
  moduleInCamelCase = pascalToCamelCase(ModuleInPascal);
  module_in_snake_case = camelToSnakeCase(moduleInCamelCase);

  const service = createService();
  const servicePath = `src/service/${module_in_snake_case}.service.ts`;
  createFile(service, servicePath);

  const iService = createIService();
  const iServicePath = `src/service/interface/i.${module_in_snake_case}.service.ts`;
  createFile(iService, iServicePath);

  const repository = createRepository();
  const repositoryPath = `src/repository/${module_in_snake_case}.repository.ts`;
  createFile(repository, repositoryPath);

  const iRepository = createIRepository();
  const iRepositoryPath = `src/repository/interface/i.${module_in_snake_case}.repository.ts`;
  createFile(iRepository, iRepositoryPath);

  const controller = createController();
  const controllerPath = `src/controller/${module_in_snake_case}.controller.ts`;
  createFile(controller, controllerPath);

  const container = createContainer();
  const containerPath = `src/container/${module_in_snake_case}.container.ts`;
  createFile(container, containerPath);

  const route = createRoute();
  const routePath = `src/routes/${module_in_snake_case}.route.ts`;
  createFile(route, routePath);
});
