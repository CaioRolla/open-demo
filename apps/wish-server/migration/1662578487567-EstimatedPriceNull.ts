import {MigrationInterface, QueryRunner} from "typeorm";

export class EstimatedPriceNull1662578487567 implements MigrationInterface {
    name = 'EstimatedPriceNull1662578487567'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`estimatedPrice\` \`estimatedPrice\` bigint NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}
