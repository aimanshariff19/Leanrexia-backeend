-- ===============================
-- SHOW ALL DATABASES
-- ===============================
SHOW DATABASES;


-- ===============================
-- MAIN APPLICATION DATABASE
-- ===============================
USE edubridge;


-- ===============================
-- USERS TABLE
-- ===============================
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(100),
    role VARCHAR(20)
);

SELECT * FROM users;


-- ===============================
-- ENROLLMENTS TABLE
-- ===============================
CREATE TABLE IF NOT EXISTS enrollments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    program_name VARCHAR(100),
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM enrollments;


-- ===============================
-- PROGRAMS TABLE
-- ===============================
CREATE TABLE IF NOT EXISTS programs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ngo_id INT,
    title VARCHAR(100),
    description TEXT
);

SELECT * FROM programs;


-- ===============================
-- FEEDBACK TABLE (FIXED LOCATION)
-- ===============================
-- IMPORTANT: Feedback is now part of edubridge DB
-- ===============================
CREATE TABLE IF NOT EXISTS feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM feedback;


-- ===============================
-- SAMPLE INSERTS (MULTIPLE RATINGS)
-- ===============================
INSERT INTO feedback (rating) VALUES
(5),
(4),
(3),
(5),
(2);


-- ===============================
-- FEEDBACK ANALYSIS (USEFUL)
-- ===============================
-- Total feedback count
SELECT COUNT(*) AS total_feedbacks FROM feedback;

-- Average rating
SELECT AVG(rating) AS average_rating FROM feedback;

-- Rating distribution
SELECT rating, COUNT(*) AS count
FROM feedback
GROUP BY rating
ORDER BY rating DESC;


-- ===============================
-- FINAL CHECK
-- ===============================
SHOW TABLES;
