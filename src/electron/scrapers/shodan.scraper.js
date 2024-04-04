const axios = require('axios');
const cheerio = require('cheerio');

const logger = require('../logger');

const headers = {
    'Host': 'www.shodan.io',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:124.0) Gecko/20100101 Firefox/124.0',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Accept-Encoding': 'gzip, deflate, br',
    'Alt-Used': 'www.shodan.io',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-User': '?1'
};

const axiosConfig = {
    headers: headers
};


module.exports.scraper = async (ip) => {
    try {
        const response = await axios.get(`https://www.shodan.io/host/${ip}`, axiosConfig);
        const html = response.data;

        console.log(html)

        const $ = cheerio.load(html, { charset: 'utf-8' });

        const openPorts = [];

        $('.grid-heading').each((index, element) => {

            const portNumber = $(element).attr('id');

            const bannerInfo = $(element).next('.card.card-padding.banner').find('pre').text().trim();

            const portObject = {
                port: portNumber,
                info: bannerInfo
            };

            console.log(portObject)

            openPorts.push(portObject);
        });

        return openPorts;
    } catch (error) {
        console.log(error)
        return null;
    }
}