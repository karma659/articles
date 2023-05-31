var express = require("express");
var app = express();
var router = express.Router();

const dotenv = require("dotenv");
dotenv.config();

var connectDb = require("./models/connectionDB");
connectDb()
var port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api", router);
app.use((err, req, res, next) => {  res.status(500).json({ statusCode:500,data:{},error:"Internal Server Error" , message:'An unexpected error occurred on the server.' });  });

const {signup} = require("./Controllers/signup");
const {login} = require("./Controllers/login");
const {createarticle} = require("./Controllers/createarticle");
const {verifyToken} = require("./middlewares/authentication");
const {articles} = require("./Controllers/articles");
const {updateuser} = require("./Controllers/updateuser");

router.post("/signup",signup);
router.post("/login",login);
router.post("/users/:userId/articles", verifyToken , createarticle);
router.get("/articles",verifyToken,articles);
router.patch("/users/:userId",verifyToken,updateuser);

app.listen(port, (req,res) => {
   console.log(`Server running on port ${port}`);

});