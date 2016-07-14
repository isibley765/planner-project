var mysql           = require("mysql");
var express         = require("express");
var app             = express();
var bodyParser      = require("body-parser");
var crypto          = require("crypto");
var gets            = require("./app/mysql/get.js");
var posts           = require("./app/mysql/post.js");

/* rest-conn, rest-chek */
var con             = require("./app/mysql/connect.js");
/* end */

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {                       // allow outside access
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, cache-control");
  return next();
});

var port = process.env.PORT || 6143;                     // set our port

var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
	console.log('Something is happening.');
	next(); // make sure we go to the next routes and don't stop here
});

/* nswb-conn */
// test route to make sure everything is working (accessed at GET http://localhost:6143/api)
router.get("/", function(req, res) {
	res.sendFile(__dirname+"/app/webpage/homepage.html");
});

router.get("/format.css", function(req, res) {
  res.sendFile(__dirname+"/app/webpage/format.css");
});

router.get("/main.js", function(req, res) {
  res.sendFile(__dirname+"/app/webpage/main.js");
});

/* lgin-user-02 */
router.route("/login/user")

  .post(function(req, res) {
    posts.checkUser(res, req, con);
  });

/* lgin-pswd-02-01, lgin-pswd-02-02 */
router.route("/login/pswd/")

  .post(function(req, res) {
    
    posts.checkPswd(res, req, con, crypto);
  });

/* lgin-npwd-02-01, lgin-npwd-02-02 */
router.route("/login/create-new/")
  
  .post(function(req, res) {
    posts.makeUser(res, req, con, crypto);
  });
/* end */

app.use("/api", router);

app.listen(port);
console.log("Express server listening on port %d in %s mode. ", port, app.settings.env);
