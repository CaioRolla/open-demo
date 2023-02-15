import {MigrationInterface, QueryRunner} from "typeorm";

export class Fix1674142402319 implements MigrationInterface {
    name = 'Fix1674142402319'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`set foreign_key_checks = 0;`);
        await queryRunner.query(`CREATE TABLE \`platform_product_images_asset_2\` (\`platformProductId\` varchar(36) NOT NULL, \`assetId\` varchar(36) NOT NULL, INDEX \`IDX_11eb447a86c16a4a6a828c4ceb\` (\`platformProductId\`), INDEX \`IDX_b05ac42a6c5b01762347c29980\` (\`assetId\`), PRIMARY KEY (\`platformProductId\`, \`assetId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE platform_product_images_asset_2 CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;`);
        await queryRunner.query(`ALTER TABLE platform_product CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;`);
        await queryRunner.query(`DELETE FROM platform_product;`);
        await queryRunner.query(`ALTER TABLE \`platform_product_images_asset_2\` ADD CONSTRAINT \`FK_11eb447a86c16a4a6a828c4ceba\` FOREIGN KEY (\`platformProductId\`) REFERENCES \`platform_product\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`platform_product_images_asset_2\` ADD CONSTRAINT \`FK_b05ac42a6c5b01762347c299804\` FOREIGN KEY (\`assetId\`) REFERENCES \`asset\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`set foreign_key_checks = 0;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {    }

}
