const app = require('express')();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer'); // v1.0.5
const defaultBooks = require('./lib/defaultBooks');
let upload = multer({ dest: './uploads/' }); // for parsing multipart/form-data
const Book = require('./app/models/book');

//Mongodb connection
mongoose.connect('mongodb://localhost/bookDB').then(() => {
    console.log("mongodb connection success");
}).catch((err) => {
    console.log(err.message);
});

defaultBooks.insert();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', upload.array(), function (req, res, next) {
    let query = {};
    if (req.query.author) {
        query.author = { "$regex": req.query.author, "$options": "i" };
    }
    if (req.query.language) {
        query.language = { "$regex": req.query.language, "$options": "i" };
    }
    if (req.query.title) {
        query.title = { "$regex": req.query.title, "$options": "i" };
    }
    if (req.query.country) {
        query.country = { "$regex": req.query.country, "$options": "i" };
    }
    if (Object.keys(query).length <= 0) {
        return res.status(400).send({ error: { message: "Please pass valid query parameter" } })
    } else {
        Book.find(query, { _id: 0, __v: 0, data: 0}).exec().then((data) => {
            res.json(data);
        })
    }
});

app.post('/addBook', upload.single('avatar'), function (req, res, next) {
    // req.file is the `avatar` file 
    // req.body will hold the text fields, if there were any 

    res.json(req.file);
})

app.listen(3000)