/* Replace with your SQL commands */
CREATE TABLE `contact`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `firstname_lastname` VARCHAR (150) NOT NULL,
    `presentation` TEXT, 
    `phone` VARCHAR(10),
    `diplomes` TEXT,
    `assets_id` INT,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;