import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEvents } from '../context/EventsContext';
import { useState } from 'react'; // Import useState for managing modal

function Events() {
  const { events } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState(null); // State to track selected event
  
  // Function to open event detail modal
  const openEventDetail = (event) => {
    setSelectedEvent(event);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };
  
  // Function to close event detail modal
  const closeEventDetail = () => {
    setSelectedEvent(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Hero Section */}
      <div className="bg-white py-16">
        <div className="container">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Upcoming Events</h1>
            <p className="text-xl text-gray-600 mb-8">
              Join our exciting events and enhance your skills in the field of Information Systems.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Events List */}
      <div className="container py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer"
              onClick={() => openEventDetail(event)}
            >
              <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                <div className="p-8 flex items-center justify-center bg-primary-blue bg-opacity-10">
                  <h3 className="text-xl font-semibold text-primary-blue text-center">{event.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold">Date:</span> {event.date}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold">Time:</span> {event.time}
                  </p>
                  <p className="text-gray-600 mb-4">
                    <span className="font-semibold">Location:</span> {event.location}
                  </p>
                  <p className="text-gray-600 line-clamp-3">{event.description}</p>
                </div>
                <div 
                  className="text-center mt-2 mb-4 text-primary-blue hover:underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    openEventDetail(event);
                  }}
                >
                  View Details
                </div>
                {event.registrationUrl ? (
                  <a 
                    href={event.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-2 px-4 bg-primary-blue text-white text-center rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Register Now
                  </a>
                ) : null}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedEvent.title}</h2>
                <button 
                  onClick={closeEventDetail}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Date:</span> {selectedEvent.date}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Time:</span> {selectedEvent.time}
                </p>
                <p className="text-gray-600 mb-4">
                  <span className="font-semibold">Location:</span> {selectedEvent.location}
                </p>
                <p className="text-gray-700 whitespace-pre-line">{selectedEvent.description}</p>
              </div>
              
              {selectedEvent.registrationUrl && (
                <div className="mt-6">
                  <a 
                    href={selectedEvent.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-2 px-4 bg-primary-blue text-white text-center rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Register Now
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default Events;
                   