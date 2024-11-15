import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1731661814071 implements MigrationInterface {
  name = 'Migrations1731661814071';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "lesson_parts" DROP CONSTRAINT "FK_8d1aa6f6e5e12cd5e1423532b4c"`);
    await queryRunner.query(`ALTER TABLE "lesson_parts" ALTER COLUMN "course_id" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "lesson_parts" ADD CONSTRAINT "FK_8d1aa6f6e5e12cd5e1423532b4c" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "lesson_parts" DROP CONSTRAINT "FK_8d1aa6f6e5e12cd5e1423532b4c"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_337aa8dba227a1fe6b73998307"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_7d2dad9f14eddeb09c256fea71"`);
    await queryRunner.query(`ALTER TABLE "lesson_parts" ALTER COLUMN "course_id" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "lesson_parts" ADD CONSTRAINT "FK_8d1aa6f6e5e12cd5e1423532b4c" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }
}
