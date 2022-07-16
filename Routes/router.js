const express = require("express");
const app = express();
const auth = require("../Controllers/auth");
const route = express.Router();
const bodyParser = require("body-parser");


app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

route.post("/signup", auth.signup);

route.post("/login", auth.login);

route.get("/test", auth.tester);

route.get("/verify?:token", auth.verification);

route.get("/home", auth.tokenAuthentication, auth.home);

route.get("/barrer", auth.tokenAuthentication, auth.checkBarrerToken)

route.get("/refreshtoken", auth.refreshToken);

route.get("/userinfo?:token", auth.getUserDetails)

route.get("/userexists", auth.existuser);

route.post("/invalidAuth", auth.invalidUser);
/*route.post("/login", (req, res) => {
    console.log(req.body);
    res.status(200).send(req.body);
});*/

module.exports = route;