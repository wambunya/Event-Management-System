// models/eventModel.js

const db = require('../config/db.js'); // MySQL database connection

// Model to interact with events table
const EventModel = {
    createEvent: (data, callback) => {
        const { title, description, event_date, event_time, location, image_url, category, max_attendees, current_attendees, organizer_name, organizer_email, ticket_price, is_featured } = data;
        const query = `
            INSERT INTO events (title, description, event_date, event_time, location, image_url, category, max_attendees, current_attendees, organizer_name, organizer_email, ticket_price, is_featured)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [title, description, event_date, event_time, location, image_url, category, max_attendees, current_attendees, organizer_name, organizer_email, ticket_price, is_featured];
        db.query(query, values, callback);
    },

    getAllEvents: (page, limit, callback) => {
        const offset = (page - 1) * limit;
        const query = `
            SELECT id, title, description, event_date, event_time, location, category, max_attendees, current_attendees, organizer_name, ticket_price, is_featured, created_at, updated_at
            FROM events
            ORDER BY event_date
            LIMIT ? OFFSET ?`;

        db.query(query, [parseInt(limit), parseInt(offset)], callback);
    },

    getEventById: (eventId, callback) => {
        const query = `
            SELECT id, title, description, event_date, event_time, location, category, max_attendees, current_attendees, organizer_name, organizer_email, ticket_price, is_featured, created_at, updated_at
            FROM events
            WHERE id = ?`;

        db.query(query, [eventId], callback);
    },

    updateEvent: (eventId, data, callback) => {
        const { title, description, event_date, event_time, location, image_url, category, max_attendees, current_attendees, organizer_name, organizer_email, ticket_price, is_featured } = data;
        const query = `
            UPDATE events 
            SET title = ?, description = ?, event_date = ?, event_time = ?, location = ?, image_url = ?, category = ?, max_attendees = ?, current_attendees = ?, organizer_name = ?, organizer_email = ?, ticket_price = ?, is_featured = ?
            WHERE id = ?`;

        const values = [title, description, event_date, event_time, location, image_url, category, max_attendees, current_attendees, organizer_name, organizer_email, ticket_price, is_featured, eventId];
        db.query(query, values, callback);
    },

    deleteEvent: (eventId, callback) => {
        const query = `
            DELETE FROM events
            WHERE id = ?`;

        db.query(query, [eventId], callback);
    },

    searchEvents: (query, callback) => {
        const queryString = `
            SELECT id, title, description, event_date, event_time, location, category
            FROM events
            WHERE title LIKE ? OR description LIKE ?
            ORDER BY event_date`;

        const values = [`%${query}%`, `%${query}%`];
        db.query(queryString, values, callback);
    },

    filterEvents: (category, tags, sort, callback) => {
        const queryString = `
            SELECT id, title, description, event_date, event_time, location, category
            FROM events
            WHERE category = ? AND FIND_IN_SET(?, tags) > 0
            ORDER BY event_date ${sort === 'date' ? 'ASC' : 'DESC'}`;

        const values = [category, tags];
        db.query(queryString, values, callback);
    }
};

module.exports = EventModel;
