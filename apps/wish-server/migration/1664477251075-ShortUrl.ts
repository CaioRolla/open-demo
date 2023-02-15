import {MigrationInterface, QueryRunner} from "typeorm";

export class ShortUrl1664477251075 implements MigrationInterface {
    name = 'ShortUrl1664477251075'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`list\` ADD \`shortUrl\` varchar(300) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
