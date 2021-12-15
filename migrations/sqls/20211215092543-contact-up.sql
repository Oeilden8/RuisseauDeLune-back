/* Replace with your SQL commands */
CREATE TABLE `contact`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `firstname_lastname` VARCHAR (150) NOT NULL,
    `email` VARCHAR (100), 
    `phone` INT,
    `description` TEXT,
    `assets_id` INT NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;