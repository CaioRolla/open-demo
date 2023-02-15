import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixCollate1674415463476 implements MigrationInterface {
  name = 'FixCollate1674415463476';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`set foreign_key_checks = 0;`);

    await queryRunner.query(`ALTER TABLE invite CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;`);

    await queryRunner.query(`set foreign_key_checks =1;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
