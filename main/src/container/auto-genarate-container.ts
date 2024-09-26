import * as readline from 'readline';
import { writeFile } from 'fs';

function camelToSnakeCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
}

function pascalToCamelCase(str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Nhập tên Module dạng PascalCase, ví dụ CourseCategory: ', (moduleInPascal) => {
  const moduleInCamel = pascalToCamelCase(moduleInPascal);

  const content = `
class ${moduleInPascal}Container extends BaseContainer {
  constructor() {
    super(${moduleInPascal});
    this.container.bind<I${moduleInPascal}Service<${moduleInPascal}>>('${moduleInPascal}Service').to(${moduleInPascal}Service);
    this.container.bind<I${moduleInPascal}Repository<${moduleInPascal}>>('${moduleInPascal}Repository').to(${moduleInPascal}Repository);
    this.container.bind<${moduleInPascal}Controller>(${moduleInPascal}Controller).toSelf();
  }
  
  export() {
    const ${moduleInCamel}Controller = this.container.get<${moduleInPascal}Controller>(${moduleInPascal}Controller);
    const ${moduleInCamel}Service = this.container.get<I${moduleInPascal}Service<any>>('${moduleInPascal}Service');
    return { ${moduleInCamel}Controller, ${moduleInCamel}Service };
  }
}

const ${moduleInCamel}Container = new ${moduleInPascal}Container();
const { ${moduleInCamel}Controller, ${moduleInCamel}Service } = ${moduleInCamel}Container.export();
export { ${moduleInCamel}Controller, ${moduleInCamel}Service };
`;

  // Ghi nội dung vào file TypeScript

  const path = `src/container/${camelToSnakeCase(moduleInCamel)}.container.ts`;
  writeFile(path, content.trim(), (err) => {
    if (err) {
      console.error('Có lỗi xảy ra khi ghi file:', err);
    } else {
      console.log(`Đã tạo file ${camelToSnakeCase(moduleInCamel)}.ts thành công!`);
    }
    rl.close();
  });
});
