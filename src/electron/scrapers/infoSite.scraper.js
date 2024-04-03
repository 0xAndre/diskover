const axios = require('axios');
const cheerio = require('cheerio');

const logger = require('../logger');

module.exports.scraper = async (url, diskover) => {
    logger.loading("Get domain data");
    try {
        if (!/^www\./i.test(url)) {
            url = 'www.' + url;
        }
        if (!/^https?:\/\//i.test(url)) {
            url = 'https://' + url;
        }
        const response = await axios.get(url);
        const html = response.data;

        const $ = cheerio.load(html, { charset: 'utf-8' });

        const sitename = $('title').text();
        const description = $('meta[name="description"]').attr('content');
        const faviconUrl = $('link[rel="icon"]').attr('href') || $('link[rel="shortcut icon"]').attr('href');

        diskover.siteName = sitename
        diskover.description = description
        diskover.faviconUrl = faviconUrl

        logger.loading("Domain data has been retrieved");
    } catch (error) {
        return null;
    }
}