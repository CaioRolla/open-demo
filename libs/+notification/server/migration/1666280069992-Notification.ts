import {MigrationInterface, QueryRunner} from "typeorm";

export class Notification1666280069992 implements MigrationInterface {
    name = 'Notification1666280069992'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`set foreign_key_checks = 0;`);
        await queryRunner.query(`CREATE TABLE \`notification\` (\`id\` varchar(36) NOT NULL, \`type\` varchar(25) NOT NULL DEFAULT 'SIMPLE', \`viewed\` tinyint(4) NOT NULL DEFAULT '0', \`title\` varchar(255) NOT NULL, \`desc\` varchar(500) NULL, \`url\` varchar(500) NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`userId\` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_1ced25315eb974b73391fb1c81b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE notification CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;`);
        await queryRunner.query(`set foreign_key_checks = 1;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}
