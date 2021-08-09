const express = require('express');
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT;
const model = mongoose.model('profilemodels', {});

app.use('/style', express.static(__dirname + '/style'));
app.use('/view', express.static(__dirname + '/view'));
app.use('/img', express.static(__dirname + '/img'));

app.get('/website', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/', (req, res) => res.send('This website is under development --> Contact Lorеnzo#1000 on Discord for more infos (do copy and paste)'));

app.get('/economy', (req, res) => {
    const user = req.query.user;
    if (!user) {
        model.find({}, async (err, data) => res.send(data));
    }
    model.findOne({ userID: user }, async (err, data) => {
        if (!data) res.send('User does not exist in database!');
        res.send(data);
    })
});

app.listen(port, () => console.log(`Server is live on port ${port}`))