import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function About() {
  const coreTeam = [
    {
      name: 'Dr. Robert Wilson',
      position: 'Team Advisor',
      org: 'DFCAMCLP',
      image: 'https://i.pravatar.cc/300?img=5'
    },
    {
      name: 'Prof. Maria Garcia',
      position: 'Co-Advisor',
      org: 'DFCAMCLP',
      image: 'https://i.pravatar.cc/300?img=6'
    },
    {
      name: 'Dr. John Smith',
      position: 'Chapter President',
      org: 'DFCAMCLP',
      image: 'https://i.pravatar.cc/300?img=1'
    },
    {
      name: 'Dr. Sarah Johnson',
      position: 'Vice President',
      org: 'DFCAMCLP',
      image: 'https://i.pravatar.cc/300?img=2'
    },
    {
      name: 'Prof. Michael Chen',
      position: 'Secretary',
      org: 'DFCAMCLP',
      image: 'https://i.pravatar.cc/300?img=3'
    },
    {
      name: 'Dr. Emily Rodriguez',
      position: 'Treasurer',
      org: 'DFCAMCLP',
      image: 'https://i.pravatar.cc/300?img=4'
    }
  ]

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <div className="bg-white py-16">
        <div className="container">
          <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">About PSITE DFCAMCLP</h1>
            <p className="text-xl text-gray-600 mb-8">
              Empowering IT educators through collaboration, innovation, and excellence in education.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="bg-gray-50 py-16">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-primary-blue mb-4">Our Mission</h2>
              <p className="text-gray-600">
                To foster excellence in IT education through professional development, collaborative research, 
                and the promotion of innovative teaching methodologies among educators in the DFCAMCLP region.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-primary-blue mb-4">Our Vision</h2>
              <p className="text-gray-600">
                To be the leading organization of IT educators in the region, recognized for advancing 
                quality education and producing globally competitive IT professionals.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Core Team Section */}
      <div className="bg-white py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Meet Our Core Team</h2>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-8">
            {coreTeam.map((member, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-48 h-48 rounded-full mx-auto object-cover shadow-lg"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                <p className="text-primary-blue font-medium">{member.position}</p>
                <p className="text-gray-600">{member.org}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-primary-blue py-16">
        <div className="container">
          <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Join Our Community</h2>
            <p className="text-xl text-primary-white mb-8">
              Be part of our growing network of IT educators and help shape the future of IT education.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-primary-white text-primary-blue px-8 py-4 rounded-lg font-medium hover:bg-primary-yellow transition-colors duration-200"
            >
              Get Involved
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default About