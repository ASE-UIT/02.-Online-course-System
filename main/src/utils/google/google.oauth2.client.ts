import { OAuth2Client } from 'google-auth-library';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const googleOauth2Client = new OAuth2Client(GOOGLE_CLIENT_ID);
export default googleOauth2Client;
