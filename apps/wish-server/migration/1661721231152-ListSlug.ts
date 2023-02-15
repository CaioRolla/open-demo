import { MigrationInterface, QueryRunner } from 'typeorm';

export class ListSlug1661721231152 implements MigrationInterface {
  name = 'ListSlug1661721231152';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`list\` ADD \`slug\` varchar(300) NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
