export const apiPath = 'https://api.evand.com';

export const googleAuthenticationScopes = [
    'email',
    'https://www.googleapis.com/auth/calendar'
];

export const googleWebClientId = '1026836443717-pkti0jpc7q44j430ah811eeg6ht60je0.apps.googleusercontent.com';

export const socialAuth = {
    linkedin: {
        authorizeUrl: 'https://www.linkedin.com/uas/oauth2/authorization',
        authorize: {
            client_id: '77h00nk81m837s',
            scope: ['r_basicprofile', 'r_emailaddress', 'w_share'],
            state: 'linkedin',
            response_type: 'code'
        }
    },
    google: {
        authorizeUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
        authorize: {
            access_type: 'offline',
            client_id: '1026836443717-pkti0jpc7q44j430ah811eeg6ht60je0.apps.googleusercontent.com',
            scope: ['email', 'https://www.googleapis.com/auth/calendar'],
            include_granted_scopes: 'false',
            hl: 'en_US',
            response_type: 'code'
        }
    },
    telegram: {
        authorizeUrl: 'https://telegram.me/EvandBot'
    }
};
