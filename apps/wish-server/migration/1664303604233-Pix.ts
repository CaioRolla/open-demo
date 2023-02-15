import { MigrationInterface, QueryRunner } from 'typeorm';

export class Pix1664303604233 implements MigrationInterface {
  name = 'Pix1664303604233';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`list\` ADD \`pix\` varchar(255) NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
