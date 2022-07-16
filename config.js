require('dotenv').config()
const username = process.env.EMAIL_USER;
const password = process.env.EMAIL_PASS;
const secretkey = process.env.SECRET_KEY;



const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
};

module.exports = { username, password, secretkey, firebaseConfig }