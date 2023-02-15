import {MigrationInterface, QueryRunner} from "typeorm";

export class UserProfile1666382014964 implements MigrationInterface {
    name = 'UserProfile1666382014964'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`set foreign_key_checks = 0;`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`profileId\` varchar(36) COLLATE utf8mb4_bin NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;`);
        await queryRunner.query(`ALTER TABLE \`asset\` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_9466682df91534dd95e4dbaa616\` FOREIGN KEY (\`profileId\`) REFERENCES \`asset\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`set foreign_key_checks = 1;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
