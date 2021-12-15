/* Replace with your SQL commands */
CREATE TABLE `events`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `type` VARCHAR (50) NOT NULL,
    `title` VARCHAR (100) NOT NULL, 
    `description` TEXT,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;