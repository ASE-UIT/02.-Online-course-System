import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1731998196936 implements MigrationInterface {
  name = 'Migrations1731998196936';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "courses" ADD "total_students" integer NOT NULL DEFAULT '0'`);
    await queryRunner.query(`ALTER TABLE "courses" ADD "total_reviews" integer NOT NULL DEFAULT '0'`);
    await queryRunner.query(`ALTER TABLE "courses" ADD "average_rating" integer NOT NULL DEFAULT '0'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_337aa8dba227a1fe6b73998307"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_7d2dad9f14eddeb09c256fea71"`);
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "average_rating"`);
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "total_reviews"`);
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "total_students"`);
  }
}
