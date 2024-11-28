import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1732535984945 implements MigrationInterface {
  name = 'Migrations1732535984945';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "orders_items" DROP CONSTRAINT "FK_b7f8b0a413882c13f2f86f51582"`);
    await queryRunner.query(`ALTER TABLE "orders_items" DROP COLUMN "student_id"`);
    await queryRunner.query(
      `CREATE TYPE "public"."orders_status_enum" AS ENUM('WAITING_FOR_PAYMENT', 'CANCELED', 'PAID', 'FAILED')`
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "status" "public"."orders_status_enum" NOT NULL DEFAULT 'WAITING_FOR_PAYMENT'`
    );
    await queryRunner.query(`ALTER TABLE "orders" ADD "student_id" uuid`);
    await queryRunner.query(`ALTER TABLE "orders_items" DROP CONSTRAINT "FK_3484e73ecd5e701e72db44294c5"`);
    await queryRunner.query(`ALTER TABLE "orders_items" ALTER COLUMN "course_id" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "orders_items" ADD CONSTRAINT "FK_3484e73ecd5e701e72db44294c5" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_6c846a094b1989e1a202558803b" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_6c846a094b1989e1a202558803b"`);
    await queryRunner.query(`ALTER TABLE "orders_items" DROP CONSTRAINT "FK_3484e73ecd5e701e72db44294c5"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_337aa8dba227a1fe6b73998307"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_7d2dad9f14eddeb09c256fea71"`);
    await queryRunner.query(`ALTER TABLE "orders_items" ALTER COLUMN "course_id" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "orders_items" ADD CONSTRAINT "FK_3484e73ecd5e701e72db44294c5" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "student_id"`);
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."orders_status_enum"`);
    await queryRunner.query(`ALTER TABLE "orders_items" ADD "student_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "orders_items" ADD CONSTRAINT "FK_b7f8b0a413882c13f2f86f51582" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
  }
}
