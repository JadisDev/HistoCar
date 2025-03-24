import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEventTable1742838965541 implements MigrationInterface {
    name = 'CreateEventTable1742838965541'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."events_type_enum" AS ENUM(
                'preventive_maintenance',
                'corrective_maintenance',
                'claim',
                'inspection'
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "events" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "type" "public"."events_type_enum" NOT NULL,
                "title" character varying NOT NULL,
                "description" character varying,
                "amount" numeric,
                "eventDate" date,
                "eventKm" integer,
                "garage" character varying,
                "attachmentUrl" character varying,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "vehicle_id" uuid,
                CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "events"
            ADD CONSTRAINT "FK_a1dc33e04a2cb7d1eb0261e8671" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "events" DROP CONSTRAINT "FK_a1dc33e04a2cb7d1eb0261e8671"
        `);
        await queryRunner.query(`
            DROP TABLE "events"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."events_type_enum"
        `);
    }

}
