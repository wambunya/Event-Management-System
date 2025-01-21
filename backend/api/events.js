import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/events";

export const fetchEvents = () => axios.get(API_BASE_URL);

export const fetchFeaturedEvents = () =>
  axios.get(`${API_BASE_URL}?featured=true`);

export const fetchEventById = (id) => axios.get(`${API_BASE_URL}/${id}`);

export const createEvent = (data) => axios.post(API_BASE_URL, data);

export const deleteEvent = (id) => axios.delete(`${API_BASE_URL}/${id}`);
