import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1726542041371 implements MigrationInterface {
  name = 'Migrations1726542041371';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(
    //   `ALTER TABLE "role" ADD "description" character varying NOT NULL`
    // );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "description"`);
  }
}
