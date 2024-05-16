const receivingEmailAddress = 'mail@ifixgames.com';

// Function to send the email
async function sendEmail(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);

  const emailData = {
    to: receivingEmailAddress,
    from_name: formData.get('name'),
    from_email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message')
  };

  try {
    const response = await fetch('https://your-email-service.com/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailData)
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Email sent successfully:', result);
      alert('Email sent successfully');
    } else {
      console.error('Failed to send email:', response.statusText);
      alert('Failed to send email');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error sending email');
  }
}

// Attach the sendEmail function to your form's submit event
document.getElementById('contactForm').addEventListener('submit', sendEmail);
