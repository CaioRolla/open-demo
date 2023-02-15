import { MigrationInterface, QueryRunner } from 'typeorm';

export class Start1661361742461 implements MigrationInterface {
  name = 'Start1661361742461';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`person\` (\`id\` varchar(36) NOT NULL,
        \`name\` varchar(255) NOT NULL,
        \`email\` varchar(255) NOT NULL,
        \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        \`deletedAt\` datetime(6) NULL,
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);

    await queryRunner.query(`CREATE TABLE \`product\` (\`id\` varchar(36) NOT NULL,
        \`name\` varchar(250) NULL,
        \`desc\` varchar(500) NULL,
        \`url\` varchar(500) NULL,
        \`status\` varchar(100) NOT NULL DEFAULT 'ACTIVE',
        \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        \`deletedAt\` datetime(6) NULL,
        \`listId\` varchar(36) NULL,
        \`personId\` varchar(36) NULL,
        \`accountId\` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL,
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);

    await queryRunner.query(`CREATE TABLE \`list\` (\`id\` varchar(36) NOT NULL,
        \`name\` varchar(255) NOT NULL,
        \`desc\` varchar(500) NULL,
        \`themeId\` varchar(100) NULL,
        \`status\` varchar(100) NOT NULL DEFAULT 'ACTIVE',
        \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        \`deletedAt\` datetime(6) NULL,
        \`accountId\` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL,
        \`profileId\` varchar(36) NULL,
        \`bannerId\` varchar(36) NULL,
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);

    await queryRunner.query(`CREATE TABLE \`product_images_asset\` (\`productId\` varchar(36) NOT NULL,
        \`assetId\` varchar(36) NOT NULL,
        INDEX \`IDX_ad2a56976d368b7dbdf937a9e9\` (\`productId\`),
        INDEX \`IDX_8656ed4b09f8bfcbfba5bff8d1\` (\`assetId\`),
        PRIMARY KEY (\`productId\`,
        \`assetId\`)) ENGINE=InnoDB`);

    await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_65fd8e32c06dbadb1dee0253476\` FOREIGN KEY (\`listId\`) REFERENCES \`list\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_0b0099b22dd922a0f3a31a6a79b\` FOREIGN KEY (\`personId\`) REFERENCES \`person\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`list\` ADD CONSTRAINT \`FK_88c79f72c97d22a6841df98554a\` FOREIGN KEY (\`accountId\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_88c79f72c97d22a6841df98554b\` FOREIGN KEY (\`accountId\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`list\` ADD CONSTRAINT \`FK_efea593506b9acc6b9655eed502\` FOREIGN KEY (\`profileId\`) REFERENCES \`asset\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`list\` ADD CONSTRAINT \`FK_cdc3dc9354d8a6b32aef66d211e\` FOREIGN KEY (\`bannerId\`) REFERENCES \`asset\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`product_images_asset\` ADD CONSTRAINT \`FK_ad2a56976d368b7dbdf937a9e9a\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE \`product_images_asset\` ADD CONSTRAINT \`FK_8656ed4b09f8bfcbfba5bff8d15\` FOREIGN KEY (\`assetId\`) REFERENCES \`asset\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    
  }

  public async down(queryRunner: QueryRunner): Promise<void> {

  }
}
