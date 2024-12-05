import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1733386810153 implements MigrationInterface {
  name = 'Migrations1733386810153';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_5b3e94bd2aedc184f9ad8c10439"`);
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "UQ_5b3e94bd2aedc184f9ad8c10439" UNIQUE ("payment_id")`
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_5b3e94bd2aedc184f9ad8c10439" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_5b3e94bd2aedc184f9ad8c10439"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_337aa8dba227a1fe6b73998307"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_7d2dad9f14eddeb09c256fea71"`);
    await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "UQ_5b3e94bd2aedc184f9ad8c10439"`);
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_5b3e94bd2aedc184f9ad8c10439" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
  }
}
