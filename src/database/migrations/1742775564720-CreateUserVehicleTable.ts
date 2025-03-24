import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserVehicleTable1742775564720 implements MigrationInterface {
  name = 'CreateUserVehicleTable1742775564720';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "vehicles" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "plate" character varying NOT NULL,
                "brand" character varying,
                "model" character varying,
                "year" character varying,
                "chassis" character varying,
                "currentKm" integer,
                "state" character varying,
                "city" character varying,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_18d8646b59304dce4af3a9e35b6" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."user_vehicle_role_enum" AS ENUM('owner', 'collaborator')
        `);
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "user_vehicle" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "role" "public"."user_vehicle_role_enum" NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "user_id" uuid,
                "vehicle_id" uuid,
                CONSTRAINT "PK_046f6d9cf4e4f42158438df8617" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "name"
        `);
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD "name" character varying(100) NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "phone"
        `);
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD "phone" character varying(20)
        `);
    await queryRunner.query(`
            ALTER TABLE "user_vehicle"
            ADD CONSTRAINT "FK_3fdd13c107ab4081a6b70c38eac" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "user_vehicle"
            ADD CONSTRAINT "FK_fd8b89c8c46a7a0200d03045be7" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user_vehicle" DROP CONSTRAINT "FK_fd8b89c8c46a7a0200d03045be7"
        `);
    await queryRunner.query(`
            ALTER TABLE "user_vehicle" DROP CONSTRAINT "FK_3fdd13c107ab4081a6b70c38eac"
        `);
    await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "phone"
        `);
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD "phone" character varying
        `);
    await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "name"
        `);
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD "name" character varying NOT NULL
        `);
    await queryRunner.query(`
            DROP TABLE "user_vehicle"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."user_vehicle_role_enum"
        `);
    await queryRunner.query(`
            DROP TABLE "vehicles"
        `);
  }
}
