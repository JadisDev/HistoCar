import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateVehicleTable1742771398178 implements MigrationInterface {
  name = 'CreateVehicleTable1742771398178';

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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
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
            DROP TABLE "vehicles"
        `);
  }
}
