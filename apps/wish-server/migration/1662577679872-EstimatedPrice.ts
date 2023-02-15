import { MigrationInterface, QueryRunner } from 'typeorm';

export class EstimatedPrice1662577679872 implements MigrationInterface {
  name = 'EstimatedPrice1662577679872';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`estimatedPrice\` bigint NOT NULL DEFAULT '0'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
