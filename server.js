const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Email handling route
app.post('/send-email', async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Check if fields are present
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'Please provide name, email, subject, and message.' });
    }

    try {
        // Create a Nodemailer transporter using Gmail SMTP
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Email options
        const mailOptions = {
            from: `"${name}" <${email}>`, // Note: Gmail usually overrides "from" but it's good practice
            to: process.env.EMAIL_USER,    // You will receive the mail
            replyTo: email,               // Reply goes to the sender's email
            subject: `Portfolio Contact: ${subject}`,
            text: `
                Name: ${name}
                Email: ${email}
                Subject: ${subject}
                
                Message:
                ${message}
            `
        };

        // 1. Send the email to YOU (the owner)
        await transporter.sendMail(mailOptions);

        // 2. Send a confirmation email to the SENDER (the user)
        const confirmationMailOptions = {
            from: process.env.EMAIL_USER,
            to: email, // The user's email
            subject: `Thank you for reaching out, ${name}!`,
            text: `
                Hi ${name},
                
                Thank you for contacting me. I have received your message regarding "${subject}".
                
                I'll review it and get back to you as soon as possible.
                
                Best regards,
                Mohit Shah
                Computer Science Engineer
            `
        };

        await transporter.sendMail(confirmationMailOptions);
        
        console.log(`Email sent to owner and confirmation sent to ${email}`);
        res.status(200).json({ message: 'Success! Your message has been sent and a copy was mailed to you.' });

    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Sorry, there was an error sending your message. Please try again later.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
