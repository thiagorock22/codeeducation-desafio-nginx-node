CREATE DATABASE IF NOT EXISTS nodedb;

CREATE TABLE IF NOT EXISTS nodedb.people (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
)