const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
app.use(cors())

app.use(express.static("./static"));
app.use("/public", express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(81, function() {
    console.log("Listening on port 81");
});

app.get(("/"),(req,res)=>{
    res.status(200).json({message:"Hello"})
})