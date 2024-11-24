import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1731655144938 implements MigrationInterface {
  name = 'Migrations1731655144938';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_7d2dad9f14eddeb09c256fea71"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_337aa8dba227a1fe6b73998307"`);
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "price"`);
    await queryRunner.query(`ALTER TABLE "courses" ADD "name_en" character varying(150)`);
    await queryRunner.query(`ALTER TABLE "courses" ADD "original_price" numeric NOT NULL DEFAULT '0'`);
    await queryRunner.query(`ALTER TABLE "courses" ADD "sell_price" numeric NOT NULL DEFAULT '0'`);
    await queryRunner.query(`ALTER TABLE "courses" ALTER COLUMN "name" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_337aa8dba227a1fe6b73998307"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_7d2dad9f14eddeb09c256fea71"`);
    await queryRunner.query(`ALTER TABLE "courses" ALTER COLUMN "name" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "sell_price"`);
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "original_price"`);
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "name_en"`);
    await queryRunner.query(`ALTER TABLE "courses" ADD "price" numeric NOT NULL DEFAULT '0'`);
  }
}
