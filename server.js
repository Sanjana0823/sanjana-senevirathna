const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const cors = require('cors');

// Enable CORS
app.use(cors());
app.use(bodyParser.json());

// Endpoint for sending email
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `New message from ${name}`,
        text: `You have received a new message.\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Error sending message');
        } else {
            console.log('Email sent: ' + info.response);
            return res.status(200).send('Message sent successfully');
        }
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
