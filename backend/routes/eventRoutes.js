const express = require('express');
const router = express.Router();
const db = require('../config/db');
const Event = require('../models/eventModel');

router.get('/', async (req, res) => {
    try {
        const events = await db.query('SELECT * FROM events');
        res.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, description, date, location } = req.body;
        
        const newEvent = await db.query(
            'INSERT INTO events SET ?',
            { title, description, date, location },
            (err, result) => {
                if (err) throw err;
                return result.insertId;
            }
        );

        res.status(201).json({ id: newEvent });
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ error: 'Failed to create event' });
    }
});

module.exports = router;
