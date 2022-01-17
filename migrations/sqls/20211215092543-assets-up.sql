/* Replace with your SQL commands */
CREATE TABLE `assets`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `source` VARCHAR (100) NOT NULL,
    `type` VARCHAR (10) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;