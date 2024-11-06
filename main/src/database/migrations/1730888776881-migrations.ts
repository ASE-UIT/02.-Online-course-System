import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1730888776881 implements MigrationInterface {
  name = 'Migrations1730888776881';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "course_ratings" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, "delete_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "course_id" uuid NOT NULL, "rating_point" integer, "comment" character varying, "student_id" uuid NOT NULL, "liked" integer NOT NULL DEFAULT '0', "unliked" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_ea1fcdbcda76cdeb72ea8cf4530" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "course_ratings" ADD CONSTRAINT "FK_32b68ae69d8fb9200a854d6b331" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "course_ratings" ADD CONSTRAINT "FK_4a29f927ecdb55acc334e8dae1d" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "roles_permissions" DROP CONSTRAINT "FK_337aa8dba227a1fe6b73998307b"`);
    await queryRunner.query(`ALTER TABLE "roles_permissions" DROP CONSTRAINT "FK_7d2dad9f14eddeb09c256fea719"`);
    await queryRunner.query(`ALTER TABLE "course_ratings" DROP CONSTRAINT "FK_4a29f927ecdb55acc334e8dae1d"`);
    await queryRunner.query(`ALTER TABLE "course_ratings" DROP CONSTRAINT "FK_32b68ae69d8fb9200a854d6b331"`);
    await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "FK_0a8f2564b9524637d2bd0fca0cb"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_337aa8dba227a1fe6b73998307"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_7d2dad9f14eddeb09c256fea71"`);
    await queryRunner.query(`ALTER TABLE "roles_permissions" DROP CONSTRAINT "PK_0cd11f0b35c4d348c6ebb9b36b7"`);
    await queryRunner.query(
      `ALTER TABLE "roles_permissions" ADD CONSTRAINT "PK_7d2dad9f14eddeb09c256fea719" PRIMARY KEY ("role_id")`
    );
    await queryRunner.query(`ALTER TABLE "roles_permissions" DROP COLUMN "permission_id"`);
    await queryRunner.query(`ALTER TABLE "roles_permissions" ADD "permission_id" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "roles_permissions" DROP CONSTRAINT "PK_7d2dad9f14eddeb09c256fea719"`);
    await queryRunner.query(
      `ALTER TABLE "roles_permissions" ADD CONSTRAINT "PK_0cd11f0b35c4d348c6ebb9b36b7" PRIMARY KEY ("permission_id", "role_id")`
    );
    await queryRunner.query(`ALTER TABLE "roles_permissions" DROP CONSTRAINT "PK_0cd11f0b35c4d348c6ebb9b36b7"`);
    await queryRunner.query(
      `ALTER TABLE "roles_permissions" ADD CONSTRAINT "PK_337aa8dba227a1fe6b73998307b" PRIMARY KEY ("permission_id")`
    );
    await queryRunner.query(`ALTER TABLE "roles_permissions" DROP COLUMN "role_id"`);
    await queryRunner.query(`ALTER TABLE "roles_permissions" ADD "role_id" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "roles_permissions" DROP CONSTRAINT "PK_337aa8dba227a1fe6b73998307b"`);
    await queryRunner.query(
      `ALTER TABLE "roles_permissions" ADD CONSTRAINT "PK_0cd11f0b35c4d348c6ebb9b36b7" PRIMARY KEY ("role_id", "permission_id")`
    );
    await queryRunner.query(`ALTER TABLE "roles_permissions" DROP CONSTRAINT "PK_0cd11f0b35c4d348c6ebb9b36b7"`);
    await queryRunner.query(
      `ALTER TABLE "roles_permissions" ADD CONSTRAINT "PK_7d2dad9f14eddeb09c256fea719" PRIMARY KEY ("role_id")`
    );
    await queryRunner.query(`ALTER TABLE "roles_permissions" DROP COLUMN "permission_id"`);
    await queryRunner.query(`ALTER TABLE "roles_permissions" ADD "permission_id" character varying(40) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "roles_permissions" DROP CONSTRAINT "PK_7d2dad9f14eddeb09c256fea719"`);
    await queryRunner.query(
      `ALTER TABLE "roles_permissions" ADD CONSTRAINT "PK_0cd11f0b35c4d348c6ebb9b36b7" PRIMARY KEY ("permission_id", "role_id")`
    );
    await queryRunner.query(`ALTER TABLE "roles_permissions" DROP CONSTRAINT "PK_0cd11f0b35c4d348c6ebb9b36b7"`);
    await queryRunner.query(
      `ALTER TABLE "roles_permissions" ADD CONSTRAINT "PK_337aa8dba227a1fe6b73998307b" PRIMARY KEY ("permission_id")`
    );
    await queryRunner.query(`ALTER TABLE "roles_permissions" DROP COLUMN "role_id"`);
    await queryRunner.query(`ALTER TABLE "roles_permissions" ADD "role_id" character varying(40) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "roles_permissions" DROP CONSTRAINT "PK_337aa8dba227a1fe6b73998307b"`);
    await queryRunner.query(
      `ALTER TABLE "roles_permissions" ADD CONSTRAINT "PK_0cd11f0b35c4d348c6ebb9b36b7" PRIMARY KEY ("role_id", "permission_id")`
    );
    await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "UQ_0a8f2564b9524637d2bd0fca0cb"`);
    await queryRunner.query(`ALTER TABLE "carts" ALTER COLUMN "student_id" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "carts" ADD CONSTRAINT "FK_0a8f2564b9524637d2bd0fca0cb" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE "roles_permissions" DROP COLUMN "delete_at"`);
    await queryRunner.query(`ALTER TABLE "roles_permissions" DROP COLUMN "update_by"`);
    await queryRunner.query(`ALTER TABLE "roles_permissions" DROP COLUMN "create_by"`);
    await queryRunner.query(`ALTER TABLE "roles_permissions" DROP COLUMN "update_at"`);
    await queryRunner.query(`ALTER TABLE "roles_permissions" DROP COLUMN "create_at"`);
    await queryRunner.query(`ALTER TABLE "roles_permissions" ADD "update_by" character varying`);
    await queryRunner.query(`ALTER TABLE "roles_permissions" ADD "create_by" character varying`);
    await queryRunner.query(`ALTER TABLE "roles_permissions" ADD "create_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "roles_permissions" ADD "delete_at" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "roles_permissions" ADD "update_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`DROP TABLE "course_ratings"`);
    await queryRunner.query(`CREATE INDEX "IDX_337aa8dba227a1fe6b73998307" ON "roles_permissions" ("permission_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_7d2dad9f14eddeb09c256fea71" ON "roles_permissions" ("role_id") `);
    await queryRunner.query(
      `ALTER TABLE "roles_permissions" ADD CONSTRAINT "FK_7d2dad9f14eddeb09c256fea719" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "roles_permissions" ADD CONSTRAINT "FK_337aa8dba227a1fe6b73998307b" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
