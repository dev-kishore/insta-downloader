let cheerio = require("cheerio")
let axios = require("axios")
let reel = require('insta-reel')

module.exports = async (req, res) => {
    let reelsLink = req.query.url
    if (reelsLink !== undefined) {

        if (reelsLink.substring(0, 8) === 'https://' || reelsLink.substring(0, 7) === 'http://'
            || reelsLink.substring(0, 21) === 'https://www.instagram' || reelsLink.substring(0, 20) === 'http://www.instagram.com') {
            // const { data } = await axios.get(reelsLink, {
            //     headers: {
            //         accept: "*/*",
            //         "accept-encoding": "gzip, deflate, br",
            //         "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,en-IN;q=0.7",
            //         "user-agent":
            //             "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Mobile Safari/537.36",
            //     },
            // });
            // let $ = cheerio.load(data);
            // let script = $("script").eq(4).html();
            // let type  = 'reels'
            // let {
            //     entry_data: {
            //         PostPage: {
            //             [0]: {
            //                 graphql: {
            //                     shortcode_media: { display_url, video_url },
            //                 },
            //             },
            //         },
            //     },
            // } = JSON.parse(/window\._sharedData = (.+);/g.exec(script)[1]);
            // res.status(200).json({ type, display_url, video_url })
            (async() => {
                const reelVideo = await reel(reelsLink);
                console.log(reelVideo);
            })();
        } else {
            res.status(201).json({ 'message': 'Invalid URL' });
        }
    } else {
        res.status(400).json({ 'message': 'Provided invalid URL' });
    }
}

