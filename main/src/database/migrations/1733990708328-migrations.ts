import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1733990708328 implements MigrationInterface {
  name = 'Migrations1733990708328';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "enrollments" DROP CONSTRAINT "PK_1566a16b6323a3e3ade31a02c9b"`);
    await queryRunner.query(
      `ALTER TABLE "enrollments" ADD CONSTRAINT "PK_60dd0ae4e21002e63a5fdefeec8" PRIMARY KEY ("courseId")`
    );
    await queryRunner.query(`ALTER TABLE "enrollments" DROP COLUMN "studentId"`);
    await queryRunner.query(`ALTER TABLE "enrollments" DROP CONSTRAINT "PK_60dd0ae4e21002e63a5fdefeec8"`);
    await queryRunner.query(`ALTER TABLE "enrollments" DROP COLUMN "courseId"`);
    await queryRunner.query(
      `ALTER TABLE "enrollments" ADD CONSTRAINT "PK_850389020f5faddd405e2792634" PRIMARY KEY ("student_id", "course_id")`
    );
    await queryRunner.query(`ALTER TABLE "enrollments" DROP CONSTRAINT "FK_307813fe255896d6ebf3e6cd55c"`);
    await queryRunner.query(`ALTER TABLE "enrollments" DROP CONSTRAINT "FK_b79d0bf01779fdf9cfb6b092af3"`);
    await queryRunner.query(`ALTER TABLE "enrollments" ALTER COLUMN "student_id" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "enrollments" ALTER COLUMN "course_id" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "enrollments" ADD CONSTRAINT "FK_307813fe255896d6ebf3e6cd55c" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "enrollments" ADD CONSTRAINT "FK_b79d0bf01779fdf9cfb6b092af3" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "enrollments" DROP CONSTRAINT "FK_b79d0bf01779fdf9cfb6b092af3"`);
    await queryRunner.query(`ALTER TABLE "enrollments" DROP CONSTRAINT "FK_307813fe255896d6ebf3e6cd55c"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_337aa8dba227a1fe6b73998307"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_7d2dad9f14eddeb09c256fea71"`);
    await queryRunner.query(`ALTER TABLE "enrollments" ALTER COLUMN "course_id" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "enrollments" ALTER COLUMN "student_id" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "enrollments" ADD CONSTRAINT "FK_b79d0bf01779fdf9cfb6b092af3" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "enrollments" ADD CONSTRAINT "FK_307813fe255896d6ebf3e6cd55c" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE "enrollments" DROP CONSTRAINT "PK_850389020f5faddd405e2792634"`);
    await queryRunner.query(`ALTER TABLE "enrollments" ADD "courseId" character varying NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "enrollments" ADD CONSTRAINT "PK_60dd0ae4e21002e63a5fdefeec8" PRIMARY KEY ("courseId")`
    );
    await queryRunner.query(`ALTER TABLE "enrollments" ADD "studentId" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "enrollments" DROP CONSTRAINT "PK_60dd0ae4e21002e63a5fdefeec8"`);
    await queryRunner.query(
      `ALTER TABLE "enrollments" ADD CONSTRAINT "PK_1566a16b6323a3e3ade31a02c9b" PRIMARY KEY ("studentId", "courseId")`
    );
  }
}
