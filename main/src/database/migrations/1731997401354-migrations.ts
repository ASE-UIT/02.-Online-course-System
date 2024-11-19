import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1731997401354 implements MigrationInterface {
  name = 'Migrations1731997401354';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "description"`);
    await queryRunner.query(`ALTER TABLE "courses" ADD "short_description" text`);
    await queryRunner.query(`ALTER TABLE "courses" ADD "introduction" text`);
    await queryRunner.query(`ALTER TABLE "courses" ADD "participants" text`);
    await queryRunner.query(`ALTER TABLE "courses" ADD "course_targets" text`);
    await queryRunner.query(`ALTER TABLE "courses" ADD "welcome_join" character varying(100)`);
    await queryRunner.query(`ALTER TABLE "courses" ADD "video_sale" text`);
    await queryRunner.query(`ALTER TABLE "courses" ADD "course_materials" text`);
    await queryRunner.query(`ALTER TABLE "courses" ADD "lowest_price" numeric`);
    await queryRunner.query(`ALTER TABLE "courses" ADD "socialGroupLink" character varying(100)`);
    await queryRunner.query(`ALTER TABLE "courses" ADD "courseLink" character varying(100)`);
    await queryRunner.query(`ALTER TABLE "courses" ADD "tags" text`);
    await queryRunner.query(`ALTER TABLE "courses" ADD "is_free_course" boolean NOT NULL DEFAULT false`);
    await queryRunner.query(`ALTER TABLE "courses" ADD "start_free_date" date`);
    await queryRunner.query(`ALTER TABLE "courses" ADD "end_free_date" date`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_337aa8dba227a1fe6b73998307"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_7d2dad9f14eddeb09c256fea71"`);
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "end_free_date"`);
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "start_free_date"`);
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "is_free_course"`);
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "tags"`);
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "courseLink"`);
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "socialGroupLink"`);
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "lowest_price"`);
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "course_materials"`);
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "video_sale"`);
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "welcome_join"`);
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "course_targets"`);
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "participants"`);
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "introduction"`);
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "short_description"`);
    await queryRunner.query(`ALTER TABLE "courses" ADD "description" text`);
  }
}
