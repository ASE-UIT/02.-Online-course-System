import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1732537047196 implements MigrationInterface {
  name = 'Migrations1732537047196';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "payments" ALTER COLUMN "pay_info" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_337aa8dba227a1fe6b73998307"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_7d2dad9f14eddeb09c256fea71"`);
    await queryRunner.query(`ALTER TABLE "payments" ALTER COLUMN "pay_info" SET NOT NULL`);
  }
}
