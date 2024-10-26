import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1727859772434 implements MigrationInterface {
  name = 'Migrations1727859772434';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "roles_permissions" DROP CONSTRAINT "FK_337aa8dba227a1fe6b73998307b"`);
    await queryRunner.query(`ALTER TABLE "roles_permissions" DROP CONSTRAINT "FK_7d2dad9f14eddeb09c256fea719"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_7d2dad9f14eddeb09c256fea71"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_337aa8dba227a1fe6b73998307"`);
    await queryRunner.query(`ALTER TABLE "lecturers" DROP COLUMN "login_type"`);
    await queryRunner.query(`DROP TYPE "public"."lecturers_login_type_enum"`);
    await queryRunner.query(`ALTER TABLE "roles_permissions" DROP COLUMN "update_at"`);
    await queryRunner.query(`ALTER TABLE "roles_permissions" DROP COLUMN "create_at"`);
    await queryRunner.query(`ALTER TABLE "roles_permissions" DROP COLUMN "delete_at"`);
    await queryRunner.query(`ALTER TABLE "roles_permissions" DROP COLUMN "create_by"`);
    await queryRunner.query(`ALTER TABLE "roles_permissions" DROP COLUMN "update_by"`);
    await queryRunner.query(`ALTER TABLE "lecturers" ADD "isApproved" boolean NOT NULL DEFAULT false`);
    await queryRunner.query(`ALTER TABLE "roles_permissions" ADD "create_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "roles_permissions" ADD "update_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "roles_permissions" ADD "create_by" character varying`);
    await queryRunner.query(`ALTER TABLE "roles_permissions" ADD "update_by" character varying`);
    await queryRunner.query(`ALTER TABLE "roles_permissions" ADD "delete_at" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "lecturers" ADD CONSTRAINT "UQ_3bf0b8dac54e0e07b5c3078f52d" UNIQUE ("email")`);
    await queryRunner.query(
      `ALTER TABLE "lecturers" ADD CONSTRAINT "UQ_59e50bc884350d532a8db289aa8" UNIQUE ("phone_number")`
    );
    await queryRunner.query(`ALTER TABLE "roles_permissions" DROP CONSTRAINT "PK_0cd11f0b35c4d348c6ebb9b36b7"`);
    await queryRunner.query(
      `ALTER TABLE "roles_permissions" ADD CONSTRAINT "PK_337aa8dba227a1fe6b73998307b" PRIMARY KEY ("permission_id")`
    );
    await queryRunner.query(`ALTER TABLE "roles_permissions" DROP COLUMN "role_id"`);
    await queryRunner.query(`ALTER TABLE "roles_permissions" ADD "role_id" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "roles_permissions" DROP CONSTRAINT "PK_337aa8dba227a1fe6b73998307b"`);
    await queryRunner.query(
      `ALTER TABLE "roles_permissions" ADD CONSTRAINT "PK_0cd11f0b35c4d348c6ebb9b36b7" PRIMARY KEY ("permission_id", "role_id")`
    );
    await queryRunner.query(`ALTER TABLE "roles_permissions" DROP CONSTRAINT "PK_0cd11f0b35c4d348c6ebb9b36b7"`);
    await queryRunner.query(
      `ALTER TABLE "roles_permissions" ADD CONSTRAINT "PK_7d2dad9f14eddeb09c256fea719" PRIMARY KEY ("role_id")`
    );
    await queryRunner.query(`ALTER TABLE "roles_permissions" DROP COLUMN "permission_id"`);
    await queryRunner.query(`ALTER TABLE "roles_permissions" ADD "permission_id" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "roles_permissions" DROP CONSTRAINT "PK_7d2dad9f14eddeb09c256fea719"`);
    await queryRunner.query(
      `ALTER TABLE "roles_permissions" ADD CONSTRAINT "PK_0cd11f0b35c4d348c6ebb9b36b7" PRIMARY KEY ("role_id", "permission_id")`
    );
    await queryRunner.query(`ALTER TABLE "roles_permissions" DROP CONSTRAINT "PK_0cd11f0b35c4d348c6ebb9b36b7"`);
    await queryRunner.query(
      `ALTER TABLE "roles_permissions" ADD CONSTRAINT "PK_337aa8dba227a1fe6b73998307b" PRIMARY KEY ("permission_id")`
    );
    await queryRunner.query(`ALTER TABLE "roles_permissions" DROP COLUMN "role_id"`);
    await queryRunner.query(`ALTER TABLE "roles_permissions" ADD "role_id" character varying(40) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "roles_permissions" DROP CONSTRAINT "PK_337aa8dba227a1fe6b73998307b"`);
    await queryRunner.query(
      `ALTER TABLE "roles_permissions" ADD CONSTRAINT "PK_0cd11f0b35c4d348c6ebb9b36b7" PRIMARY KEY ("permission_id", "role_id")`
    );
    await queryRunner.query(`ALTER TABLE "roles_permissions" DROP CONSTRAINT "PK_0cd11f0b35c4d348c6ebb9b36b7"`);
    await queryRunner.query(
      `ALTER TABLE "roles_permissions" ADD CONSTRAINT "PK_7d2dad9f14eddeb09c256fea719" PRIMARY KEY ("role_id")`
    );
    await queryRunner.query(`ALTER TABLE "roles_permissions" DROP COLUMN "permission_id"`);
    await queryRunner.query(`ALTER TABLE "roles_permissions" ADD "permission_id" character varying(40) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "roles_permissions" DROP CONSTRAINT "PK_7d2dad9f14eddeb09c256fea719"`);
    await queryRunner.query(
      `ALTER TABLE "roles_permissions" ADD CONSTRAINT "PK_0cd11f0b35c4d348c6ebb9b36b7" PRIMARY KEY ("role_id", "permission_id")`
    );
    await queryRunner.query(`CREATE INDEX "IDX_7d2dad9f14eddeb09c256fea71" ON "roles_permissions" ("role_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_337aa8dba227a1fe6b73998307" ON "roles_permissions" ("permission_id") `);
    await queryRunner.query(
      `ALTER TABLE "roles_permissions" ADD CONSTRAINT "FK_7d2dad9f14eddeb09c256fea719" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "roles_permissions" ADD CONSTRAINT "FK_337aa8dba227a1fe6b73998307b" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "roles_permissions" DROP CONSTRAINT "FK_337aa8dba227a1fe6b73998307b"`);
    await queryRunner.query(`ALTER TABLE "roles_permissions" DROP CONSTRAINT "FK_7d2dad9f14eddeb09c256fea719"`);
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
    await queryRunner.query(`ALTER TABLE "lecturers" DROP CONSTRAINT "UQ_59e50bc884350d532a8db289aa8"`);
    await queryRunner.query(`ALTER TABLE "lecturers" DROP CONSTRAINT "UQ_3bf0b8dac54e0e07b5c3078f52d"`);
    await queryRunner.query(`ALTER TABLE "roles_permissions" DROP COLUMN "delete_at"`);
    await queryRunner.query(`ALTER TABLE "roles_permissions" DROP COLUMN "update_by"`);
    await queryRunner.query(`ALTER TABLE "roles_permissions" DROP COLUMN "create_by"`);
    await queryRunner.query(`ALTER TABLE "roles_permissions" DROP COLUMN "update_at"`);
    await queryRunner.query(`ALTER TABLE "roles_permissions" DROP COLUMN "create_at"`);
    await queryRunner.query(`ALTER TABLE "lecturers" DROP COLUMN "isApproved"`);
    await queryRunner.query(`ALTER TABLE "roles_permissions" ADD "update_by" character varying`);
    await queryRunner.query(`ALTER TABLE "roles_permissions" ADD "create_by" character varying`);
    await queryRunner.query(`ALTER TABLE "roles_permissions" ADD "delete_at" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "roles_permissions" ADD "create_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "roles_permissions" ADD "update_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`CREATE TYPE "public"."lecturers_login_type_enum" AS ENUM('email', 'phone_number')`);
    await queryRunner.query(
      `ALTER TABLE "lecturers" ADD "login_type" "public"."lecturers_login_type_enum" NOT NULL DEFAULT 'email'`
    );
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
