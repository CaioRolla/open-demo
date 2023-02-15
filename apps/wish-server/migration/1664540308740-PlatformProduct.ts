import {MigrationInterface, QueryRunner} from "typeorm";

export class PlatformProduct1664540308740 implements MigrationInterface {
    name = 'PlatformProduct1664540308740'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`platform_product\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(250) NULL, \`desc\` varchar(500) NULL, \`url\` varchar(500) NULL, \`estimatedPrice\` decimal(15,2) NULL, \`status\` varchar(100) NOT NULL DEFAULT 'ACTIVE', \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`platform_product_images_asset\` (\`platformProductId\` varchar(36) NOT NULL, \`assetId\` varchar(36) NOT NULL, INDEX \`IDX_b4ccfbb7433dc5727edac1feb8\` (\`platformProductId\`), INDEX \`IDX_e0703d7d73246e6a35c26d55c7\` (\`assetId\`), PRIMARY KEY (\`platformProductId\`, \`assetId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`platform_product_images_asset\` ADD CONSTRAINT \`FK_b4ccfbb7433dc5727edac1feb8f\` FOREIGN KEY (\`platformProductId\`) REFERENCES \`platform_product\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`platform_product_images_asset\` ADD CONSTRAINT \`FK_e0703d7d73246e6a35c26d55c7c\` FOREIGN KEY (\`assetId\`) REFERENCES \`asset\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}
