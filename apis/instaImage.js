let cheerio = require('cheerio');
let request = require('request');

module.exports = (req, res) => {

    let image_url = req.query.url;
    if (image_url !== undefined) {

        if (image_url.substring(0, 8) === 'https://' || image_url.substring(0, 7) === 'http://') {

            request(image_url, (error, response, html) => {
                if (!error) {
                    let $ = cheerio.load(html);

                    let image_link = $('meta[property="og:image"]').attr('content');
                    console.log("link",image_link);
                    let file = $('meta[property="og:type"]').attr('content');
                    let url = $('meta[property="og:url"]').attr('content');
                    let title = $('meta[property="og:title"]').attr('content');
                    res.status(200).json({ title, url, file, image_link });

                } else {
                    res.status(400).json({ 'message': 'Error, Unable to load webpage' });
                }
            });
        } else {
            res.status(201).json({ 'message': 'Invalid URL' });
        }
    } else {
        res.status(400).json({ 'message': 'Provided invalid URL' });
    }
};