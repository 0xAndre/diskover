const axios = require('axios');
const cheerio = require('cheerio');

const logger = require('../logger');

const ipv4Regex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;

module.exports.scraper = async (url, term, diskover) => {
    try {
        logger.loading("Loading data from viewdns")
        const response = await axios.get(`${url}/iphistory/?domain=${term}`);
        const html = response.data;

        const $ = cheerio.load(html);

        const ipHistoryTable = $('table').eq(2);

        ipHistoryTable.find('tr').slice(2).each(async (index, element) => {
            const tds = $(element).find('td');

            const ip = $(tds[0]).text();
            const location = $(tds[1]).text();
            const ipOwner = $(tds[2]).text();
            const lastSeen = $(tds[3]).text();

            async function getIPInfo(ip) {
                try {
                    const response = await axios.get(`http://ip-api.com/json/${ip}`);
                    const data = response.data;
                    return {
                        domain: data.org,
                        isp: data.isp,
                        asn: data.as,
                        continent: data.continent,
                        country: data.country,
                        stateRegion: data.regionName,
                        city: data.city,
                        postalCode: data.zip
                    };
                } catch (error) {
                    console.error('Error getting data from IP:', error.message);
                    return null;
                }
            }

            if (ip.match(ipv4Regex)) {
                const ipInfo = await getIPInfo(ip);

                const ipData = {
                    ip: ip,
                    location: location,
                    ipOwner: ipOwner,
                    lastSeen: lastSeen,

                    domain: ipInfo.domain,
                    isp: ipInfo.isp,
                    asn: ipInfo.asn,
                    continent: ipInfo.continent,
                    country: ipInfo.country,
                    stateRegion: ipInfo.stateRegion,
                    city: ipInfo.city,
                    postalCode: ipInfo.postalCode
                };

                diskover.ipsHistory.push(ipData);
            }

        });

        logger.loading("Loading data completed from viewdns")

    } catch (error) {
        console.log(error)
        logger.loading("An error occured while loading data from viewdns")
    }
}