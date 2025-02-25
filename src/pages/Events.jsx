import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function Events() {
  const upcomingEvents = [
    {
      id: 1,
      title: 'Tech Innovation Summit 2024',
      date: 'March 15, 2024',
      time: '9:00 AM - 5:00 PM',
      location: 'DFCAMCLP Main Auditorium',
      description: 'Join us for a day of exploring cutting-edge technologies and networking with industry leaders.',
      image: '/event-summit.jpg'
    },
    {
      id: 2,
      title: 'Web Development Workshop',
      date: 'March 20, 2024',
      time: '2:00 PM - 6:00 PM',
      location: 'Computer Laboratory 3',
      description: 'Hands-on workshop on modern web development technologies and best practices.',
      image: '/event-workshop.jpg'
    },
    {
      id: 3,
      title: 'IT Career Fair 2024',
      date: 'April 5, 2024',
      time: '10:00 AM - 4:00 PM',
      location: 'DFCAMCLP Campus Grounds',
      description: 'Connect with top tech companies and explore career opportunities in the IT industry.',
      image: '/event-career.jpg'
    }
  ]

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
          {upcomingEvents.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
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
                  <p className="text-gray-600">{event.description}</p>
                </div>
                <Link
                  to="/register"
                  state={{ eventId: event.id, eventTitle: event.title }}
                  className="block w-full bg-primary-blue text-white text-center py-3 rounded-lg hover:bg-primary-yellow transition-colors duration-200"
                >
                  Register Now
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-primary-blue py-16">
        <div className="container">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Don't Miss Out!</h2>
            <p className="text-xl text-primary-white mb-8">
              Register now to secure your spot in our upcoming events.
            </p>
            <Link
              to="/register"
              className="inline-block bg-primary-white text-primary-blue px-8 py-4 rounded-lg font-medium hover:bg-primary-yellow transition-colors duration-200"
            >
              Register for Events
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default Events