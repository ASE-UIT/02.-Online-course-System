import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1733233667896 implements MigrationInterface {
  name = 'Migrations1733233667896';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "student_complete_lessons" ADD "complete_at" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_337aa8dba227a1fe6b73998307"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_7d2dad9f14eddeb09c256fea71"`);
    await queryRunner.query(`ALTER TABLE "student_complete_lessons" DROP COLUMN "complete_at"`);
  }
}
