import { createContext, useContext, useState, useEffect } from 'react';
import { eventService } from '../services/eventService';

const EventsContext = createContext();

export function useEvents() {
  return useContext(EventsContext);
}

export function EventsProvider({ children }) {
  const [events, setEvents] = useState([]);

  // Load initial events
  useEffect(() => {
    const loadEvents = async () => {
      const initialEvents = await eventService.getAllEvents();
      setEvents(initialEvents);
    };
    loadEvents();
  }, []);

  // Add new event
  const addEvent = async (eventData) => {
    const newEvent = await eventService.createEvent(eventData);
    setEvents(prevEvents => [...prevEvents, newEvent]);
    return newEvent;
  };

  // Update existing event
  const updateEvent = async (eventData) => {
    const updatedEvent = await eventService.updateEvent(eventData);
    setEvents(prevEvents => prevEvents.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
    return updatedEvent;
  };

  // Delete event
  const deleteEvent = async (eventId) => {
    await eventService.deleteEvent(eventId);
    setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
  };

  const value = {
    events,
    setEvents,
    addEvent,
    updateEvent,
    deleteEvent
  };

  return (
    <EventsContext.Provider value={value}>
      {children}
    </EventsContext.Provider>
  );
}