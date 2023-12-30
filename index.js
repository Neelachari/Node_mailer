const express = require("express")
const server = express()
const nodemailer = require('nodemailer');
require("dotenv").config()

const cors=require("cors")

// server.use(cors({
//     origin: 'http://127.0.0.1:5173',
//   }));


server.use(cors())

server.use(express.json())

server.post("/mail", (req, res) => {
console.log(req.body)
    const {email,message,subject, name   } = req.body


  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASSWORD, 
    },
  });

  const mailOptions = {
    from: 'neelachari34@gmail.com', 
    to:  'neelachari34@gmail.com', 
    subject: "Connecting from Social media",
    html: `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h1 style="color: #3498db; margin:auto">Sender's Information:</h1>
      <h3 style="margin-bottom: 10px">Yay! 🎉 Received a wonderful message on social media! Feeling so happy and grateful. 😊🎉</h3>
      <h3 style="margin-bottom: 10px; color: red;"><strong>Name:</strong> ${name}</h3>
      <h3 style="margin-bottom: 10px; color: green;"><strong> Email:</strong> ${email}</h3>
      <h3 style="margin-bottom: 10px; color: cyan;"><strong> Subject:</strong> ${subject}</h3>
      <h3 style="margin-bottom: 10px; color: orange;"><strong>Message:</strong> ${message}</h3>
    </div>
  `,
  };

  

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error:', error);
      res.status(500).send('Error sending email');
    } else {
   
      res.status(200).send('Email sent successfully');
    }
  });




});

server.listen(6000, () => {
    console.log("Listening at port 6000")
})