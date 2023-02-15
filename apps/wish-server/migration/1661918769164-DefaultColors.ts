import { MigrationInterface, QueryRunner } from 'typeorm';

export class DefaultColors1661918769164 implements MigrationInterface {
  name = 'DefaultColors1661918769164';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`list\` CHANGE \`themeBackground\` \`themeBackground\` varchar(20) NULL DEFAULT '#fff'`
    );
    await queryRunner.query(
      `ALTER TABLE \`list\` CHANGE \`themeColor\` \`themeColor\` varchar(20) NULL DEFAULT '#1F2937'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
