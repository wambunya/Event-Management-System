// controllers/eventController.js

const EventModel = require('../models/eventModel');

// Controller to create a new event
const createEvent = (req, res) => {
    const eventData = req.body;

    EventModel.createEvent(eventData, (err, result) => {
        if (err) {
            return res.status(500).send('Error creating event');
        }
        res.status(201).send('Event created successfully');
    });
};

// Controller to get all events with pagination
const getAllEvents = (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    EventModel.getAllEvents(page, limit, (err, results) => {
        if (err) {
            return res.status(500).send('Error retrieving events');
        }
        res.json(results);
    });
};

// Controller to get a specific event by ID
const getEventById = (req, res) => {
    const eventId = req.params.id;

    EventModel.getEventById(eventId, (err, result) => {
        if (err) {
            return res.status(500).send('Error retrieving event');
        }
        if (result.length === 0) {
            return res.status(404).send('Event not found');
        }
        res.json(result[0]);
    });
};

// Controller to update an event by ID
const updateEvent = (req, res) => {
    const eventId = req.params.id;
    const eventData = req.body;

    EventModel.updateEvent(eventId, eventData, (err, result) => {
        if (err) {
            return res.status(500).send('Error updating event');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Event not found');
        }
        res.send('Event updated successfully');
    });
};

// Controller to delete an event by ID
const deleteEvent = (req, res) => {
    const eventId = req.params.id;

    EventModel.deleteEvent(eventId, (err, result) => {
        if (err) {
            return res.status(500).send('Error deleting event');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Event not found');
        }
        res.send('Event deleted successfully');
    });
};

// Controller to search events by title or description
const searchEvents = (req, res) => {
    const { query } = req.query;

    EventModel.searchEvents(query, (err, results) => {
        if (err) {
            return res.status(500).send('Error searching events');
        }
        res.json(results);
    });
};

// Controller to filter and sort events
const filterEvents = (req, res) => {
    const { category, tags, sort = 'date' } = req.query;

    EventModel.filterEvents(category, tags, sort, (err, results) => {
        if (err) {
            return res.status(500).send('Error filtering events');
        }
        res.json(results);
    });
};

module.exports = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    searchEvents,
    filterEvents
};
