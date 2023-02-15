import { MigrationInterface, QueryRunner } from 'typeorm';

export class Auth1653961868017 implements MigrationInterface {
  name = 'Auth1653961868016';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`set foreign_key_checks = 0;`);

    // Create account!
    await queryRunner.query(`CREATE TABLE \`account\` (
            \`id\` varchar(36) COLLATE utf8mb4_bin NOT NULL,
            \`status\` varchar(100) COLLATE utf8mb4_bin NOT NULL,
            \`plan\` varchar(100) COLLATE utf8mb4_bin NOT NULL,
            \`planType\` varchar(100) COLLATE utf8mb4_bin DEFAULT NULL,
            \`stripeSubscriptionId\` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
            \`stripeCustomerId\` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
            \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
            \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
            \`deletedAt\` datetime(6) DEFAULT NULL,
            PRIMARY KEY (\`id\`)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;`);

    // Create user!
    await queryRunner.query(`CREATE TABLE \`user\` (
        \`id\` varchar(36) COLLATE utf8mb4_bin NOT NULL,
        \`apiKey\` varchar(36) COLLATE utf8mb4_bin NOT NULL,
        \`email\` varchar(320) COLLATE utf8mb4_bin DEFAULT NULL,
        \`permissions\` text COLLATE utf8mb4_bin NOT NULL,
        \`displayName\` varchar(500) COLLATE utf8mb4_bin NOT NULL,
        \`accessToken\` varchar(500) COLLATE utf8mb4_bin DEFAULT NULL,
        \`refreshToken\` varchar(500) COLLATE utf8mb4_bin DEFAULT NULL,
        \`profilePicUrl\` text COLLATE utf8mb4_bin,
        \`password\` varchar(320) COLLATE utf8mb4_bin DEFAULT NULL,
        \`givenName\` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
        \`familyName\` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
        \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        \`deletedAt\` datetime(6) DEFAULT NULL,
        \`confirmationToken\` varchar(36) COLLATE utf8mb4_bin DEFAULT NULL,
        \`status\` varchar(36) COLLATE utf8mb4_bin NOT NULL DEFAULT 'ACTIVE',
        \`accountId\` varchar(36) COLLATE utf8mb4_bin NULL,
        \`accountOwner\` tinyint NOT NULL DEFAULT 0,
        PRIMARY KEY (\`id\`),
        KEY \`FK_68d3c22dbd95449360fdbf7a3f1\` (\`accountId\`),
        CONSTRAINT \`FK_68d3c22dbd95449360fdbf7a3f1\` FOREIGN KEY (\`accountId\`) REFERENCES \`account\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_bin;`);

    // Create invite!
    await queryRunner.query(`CREATE TABLE \`invite\` (
        \`id\` varchar(36) NOT NULL,
        \`status\` varchar(36) NOT NULL DEFAULT 'PENDING',
        \`email\` varchar(320) DEFAULT NULL,
        \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        \`deletedAt\` datetime(6) DEFAULT NULL,
        \`accountId\` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL,
        \`permissions\` text NOT NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=latin1;`);

    await queryRunner.query(
      `ALTER TABLE \`invite\` ADD CONSTRAINT \`FK_e14fb6a45526215fa02193ff6a2\` FOREIGN KEY (\`accountId\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );

    await queryRunner.query(`set foreign_key_checks = 1;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {

  }
}
