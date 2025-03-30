import { motion } from 'framer-motion'
import { CheckCircleIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'

function Resources() {
  const [activeSection, setActiveSection] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-section]')
      let currentSection = ''

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 100) {
          currentSection = section.getAttribute('data-section')
        }
      })

      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const section = document.querySelector(`[data-section="${sectionId}"]`)
    if (section) {
      const yOffset = -80 // Account for sticky header
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  const canvaPackSteps = [
    {
      title: 'Prepare Requirements',
      description: 'Before applying, make sure you have:',
      details: [
        '.edu email – Your official school email (e.g., yourname@school.edu.ph)',
        'Canva Account – If you don\'t have one, create an account at Canva Sign Up',
        'Valid Student ID / Proof of Enrollment – You can use your school ID, enrollment form, or registration slip'
      ]
    },
    {
      title: 'Apply for Canva for Education',
      description: 'Follow these steps to get your free Pro Plan:',
      details: [
        'Visit Canva for Education website',
        'Click "Get Canva for Education"',
        'Fill in your school details and .edu email',
        'Verify your student status',
        'Wait for approval (usually within 24 hours)'
      ]
    },
    {
      title: 'Start Using Canva Pro',
      description: 'Once approved:',
      details: [
        'Log in to your Canva account',
        'Access all Pro features for free',
        'Start creating professional designs',
        'Collaborate with your classmates'
      ]
    }
  ]

  const canvaBenefits = [
    'Access to 100+ million premium stock photos, videos, and elements',
    'Brand Kit for consistent design across projects',
    'Background Remover tool',
    'Magic Resize to quickly adapt designs',
    'Premium templates and fonts',
    'Team collaboration features',
    'Unlimited storage for your designs'
  ]

  const studentPackSteps = [
    {
      title: 'Prepare Requirements',
      description: 'Before applying, make sure you have:',
      details: [
        '.edu email – Your official school email (e.g., yourname@school.edu.ph)',
        'GitHub Account – If you don\'t have one, create an account at GitHub Sign Up',
        'Valid Student ID / Proof of Enrollment – You can use your school ID, enrollment form, or registration slip',
        'School Name & Expected Graduation Date – Provide accurate details'
      ]
    },
    {
      title: 'Go to the Application Page',
      description: 'Start your application process:',
      details: [
        'Open the GitHub Student Developer Pack website',
        'Click "Get the Pack" to start the application',
        'Log in to GitHub using your account'
      ]
    },
    {
      title: 'Verify Student Status',
      description: 'Complete the verification process:',
      details: [
        'Select "I am a student"',
        'Enter your school\'s name in the "What\'s the name of your school?" field',
        'Use your .edu email for verification (e.g., yourname@dfcamclp.edu.ph)',
        'If you don\'t have a .edu email, you can upload a student ID or enrollment form instead',
        'Enter your Expected Graduation Date (e.g., 2026 if you are in your 3rd year now)',
        'Provide a reason for applying - Example: "I am a student studying Information Systems, and I need access to developer tools for my projects and learning."'
      ]
    },
    {
      title: 'Submit and Wait',
      description: 'Finalize your application:',
      details: [
        'Double-check all the details',
        'Click Submit Application and wait for GitHub\'s response',
        'GitHub usually reviews applications within a few days, but it can take up to 2 weeks',
        'You\'ll receive a confirmation email once your application is approved'
      ]
    }
  ]

  const studentPackBenefits = [
    'GitHub Pro – Unlimited private repositories & collaboration tools',
    'Free domains (e.g., .me domain from Namecheap)',
    'Cloud services – AWS, Microsoft Azure, Google Cloud credits',
    'Premium developer tools – JetBrains, Canva Pro, Bootstrap Studio, and more',
    'Access to exclusive GitHub features and resources',
    'Learning resources and tutorials',
    'Professional development opportunities'
  ]

  const notionPackSteps = [
    {
      title: 'Prepare Requirements',
      description: 'Before applying, make sure you have:',
      details: [
        '.edu email – Your official school email (e.g., yourname@school.edu.ph)',
        'Notion Account – If you don\'t have one, create an account at Notion Sign Up'
      ]
    },
    {
      title: 'Apply for Notion\'s Free Student Plan',
      description: 'Follow these steps to get your free Pro Plan:',
      details: [
        'Open the Notion for Students & Educators website',
        'Click "Get free Pro Plan" to start',
        'Sign in to your Notion account (or create one)',
        'Enter your .edu email and click Continue',
        'Check your school email inbox for a verification link and confirm'
      ]
    },
    {
      title: 'Enjoy Notion Pro for Free',
      description: 'Start using your upgraded account:',
      details: [
        'Your account will be automatically upgraded to Personal Pro Plan',
        'Start creating unlimited pages and workspaces',
        'Invite collaborators and share your work',
        'Access all premium features at no cost'
      ]
    }
  ]

  const notionBenefits = [
    'Unlimited Pages & Blocks – No restrictions on adding content',
    'Unlimited File Uploads – Upload PDFs, images, and videos',
    'Unlimited Guests – Collaborate with classmates & professors',
    'Advanced Sharing Features – Manage access control & permissions',
    'Enhanced Organization Tools – Create databases, kanban boards, and more',
    'Cross-platform Sync – Access your notes anywhere, anytime',
    'Advanced Page Analytics – Track engagement and usage'
  ]

  // Add Miro Student Plan steps
  const miroPackSteps = [
    {
      title: 'Verify Eligibility',
      description: 'Before applying, check your student status:',
      details: [
        'Requirement: You need an email address issued by an educational institution (like @dfcamclp.edu.ph) to qualify for the Miro Student Plan.',
        'Action: Confirm that your @dfcamclp.edu.ph email is active and accessible, as Miro will use it to verify your student status.'
      ]
    },
    {
      title: 'Sign Up or Log In to Miro',
      description: 'Create or access your Miro account:',
      details: [
        'Visit miro.com',
        'If you don\'t have a Miro account yet, click "Sign up free" on the homepage',
        'Use your @dfcamclp.edu.ph email address to create an account',
        'Follow the prompts to set a password and complete the initial registration',
        'If you already have an account, log in with your @dfcamclp.edu.ph email or switch your account email'
      ]
    },
    {
      title: 'Update Your Email (If Necessary)',
      description: 'Change your existing email to your school email:',
      details: [
        'Log in to Miro',
        'Go to your Profile Settings (click your profile icon in the top-right corner and select "Settings")',
        'Under the "Email" section, update it to @dfcamclp.edu.ph',
        'Verify the new email by clicking the link sent to your inbox'
      ]
    },
    {
      title: 'Apply for the Education Plan',
      description: 'Submit your application for the student plan:',
      details: [
        'Visit miro.com/education or navigate to it from the Miro homepage',
        'Select "Apply for the Student Plan" option',
        'Fill out the application form with your @dfcamclp.edu.ph email',
        'Provide any additional required details about your institution',
        'Submit your application'
      ]
    },
    {
      title: 'Wait for Verification',
      description: 'Allow time for approval:',
      details: [
        'Miro will verify your educational email automatically or manually',
        'Check your @dfcamclp.edu.ph inbox for a confirmation email (including spam folders)',
        'Follow any instructions provided in the approval email'
      ]
    },
    {
      title: 'Start Using the Student Plan',
      description: 'Access your premium features:',
      details: [
        'Log in to Miro with your verified @dfcamclp.edu.ph email',
        'Enjoy access to premium features like unlimited boards and collaboration tools',
        'Start creating and collaborating on your projects'
      ]
    }
  ]

  const miroBenefits = [
    'Unlimited boards for your projects and collaborations',
    'Advanced collaboration features for team projects',
    'Access to all templates and education resources',
    'Integrations with other tools like Microsoft Teams, Zoom, and Google Workspace',
    'Export options in various formats',
    'Presentation mode for project demonstrations',
    'Video chat capability directly in boards'
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 relative"
    >
      {/* Sticky Tab Navigation */}
      <div className="sticky top-16 bg-white shadow-sm z-40 border-b">
        <div className="container">
          <div className="flex overflow-x-auto hide-scrollbar py-2 sm:py-0">
            {[
              { id: 'github', label: 'GitHub Student Pack' },
              { id: 'notion', label: 'Notion for Students' },
              { id: 'canva', label: 'Canva for Education' },
              { id: 'miro', label: 'Miro Student Plan' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-medium whitespace-nowrap border-b-2 transition-colors duration-200 ${
                  activeSection === item.id
                    ? 'border-primary-blue text-primary-blue'
                    : 'border-transparent text-gray-600 hover:text-primary-blue hover:border-gray-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Remove the floating navigation menu */}

      {/* Hero Section */}
      <div className="bg-white py-16" data-section="github">
        <div className="container">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-6">GitHub Student Developer Pack Guide</h1>
            <p className="text-xl text-gray-600 mb-8">
              Get free access to premium developer tools and resources through the GitHub Student Developer Pack program.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Rest of the sections with data-section attributes */}
      <div className="container py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Step-by-Step Application Guide</h2>
          <div className="space-y-12">
            {studentPackSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-blue text-white font-semibold">
                      {index + 1}
                    </span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    <ul className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start">
                          <CheckCircleIcon className="h-6 w-6 text-primary-blue mr-2 flex-shrink-0" />
                          <span className="text-gray-600">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What You Get with the Student Pack</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {studentPackBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start"
                >
                  <CheckCircleIcon className="h-6 w-6 text-primary-blue mr-3 flex-shrink-0" />
                  <span className="text-gray-600">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Notion for Students Section */}
      <div className="bg-gray-50 py-16" data-section="notion">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How to Get Notion Pro for Free as a Student</h2>
            <div className="space-y-12">
              {notionPackSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-lg shadow-sm"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-blue text-white font-semibold">
                        {index + 1}
                      </span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600 mb-4">{step.description}</p>
                      <ul className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start">
                            <CheckCircleIcon className="h-6 w-6 text-primary-blue mr-2 flex-shrink-0" />
                            <span className="text-gray-600">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Notion Benefits Section */}
      <div className="bg-white py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What You Get with Notion's Student Plan</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {notionBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start"
                >
                  <CheckCircleIcon className="h-6 w-6 text-primary-blue mr-3 flex-shrink-0" />
                  <span className="text-gray-600">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Canva for Students Section */}
      <div className="bg-gray-50 py-16" data-section="canva">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How to Get Canva Pro for Free as a Student</h2>
            <div className="space-y-12">
              {canvaPackSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-lg shadow-sm"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-blue text-white font-semibold">
                        {index + 1}
                      </span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600 mb-4">{step.description}</p>
                      <ul className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start">
                            <CheckCircleIcon className="h-6 w-6 text-primary-blue mr-2 flex-shrink-0" />
                            <span className="text-gray-600">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Canva Benefits Section */}
      <div className="bg-white py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What You Get with Canva for Education</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {canvaBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start"
                >
                  <CheckCircleIcon className="h-6 w-6 text-primary-blue mr-3 flex-shrink-0" />
                  <span className="text-gray-600">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Miro for Students Section */}
      <div className="bg-gray-50 py-16" data-section="miro">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How to Get Miro Pro for Free as a Student</h2>
            <div className="space-y-12">
              {miroPackSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-lg shadow-sm"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-blue text-white font-semibold">
                        {index + 1}
                      </span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600 mb-4">{step.description}</p>
                      <ul className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start">
                            <CheckCircleIcon className="h-6 w-6 text-primary-blue mr-2 flex-shrink-0" />
                            <span className="text-gray-600">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Miro Benefits Section */}
      <div className="bg-white py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What You Get with Miro's Student Plan</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {miroBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start"
                >
                  <CheckCircleIcon className="h-6 w-6 text-primary-blue mr-3 flex-shrink-0" />
                  <span className="text-gray-600">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
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
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Boost Your Productivity?</h2>
            <p className="text-xl text-primary-white mb-8">
              Get started with these powerful educational tools today and transform your learning experience!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.a
                href="https://www.notion.so/students"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary-white text-primary-blue px-8 py-4 rounded-lg font-medium hover:bg-primary-yellow transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
              >
                Get Notion Pro
              </motion.a>
              <motion.a
                href="https://education.github.com/pack"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary-white text-primary-blue px-8 py-4 rounded-lg font-medium hover:bg-primary-yellow transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
              >
                Get GitHub Pack
              </motion.a>
              <motion.a
                href="https://www.canva.com/education/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary-white text-primary-blue px-8 py-4 rounded-lg font-medium hover:bg-primary-yellow transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
              >
                Get Canva Pro
              </motion.a>
              <motion.a
                href="https://miro.com/education/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary-white text-primary-blue px-8 py-4 rounded-lg font-medium hover:bg-primary-yellow transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
              >
                Get Miro Pro
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default Resources