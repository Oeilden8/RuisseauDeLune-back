/* Replace with your SQL commands */
CREATE TABLE `users`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR (100),
    `lastname` VARCHAR (100),
    `email` VARCHAR (255) NOT NULL UNIQUE,
    `password` VARCHAR (255) NOT NULL, 
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;