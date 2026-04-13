const isProduction = false;
const baseUrl = isProduction ? 'https://securesoft-rest.armandovelasquez.com' : 'http://localhost:3000';

// https://yourdomain.com
// https://yourdomain.com/securesoft
// https://securesoft.yourdomain.com

export const environment = {
    isProduction,

    nameApp: '/',
    urlBase: `${baseUrl}/api/v1`,

    urlAuth: '/auth',
    urlMfa: '/mfa',
    urlUser: '/user',
    urlRole: '/role',


    CLIENT_ID: '606905641465-8nfrjuso38vmq6d71lpvarbgobir633v.apps.googleusercontent.com'
}