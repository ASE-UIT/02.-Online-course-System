import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1732536665765 implements MigrationInterface {
  name = 'Migrations1732536665765';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "payments" ADD "amount" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "payments" ADD "pay_info" jsonb NOT NULL`);
    await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_6c846a094b1989e1a202558803b"`);
    await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "student_id" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_6c846a094b1989e1a202558803b" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_6c846a094b1989e1a202558803b"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_337aa8dba227a1fe6b73998307"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_7d2dad9f14eddeb09c256fea71"`);
    await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "student_id" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_6c846a094b1989e1a202558803b" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "pay_info"`);
    await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "amount"`);
  }
}
