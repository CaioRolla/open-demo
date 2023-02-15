import {MigrationInterface, QueryRunner} from "typeorm";

export class Price1664392249557 implements MigrationInterface {
    name = 'Price1664392249557'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`estimatedPrice2\` decimal(15,2) NULL`);

        await queryRunner.query(`UPDATE \`product\` as pr SET estimatedPrice2=CAST(pr.estimatedPrice AS decimal)`);

        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`estimatedPrice\``);

        await queryRunner.query(`ALTER TABLE \`product\` CHANGE COLUMN \`estimatedPrice2\` \`estimatedPrice\` decimal(15,2);`);
                
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
          }

}
