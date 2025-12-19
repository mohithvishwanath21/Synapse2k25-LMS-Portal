// import nodemailer from 'nodemailer'
// import 'dotenv/config'

// export const sendEmailOTP = async(email,name,otp)=>{
//     const transport = nodemailer.createTransport({
//         service : 'gmail',
//         auth :{
//             user : process.env.SENDER_EMAIL,
//             pass : process.env.SENDER_PASS
//         },
//     });

//     try {
//         await transport.sendMail({
//             from : process.env.SENDER_EMAIL,
//             to : email,
//             subject : `EduLMS Verification Message`,
//             text : `
// Dear ${name},

// Welcome to EduLMS!

// To ensure the security of your account, we require you to verify your email address. Please use the One-Time Password (OTP) provided below to complete your email verification:

// Your OTP Code: ${otp}

// This code is valid for the next 5 minutes.
// If you did not request this OTP, please ignore this email or contact our support team for assistance.
// Thank you for choosing EduLMS. We're excited to have you on board and look forward to helping you achieve your learning goals.

// Best regards,
// The EduLMS Team
// www.EduLMS.edu
// EduLMSlms@gmail.com
//           `,
//         });
//         return true;
//     } catch (error) {
//         console.error('Error sending mail:', err);
//         throw new Error('Error sending mail');
//     }

// };

// export const sendEmailResetPassword = async (email,name,resetToken) => {
    
//     const transport = nodemailer.createTransport({
//         service : 'gmail',
//         auth :{
//             user : process.env.SENDER_EMAIL,
//             pass : process.env.SENDER_PASS
//         },
//     });

//     try {
//         await transport.sendMail({
//             from : process.env.SENDER_EMAIL,
//             to : email,
//             subject : 'EduLMS Reset Password OTP',
//             text : `
// Dear ${name},

// We received a request to reset your password for your EduLMS account associated with this email address. If you didn't request a password reset, please ignore this email.

// To reset your password, Please use the One-Time Password (OTP) provided below :

// ${resetToken}

// This code will expire in 10 minutes for your security. If the OTP has expired, you can request a new password reset OTP from the EduLMS website.

// Best regards,
// The EduLMS Team
// www.EduLMS.edu
// EduLMSlms@gmail.com

//             `
//         })
//         return true;
//     } catch (error) {
//         console.error('Error sending mail:', err);
//         throw new Error('Error sending mail');
//     }
// }
import nodemailer from 'nodemailer'
import 'dotenv/config'

export const sendEmailOTP = async(email,name,otp)=>{
    const transport = nodemailer.createTransport({
        service : 'gmail',
        auth :{
            user : process.env.SENDER_EMAIL,
            pass : process.env.SENDER_PASS
        },
    });

    try {
        await transport.sendMail({
            from : process.env.SENDER_EMAIL,
            to : email,
            subject : `EduLMS Verification Message`,
            text : `
Dear ${name},

Welcome to EduLMS!

To ensure the security of your account, we require you to verify your email address. Please use the One-Time Password (OTP) provided below to complete your email verification:

Your OTP Code: ${otp}

This code is valid for the next 5 minutes.
If you did not request this OTP, please ignore this email or contact our support team for assistance.
Thank you for choosing EduLMS. We're excited to have you on board and look forward to helping you achieve your learning goals.

Best regards,
The EduLMS Team
www.EduLMS.edu
EduLMSlms@gmail.com
          `,
        });
        console.log(`OTP email sent to ${email}`);
        return true;
    } catch (error) { // Changed parameter name
        console.error('Error sending mail:', error); // Changed 'err' to 'error'
        throw new Error('Error sending mail: ' + error.message); // Added error message
    }

};

export const sendEmailResetPassword = async (email,name,resetToken) => {
    
    const transport = nodemailer.createTransport({
        service : 'gmail',
        auth :{
            user : process.env.SENDER_EMAIL,
            pass : process.env.SENDER_PASS
        },
    });

    try {
        await transport.sendMail({
            from : process.env.SENDER_EMAIL,
            to : email,
            subject : 'EduLMS Reset Password OTP',
            text : `
Dear ${name},

We received a request to reset your password for your EduLMS account associated with this email address. If you didn't request a password reset, please ignore this email.

To reset your password, Please use the One-Time Password (OTP) provided below :

${resetToken}

This code will expire in 10 minutes for your security. If the OTP has expired, you can request a new password reset OTP from the EduLMS website.

Best regards,
The EduLMS Team
www.EduLMS.edu
EduLMSlms@gmail.com

            `
        })
        console.log(`Reset password email sent to ${email}`);
        return true;
    } catch (error) { // Changed parameter name
        console.error('Error sending mail:', error); // Changed 'err' to 'error'
        throw new Error('Error sending mail: ' + error.message); // Added error message
    }
}