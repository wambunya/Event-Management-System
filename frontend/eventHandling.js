document.addEventListener("DOMContentLoaded", () => {
    const addEventPage = document.getElementById("addEventPage");
    const editEventPage = document.getElementById("editEventPage");
    const viewEventsPage = document.getElementById("viewEventsPage");
    const eventsGrid = document.getElementById("eventsGrid");
    let events = [];

    // Function to fetch events from the API
    async function fetchEvents() {
        try {
            const response = await fetch('/api/events');
            const data = await response.json();
            return data.events;
        } catch (error) {
            console.error('Error fetching events:', error);
            return [];
        }
    }

    // Function to render events
    async function renderEvents() {
        events = await fetchEvents();
        eventsGrid.innerHTML = '';
        events.forEach(event => {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <h3>${event.title}</h3>
                <p>${event.description}</p>
                <p><strong>Date:</strong> ${event.event_date} ${event.event_time}</p>
                <p><strong>Location:</strong> ${event.location}</p>
                <p><strong>Category:</strong> ${event.category}</p>
                <p><strong>Ticket Price:</strong> $${event.ticket_price.toFixed(2)}</p>
                <p><strong>Attendees:</strong> ${event.current_attendees}/${event.max_attendees}</p>
                <div class="card-footer">
                    <button class="btn btn-edit" onclick="editEvent(${event.id})">Edit</button>
                    <button class="btn btn-book" onclick="bookEvent(${event.id})">Book</button>
                </div>
            `;
            eventsGrid.appendChild(card);
        });
    }

    // Update the add event form submission handler
    document.getElementById("addEventForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const title = document.getElementById("eventTitle").value;
        const description = document.getElementById("eventDescription").value;
        const eventDate = document.getElementById("eventDate").value;
        const location = document.getElementById("location").value;
        const category = document.getElementById("category").value;
        const maxAttendees = parseInt(document.getElementById("maxAttendees").value);
        const ticketPrice = parseFloat(document.getElementById("ticketPrice").value);

        try {
            const response = await fetch('/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    description,
                    event_date: eventDate,
                    location,
                    category,
                    max_attendees: maxAttendees,
                    ticket_price: ticketPrice
                }),
            });
            const data = await response.json();
            if (data.success) {
                alert("Event added successfully!");
                clearForm();
                renderEvents();
                showPage(viewEventsPage);
            } else {
                alert("Failed to add event");
            }
        } catch (error) {
            console.error('Error adding event:', error);
            alert("An error occurred while adding the event");
        }
    });

    // Update the edit event form
    document.getElementById("editEventForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const id = document.getElementById("eventId").value;
        const title = document.getElementById("editEventTitle").value;
        const description = document.getElementById("editEventDescription").value;
        const eventDate = document.getElementById("editEventDate").value;
        const location = document.getElementById("editLocation").value;
        const category = document.getElementById("editCategory").value;
        const maxAttendees = parseInt(document.getElementById("editMaxAttendees").value);
        const ticketPrice = parseFloat(document.getElementById("editTicketPrice").value);

        try {
            const response = await fetch(`/api/events/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    description,
                    event_date: eventDate,
                    location,
                    category,
                    max_attendees: maxAttendees,
                    ticket_price: ticketPrice
                }),
            });
            const data = await response.json();
            if (data.success) {
                alert("Event updated successfully!");
                renderEvents();
                showPage(viewEventsPage);
            } else {
                alert("Failed to update event");
            }
        } catch (error) {
            console.error('Error updating event:', error);
            alert("An error occurred while updating the event");
        }
    });

    // Add book event functionality
    function bookEvent(id) {
        if (confirm("Are you sure you want to book this event?")) {
            fetch(`/api/events/${id}/book`, { method: 'POST' })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert("Event booked successfully!");
                        renderEvents();
                    } else {
                        alert("Failed to book event");
                    }
                })
                .catch(error => {
                    console.error('Error booking event:', error);
                    alert("An error occurred while booking the event");
                });
        }
    }

    // Initialize the view
    showPage(addEventPage);
    renderEvents();

    // Update the editEvent function
    window.editEvent = (id) => {
        const event = events.find(e => e.id == id);
        if (event) {
            document.getElementById("eventId").value = event.id;
            document.getElementById("editEventTitle").value = event.title;
            document.getElementById("editEventDescription").value = event.description;
            document.getElementById("editEventDate").value = event.event_date.split(' ')[0]; // Remove time part
            document.getElementById("editLocation").value = event.location;
            document.getElementById("editCategory").value = event.category;
            document.getElementById("editMaxAttendees").value = event.max_attendees;
            document.getElementById("editTicketPrice").value = event.ticket_price;
            showPage(editEventPage);
        }
    };

    // Update the deleteEvent function
    window.deleteEvent = (id) => {
        if (confirm("Are you sure you want to delete this event?")) {
            fetch(`/api/events/${id}`, { method: 'DELETE' })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert("Event deleted successfully!");
                        renderEvents();
                    } else {
                        alert("Failed to delete event");
                    }
                })
                .catch(error => {
                    console.error('Error deleting event:', error);
                    alert("An error occurred while deleting the event");
                });
        }
    };

    // Helper functions
    function clearForm() {
        document.getElementById("addEventForm").reset();
    }

    function showPage(page) {
        [addEventPage, editEventPage, viewEventsPage].forEach(p => p.classList.add("hidden"));
        page.classList.remove("hidden");
    }
});