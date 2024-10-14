import { transporter } from '@/utils/email/transporter.nodemailer';
import Mail from 'nodemailer/lib/mailer';

export async function sendEmail(data: {
  from: {
    name: string;
  };
  to: {
    emailAddress: string[];
  };
  subject: string;
  text: string;
}): Promise<void> {
  const mailOptions: Mail.Options = {
    from: {
      name: data.from.name,
      address: process.env.EMAIL_USERNAME || ''
    },
    to: data.to.emailAddress,
    subject: data.subject,
    text: data.text
  };

  const result = await transporter.sendMail(mailOptions);
  console.log('Email sent: ', result);
}
