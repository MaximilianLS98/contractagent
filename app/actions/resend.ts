'use server';
import { EmailTemplate } from '@/components/email/default-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formData: any) => {
    try {
		const bodyData = Object.fromEntries(formData);
        const { firstName, lastName, email, phone, inqType, message } = bodyData;    

		const { data, error } = await resend.emails.send({
			from: 'Kontaktskjema <maximilian@kaktusfamilien.com>',
			to: ['maximilian@kaktusfamilien.no'],
			subject: 'Kontaktskjema på LegalEdge',
			react: await EmailTemplate({ firstName, lastName, email, phone, inqType, message }),
		});

		if (error) {
			console.log(`Error sending email in the api route:`, error);
            return void 0;
		}

        return void 0;
	} catch (error) {
		console.log(`Error sending email in the api route in the catch block:`, error);
        return void 0;
	}
}