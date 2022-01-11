/* Replace with your SQL commands */
CREATE TABLE `selection_assets`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `assets_id` INT NOT NULL,
    `events_id` INT NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_assets_id` FOREIGN KEY (`assets_id`) REFERENCES `events` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = latin1;