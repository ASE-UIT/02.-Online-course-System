import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1709880335028 implements MigrationInterface {
  name = 'Migrations1709880335028';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "description"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "role" ADD "description" character varying(100)`);
  }
}
