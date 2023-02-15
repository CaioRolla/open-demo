import {MigrationInterface, QueryRunner} from "typeorm";

export class ListEvent1662649903698 implements MigrationInterface {
    name = 'ListEvent1662649903698'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`list\` ADD \`eventDate\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`list\` ADD \`eventLocation\` varchar(300) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    
    }

}
