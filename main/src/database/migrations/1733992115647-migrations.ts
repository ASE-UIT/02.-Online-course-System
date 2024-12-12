import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1733992115647 implements MigrationInterface {
  name = 'Migrations1733992115647';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "orders" ADD "customer_fullname" character varying`);
    await queryRunner.query(`ALTER TABLE "orders" ADD "customer_email" character varying`);
    await queryRunner.query(`ALTER TABLE "orders" ADD "customer_phone" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_337aa8dba227a1fe6b73998307"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_7d2dad9f14eddeb09c256fea71"`);
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "customer_phone"`);
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "customer_email"`);
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "customer_fullname"`);
  }
}
