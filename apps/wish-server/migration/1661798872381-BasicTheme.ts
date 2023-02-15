import { MigrationInterface, QueryRunner } from "typeorm";

export class BasicTheme1661798872381 implements MigrationInterface {
    name = 'BasicTheme1661798872381'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`list\` ADD \`themeBackground\` varchar(20) NULL`);
        await queryRunner.query(`ALTER TABLE \`list\` ADD \`themeColor\` varchar(20) NULL`);
        await queryRunner.query(`ALTER TABLE \`list\` DROP COLUMN \`themeId\``);
        await queryRunner.query(`ALTER TABLE \`list\` ADD \`themeId\` varchar(36) NOT NULL DEFAULT 'basic'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`list\` DROP COLUMN \`themeId\``);
        await queryRunner.query(`ALTER TABLE \`list\` ADD \`themeId\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`list\` DROP COLUMN \`themeColor\``);
        await queryRunner.query(`ALTER TABLE \`list\` DROP COLUMN \`themeBackground\``);
    }

}
