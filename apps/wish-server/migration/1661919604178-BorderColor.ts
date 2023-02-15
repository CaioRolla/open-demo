import {MigrationInterface, QueryRunner} from "typeorm";

export class BorderColor1661919604178 implements MigrationInterface {
    name = 'BorderColor1661919604178'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`list\` ADD \`themeBordercolor\` varchar(20) NULL DEFAULT '#F3F4F6'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`list\` DROP COLUMN \`themeBordercolor\``);
    }

}
