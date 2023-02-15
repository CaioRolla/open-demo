import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveHeaderAlign1662056724953 implements MigrationInterface {
    name = 'RemoveHeaderAlign1662056724953'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`list\` DROP COLUMN \`themeHeaderalign\``);
        await queryRunner.query(`ALTER TABLE \`list\` CHANGE \`themeBordercolor\` \`themeBordercolor\` varchar(20) NULL DEFAULT '#F3F4F6'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       
    }

}
