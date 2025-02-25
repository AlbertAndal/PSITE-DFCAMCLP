import { motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { sendConfirmationEmail } from '../services/emailService'

function Register() {
  const location = useLocation()
  const navigate = useNavigate()
  const eventDetails = location.state || {}

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    eventId: eventDetails.eventId || '',
    eventTitle: eventDetails.eventTitle || 'General Registration'
  })

  const [emailError, setEmailError] = useState('')
  const [phoneError, setPhoneError] = useState('')

  // Generate a unique reservation code
  const generateReservationCode = () => {
    const prefix = 'PSITE';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `${prefix}-${timestamp}-${random}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email.endsWith('@dfcamclp.edu.ph')) {
      setEmailError('Please use your DFCAMCLP email address (@dfcamclp.edu.ph)');
      return;
    }
    if (!/^\+63\d{10}$/.test(formData.phone)) {
      setPhoneError('Please enter a valid Philippine phone number (+63XXXXXXXXXX)');
      return;
    }

    const reservationCode = generateReservationCode();
    const registrationData = {
      ...formData,
      reservationCode,
      registrationDate: new Date().toISOString()
    };

    try {
      // Save registration data (TODO: Implement API call)
      console.log('Registration data:', registrationData);

      // Send confirmation email using EmailJS
      await sendConfirmationEmail(registrationData);

      alert(`Thank you for registering! A confirmation email has been sent to ${registrationData.email} with your reservation code: ${reservationCode}`);
      navigate('/events');
    } catch (error) {
      console.error('Registration error:', error);
      alert('An error occurred during registration. Please try again.');
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    
    if (name === 'phone') {
      // Remove all non-digit characters except +
      let formattedValue = value.replace(/[^\d+]/g, '')
      
      // Ensure it starts with +63 and has correct length
      if (!formattedValue.startsWith('+')) {
        if (formattedValue.startsWith('63')) {
          formattedValue = '+' + formattedValue
        } else if (formattedValue.startsWith('0')) {
          formattedValue = '+63' + formattedValue.substring(1)
        } else if (!formattedValue.startsWith('+63') && formattedValue.length > 0) {
          formattedValue = '+63' + formattedValue
        }
      }
      
      // Validate phone number format
      const isValidPhone = /^\+63\d{10}$/.test(formattedValue)
      setPhoneError(isValidPhone || formattedValue === '' ? '' : 'Please enter a valid Philippine phone number (+63XXXXXXXXXX)')
      
      setFormData(prevState => ({
        ...prevState,
        [name]: formattedValue
      }))
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }))
      
      if (name === 'email') {
        setEmailError(value.endsWith('@dfcamclp.edu.ph') ? '' : 'Please use your DFCAMCLP email address (@dfcamclp.edu.ph)')
      }
    }
  }

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
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Event Registration</h1>
            <p className="text-xl text-gray-600 mb-8">
              {eventDetails.eventTitle 
                ? `Register for ${eventDetails.eventTitle}`
                : 'Register for our upcoming events'}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Registration Form */}
      <div className="container py-16">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address (DFCAMCLP Email Only)
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  pattern=".+@dfcamclp\.edu\.ph"
                  className={`w-full px-4 py-2 border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent`}
                  placeholder="youremail@dfcamclp.edu.ph"
                />
                {emailError && (
                  <p className="mt-1 text-sm text-red-500">{emailError}</p>
                )}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+63XXXXXXXXXX"
                  pattern="^\+63\d{10}$"
                  className={`w-full px-4 py-2 border ${phoneError ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent`}
                />
                {phoneError && (
                  <p className="mt-1 text-sm text-red-500">{phoneError}</p>
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-primary-blue text-white py-3 px-6 rounded-lg hover:bg-primary-yellow transition-colors duration-200 font-medium"
              >
                Register Now
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Register
