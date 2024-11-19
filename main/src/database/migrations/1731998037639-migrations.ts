import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1731998037639 implements MigrationInterface {
  name = 'Migrations1731998037639';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."courses_status_enum" AS ENUM('WAITING_FOR_APPROVAL', 'PUBLISHED', 'REJECTED')`
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ADD "status" "public"."courses_status_enum" NOT NULL DEFAULT 'WAITING_FOR_APPROVAL'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_337aa8dba227a1fe6b73998307"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_7d2dad9f14eddeb09c256fea71"`);
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."courses_status_enum"`);
  }
}
