-----------------------
-- Database creation
-----------------------
DROP DATABASE covid_status_eu;
CREATE DATABASE covid_status_eu;
USE covid_status_eu;

-----------------------
-- Table creation
-----------------------
CREATE TABLE country(
  -- Values
  code VARCHAR(4) NOT NULL,
  name VARCHAR(40) NOT NULL,
  population INT DEFAULT NULL,

  -- Keys
  PRIMARY KEY (code)
);

CREATE TABLE activity(

  -- Values
  cases INT DEFAULT 0,
  deaths INT DEFAULT 0,
  tests INT DEFAULT 0,
  year_week VARCHAR(10) NOT NULL,

  -- To be keys
  code VARCHAR(4) NOT NULL
);

----------------------
-- Adding foreign keys
----------------------
ALTER TABLE activity
ADD (
  FOREIGN KEY(code) REFERENCES country(code) ON DELETE CASCADE,
  PRIMARY KEY(code, year_week)
);
