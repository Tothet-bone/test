let events = [];

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('eventForm').addEventListener('submit', addEvent);
    document.getElementById('applyFilter').addEventListener('click', filterEvents);
});

function addEvent(e) {
    e.preventDefault();

    const name = document.getElementById('eventName').value;
    const date = document.getElementById('eventDate').value;
    const type = document.getElementById('eventType').value;

    const newEvent = {
        id: Date.now(),
        name: name,
        date: date,
        type: type
    };

    events.push(newEvent);
    renderEvents();
    document.getElementById('eventForm').reset();
}

function renderEvents() {
    const eventsList = document.getElementById('eventsList');
    eventsList.innerHTML = '';

    const filteredEvents = filterAppliedEvents();

    filteredEvents.forEach(event => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${event.name}</td>
            <td>${formatDate(event.date)}</td>
            <td>${event.type}</td>
            <td><button class="delete-btn" onclick="deleteEvent(${event.id})">Удалить</button></td>
        `;

        eventsList.appendChild(row);
    });
}

function deleteEvent(id) {
    events = events.filter(event => event.id !== id);
    renderEvents();
}

function filterEvents() {
    renderEvents();
}

function filterAppliedEvents() {
    const filterDate = document.getElementById('filterDate').value;
    const filterType = document.getElementById('filterType').value;

    return events.filter(event => {
        const matchesDate = !filterDate || event.date === filterDate;
        const matchesType = !filterType || event.type === filterType;
        return matchesDate && matchesType;
    });
}

function formatDate(dateString) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
}
