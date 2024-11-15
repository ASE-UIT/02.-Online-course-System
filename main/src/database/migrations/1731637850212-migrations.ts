import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1731637850212 implements MigrationInterface {
  name = 'Migrations1731637850212';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "lessons" DROP CONSTRAINT "FK_3c4e299cf8ed04093935e2e22fe"`);
    await queryRunner.query(`ALTER TABLE "quizzes" DROP CONSTRAINT "FK_2cf4e4b5b533af8dc6b38d4fa9b"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_7d2dad9f14eddeb09c256fea71"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_337aa8dba227a1fe6b73998307"`);
    await queryRunner.query(
      `CREATE TABLE "lesson_parts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "part_no" integer NOT NULL, "part_name" character varying(100) NOT NULL, "course_id" uuid NOT NULL, CONSTRAINT "PK_7a720f7f225001dcb713c013cdd" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`ALTER TABLE "lessons" DROP COLUMN "course_id"`);
    await queryRunner.query(`ALTER TABLE "lessons" DROP COLUMN "parti_no"`);
    await queryRunner.query(`ALTER TABLE "lessons" DROP COLUMN "part_name"`);
    await queryRunner.query(`ALTER TABLE "quizzes" DROP COLUMN "correct_choice"`);
    await queryRunner.query(`DROP TYPE "public"."quizzes_correct_choice_enum"`);
    await queryRunner.query(`ALTER TABLE "quizzes" DROP COLUMN "lesson_id"`);
    await queryRunner.query(`ALTER TABLE "lessons" ADD "lesson_part_id" uuid`);
    await queryRunner.query(`ALTER TABLE "quizzes" ADD "order" integer NOT NULL DEFAULT '1'`);
    await queryRunner.query(`ALTER TABLE "quizzes" ADD "explanation" text`);
    await queryRunner.query(`ALTER TABLE "quizzes" ADD "correct_choices" text`);
    await queryRunner.query(`ALTER TABLE "quizzes" ADD "lesson_part_id" uuid`);
    await queryRunner.query(`ALTER TABLE "quizzes" ALTER COLUMN "choice_a" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "quizzes" ALTER COLUMN "choice_b" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "quizzes" ALTER COLUMN "choice_c" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "quizzes" ALTER COLUMN "choice_d" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "FK_0a8f2564b9524637d2bd0fca0cb"`);
    await queryRunner.query(`ALTER TABLE "carts" ALTER COLUMN "student_id" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "carts" ADD CONSTRAINT "UQ_0a8f2564b9524637d2bd0fca0cb" UNIQUE ("student_id")`
    );

    await queryRunner.query(
      `ALTER TABLE "lessons" ADD CONSTRAINT "FK_1a31f0838f4afc7f678e011873f" FOREIGN KEY ("lesson_part_id") REFERENCES "lesson_parts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "quizzes" ADD CONSTRAINT "FK_5322dcee0b05335d74a46b72cfc" FOREIGN KEY ("lesson_part_id") REFERENCES "lesson_parts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_parts" ADD CONSTRAINT "FK_8d1aa6f6e5e12cd5e1423532b4c" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "carts" ADD CONSTRAINT "FK_0a8f2564b9524637d2bd0fca0cb" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "FK_0a8f2564b9524637d2bd0fca0cb"`);
    await queryRunner.query(`ALTER TABLE "lesson_parts" DROP CONSTRAINT "FK_8d1aa6f6e5e12cd5e1423532b4c"`);
    await queryRunner.query(`ALTER TABLE "quizzes" DROP CONSTRAINT "FK_5322dcee0b05335d74a46b72cfc"`);
    await queryRunner.query(`ALTER TABLE "lessons" DROP CONSTRAINT "FK_1a31f0838f4afc7f678e011873f"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_337aa8dba227a1fe6b73998307"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_7d2dad9f14eddeb09c256fea71"`);

    await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "UQ_0a8f2564b9524637d2bd0fca0cb"`);
    await queryRunner.query(`ALTER TABLE "carts" ALTER COLUMN "student_id" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "carts" ADD CONSTRAINT "FK_0a8f2564b9524637d2bd0fca0cb" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE "quizzes" ALTER COLUMN "choice_d" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "quizzes" ALTER COLUMN "choice_c" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "quizzes" ALTER COLUMN "choice_b" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "quizzes" ALTER COLUMN "choice_a" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "quizzes" DROP COLUMN "lesson_part_id"`);
    await queryRunner.query(`ALTER TABLE "quizzes" DROP COLUMN "correct_choices"`);
    await queryRunner.query(`ALTER TABLE "quizzes" DROP COLUMN "explanation"`);
    await queryRunner.query(`ALTER TABLE "quizzes" DROP COLUMN "order"`);
    await queryRunner.query(`ALTER TABLE "lessons" DROP COLUMN "lesson_part_id"`);
    await queryRunner.query(`ALTER TABLE "quizzes" ADD "lesson_id" uuid`);
    await queryRunner.query(`CREATE TYPE "public"."quizzes_correct_choice_enum" AS ENUM('A', 'B', 'C', 'D')`);
    await queryRunner.query(
      `ALTER TABLE "quizzes" ADD "correct_choice" "public"."quizzes_correct_choice_enum" NOT NULL DEFAULT 'A'`
    );
    await queryRunner.query(`ALTER TABLE "lessons" ADD "part_name" character varying`);
    await queryRunner.query(`ALTER TABLE "lessons" ADD "parti_no" integer`);
    await queryRunner.query(`ALTER TABLE "lessons" ADD "course_id" uuid`);
    await queryRunner.query(`DROP TABLE "lesson_parts"`);
    await queryRunner.query(
      `ALTER TABLE "quizzes" ADD CONSTRAINT "FK_2cf4e4b5b533af8dc6b38d4fa9b" FOREIGN KEY ("lesson_id") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "lessons" ADD CONSTRAINT "FK_3c4e299cf8ed04093935e2e22fe" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }
}
