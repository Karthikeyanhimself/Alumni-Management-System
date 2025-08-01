require('dotenv').config();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { Alumni1 } = require('../models/alumnidata'); // Adjust path if needed

const mongoURI = process.env.MONGO_URI;

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// WhatsApp API credentials
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const WHATSAPP_TEMPLATE_NAME = 'birthday_wish'; // Change to your actual template
const WHATSAPP_LANGUAGE_CODE = 'en_US';

function selectEmailTemplate() {
    const templates = ['template1.html', 'template2.html', 'template3.html'];
    const templatePath = path.join(__dirname, '..', 'templates', templates[new Date().getDate() % templates.length]);
    return fs.existsSync(templatePath) ? fs.readFileSync(templatePath, 'utf-8') : '<p>Happy Birthday, {{name}}!</p>';
}

const sendWhatsAppMessage = async (phoneNumber, templateName, languageCode, variables) => {
    if (!phoneNumber) return console.log(`Skipping WhatsApp message: No phone number provided.`);
    try {
        const response = await axios.post(
            `https://graph.facebook.com/v17.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
            {
                messaging_product: 'whatsapp',
                to: phoneNumber,
                type: 'template',
                template: {
                    name: templateName,
                    language: { code: languageCode },
                    components: [{ type: 'body', parameters: variables.map(text => ({ type: 'text', text })) }]
                }
            },
            { headers: { 'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`, 'Content-Type': 'application/json' } }
        );
        console.log(`WhatsApp message sent to ${phoneNumber}:`, response.data);
    } catch (error) {
        console.error(`Failed to send WhatsApp message to ${phoneNumber}:`, error.response?.data || error.message);
    }
};

async function sendBirthdayWishes() {
    await mongoose.connect(mongoURI);
    const currentDate = new Date();
    const currentDay = currentDate.getUTCDate();
    const currentMonth = currentDate.getUTCMonth() + 1;

    try {
        console.log('Checking for alumni with birthdays today...');

        // Use correct query based on date storage format
        let alumniWithBirthdayToday;
        const sampleAlumni = await Alumni1.findOne(); // Get sample to check format

        if (sampleAlumni && typeof sampleAlumni.birthday === 'string') {
            // If birthday is stored as a string (YYYY-MM-DD)
            alumniWithBirthdayToday = await Alumni1.find({
                birthday: { $regex: `-${String(currentMonth).padStart(2, '0')}-${String(currentDay).padStart(2, '0')}` }
            });
        } else {
            // If birthday is stored as a Date object
            alumniWithBirthdayToday = await Alumni1.aggregate([
                { $addFields: { birthdayDay: { $dayOfMonth: '$birthday' }, birthdayMonth: { $month: '$birthday' } } },
                { $match: { birthdayDay: currentDay, birthdayMonth: currentMonth } }
            ]);
        }

        if (alumniWithBirthdayToday.length === 0) {
            console.log('No alumni have birthdays today.');
            return;
        }

        console.log('Alumni with birthdays today:', alumniWithBirthdayToday.map(a => a.fullName).join(', '));

        const emailTemplate = selectEmailTemplate();

        for (const alumni of alumniWithBirthdayToday) {
            const emailOptions = {
                from: process.env.EMAIL_USER,
                to: alumni.email,
                subject: 'Happy Birthday!',
                html: emailTemplate.replace('{{name}}', alumni.fullName)
            };

            try {
                await transporter.sendMail(emailOptions);
                console.log(`Birthday email sent to: ${alumni.email}`);
            } catch (error) {
                console.error(`Failed to send birthday email to: ${alumni.email}`, error);
            }

            if (alumni.contact) {
                try {
                    await sendWhatsAppMessage(alumni.contact, WHATSAPP_TEMPLATE_NAME, WHATSAPP_LANGUAGE_CODE, [alumni.fullName]);
                    console.log(`Birthday WhatsApp message sent to: ${alumni.contact}`);
                } catch (error) {
                    console.error(`Failed to send birthday WhatsApp message to: ${alumni.contact}`, error);
                }
            }
        }
    } catch (error) {
        console.error('Error sending birthday wishes:', error);
    } finally {
        await mongoose.disconnect();
    }
}

sendBirthdayWishes();
