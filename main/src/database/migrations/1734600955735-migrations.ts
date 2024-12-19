import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1734600955735 implements MigrationInterface {
  name = 'Migrations1734600955735';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "course_recommendations" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, "delete_at" TIMESTAMP, "student_id" uuid NOT NULL, "courses" text, CONSTRAINT "PK_6310367e993e4d5b86ca883ec18" PRIMARY KEY ("student_id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "course_recommendations" ADD CONSTRAINT "FK_6310367e993e4d5b86ca883ec18" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "course_recommendations" DROP CONSTRAINT "FK_6310367e993e4d5b86ca883ec18"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_337aa8dba227a1fe6b73998307"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_7d2dad9f14eddeb09c256fea71"`);
    await queryRunner.query(`DROP TABLE "course_recommendations"`);
  }
}
