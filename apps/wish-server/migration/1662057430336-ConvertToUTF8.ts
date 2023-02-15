import {MigrationInterface, QueryRunner} from "typeorm";

export class ConvertToUTF81662057430336 implements MigrationInterface {
    name = 'ConvertToUTF81662057430336'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`set foreign_key_checks = 0;`);
        await queryRunner.query(`ALTER TABLE list CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;`);
        await queryRunner.query(`ALTER TABLE product CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;`);
        await queryRunner.query(`ALTER TABLE person CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;`);
        await queryRunner.query(`ALTER TABLE account CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;`);
        await queryRunner.query(`ALTER TABLE user CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;`);
        await queryRunner.query(`set foreign_key_checks = 1;`);
    
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}
