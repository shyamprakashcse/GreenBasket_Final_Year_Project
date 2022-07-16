const express = require("express");
const app = express();
const port = 3000
const mailer = require("nodemailer");
const config = require("../config");


const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.username,
        pass: config.password
    }
});

module.exports = { transporter };