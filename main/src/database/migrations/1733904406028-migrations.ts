import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1733904406028 implements MigrationInterface {
  name = 'Migrations1733904406028';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "employees" ADD "avatar" text`);
    await queryRunner.query(`ALTER TABLE "lecturers" ADD "avatar" text`);
    await queryRunner.query(`ALTER TABLE "lecturers" ADD "short_description" character varying(100)`);
    await queryRunner.query(`ALTER TABLE "lecturers" ADD "example_video" text`);
    await queryRunner.query(`ALTER TABLE "lecturers" ADD "social_link" text`);
    await queryRunner.query(`ALTER TABLE "lecturers" ADD "teaching_topic" character varying(50)`);
    await queryRunner.query(`ALTER TABLE "lecturers" ADD "teaching_experience" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_337aa8dba227a1fe6b73998307"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_7d2dad9f14eddeb09c256fea71"`);
    await queryRunner.query(`ALTER TABLE "lecturers" DROP COLUMN "teaching_experience"`);
    await queryRunner.query(`ALTER TABLE "lecturers" DROP COLUMN "teaching_topic"`);
    await queryRunner.query(`ALTER TABLE "lecturers" DROP COLUMN "social_link"`);
    await queryRunner.query(`ALTER TABLE "lecturers" DROP COLUMN "example_video"`);
    await queryRunner.query(`ALTER TABLE "lecturers" DROP COLUMN "short_description"`);
    await queryRunner.query(`ALTER TABLE "lecturers" DROP COLUMN "avatar"`);
    await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "avatar"`);
  }
}
