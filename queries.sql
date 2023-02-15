-- CRON
-- Delete execution of last 10 days of free accounts
USE cron_server_database;
DELETE FROM execution 
WHERE createdAt < NOW() - INTERVAL 30 DAY 
AND scheduleId IN (
    SELECT id 
    FROM schedule 
    WHERE accountId 
    IN (
        SELECT id FROM account WHERE plan = "FREE"
    )
);

-- CRON
-- Pause all Schedules of free accounts created more than 1 month ago
USE cron_server_database;
UPDATE schedule
SET status = "PAUSED"
WHERE createdAt < NOW() - INTERVAL 30 DAY 
AND accountId 
IN (
    SELECT id FROM account WHERE plan = "FREE"
);

-- CRON 
-- Get account of user
SELECT acc.*
FROM user as u 
LEFT JOIN user_account ua
ON ua.userId = u.id
LEFT JOIN account acc
ON acc.id = ua.accountId
WHERE u.email="hori@p4n.jp";

-- CRON
-- Clone production
set foreign_key_checks = 0;
DROP DATABASE cron_local;
CREATE DATABASE cron_local;
CREATE TABLE cron_local.user LIKE cron_server_database.user;
CREATE TABLE cron_local.account LIKE cron_server_database.account;
CREATE TABLE cron_local.migrations LIKE cron_server_database.migrations;
CREATE TABLE cron_local.schedule LIKE cron_server_database.schedule;
CREATE TABLE cron_local.execution LIKE cron_server_database.execution;
CREATE TABLE cron_local.invite LIKE cron_server_database.invite;
CREATE TABLE cron_local.asset LIKE cron_server_database.asset;
CREATE TABLE cron_local.asset_variation LIKE cron_server_database.asset_variation;

INSERT INTO cron_local.user SELECT * FROM cron_server_database.user;
INSERT INTO cron_local.account SELECT * FROM cron_server_database.account;
INSERT INTO cron_local.migrations SELECT * FROM cron_server_database.migrations;
INSERT INTO cron_local.schedule SELECT * FROM cron_server_database.schedule;
INSERT INTO cron_local.invite SELECT * FROM cron_server_database.invite;
INSERT INTO cron_local.asset SELECT * FROM cron_server_database.asset;
INSERT INTO cron_local.asset_variation SELECT * FROM cron_server_database.asset_variation;
set foreign_key_checks = 1;


set foreign_key_checks = 0;
ALTER TABLE list CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;
ALTER TABLE product CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;
ALTER TABLE person CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;
set foreign_key_checks = 1;




DELETE FROM execution 
WHERE createdAt < NOW() - INTERVAL 30 DAY 
LIMIT 10000000;


-- WISH
-- Monitor products
USE wish_server_database;

SELECT l.name, pr.name, acc.id
FROM product pr
INNER JOIN `list` l
ON pr.listId = l.id
LEFT JOIN account acc
ON l.accountId = acc.id
WHERE  l.deletedAt IS NULL
AND acc.id NOT IN ('861f711e-c6b6-4eae-b179-e58022709e4b','3c07a9f7-5a3d-4ce4-8b63-2d44c4a660f1', 'eb310978-321d-4ca0-a574-3fc0ec0cb40b' );


-- WISH
-- Monitor products (count)
USE wish_server_database;
SELECT 
count(distinct l.slug) as Listas, 
count(pr.name) as Produtos, 
count(pr.personId) as Convidados
FROM product pr
INNER JOIN `list` l
ON pr.listId = l.id
LEFT JOIN account acc
ON l.accountId = acc.id
WHERE  l.deletedAt IS NULL
AND acc.id NOT IN ('861f711e-c6b6-4eae-b179-e58022709e4b','3c07a9f7-5a3d-4ce4-8b63-2d44c4a660f1', 'eb310978-321d-4ca0-a574-3fc0ec0cb40b' );

-- WISH
-- Clone production
set foreign_key_checks = 0;
DROP DATABASE wish_local;
CREATE DATABASE wish_local;
CREATE TABLE wish_local.user LIKE wish_server_database.user;
CREATE TABLE wish_local.account LIKE wish_server_database.account;
CREATE TABLE wish_local.migrations LIKE wish_server_database.migrations;
CREATE TABLE wish_local.list LIKE wish_server_database.list;
CREATE TABLE wish_local.person LIKE wish_server_database.person;
CREATE TABLE wish_local.invite LIKE wish_server_database.invite;
CREATE TABLE wish_local.asset LIKE wish_server_database.asset;
CREATE TABLE wish_local.asset_variation LIKE wish_server_database.asset_variation;
CREATE TABLE wish_local.product_images_asset LIKE wish_server_database.product_images_asset;
CREATE TABLE wish_local.product LIKE wish_server_database.product;
CREATE TABLE wish_local.platform_product LIKE wish_server_database.platform_product;
CREATE TABLE wish_local.platform_product_images_asset LIKE wish_server_database.platform_product_images_asset;

