// Local event service implementation
// Using localStorage to persist events and prevent duplication in StrictMode
const EVENTS_STORAGE_KEY = 'psite_events';

// Initialize with default events only if storage is empty
const initializeEvents = () => {
  const storedEvents = localStorage.getItem(EVENTS_STORAGE_KEY);
  if (!storedEvents) {
    const defaultEvents = [
      {
        id: 1,
        title: 'Web Development Workshop',
        date: '2024-02-15',
        time: '14:00',
        location: 'Online via Zoom',
        description: 'Learn modern web development techniques and best practices.'
      },
      {
        id: 2,
        title: 'Data Science Seminar',
        date: '2024-02-20',
        time: '15:30',
        location: 'PSITE Conference Hall',
        description: 'Explore the latest trends in data science and analytics.'
      }
    ];
    localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(defaultEvents));
    return defaultEvents;
  }
  return JSON.parse(storedEvents);
};

export const eventService = {
  // Fetch all events
  getAllEvents: async () => {
    return initializeEvents();
  },

  // Create a new event
  createEvent: async (event) => {
    const events = initializeEvents();
    const newEvent = { ...event, id: Date.now() };
    const updatedEvents = [...events, newEvent];
    localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(updatedEvents));
    return newEvent;
  },

  // Update an existing event
  updateEvent: async (event) => {
    const events = initializeEvents();
    const index = events.findIndex(e => e.id === event.id);
    if (index !== -1) {
      const updatedEvents = [...events];
      updatedEvents[index] = event;
      localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(updatedEvents));
      return event;
    }
    throw new Error('Event not found');
  },

  // Delete an event
  deleteEvent: async (id) => {
    const events = initializeEvents();
    const index = events.findIndex(e => e.id === id);
    if (index !== -1) {
      const updatedEvents = events.filter(event => event.id !== id);
      localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(updatedEvents));
      return true;
    }
    throw new Error('Event not found');
  }
};