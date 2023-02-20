const AppConstants = require('../../config/constants');
const nodemailer = require('nodemailer');

const sendEmail = async (data) => {
    try {
        var transport = nodemailer.createTransport({
            host: AppConstants.SMTP.HOST,
            port: AppConstants.SMTP.PORT,
            auth: {
                user: AppConstants.SMTP.USER,
                pass: AppConstants.SMTP.PASS
            }
        });

        const emailResponse = await transport.sendMail({
            from: data.from,
            to: data.to,
            subject: data.subject,
            text: data.textMessage ?? null,
            html: data.htmlMessage ?? null
        });

        return emailResponse;
    }
    catch (err) {
        throw err;
    }
};

module.exports = {
    sendEmail
}