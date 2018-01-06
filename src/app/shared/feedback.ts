

export interface Feedback {
    firstname: string;
    lastname: string;
    telnum: string;
    email: string;
    agree: boolean;
    contacttype: string;
    message: string;
}

export const ContactType = ['none', 'Tel', 'Email'];