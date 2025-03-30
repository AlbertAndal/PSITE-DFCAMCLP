import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTeam } from '../context/TeamContext' // Import the TeamContext
import { FaLinkedin, FaGithub, FaEnvelope, FaGlobe } from 'react-icons/fa' // Import social icons

function About() {
  // Use the team members from context instead of hardcoded array
  const { teamMembers, loading } = useTeam();
  
  // Separate core team members and alumni based on the 'type' field
  // If 'type' doesn't exist, consider all as core team for backward compatibility
  const coreTeamMembers = teamMembers.filter(member => !member.type || member.type === 'core');
  const alumniMembers = teamMembers.filter(member => member.type === 'alumni');

  // Function to render member card with social links
  const renderMemberCard = (member, index) => (
    <motion.div 
      key={member.id || index} 
      className="text-center"
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <div className="mb-4">
        <img
          src={member.imageUrl || `https://i.pravatar.cc/300?img=${index + 1}`}
          alt={member.name}
          className="w-48 h-48 rounded-full mx-auto object-cover shadow-lg"
          onError={(e) => {
            // Fallback if image doesn't load
            e.target.src = `https://i.pravatar.cc/300?img=${index + 1}`;
          }}
        />
      </div>
      <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
      <p className="text-primary-blue font-medium">{member.position}</p>
      {member.batch && <p className="text-gray-600">Batch {member.batch}</p>}
      <p className="text-gray-600">{member.institution || 'DFCAMCLP'}</p>
      
      {/* Social links */}
      <div className="flex justify-center space-x-3 mt-2">
        {member.linkedin && (
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" 
             className="text-gray-600 hover:text-blue-600">
            <FaLinkedin size={18} />
          </a>
        )}
        {member.github && (
          <a href={member.github} target="_blank" rel="noopener noreferrer"
             className="text-gray-600 hover:text-gray-900">
            <FaGithub size={18} />
          </a>
        )}
        {member.email && (
          <a href={`mailto:${member.email}`}
             className="text-gray-600 hover:text-red-500">
            <FaEnvelope size={18} />
          </a>
        )}
        {member.website && (
          <a href={member.website} target="_blank" rel="noopener noreferrer"
             className="text-gray-600 hover:text-green-600">
            <FaGlobe size={18} />
          </a>
        )}
      </div>
    </motion.div>
  );

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
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue"></div>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-4 gap-8">
              {coreTeamMembers && coreTeamMembers.length > 0 ? (
                coreTeamMembers.map((member, index) => renderMemberCard(member, index))
              ) : (
                // Fallback to static data if no team members in database
                Array(4).fill(0).map((_, index) => (
                  <motion.div 
                    key={`fallback-${index}`} 
                    className="text-center"
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="mb-4">
                      <img
                        src={`https://i.pravatar.cc/300?img=${index + 1}`}
                        alt="Team Member"
                        className="w-48 h-48 rounded-full mx-auto object-cover shadow-lg"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Team Member</h3>
                    <p className="text-primary-blue font-medium">Position</p>
                    <p className="text-gray-600">DFCAMCLP</p>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Alumni Section */}
      <div className="bg-gray-50 py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Alumni</h2>
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue"></div>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-4 gap-8">
              {alumniMembers && alumniMembers.length > 0 ? (
                alumniMembers.map((member, index) => renderMemberCard(member, index))
              ) : (
                <div className="col-span-4 text-center py-8">
                  <p className="text-gray-600 text-lg">No alumni members yet.</p>
                </div>
              )}
            </motion.div>
          )}
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
            Become a member today and be part of the leading Bachelor of Science in Information Systems network on campus.
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