INSERT INTO wish_local.user SELECT * FROM wish_server_database.user;
INSERT INTO wish_local.account SELECT * FROM wish_server_database.account;
INSERT INTO wish_local.migrations SELECT * FROM wish_server_database.migrations;
INSERT INTO wish_local.list SELECT * FROM wish_server_database.list;
INSERT INTO wish_local.person SELECT * FROM wish_server_database.person;
INSERT INTO wish_local.invite SELECT * FROM wish_server_database.invite;
INSERT INTO wish_local.asset SELECT * FROM wish_server_database.asset;
INSERT INTO wish_local.asset_variation SELECT * FROM wish_server_database.asset_variation;
INSERT INTO wish_local.product_images_asset SELECT * FROM wish_server_database.product_images_asset;
INSERT INTO wish_local.product SELECT * FROM wish_server_database.product;
INSERT INTO wish_local.platform_product SELECT * FROM wish_server_database.platform_product;
INSERT INTO wish_local.platform_product_images_asset SELECT * FROM wish_server_database.platform_product_images_asset;
set foreign_key_checks = 1;

-- WISH
-- Get all Amazon products and create recommended
USE wish_server_database;

INSERT INTO platform_product
SELECT 
id, name,`desc`, url,estimatedPrice, status, createdAt, updatedAt, deletedAt
FROM product 
WHERE
SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(url, '/', 3), '://', -1), '/', 1), '?', 1) = "www.amazon.com.br"
AND estimatedPrice IS NOT NULL
AND deletedAt IS NULL
GROUP BY url;

INSERT INTO platform_product_images_asset
SELECT productId as platformProductId, assetId
FROM product_images_asset
WHERE productId IN (SELECT id FROM platform_product);

SELECT FROM platform_product WHERE id NOT IN(SELECT platformProductId FROM platform_product_images_asset);

-- ALL
-- Database size
SELECT table_schema, ROUND(SUM(data_length+index_length)/1024/1024/1024,2) "size in GB" FROM information_schema.tables GROUP BY 1 ORDER BY 2 DESC;
-- Per table
SELECT table_schema "DB Name", table_name,(data_length + index_length)/1024/1024/1024 AS "TableSizeinGB" from information_schema.tables where table_schema='cron_server_database';


-- WISH
-- Lists by people and product
USE wish_server_database;
SELECT 
l.slug,
count(pr.name) as Produtos, 
count(pr.personId) as Convidados
FROM product pr
INNER JOIN `list` l
ON pr.listId = l.id
LEFT JOIN account acc
ON l.accountId = acc.id
WHERE  l.deletedAt IS NULL
AND acc.id NOT IN ('861f711e-c6b6-4eae-b179-e58022709e4b','3c07a9f7-5a3d-4ce4-8b63-2d44c4a660f1', 'eb310978-321d-4ca0-a574-3fc0ec0cb40b' )
GROUP BY l.slug
ORDER BY Convidados DESC;

-- WISH
-- Lists product stores
USE wish_server_database;
SELECT 
count(*) as count, SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(url, '/', 3), '://', -1), '/', 1), '?', 1) as store
FROM product 
WHERE url IS NOT NULL
AND deletedAt IS NULL
GROUP BY store
ORDER BY count DESC;



-- ADV
-- Clone production
set foreign_key_checks = 0;
DROP DATABASE adv_local;
CREATE DATABASE adv_local;
CREATE TABLE adv_local.user LIKE adv_server_database.user;
CREATE TABLE adv_local.account LIKE adv_server_database.account;
CREATE TABLE adv_local.migrations LIKE adv_server_database.migrations;
CREATE TABLE adv_local.invite LIKE adv_server_database.invite;
CREATE TABLE adv_local.asset LIKE adv_server_database.asset;
CREATE TABLE adv_local.notification LIKE adv_server_database.notification;
CREATE TABLE adv_local.client LIKE adv_server_database.client;
CREATE TABLE adv_local.lawsuit LIKE adv_server_database.lawsuit;
CREATE TABLE adv_local.lawsuit_attachments_attachment LIKE adv_server_database.lawsuit_attachments_attachment;
CREATE TABLE adv_local.lawsuit_task LIKE adv_server_database.lawsuit_task;
CREATE TABLE adv_local.lawyer LIKE adv_server_database.lawyer;
CREATE TABLE adv_local.office LIKE adv_server_database.office;
CREATE TABLE adv_local.attachment LIKE adv_server_database.attachment;
CREATE TABLE adv_local.client_attachments_attachment LIKE adv_server_database.client_attachments_attachment;
CREATE TABLE adv_local.lawsuit_client LIKE adv_server_database.lawsuit_client;
CREATE TABLE adv_local.discussion LIKE adv_server_database.discussion;
CREATE TABLE adv_local.discussion_comment LIKE adv_server_database.discussion_comment;
CREATE TABLE adv_local.payment_item LIKE adv_server_database.payment_item;
CREATE TABLE adv_local.payment LIKE adv_server_database.payment;
CREATE TABLE adv_local.payment_fulfillment LIKE adv_server_database.payment_fulfillment;
CREATE TABLE adv_local.email_notification LIKE adv_server_database.email_notification;


