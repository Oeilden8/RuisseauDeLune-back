/* Replace with your SQL commands */
CREATE TABLE `admins`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR (100) NOT NULL UNIQUE,
    `hashedPassword` VARCHAR (255) NOT NULL, 
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;



-- db-migrate create newtable --sql-file
