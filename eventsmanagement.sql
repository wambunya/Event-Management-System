-- Create Database
DROP DATABASE IF EXISTS EventsManagement;
CREATE DATABASE EventsManagement;
USE EventsManagement;

-- Events Table
CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    event_time TIME NOT NULL,
    location VARCHAR(255) NOT NULL,
    image_url VARCHAR(255),
    category VARCHAR(50) NOT NULL,
    max_attendees INT DEFAULT 0,
    current_attendees INT DEFAULT 0,
    organizer_name VARCHAR(100),
    organizer_email VARCHAR(255),
    ticket_price DECIMAL(10,2) DEFAULT 0.00,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Categories Table
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    color_code VARCHAR(7) NOT NULL
);

INSERT INTO categories (name, color_code) VALUES
('Conference', '#4a90e2'),
('Workshop', '#e74c3c'),
('Seminar', '#2ecc71'),
('Networking', '#f39c12'),
('Tech Talk', '#9b59b6'),
('Hackathon', '#e67e22'),
('Social', '#3498db'),
('Other', '#95a5a6');

-- Insert Sample Categories and Data into Events
INSERT INTO events (title, description, event_date, event_time, location, image_url, category, max_attendees, current_attendees, organizer_name, organizer_email, ticket_price, is_featured)
VALUES
('Annual Tech Conference', 'A gathering of tech leaders and innovators.', '2025-03-15', '10:00:00', 'Grand Hall, Tech City', 'https://example.com/event1.jpg', 'Conference', 500, 250, 'Alice Johnson', 'alice.johnson@example.com', 99.99, TRUE),
('Beginner Coding Workshop', 'Learn the basics of coding.', '2025-04-10', '09:00:00', 'Innovation Hub, Tech City', 'https://example.com/event2.jpg', 'Workshop', 100, 50, 'Bob Smith', 'bob.smith@example.com', 49.99, FALSE),
('AI and Machine Learning Seminar', 'Explore the future of AI.', '2025-05-20', '14:00:00', 'Tech Park Auditorium', 'https://example.com/event3.jpg', 'Seminar', 300, 200, 'Clara Davis', 'clara.davis@example.com', 79.99, TRUE),
('Networking Night', 'Connect with professionals from various fields.', '2025-06-05', '18:00:00', 'City Rooftop, Skyline Plaza', 'https://example.com/event4.jpg', 'Networking', 150, 120, 'Daniel Lee', 'daniel.lee@example.com', 29.99, FALSE),
('Hackathon 2025', 'Showcase your coding skills in a 24-hour hackathon.', '2025-07-01', '08:00:00', 'Tech Innovation Lab', 'https://example.com/event5.jpg', 'Hackathon', 200, 180, 'Emma Brown', 'emma.brown@example.com', 19.99, TRUE);

-- Query Example: Fetch All Events with Organizer Details
SELECT 
    id AS event_id,
    title,
    description,
    event_date,
    event_time,
    location,
    category,
    max_attendees,
    current_attendees,
    organizer_name,
    organizer_email,
    ticket_price,
    is_featured,
    created_at,
    updated_at
FROM 
    events
ORDER BY 
    event_date;

-- Query Example: List All Featured Events
SELECT 
    id AS event_id,
    title,
    event_date,
    event_time,
    location,
    category,
    ticket_price
FROM 
    events
WHERE 
    is_featured = TRUE
ORDER BY 
    event_date;

-- Query Example: Get Total Attendees by Event
SELECT 
    title AS event_title,
    max_attendees,
    current_attendees,
    CONCAT(ROUND((current_attendees / max_attendees) * 100, 2), '%') AS attendance_rate
FROM 
    events
WHERE 
    max_attendees > 0
ORDER BY 
    attendance_rate DESC;

-- Query Example: Retrieve Events by Category
SELECT 
    title,
    description,
    event_date,
    location
FROM 
    events
WHERE 
    category = 'Workshop'
ORDER BY 
    event_date;
