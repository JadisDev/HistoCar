import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSharesTable1743089174347 implements MigrationInterface {
    name = 'CreateSharesTable1743089174347'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "shares" (
                "id" SERIAL NOT NULL,
                "token" uuid NOT NULL,
                "password" character varying,
                "expiresAt" TIMESTAMP,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "vehicleId" uuid,
                CONSTRAINT "UQ_f51f54e33eac0d4d7ada7422cf2" UNIQUE ("token"),
                CONSTRAINT "PK_b88473409066c43c2ccb1894a82" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "shares"
            ADD CONSTRAINT "FK_16aba37b42d237be8718bad6c42" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "shares" DROP CONSTRAINT "FK_16aba37b42d237be8718bad6c42"
        `);
        await queryRunner.query(`
            DROP TABLE "shares"
        `);
    }

}
