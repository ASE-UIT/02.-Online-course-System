import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1709880076199 implements MigrationInterface {
  name = 'Migrations1709880076199';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "role" ADD "description" character varying(100)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "description"`);
  }
}
