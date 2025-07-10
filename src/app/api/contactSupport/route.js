import next from 'next';
import { NextResponse } from 'next/server';

export async function POST(params) {
    const data = await params.json();
    let nodemailer = require('nodemailer');

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user : process.env.NEXT_PUBLIC_EMAIL,
            pass : process.env.NEXT_PUBLIC_PASSWORD 
        }
    });
    let mailOption = {
        from: data.email,
        to: process.env.NEXT_PUBLIC_EMAIL,
        subject: "contact form from website",
        text: 
           `Name: ${data.firstName} ${data.lastName}
            Email: ${data.email}
            Phone: ${data.phone}

            ${data.message}`
    };

transporter.sendMail(mailOption, function(error, info){
    if (error){
        console.log(error);
        return new NextResponse("Failed")
    } else {
        console.log("Email sent:" +info.response);
        return new NextResponse("Successful")
    }
})

return new NextResponse("Done")
    
}