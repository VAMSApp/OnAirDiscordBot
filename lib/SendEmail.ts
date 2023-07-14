import sgMail, { MailDataRequired } from '@sendgrid/mail';
import Config from '../config';
import Logger from '@/utils/Logger';

const logger:Logger = new Logger();

const SendEmail = async (email: MailDataRequired):Promise<void> => {
    if (!Config.email.apiKey) {
        logger.error('email.apiKey is not set, unable to send email');
        throw new Error('email.apiKey is not set, unable to send email');
    }

    sgMail.setApiKey(Config.email.apiKey);

    sgMail.send(email)
        .then(() => {
            return Promise.resolve();
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .catch((error:any) => {
            logger.error(error);
            return Promise.reject(new Error(error));
        });
};

export default SendEmail;
