import  dotenv from 'dotenv'
import nodemailer from 'nodemailer'
dotenv.config()

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: "flairmindshr@gmail.com",
      pass: process.env.SMTP_PASSWORD,
    },
  });

const sendLinkService=async(email,link,name,purpose)=>{
    await transporter.sendMail({
        from: 'Flairminds <flairmindshr@gmail.com>',
        to: `${email}`,
        subject: "Verify Your Email",
        html: `
        <hr/>
        <p>Dear ${name}</p>,
        <br/>
        <p>We have received a request to verify your account for [specific purpose]. To complete the verification process, please click the link below:</p>
        <br/>
        <a href=${link}>click here</a>
        <br/>
        Once you click the link, your account will be verified, and you'll be able to proceed with ${purpose} process.
        <br/>
        If you did not request this verification, please disregard this email.
        <br/>
        Thank you,
        Flairminds Software Pvt. Ltd.`
      });
}
export {sendLinkService}