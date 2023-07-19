const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());


mongoose.connect("mongodb+srv://Madhurilenka:Madhuri1998@cluster0.zcysdvm.mongodb.net/Blogging_site", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )


app.use('/', route);

app.use(function (req, res) {
    var err = new Error('Not Found');
    err.status = 404;
    return res.status(404).send({status : "404 ", msg : "Path not found"})
    });



app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});