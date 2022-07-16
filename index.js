const express = require("express");
const cors = require("cors");

/*  word splitiing getting nouns,verbs etc 


var WordPOS = require('wordpos'),
    wordpos = new WordPOS();

wordpos.getPOS('The angry bear chased the frightened little squirrel.', (res) => {
    console.log(res);
});
// output:
*/


/* bad words remover ,detector

var Filter = require('bad-words'),
    filter = new Filter();

console.log(filter.clean("Don't be an fuyfu")); 

*/







const bodyParser = require('body-parser');
const router = require("./Routes/router");
const app = express();
app.use(bodyParser.json());
app.use(cors())
app.use("/api", router);




app.listen(3000, () => {
    console.log("server is running");
});