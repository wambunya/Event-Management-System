import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/events"; // Adjust as needed for your API

// View: List All Events
export const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}`)
      .then((response) => setEvents(response.data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  return (
    <div>
      <h2>All Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>{event.event_date} at {event.event_time}</p>
            <p>Location: {event.location}</p>
            <p>Category: {event.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

// View: Featured Events
export const FeaturedEvents = () => {
  const [featuredEvents, setFeaturedEvents] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}?featured=true`)
      .then((response) => setFeaturedEvents(response.data))
      .catch((error) => console.error("Error fetching featured events:", error));
  }, []);

  return (
    <div>
      <h2>Featured Events</h2>
      <ul>
        {featuredEvents.map((event) => (
          <li key={event.id}>
            <h3>{event.title}</h3>
            <p>{event.event_date} at {event.event_time}</p>
            <p>Location: {event.location}</p>
            <p>Price: ${event.ticket_price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

// View: Event Details by ID
export const EventDetails = ({ eventId }) => {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/${eventId}`)
      .then((response) => setEvent(response.data))
      .catch((error) => console.error("Error fetching event details:", error));
  }, [eventId]);

  return (
    <div>
      {event ? (
        <>
          <h2>{event.title}</h2>
          <p>{event.description}</p>
          <p>{event.event_date} at {event.event_time}</p>
          <p>Location: {event.location}</p>
          <p>Category: {event.category}</p>
          <p>Organizer: {event.organizer_name} ({event.organizer_email})</p>
          <p>Price: ${event.ticket_price}</p>
        </>
      ) : (
        <p>Loading event details...</p>
      )}
    </div>
  );
};

// View: Create Event Form
export const CreateEventForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    event_date: "",
    event_time: "",
    location: "",
    image_url: "",
    category: "",
    max_attendees: 0,
    organizer_name: "",
    organizer_email: "",
    ticket_price: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(API_BASE_URL, formData)
      .then(() => alert("Event created successfully"))
      .catch((error) => console.error("Error creating event:", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Event</h2>
      {Object.keys(formData).map((field) => (
        <div key={field}>
          <label>{field.replace("_", " ").toUpperCase()}</label>
          <input
            type={field === "max_attendees" || field === "ticket_price" ? "number" : "text"}
            name={field}
            value={formData[field]}
            onChange={handleChange}
          />
        </div>
      ))}
      <button type="submit">Create Event</button>
    </form>
  );
};

// View: Delete Event
export const DeleteEvent = ({ eventId }) => {
  const handleDelete = () => {
    axios
      .delete(`${API_BASE_URL}/${eventId}`)
      .then(() => alert("Event deleted successfully"))
      .catch((error) => console.error("Error deleting event:", error));
  };

  return <button onClick={handleDelete}>Delete Event</button>;
};
