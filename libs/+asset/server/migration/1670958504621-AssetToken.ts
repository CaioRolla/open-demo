import {MigrationInterface, QueryRunner} from "typeorm";

export class AssetToken1670958504621 implements MigrationInterface {
    name = 'AssetToken1670958504621'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`asset\` ADD \`token\` varchar(36) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}
