/* Replace with your SQL commands */
CREATE TABLE `news`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR (100) NOT NULL,
    `actual_place` VARCHAR(50),
    `date_first` DATE,
    `date_last` DATE,
    `description` TEXT,
    `assets_id` INT,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_assets_id` FOREIGN KEY (`assets_id`) REFERENCES `assets` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;