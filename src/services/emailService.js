import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
emailjs.init('YOUR_PUBLIC_KEY');

export const sendConfirmationEmail = async (registrationData) => {
  try {
    const response = await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      {
        to_email: registrationData.email,
        to_name: `${registrationData.firstName} ${registrationData.lastName}`,
        event_title: registrationData.eventTitle,
        reservation_code: registrationData.reservationCode,
        registration_date: new Date().toLocaleDateString(),
      }
    );

    if (response.status === 200) {
      return { success: true };
    } else {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
};