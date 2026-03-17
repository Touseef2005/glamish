import dotenv from 'dotenv';
import nodemailer from 'nodemailer'

dotenv.config()

const emailConfig = {
    service: 'Gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
};



async function sendEmail(prop = { data, customerEmail, template, subject }) {

    const { data, customerEmail, template, subject } = prop;

    const transporter = nodemailer.createTransport(emailConfig);

    const mailOptions = {
        to: customerEmail,
        subject: subject,
        html: template(data)
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.response);
        return { data: info, success: true };
    } catch (error) {
        console.error('Error sending email:', error);
        return { message: error.message || 'Unknown error', success: false };
    }
}


export default sendEmail 
