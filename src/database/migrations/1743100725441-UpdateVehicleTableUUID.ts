import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateVehicleTableUUID1743100725441 implements MigrationInterface {
    name = 'UpdateVehicleTableUUID1743100725441'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "shares" DROP CONSTRAINT "FK_16aba37b42d237be8718bad6c42"
        `);
        await queryRunner.query(`
            ALTER TABLE "shares" DROP CONSTRAINT "PK_b88473409066c43c2ccb1894a82"
        `);
        await queryRunner.query(`
            ALTER TABLE "shares" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "shares"
            ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()
        `);
        await queryRunner.query(`
            ALTER TABLE "shares"
            ADD CONSTRAINT "PK_b88473409066c43c2ccb1894a82" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "shares"
            ADD CONSTRAINT "FK_16aba37b42d237be8718bad6c42" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "shares" DROP CONSTRAINT "FK_16aba37b42d237be8718bad6c42"
        `);
        await queryRunner.query(`
            ALTER TABLE "shares" DROP CONSTRAINT "PK_b88473409066c43c2ccb1894a82"
        `);
        await queryRunner.query(`
            ALTER TABLE "shares" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "shares"
            ADD "id" SERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "shares"
            ADD CONSTRAINT "PK_b88473409066c43c2ccb1894a82" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "shares"
            ADD CONSTRAINT "FK_16aba37b42d237be8718bad6c42" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

}
