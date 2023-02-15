import { MigrationInterface, QueryRunner } from "typeorm";

export class Asset1661361235644 implements MigrationInterface {
  name = "Asset1661361235644";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`set foreign_key_checks = 0;`);

    await queryRunner.query(`CREATE TABLE \`asset_variation\` (\`id\` varchar(36) NOT NULL,
        \`key\` varchar(500) NOT NULL,
        \`url\` varchar(500) NOT NULL,
        \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        \`deletedAt\` datetime(6) NULL,
        \`assetId\` varchar(36) NULL,
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);

    await queryRunner.query(`CREATE TABLE \`asset\` (\`id\` varchar(36) NOT NULL,
        \`url\` varchar(500) NULL,
        \`originalname\` varchar(500) NOT NULL,
        \`mimeType\` varchar(500) NOT NULL,
        \`size\` int NOT NULL,
        \`orderIndex\` int NOT NULL DEFAULT '0', \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        \`deletedAt\` datetime(6) NULL,
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);

    await queryRunner.query(`ALTER TABLE \`asset_variation\` ADD CONSTRAINT \`FK_edb8adeea37fb1516e736043de9\` FOREIGN KEY (\`assetId\`) REFERENCES \`asset\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);

    await queryRunner.query(`set foreign_key_checks = 1;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {

  }
}
