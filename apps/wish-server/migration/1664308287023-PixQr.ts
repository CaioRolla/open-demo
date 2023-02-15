import { MigrationInterface, QueryRunner } from 'typeorm';

export class PixQr1664308287023 implements MigrationInterface {
  name = 'PixQr1664308287023';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`list\` ADD \`pixQr\` text NULL`);
    await queryRunner.query(`ALTER TABLE \`list\` ADD \`pixCode\` text NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
