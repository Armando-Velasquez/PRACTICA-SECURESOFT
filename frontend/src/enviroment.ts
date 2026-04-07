const isProduction = false;
const baseUrl = isProduction ? 'https://yourdomain.com' : 'http://localhost:3000';

// https://yourdomain.com
// https://yourdomain.com/securesoft
// https://securesoft.yourdomain.com

export const environment = {
    isProduction,

    nameApp: '/',
    urlBase: `${baseUrl}/api/v1`,

    urlAuth: '/auth',
    urlUser: '/user',
    urlRole: '/role',
}