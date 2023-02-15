import {MigrationInterface, QueryRunner} from "typeorm";

export class BannerAndProfileFix1665162317132 implements MigrationInterface {
    name = 'BannerAndProfileFix1665162317132'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`set foreign_key_checks = 0;`);
        await queryRunner.query(`ALTER TABLE asset CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;`);
        await queryRunner.query(`ALTER TABLE asset_variation CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;`);
        await queryRunner.query(`set foreign_key_checks = 1;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}
