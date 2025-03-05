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
const redirectLink='http://localhost:5173/dashboard'
const sendLinkService=async(email,link,name,purpose)=>{
  
    try {
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
    } catch (error) {
      console.log(error)
    }
}
const sendContactEmail=async(name,industry,organization,email,phone)=>{
  try {
    await transporter.sendMail({
        from: `${email}`,
        to: `contact.roshanpatil@gmail.com`,
        subject: `${name} wants to contact us`,
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Contact Request</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
  <div style="max-width: 600px; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
    <h2 style="color: #333; text-align: center;">New Contact Request</h2>
    <p style="font-size: 16px; color: #555;">Someone from an ${organization} wants to contact us. Here are the details:</p>
    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
      <tr>
        <th style="text-align: left; padding: 10px; background: #007bff; color: #ffffff;">Field</th>
        <th style="text-align: left; padding: 10px; background: #007bff; color: #ffffff;">Details</th>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd;">Name</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${name}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd;">Organization</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${organization}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd;">Industry</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${industry}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd;">Email</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${email}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd;">Phone</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${phone}</td>
      </tr>
    </table>
    <div style="text-align: center; margin-top: 20px;">
      <a href=${redirectLink} target="_blank" style="display: inline-block; background: #28a745; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 5px; font-size: 16px;">Go to Dashboard</a>
    </div>
  </div>
</body>
</html>
`
      });
  } catch (error) {
    console.log(error)
  }
}
const sendInterestEmail=async(name,industry,organization,email,phone,interest)=>{
  try {
    await transporter.sendMail({
        from: `${email}`,
        to: `contact.roshanpatil@gmail.com`,
        subject: `${name} is interested in ${interest}`,
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Contact Request</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
  <div style="max-width: 600px; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
    <h2 style="color: #333; text-align: center;">New Interest in ${interest}</h2>
<p style="font-size: 16px; color: #555;">
    We’ve received a new inquiry about <strong>${interest}</strong>.  
    ${name} from <strong>${organization}</strong> is interested and wants to get in touch.  
</p>
    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
      <tr>
        <th style="text-align: left; padding: 10px; background: #007bff; color: #ffffff;">Field</th>
        <th style="text-align: left; padding: 10px; background: #007bff; color: #ffffff;">Details</th>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd;">Name</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${name}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd;">Organization</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${organization}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd;">Industry</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${industry}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd;">Interest</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${interest}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd;">Email</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${email}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd;">Phone</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${phone}</td>
      </tr>
    </table>
    <div style="text-align: center; margin-top: 20px;">
      <a href=${redirectLink} target="_blank" style="display: inline-block; background: #28a745; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 5px; font-size: 16px;">Go to Dashboard</a>
    </div>
  </div>
</body>
</html>
`
      });
  } catch (error) {
    console.log(error)
  }
}
const sendFeedbackEmail=async(name,email,message)=>{
  try {
    await transporter.sendMail({
      from: `${email}`,
      to: `contact.roshanpatil@gmail.com`,
      subject: `New feedback from ${name}`,
      html:  `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #007bff;">New Feedback</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Feedback:</strong></p>
        <p style="background: #f8f9fa; padding: 10px; border-left: 4px solid #007bff;">${message}</p>
        <hr>
      </div>`
    
    });
  } catch (error) {
    
  }
}
export {sendLinkService,sendContactEmail,sendInterestEmail,sendFeedbackEmail}