INSERT INTO adv_local.user SELECT * FROM adv_server_database.user;
INSERT INTO adv_local.account SELECT * FROM adv_server_database.account;
INSERT INTO adv_local.migrations SELECT * FROM adv_server_database.migrations;
INSERT INTO adv_local.invite SELECT * FROM adv_server_database.invite;
INSERT INTO adv_local.asset SELECT * FROM adv_server_database.asset;
INSERT INTO adv_local.notification SELECT * FROM adv_server_database.notification;
INSERT INTO adv_local.client SELECT * FROM adv_server_database.client;
INSERT INTO adv_local.lawsuit SELECT * FROM adv_server_database.lawsuit;
INSERT INTO adv_local.lawsuit_attachments_attachment SELECT * FROM adv_server_database.lawsuit_attachments_attachment;
INSERT INTO adv_local.lawsuit_task SELECT * FROM adv_server_database.lawsuit_task;
INSERT INTO adv_local.lawyer SELECT * FROM adv_server_database.lawyer;
INSERT INTO adv_local.office SELECT * FROM adv_server_database.office;
INSERT INTO adv_local.attachment SELECT * FROM adv_server_database.attachment;
INSERT INTO adv_local.client_attachments_attachment SELECT * FROM adv_server_database.client_attachments_attachment;
INSERT INTO adv_local.lawsuit_client SELECT * FROM adv_server_database.lawsuit_client;
INSERT INTO adv_local.discussion SELECT * FROM adv_server_database.discussion;
INSERT INTO adv_local.discussion_comment SELECT * FROM adv_server_database.discussion_comment;
INSERT INTO adv_local.payment_item SELECT * FROM adv_server_database.payment_item;
INSERT INTO adv_local.payment SELECT * FROM adv_server_database.payment;
INSERT INTO adv_local.payment_fulfillment SELECT * FROM adv_server_database.payment_fulfillment;
INSERT INTO adv_local.email_notification SELECT * FROM adv_server_database.email_notification;
set foreign_key_checks = 1;





UPDATE client SET nameDisplay = LOWER(nameDisplay);
UPDATE client SET nameDisplay = CONCAT(UPPER(SUBSTR(nameDisplay,1,1)),LOWER(SUBSTR(nameDisplay,2)));
UPDATE client SET nameDisplay = REPLACE(nameDisplay,' a',' A');
UPDATE client SET nameDisplay = REPLACE(nameDisplay,' b',' B');
UPDATE client SET nameDisplay = REPLACE(nameDisplay,' c',' C');
UPDATE client SET nameDisplay = REPLACE(nameDisplay,' d',' D');
UPDATE client SET nameDisplay = REPLACE(nameDisplay,' e',' E');
UPDATE client SET nameDisplay = REPLACE(nameDisplay,' f',' F');
UPDATE client SET nameDisplay = REPLACE(nameDisplay,' g',' G');
UPDATE client SET nameDisplay = REPLACE(nameDisplay,' h',' H');
UPDATE client SET nameDisplay = REPLACE(nameDisplay,' i',' I');
UPDATE client SET nameDisplay = REPLACE(nameDisplay,' j',' J');
UPDATE client SET nameDisplay = REPLACE(nameDisplay,' k',' K');
UPDATE client SET nameDisplay = REPLACE(nameDisplay,' l',' L');
UPDATE client SET nameDisplay = REPLACE(nameDisplay,' m',' M');
UPDATE client SET nameDisplay = REPLACE(nameDisplay,' n',' N');
UPDATE client SET nameDisplay = REPLACE(nameDisplay,' o',' O');
UPDATE client SET nameDisplay = REPLACE(nameDisplay,' p',' P');
UPDATE client SET nameDisplay = REPLACE(nameDisplay,' q',' Q');
UPDATE client SET nameDisplay = REPLACE(nameDisplay,' r',' R');
UPDATE client SET nameDisplay = REPLACE(nameDisplay,' s',' S');
UPDATE client SET nameDisplay = REPLACE(nameDisplay,' t',' T');
UPDATE client SET nameDisplay = REPLACE(nameDisplay,' u',' U');
UPDATE client SET nameDisplay = REPLACE(nameDisplay,' v',' V');
UPDATE client SET nameDisplay = REPLACE(nameDisplay,' w',' W');
UPDATE client SET nameDisplay = REPLACE(nameDisplay,' x',' X');
UPDATE client SET nameDisplay = REPLACE(nameDisplay,' y',' Y');
UPDATE client SET nameDisplay = REPLACE(nameDisplay,' z',' Z');