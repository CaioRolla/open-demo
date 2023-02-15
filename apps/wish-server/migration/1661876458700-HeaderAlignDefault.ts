import { MigrationInterface, QueryRunner } from 'typeorm';

export class HeaderAlignDefault1661876458700 implements MigrationInterface {
  name = 'HeaderAlignDefault1661876458700';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`list\` CHANGE \`themeHeaderalign\` \`themeHeaderalign\` varchar(6) NULL DEFAULT 'CENTER'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
