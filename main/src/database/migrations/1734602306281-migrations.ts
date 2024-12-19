import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1734602306281 implements MigrationInterface {
  name = 'Migrations1734602306281';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_0c6e24ca20b8a8f358800fe33e" ON "course_ratings" ("course_id", "student_id") `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_337aa8dba227a1fe6b73998307"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_7d2dad9f14eddeb09c256fea71"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_0c6e24ca20b8a8f358800fe33e"`);
  }
}
