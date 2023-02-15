import { MigrationInterface, QueryRunner } from 'typeorm';

export class PlatformProductLoad1664552699528 implements MigrationInterface {
  name = 'PlatformProductLoad1664552699528';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO platform_product
        SELECT 
        id, name,\`desc\`, url,estimatedPrice, status, createdAt, updatedAt, deletedAt
        FROM product 
        WHERE
        SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(url, '/', 3), '://', -1), '/', 1), '?', 1) = "www.amazon.com.br"
        AND estimatedPrice IS NOT NULL
        AND deletedAt IS NULL
        GROUP BY url;`);

    await queryRunner.query(`
        INSERT INTO platform_product_images_asset
        SELECT productId as platformProductId, assetId
        FROM product_images_asset
        WHERE productId IN (SELECT id FROM platform_product);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
