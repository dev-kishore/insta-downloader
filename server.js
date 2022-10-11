var express = require('express');
const path = require('path');
let app = express();
let Crawler = require('crawler');
let bodyParser = require('body-parser');
let instaVideo = require('./apis/instaVideo');
let instaImage = require('./apis/instaImage');
let instaReels = require('./apis/instaReels');

app.use(express.static(path.join(__dirname, 'dist/instadltube')));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/downloader/video', instaVideo);
app.get('/downloader/image', instaImage);
app.get('/downloader/reels', instaReels);

app.use((err, req, res, next) => {
    res.send({ message: err.message });
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/instadltube/index.html'));
});

app.listen(process.env.PORT || 8080, () => {
    console.log("Server running!");
});