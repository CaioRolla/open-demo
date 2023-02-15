import {MigrationInterface, QueryRunner} from "typeorm";

export class KillAssetVariation1671115329477 implements MigrationInterface {
    name = 'KillAssetVariation1671115329477'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`set foreign_key_checks = 0;`);
        await queryRunner.query(`DROP TABLE \`asset_variation\``);
        await queryRunner.query(`set foreign_key_checks = 1;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}
