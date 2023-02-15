import { MigrationInterface, QueryRunner } from 'typeorm';

export class HeaderAlign1661876124768 implements MigrationInterface {
  name = 'HeaderAlign1661876124768';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`list\` ADD \`themeHeaderalign\` varchar(6) NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`list\` DROP COLUMN \`themeHeaderalign\``
    );
  }
}
