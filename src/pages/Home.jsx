import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

function Home() {
  const [animatedNumbers, setAnimatedNumbers] = useState({
    members: 0,
    events: 0,
    papers: 0,
    institutions: 0
  })

  const targetNumbers = {
    members: 500,
    events: 50,
    papers: 100,
    institutions: 20
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate numbers when section is in view
            const duration = 2000 // 2 seconds
            const steps = 60
            const interval = duration / steps

            let currentStep = 0

            const timer = setInterval(() => {
              currentStep++
              const progress = currentStep / steps

              setAnimatedNumbers({
                members: Math.round(targetNumbers.members * progress),
                events: Math.round(targetNumbers.events * progress),
                papers: Math.round(targetNumbers.papers * progress),
                institutions: Math.round(targetNumbers.institutions * progress)
              })

              if (currentStep === steps) {
                clearInterval(timer)
              }
            }, interval)

            // Disconnect observer after animation starts
            observer.disconnect()
          }
        })
      },
      { threshold: 0.2 }
    )

    const statsSection = document.querySelector('#stats-section')
    if (statsSection) {
      observer.observe(statsSection)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <div className="bg-white py-24">
        <div className="container">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto text-center px-4 sm:px-6">
            <p className="text-sm sm:text-base font-medium text-primary-blue mb-3">Welcome to</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-900">
              Best IT Education Community in Town
            </h1>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-gray-500 px-4">
              Join PSITE DFCAMCLP Chapter, where we take your teaching excellence to a whole new level! Our community is dedicated to empowering IT educators.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Partners Section */}
      <div className="border-t border-gray-100 bg-white">
        <div className="container py-6 sm:py-8">
          <div className="space-y-8">
            {/* Technology Partners */}
            <div>
              <p className="text-center text-sm sm:text-base text-gray-500 mb-4 sm:mb-6">Technology Partners:</p>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex justify-center items-center gap-8 sm:gap-16">
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  href="https://www.notion.so/education" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:opacity-100 transition-opacity w-24 sm:w-32">
                  <img
                    src="/Notion.png"
                    alt="Notion Education"
                    className="h-8 sm:h-12 w-auto object-contain"
                    style={{ filter: 'brightness(0.9)' }}
                  />
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:opacity-100 transition-opacity w-24 sm:w-32">
                  <img
                    src="/Github.png"
                    alt="GitHub"
                    className="h-8 sm:h-12 w-auto object-contain"
                    style={{ filter: 'brightness(0.9)' }}
                  />
                </motion.a>
              </motion.div>
            </div>

            {/* Organization Partners */}
            <div>
              <p className="text-center text-sm sm:text-base text-gray-500 mb-4 sm:mb-6">Organization Partners:</p>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex justify-center items-center">
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  href="https://theblokc.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:opacity-100 transition-opacity w-24 sm:w-32">
                  <img
                    src="/TheBlock.png"
                    alt="The Block"
                    className="h-8 sm:h-12 w-auto object-contain"
                    style={{ filter: 'brightness(0.9)' }}
                  />
                </motion.a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container section bg-gray-50">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8">
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Professional Development</h3>
            <p className="text-gray-500">Access workshops, seminars, and training programs to enhance your teaching skills.</p>
          </motion.div>
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Networking Opportunities</h3>
            <p className="text-gray-500">Connect with fellow IT educators and industry professionals.</p>
          </motion.div>
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Research Collaboration</h3>
            <p className="text-gray-500">Participate in research projects and academic collaborations.</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Content Section */}
      <div id="stats-section" className="bg-white py-16">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Empowering IT Educators Since 2010</h2>
              <div className="grid grid-cols-2 gap-8 mb-8">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <p className="text-3xl font-bold text-primary-blue">{animatedNumbers.members}+</p>
                  <p className="text-gray-600">Active Members</p>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <p className="text-3xl font-bold text-primary-blue">{animatedNumbers.events}+</p>
                  <p className="text-gray-600">Annual Events</p>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <p className="text-3xl font-bold text-primary-blue">{animatedNumbers.papers}+</p>
                  <p className="text-gray-600">Research Papers</p>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <p className="text-3xl font-bold text-primary-blue">{animatedNumbers.institutions}+</p>
                  <p className="text-gray-600">Partner Institutions</p>
                </motion.div>
              </div>
            </div>
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-6">
              <p className="text-lg text-gray-600">PSITE DFCAMCLP Chapter has been at the forefront of IT education excellence, fostering collaboration and innovation among educators.</p>
              <p className="text-lg text-gray-600">Through our programs and initiatives, we've helped shape the future of IT education in our region.</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Social Proof Section */}
      <div className="bg-gray-50 py-16">
        <div className="container">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-gray-900 mb-12">What Our Members Say</motion.h2>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-gray-600 mb-4">"PSITE has been instrumental in my growth as an IT educator. The networking opportunities and professional development programs are invaluable."</p>
              <div>
                <p className="font-semibold text-gray-900">Dr. Maria Santos</p>
                <p className="text-gray-500">Department Head, Computer Science</p>
              </div>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-gray-600 mb-4">"The collaborative research opportunities provided by PSITE have led to significant breakthroughs in IT education methodologies."</p>
              <div>
                <p className="font-semibold text-gray-900">Prof. James Rodriguez</p>
                <p className="text-gray-500">Senior IT Instructor</p>
              </div>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-gray-600 mb-4">"Being part of PSITE has opened doors to countless opportunities for both professional growth and student development."</p>
              <div>
                <p className="font-semibold text-gray-900">Ms. Anna Lee</p>
                <p className="text-gray-500">IT Program Coordinator</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Call to Action Section */}
      <div className="bg-primary-blue py-16">
        <div className="container">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Join Our Growing Community</h2>
            <p className="text-xl text-white mb-8">Become a member today and be part of the leading IT educators' network in the region.</p>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                to="/contact"
                className="inline-block bg-primary-white text-primary-blue px-8 py-4 rounded-lg font-medium hover:bg-primary-yellow transition-colors duration-200"
              >
                Join PSITE Now
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default Home