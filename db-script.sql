CREATE DATABASE IF NOT EXISTS `tasks-app`;
USE `tasks-app`;
CREATE TABLE tasks(
	`id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `name` VARCHAR(100),
    `description` VARCHAR(255)
);