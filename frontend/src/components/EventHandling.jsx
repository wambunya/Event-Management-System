// Handling form submission for Add Event
document.getElementById('add-event-form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Collect form data
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const location = document.getElementById('location').value;
    const category = document.getElementById('category').value;
    const maxAttendees = document.getElementById('max-attendees').value;

    // Submit the data (In real-world use, send this to the server)
    console.log('Event Added:', { title, description, date, time, location, category, maxAttendees });

    // Reset the form
    document.getElementById('add-event-form').reset();
});

// Handling form submission for Edit Event
document.getElementById('edit-event-form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Collect updated event data
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const location = document.getElementById('location').value;
    const category = document.getElementById('category').value;
    const maxAttendees = document.getElementById('max-attendees').value;

    // Submit the updated data (In real-world use, update this on the server)
    console.log('Event Updated:', { title, description, date, time, location, category, maxAttendees });

    // Reset the form
    document.getElementById('edit-event-form').reset();
});

// Handling Event Actions on View Events Page
const eventCards = document.querySelectorAll('.event-card');

eventCards.forEach(card => {
    const viewDetailsBtn = card.querySelector('.btn-details');
    const editBtn = card.querySelector('.btn-edit');
    const deleteBtn = card.querySelector('.btn-delete');

    // View Event Details
    viewDetailsBtn.addEventListener('click', () => {
        alert('Viewing details of the event.');
    });

    // Edit Event
    editBtn.addEventListener('click', () => {
        alert('Editing event.');
    });

    // Delete Event
    deleteBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this event?')) {
            alert('Event deleted.');
        }
    });
});
