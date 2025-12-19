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
//         console.log(`OTP email sent to ${email}`);
//         return true;
//     } catch (error) { // Changed parameter name
//         console.error('Error sending mail:', error); // Changed 'err' to 'error'
//         throw new Error('Error sending mail: ' + error.message); // Added error message
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
//         console.log(`Reset password email sent to ${email}`);
//         return true;
//     } catch (error) { // Changed parameter name
//         console.error('Error sending mail:', error); // Changed 'err' to 'error'
//         throw new Error('Error sending mail: ' + error.message); // Added error message
//     }
// }

// import { Resend } from 'resend';
// import 'dotenv/config';

// // Initialize Resend with your API key
// const resend = new Resend(process.env.RESEND_API_KEY);

// export const sendEmailOTP = async(email, name, otp) => {
//     try {
//         const { data, error } = await resend.emails.send({
//             from: 'EduLMS <onboarding@resend.dev>',  // Can change to your email later
//             to: email,
//             subject: 'EduLMS Verification Message',
//             html: `
//                 <div style="font-family: Arial, sans-serif; padding: 20px;">
//                     <h2>Dear ${name},</h2>
                    
//                     <p>Welcome to <strong>EduLMS</strong>!</p>
                    
//                     <p>To ensure the security of your account, we require you to verify your email address. 
//                     Please use the One-Time Password (OTP) provided below to complete your email verification:</p>
                    
//                     <div style="background: #f4f4f4; padding: 15px; font-size: 28px; 
//                           font-weight: bold; text-align: center; margin: 25px 0; 
//                           letter-spacing: 5px; border-radius: 5px;">
//                         ${otp}
//                     </div>
                    
//                     <p><strong>This code is valid for the next 5 minutes.</strong></p>
                    
//                     <p>If you did not request this OTP, please ignore this email or contact our support team for assistance.</p>
                    
//                     <p>Thank you for choosing EduLMS. We're excited to have you on board and look forward to helping you achieve your learning goals.</p>
                    
//                     <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                    
//                     <p style="color: #666; font-size: 14px;">
//                         <strong>Best regards,</strong><br>
//                         The EduLMS Team<br>
//                         www.EduLMS.edu<br>
//                         EduLMSlms@gmail.com
//                     </p>
//                 </div>
//             `,
//             // Also include plain text version
//             text: `
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
//             `
//         });

//         if (error) {
//             console.error('❌ Resend Error:', error);
//             return false; // Return false instead of throwing error
//         }

//         console.log(`✅ OTP email sent to ${email} (ID: ${data?.id})`);
//         return true;
        
//     } catch (error) {
//         console.error('❌ Email sending failed:', error.message);
//         return false; // Don't throw - return false so controller can handle it
//     }
// };

// export const sendEmailResetPassword = async (email, name, resetToken) => {
//     try {
//         const { data, error } = await resend.emails.send({
//             from: 'EduLMS <onboarding@resend.dev>',
//             to: email,
//             subject: 'EduLMS Reset Password OTP',
//             html: `
//                 <div style="font-family: Arial, sans-serif; padding: 20px;">
//                     <h2>Dear ${name},</h2>
                    
//                     <p>We received a request to reset your password for your EduLMS account associated with this email address. 
//                     If you didn't request a password reset, please ignore this email.</p>
                    
//                     <div style="background: #f4f4f4; padding: 15px; font-size: 28px; 
//                           font-weight: bold; text-align: center; margin: 25px 0; 
//                           letter-spacing: 5px; border-radius: 5px;">
//                         ${resetToken}
//                     </div>
                    
//                     <p><strong>This code will expire in 10 minutes for your security.</strong></p>
                    
//                     <p>If the OTP has expired, you can request a new password reset OTP from the EduLMS website.</p>
                    
//                     <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                    
//                     <p style="color: #666; font-size: 14px;">
//                         <strong>Best regards,</strong><br>
//                         The EduLMS Team<br>
//                         www.EduLMS.edu<br>
//                         EduLMSlms@gmail.com
//                     </p>
//                 </div>
//             `,
//             text: `
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
//         });

//         if (error) {
//             console.error('❌ Resend Error (reset password):', error);
//             return false;
//         }

//         console.log(`✅ Reset password email sent to ${email} (ID: ${data?.id})`);
//         return true;
        
//     } catch (error) {
//         console.error('❌ Reset password email failed:', error.message);
//         return false;
//     }
// };
import 'dotenv/config';
import formData from 'form-data';
import Mailgun from 'mailgun.js';

export const sendEmailOTP = async(email, name, otp) => {
    try {
        // Initialize Mailgun with API key
        const mailgun = new Mailgun(formData);
        const mg = mailgun.client({
            username: 'api',
            key: process.env.MAILGUN_API_KEY || 'your-api-key-here'
        });

        await mg.messages.create(
            process.env.MAILGUN_DOMAIN || 'sandbox66027832c4804ed3b3fdfcd7368f9a4c.mailgun.org',
            {
                from: `EduLMS <postmaster@${process.env.MAILGUN_DOMAIN || 'sandbox66027832c4804ed3b3fdfcd7368f9a4c.mailgun.org'}>`,
                to: [email],
                subject: 'EduLMS Verification Message',
                html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px;">
                        <h2>Dear ${name},</h2>
                        <p>Welcome to <strong>EduLMS</strong>!</p>
                        <p>To ensure the security of your account, we require you to verify your email address.</p>
                        <div style="background: #f4f4f4; padding: 15px; font-size: 28px; 
                              font-weight: bold; text-align: center; margin: 25px 0; 
                              letter-spacing: 5px; border-radius: 5px;">
                            ${otp}
                        </div>
                        <p><strong>This code is valid for the next 5 minutes.</strong></p>
                        <p>If you did not request this OTP, please ignore this email.</p>
                        <p>Thank you for choosing EduLMS!</p>
                        <hr style="margin: 30px 0;">
                        <p style="color: #666; font-size: 14px;">
                            <strong>Best regards,</strong><br>
                            The EduLMS Team<br>
                            www.EduLMS.edu
                        </p>
                    </div>
                `,
                text: `Dear ${name},\n\nYour EduLMS verification code is: ${otp}\n\nThis code expires in 5 minutes.\n\nBest regards,\nThe EduLMS Team`
            }
        );

        console.log(`✅ OTP email sent to ${email} via Mailgun API`);
        return true;
        
    } catch (error) {
        console.error('❌ Mailgun API error:', error.message);
        console.error('Full error:', error);
        return false;
    }
};

export const sendEmailResetPassword = async (email, name, resetToken) => {
    try {
        const mailgun = new Mailgun(formData);
        const mg = mailgun.client({
            username: 'api',
            key: process.env.MAILGUN_API_KEY || 'your-api-key-here'
        });

        await mg.messages.create(
            process.env.MAILGUN_DOMAIN || 'sandbox66027832c4804ed3b3fdfcd7368f9a4c.mailgun.org',
            {
                from: `EduLMS <postmaster@${process.env.MAILGUN_DOMAIN || 'sandbox66027832c4804ed3b3fdfcd7368f9a4c.mailgun.org'}>`,
                to: [email],
                subject: 'EduLMS Reset Password Code',
                html: `<p>Your password reset code is: <strong>${resetToken}</strong></p>`,
                text: `Your password reset code is: ${resetToken}`
            }
        );

        console.log(`✅ Reset email sent to ${email} via Mailgun API`);
        return true;
        
    } catch (error) {
        console.error('❌ Mailgun API error (reset):', error.message);
        return false;
    }
};