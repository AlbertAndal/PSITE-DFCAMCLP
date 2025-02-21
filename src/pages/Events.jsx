import { useState } from 'react'
import { MagnifyingGlassIcon, CalendarIcon, ClockIcon, XMarkIcon, UserGroupIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

function Events() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedEvent, setSelectedEvent] = useState(null)

  // Sample events data
  const events = [
    {
      id: 1,
      title: 'Annual IT Education Summit',
      date: '2024-03-15',
      time: '09:00 AM',
      type: 'Virtual',
      description: 'Join us for the annual summit discussing the future of IT education.',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
      longDescription: 'The Annual IT Education Summit brings together leading educators, industry experts, and innovators to explore the evolving landscape of IT education. This year\'s summit will focus on emerging technologies, pedagogical innovations, and strategies for preparing students for the digital future.',
      agenda: [
        '09:00 AM - Opening Ceremony',
        '09:30 AM - Keynote: The Future of IT Education',
        '10:30 AM - Panel Discussion: Industry-Academia Collaboration',
        '12:00 PM - Lunch Break',
        '01:00 PM - Workshop Sessions',
        '03:00 PM - Research Presentations',
        '04:30 PM - Networking Session',
        '05:00 PM - Closing Remarks'
      ],
      speakers: [
        {
          name: 'Dr. Sarah Johnson',
          role: 'Dean of Computer Science',
          image: 'https://i.pravatar.cc/300?img=5'
        },
        {
          name: 'Prof. Michael Chen',
          role: 'AI Education Specialist',
          image: 'https://i.pravatar.cc/300?img=6'
        },
        {
          name: 'Ms. Emily Rodriguez',
          role: 'Industry Partner',
          image: 'https://i.pravatar.cc/300?img=7'
        },
        {
          name: 'Dr. James Wilson',
          role: 'Educational Technology Expert',
          image: 'https://i.pravatar.cc/300?img=8'
        }
      ],
      venue: 'Virtual Platform (Zoom)',
      registration: 'Free for PSITE members, ₱500 for non-members'
    },
    {
      id: 2,
      title: 'Web Development Workshop',
      date: '2024-03-20',
      time: '02:00 PM',
      type: 'Meetup',
      description: 'Hands-on workshop on modern web development technologies.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      title: 'Research Methodology Seminar',
      date: '2024-03-25',
      time: '10:00 AM',
      type: 'Virtual',
      description: 'Learn effective research methodologies in IT education.',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop'
    },
    {
      id: 4,
      title: 'Tech Innovation Conference',
      date: '2024-04-05',
      time: '09:30 AM',
      type: 'Meetup',
      description: 'Exploring the latest innovations in educational technology.',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=300&fit=crop'
    },
    {
      id: 5,
      title: 'AI in Education Symposium',
      date: '2024-04-10',
      time: '01:00 PM',
      type: 'Virtual',
      description: 'Discover how AI is transforming the educational landscape.',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop'
    },
    {
      id: 6,
      title: 'Digital Learning Workshop',
      date: '2024-04-15',
      time: '03:00 PM',
      type: 'Meetup',
      description: 'Best practices for implementing digital learning solutions.',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop'
    }
  ]

  // Filter events based on search query
  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
            className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Upcoming Events</h1>
            <p className="text-xl text-gray-600 mb-8">
              Stay updated with our latest events, workshops, and conferences.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search Section */}
      <div className="container py-8">
        <motion.div 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search events..."
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-blue focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
          </div>
        </motion.div>
      </div>

      {/* Events Grid */}
      <div className="container pb-16 px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredEvents.map((event, index) => (
            <motion.div 
              key={event.id} 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 sm:p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{event.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${event.type === 'Virtual' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                    {event.type}
                  </span>
                </div>
                <p className="text-sm sm:text-base text-gray-600 mb-4">{event.description}</p>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <CalendarIcon className="h-5 w-5 mr-2" />
                    {new Date(event.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="h-5 w-5 mr-2" />
                    {event.time}
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-primary-blue text-white py-3 px-4 rounded-lg hover:bg-primary-yellow transition-colors duration-200 mt-auto font-medium text-sm sm:text-base"
                  onClick={() => setSelectedEvent(event)}
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">{selectedEvent.title}</h2>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <CalendarIcon className="h-5 w-5 mr-2" />
                    {new Date(selectedEvent.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <ClockIcon className="h-5 w-5 mr-2" />
                    {selectedEvent.time}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPinIcon className="h-5 w-5 mr-2" />
                    {selectedEvent.venue}
                  </div>
                </div>
                <div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <UserGroupIcon className="h-5 w-5 mr-2" />
                    Registration
                  </div>
                  <p className="text-gray-600">{selectedEvent.registration}</p>
                </div>
              </div>

              <div className="prose max-w-none mb-6">
                <h3 className="text-xl font-semibold mb-3">About the Event</h3>
                <p className="text-gray-600">{selectedEvent.longDescription}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">Agenda</h3>
                <div className="relative">
                  <div className="absolute left-2.5 top-0 h-full w-0.5 bg-gray-200"></div>
                  <ul className="space-y-6">
                    {selectedEvent.agenda?.map((item, index) => (
                      <li key={index} className="relative pl-10">
                        <div className="absolute left-0 top-1.5 h-5 w-5 rounded-full border-2 border-primary-blue bg-white"></div>
                        <p className="text-gray-600">{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Speakers</h3>
                <ul className="space-y-4">
                  {selectedEvent.speakers?.map((speaker, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <img
                        src={speaker.image}
                        alt={speaker.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-gray-900 font-medium">{speaker.name}</p>
                        <p className="text-gray-600 text-sm">{speaker.role}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  className="bg-primary-blue text-white px-6 py-2 rounded-lg hover:bg-primary-yellow transition-colors duration-200"
                  onClick={() => alert('Registration system coming soon!')}
                >
                  Register Now
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default Events