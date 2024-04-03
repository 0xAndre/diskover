const axios = require('axios');
const cheerio = require('cheerio');

const logger = require('../logger');

// models
const Subdomain = require('./../models/Subdomain');

module.exports.scraper = async (url, term, diskover) => {
    try {
        logger.loading("Loading data from crt.sh")
        const response = await axios.get(`${url}/?q=${term}`);
        const html = response.data;

        const $ = cheerio.load(html);

        const fifthTds = $('tr td:nth-child(5)');

        fifthTds.each((index, element) => {
            const subdomain = $(element).text();
            if (!diskover.subdomains.some(s => s.url === subdomain) && subdomain.includes(term)) {
                diskover.subdomains.push(new Subdomain(subdomain));
            }
        });

        logger.loading("Loading data completed from crt.sh")

    } catch (error) {
        logger.loading("An error occurred while loading data from crt.sh")
    }
}