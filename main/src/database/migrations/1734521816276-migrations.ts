import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1734521816276 implements MigrationInterface {
  name = 'Migrations1734521816276';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "enrollments" ADD "certificate" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_337aa8dba227a1fe6b73998307"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_7d2dad9f14eddeb09c256fea71"`);
    await queryRunner.query(`ALTER TABLE "enrollments" DROP COLUMN "certificate"`);
  }
}
