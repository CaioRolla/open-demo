import {MigrationInterface, QueryRunner} from "typeorm";

export class AuthAdmin1675370974443 implements MigrationInterface {
    name = 'AuthAdmin1675370974443'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`admin\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}

}
