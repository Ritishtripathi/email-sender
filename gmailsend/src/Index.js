const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/thank-you', (req, res) => {
    res.sendFile(__dirname + '/thank-you.html');
});

app.post('/send-thank-you-email', async (req, res) => {
    const userEmail = req.body.email;

    const transporter = nodemailer.createTransport({
        host: 'mail.himanshukashyap.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'testing@himanshukashyap.com',
            pass: '94BOkYs59Kf*'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
        from: 'testing@himanshukashyap.com',
        to: userEmail,
        subject: 'Thank You for Your Submission',
        html: '<h1>Thank You!</h1><p>Your message has been received.</p>'
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        res.redirect('/thank-you');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
``