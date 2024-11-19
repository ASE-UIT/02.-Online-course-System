import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1731999944339 implements MigrationInterface {
  name = 'Migrations1731999944339';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "lessons" ADD "introduction" text`);
    await queryRunner.query(`ALTER TABLE "lessons" ADD "is_free_trial" boolean NOT NULL DEFAULT false`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_337aa8dba227a1fe6b73998307"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_7d2dad9f14eddeb09c256fea71"`);
    await queryRunner.query(`ALTER TABLE "lessons" DROP COLUMN "is_free_trial"`);
    await queryRunner.query(`ALTER TABLE "lessons" DROP COLUMN "introduction"`);
  }
}
