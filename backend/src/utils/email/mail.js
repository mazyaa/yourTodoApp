import nodemailer from 'nodemailer';
import fs from 'fs';
import handlebars from 'handlebars';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function compileTemplate(templateName, data) {
    const templateFile = fs.readFileSync(
        `${__dirname}/build/${templateName}.html`,
        'utf8'
    );

    const template = handlebars.compile(templateFile);

    return template(data);
}

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    services: 'gmail',
    auth: {
        user: process.env.EMAIL_ADDRESS, 
        pass: process.env.EMAIL_PASSWORD
    }
});

export async function sendEmail (to, subject, fileName, payload) {
    const html = compileTemplate(fileName, {
        name: to,
        ...payload
    });

    await transporter.sendMail({
        from: process.env.EMAIL_ADDRESS,
        to,
        subject,
        html
    });
}


