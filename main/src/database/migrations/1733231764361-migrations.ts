import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1733231764361 implements MigrationInterface {
  name = 'Migrations1733231764361';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "student_complete_lessons" ADD "progress" integer NOT NULL DEFAULT '0'`);
    await queryRunner.query(`ALTER TABLE "student_complete_lessons" ADD "is_complete" boolean NOT NULL DEFAULT false`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_337aa8dba227a1fe6b73998307"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_7d2dad9f14eddeb09c256fea71"`);
    await queryRunner.query(`ALTER TABLE "student_complete_lessons" DROP COLUMN "is_complete"`);
    await queryRunner.query(`ALTER TABLE "student_complete_lessons" DROP COLUMN "progress"`);
  }
}
