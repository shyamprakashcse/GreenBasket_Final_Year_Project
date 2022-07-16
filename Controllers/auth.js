const express = require("express");
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const url = require('url');
const open = require('open');
const querystring = require('querystring');
const mailer = require("./mail.js");
const transport = mailer.transporter;
const token = require('./token');
const config = require('../config.js');
const firebase = require('../db');
const firestore = firebase.firestore();

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ extended: false }));

const tester = (req, res) => {
    console.log(config.username);
    res.status(200).send("hey");
}
const signup = (req, res) => {
    const mailid = req.body.email;
    const password = req.body.password;
    const payload = { username: mailid, password: password };
    const accessToken = token.getToken(payload);
    const paramobject = {
        token: accessToken,
        username: mailid,
        password: password
    }
    const query = querystring.stringify(paramobject);
    const url = `http://localhost:3000/api/verify?token=${accessToken}`;
    console.log("url is :" + url);
    console.log("registered mail id is :" + mailid);
    console.log("token is :" + accessToken);

    let body = {
        from: config.username,
        to: mailid,
        subject: "hello this is from shyam web app for link testing.",
        html: `<a href=${url} >click this link for verification</a>`
    }
    transport.sendMail(body, (err, result) => {
        if (err) {
            console.log(err);
            res.status(401).send({ error: "error" });
            return false;
        } else {
            console.log(result);

            res.status(200).send(paramobject);
            return true;
            transport.close();
        }
    });
}

const login = (req, res) => {
    console.log("from login backend");
    console.log(req.body);
    //Databse Logic 
    //Databse Logic  
    //Databse Logic  
    //Databse Logic  
    //Databse Logic    
    const LoginUserToken = token.getRefreshToken(req.body);

    res.status(200).send({ token: LoginUserToken });


}
const invalidUser = (req, res) => {
    res.status(404).send({ error: "Invalid User Authentication" });
}

const verification = (req, res) => {
    const verifylinktoken = req.query.token;
    const url = "";
    const refreshToken = "";
    const refreshpayload = "";
    var error = false;

    jwt.verify(verifylinktoken, config.secretkey, (err, decodedpayload) => {
        if (err) {
            res.send("verification link expires or invalid token authentication register again");
        } else {
            //Databse Logic 
            //Databse Logic  
            //Databse Logic  
            //Databse Logic  

            firebase.auth().createUserWithEmailAndPassword(decodedpayload.username, decodedpayload.password).then((result) => {
                var user = firebase.auth().currentUser;

            }, (err) => {

                console.log(err);


            })

            console.log("decoded payload is", decodedpayload);
            delete decodedpayload.iat;
            delete decodedpayload.exp;
            this.refreshToken = token.getRefreshToken(decodedpayload);
            console.log("refresh token is", this.refreshToken);
            this.url = `http://localhost:4200/verification/${this.refreshToken}`;
            this.refreshpayload = token.getUserPayload(this.refreshToken);
            console.log("this refresh payload is", this.refreshpayload);

            open(this.url);
            res.status(200).send("Registration succesful please wait for redirection");

        }
    });


}

const tokenAuthentication = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send("unauthorized request");
    }

    let token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return res.status(401).send("unauthorized request");
    }
    let payload = jwt.verify(token, config.secretkey);

    if (!payload) {
        return res.status(401).send("unauthorized request");
    }
    req.userid = payload.subject;

    next();


}

const home = (req, res) => {
    eventArr = [{
            name: "shyam",
            land: "chennai"
        },
        {
            name: "e-commerce",
            land: "chennai"
        }
    ]
    res.send(eventArr);
}

const getUserDetails = (req, res) => {
    console.log("hello from getuserdetails");
    res.status(200).send(token.getUserPayload(req.query.token));

}

const checkBarrerToken = (req, res) => {
    res.status(200).send({ "message": "true" });
}

const refreshToken = (req, res) => {
    const tok = token.getRefreshToken(req.body);
    return tok;
}

const existuser = (req, res) => {
    res.send("user Exists login");
}

module.exports = { signup, login, tester, verification, home, tokenAuthentication, getUserDetails, refreshToken, existuser, invalidUser, checkBarrerToken };