import {MigrationInterface, QueryRunner} from "typeorm";

export class Discussion1672402147714 implements MigrationInterface {
    name = 'Discussion1672402147714'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`set foreign_key_checks = 0;`);
        await queryRunner.query(`CREATE TABLE \`discussion\` (\`id\` varchar(36) NOT NULL, \`key\` varchar(255) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`accountId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE discussion CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;`);
        await queryRunner.query(`CREATE TABLE \`discussion_comment\` (\`id\` varchar(36) NOT NULL, \`content\` text NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`discussionId\` varchar(36) NULL, \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE discussion_comment CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;`);
        await queryRunner.query(`ALTER TABLE \`discussion\` ADD CONSTRAINT \`FK_257ef312c72b1855355551a608b\` FOREIGN KEY (\`accountId\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`discussion_comment\` ADD CONSTRAINT \`FK_77d60d730ddd76e563259c2ad55\` FOREIGN KEY (\`discussionId\`) REFERENCES \`discussion\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`discussion_comment\` ADD CONSTRAINT \`FK_a682846e7e6eebcefdb8730c7bf\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`set foreign_key_checks = 1;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}
