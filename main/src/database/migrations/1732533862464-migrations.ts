import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1732533862464 implements MigrationInterface {
  name = 'Migrations1732533862464';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "courses" DROP CONSTRAINT "FK_0be8e31038d3f3c6cee7a96694b"`);
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "discount_id"`);
    await queryRunner.query(`ALTER TABLE "discounts" ADD "course_id" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "discounts" ADD "courseId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "discounts" ADD CONSTRAINT "FK_c15fc9837677fa4214aa7de3b82" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "discounts" DROP CONSTRAINT "FK_c15fc9837677fa4214aa7de3b82"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_337aa8dba227a1fe6b73998307"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_7d2dad9f14eddeb09c256fea71"`);
    await queryRunner.query(`ALTER TABLE "discounts" DROP COLUMN "courseId"`);
    await queryRunner.query(`ALTER TABLE "discounts" DROP COLUMN "course_id"`);
    await queryRunner.query(`ALTER TABLE "courses" ADD "discount_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "courses" ADD CONSTRAINT "FK_0be8e31038d3f3c6cee7a96694b" FOREIGN KEY ("discount_id") REFERENCES "discounts"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
  }
}
