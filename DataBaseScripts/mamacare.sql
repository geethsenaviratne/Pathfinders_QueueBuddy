-- Drop the database if it exists
DROP DATABASE IF EXISTS mamacare;

-- Create the database
CREATE DATABASE mamacare;

-- Switch to the database
USE mamacare;

-- =========================
-- User Types table
-- =========================
CREATE TABLE user_types (
    user_type_id INT AUTO_INCREMENT PRIMARY KEY,
    user_type_name ENUM('Citizen', 'Admin', 'Gov Officer') NOT NULL UNIQUE
);
-- =========================
-- Insert Default User Types
-- =========================
INSERT INTO user_types (user_type_name) VALUES
('Citizen'), 
('Admin'), 
('Gov Officer');

-- =========================
-- Users table (Citizens)
-- =========================
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_type_id INT NOT NULL,
    FOREIGN KEY (user_type_id) REFERENCES user_types(user_type_id)
        ON DELETE RESTRICT
);

-- =========================
-- Departments table
-- =========================
CREATE TABLE departments (
    department_id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL,
    department_code VARCHAR(50) NOT NULL UNIQUE
);
INSERT INTO departments (department_name, department_code)
VALUES
('Health Department', 'HLT001'),
('Education Department', 'EDU002'),
('Transport Department', 'TRN003');


-- =========================
-- Admins table
-- =========================
CREATE TABLE admins (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    department_id INT NOT NULL UNIQUE, 
    email VARCHAR(50) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    user_type_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(department_id) 
        ON DELETE CASCADE,
    FOREIGN KEY (user_type_id) REFERENCES user_types(user_type_id) 
        ON DELETE RESTRICT
);

INSERT INTO admins (department_id, email, `password`, user_type_id)
VALUES
(1, 'admin_health', '$2a$10$7QkYQ3xkA2X5QXkq.V9yZexmSgM9J7fjKxMpu6J4PjGJ.9ZT8Z5pW', 2),
(2, 'admin_education', '$2a$10$yP95cnFfh0tKZbElwF6XVOxJDD0nW7XYAkZ7Y2HkUzJXAJM3dWAZS', 2),
(3, 'admin_department@example.com', '$2a$10$8x9yQz7z3k2m1v0n5p6r7u8w9x0y1z2a3b4c5d6e7f8g9h0i1j2k', 2);



-- =========================
-- Government Officers table
-- =========================
CREATE TABLE government_officers (
    officer_id INT AUTO_INCREMENT PRIMARY KEY,
    department_id INT NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    user_type_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(department_id) 
        ON DELETE CASCADE,
    FOREIGN KEY (user_type_id) REFERENCES user_types(user_type_id) 
        ON DELETE RESTRICT
);
-- officer_health / password: OfficerPass123!
INSERT INTO government_officers (department_id, email, `password`, user_type_id)
VALUES (1, 'officer_health', '$2a$10$yI3UI72BNbDpPtXlhZokZutRkgGzBBZo6fGZ1FoyOdCuC1jGSqfVq', 3);

-- officer_education / password: OfficerPass456!
INSERT INTO government_officers (department_id, email, `password`, user_type_id)
VALUES (2, 'officer_education', '$2a$10$Vn44T9jRblPpm94c8gXMteo2jVZh4YlWb5j8WkAowPRbNzEJdqN/u', 3);

-- officer_transport / password: OfficerPass789!
INSERT INTO government_officers (department_id, email, `password`, user_type_id)
VALUES (3, 'officer_transport', '$2a$10$X26aXOEex0GJfQQkbmmXTOIdp3Bk4/N6H6a2xQvK5oL.NKOBgXQ8m', 3);


-- =========================
-- Documents table
-- =========================
CREATE TABLE documents (
    document_id INT AUTO_INCREMENT PRIMARY KEY,
    department_id INT NOT NULL,
    document_name VARCHAR(100) NOT NULL,
    document_pdf LONGBLOB NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(department_id) 
        ON DELETE CASCADE
);

-- =========================
-- Submitted Documents table
-- =========================
CREATE TABLE submitted_documents (
    submitted_id INT AUTO_INCREMENT PRIMARY KEY,
    department_id INT NOT NULL,
    user_id INT NOT NULL,
    document_pdf LONGBLOB NOT NULL,
    submitted_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(department_id) 
        ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) 
        ON DELETE CASCADE
);

-- =========================
-- Appointments table
-- =========================
CREATE TABLE appointments (
    appointment_id INT AUTO_INCREMENT PRIMARY KEY,
    department_id INT NOT NULL,
    user_id INT NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    booked_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    queue_place INT,
    FOREIGN KEY (department_id) REFERENCES departments(department_id) 
        ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) 
        ON DELETE CASCADE
);
ALTER TABLE appointments
    ADD COLUMN status VARCHAR(24) NOT NULL DEFAULT 'BOOKED';

ALTER TABLE admins
  ADD COLUMN email VARCHAR(100) NOT NULL UNIQUE;
