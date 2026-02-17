-- Drop user first if they exist
DROP USER if exists 'mamacare'@'localhost' ;

-- Now create user with prop privileges
CREATE USER 'mamacare'@'localhost' IDENTIFIED BY 'mamacare';

GRANT ALL PRIVILEGES ON * . * TO 'mamacare'@'localhost';