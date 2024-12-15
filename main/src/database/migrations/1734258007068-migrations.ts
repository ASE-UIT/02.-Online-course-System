import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1734258007068 implements MigrationInterface {
  name = 'Migrations1734258007068';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "students" ADD "address" character varying(100)`);
    await queryRunner.query(`ALTER TABLE "students" ADD "birthday" date`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_337aa8dba227a1fe6b73998307"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_7d2dad9f14eddeb09c256fea71"`);
    await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "birthday"`);
    await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "address"`);
  }
}
