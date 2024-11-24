import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1732433056501 implements MigrationInterface {
  name = 'Migrations1732433056501';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."notification_role_enum" AS ENUM('TECHNICAL_ADMIN', 'HELP_DESK', 'MANAGEMENT_ADMIN', 'BLD', 'CRM', 'HRM', 'ACCOUNTANT', 'STUDENT', 'LECTURER')`
    );
    await queryRunner.query(
      `CREATE TABLE "notification" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, "delete_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" text, "title" character varying(100), "isRead" boolean NOT NULL DEFAULT false, "user_id" character varying, "role" "public"."notification_role_enum" NOT NULL DEFAULT 'STUDENT', "notiType" character varying(100) NOT NULL, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_337aa8dba227a1fe6b73998307"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_7d2dad9f14eddeb09c256fea71"`);
    await queryRunner.query(`DROP TABLE "notification"`);
    await queryRunner.query(`DROP TYPE "public"."notification_role_enum"`);
  }
}
