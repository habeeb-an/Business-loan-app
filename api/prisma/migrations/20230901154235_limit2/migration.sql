-- AlterTable
ALTER TABLE `OAuth2Token` MODIFY `id_token` VARCHAR(1000) NOT NULL,
    MODIFY `access_token` VARCHAR(1000) NOT NULL;
