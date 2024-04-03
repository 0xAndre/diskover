const axios = require('axios');
const cheerio = require('cheerio');

const logger = require('../logger');

const URL = "https://viewdns.info"

module.exports.scraper = async (term, diskover) => {
    await getDNSLookup(term, diskover);
    await getReverseWhois(term, diskover);
}

async function getDNSLookup(term, diskover) {
    try {
        logger.loading("Loading DNS Lookup data");

        const response = await axios.get(`${URL}/dnsrecord/?domain=${term}`);
        const html = response.data;
        const $ = cheerio.load(html);

        const tableDNS = $('table').eq(2);

        tableDNS.find('tr:gt(0)').each((index, element) => {

            const dataRegistry = $(element).find('td').map((i, el) => $(el).text()).get();

            const registry = {
                name: dataRegistry[0],
                ttl: dataRegistry[1],
                class: dataRegistry[2],
                type: dataRegistry[3],
                priority: dataRegistry[4] ? dataRegistry[4] : '',
                data: dataRegistry[5]
            };

            diskover.dns.push(registry)
        });

        diskover.dns.pop();
        diskover.dns.splice(0, 3);

        logger.loading("DNS Lookup has been retrieved");

    } catch (error) {
        console.log(error)
        logger.loading("An error occured while loading data from viewdns");
    }
}

async function getReverseWhois(term, diskover) {
    try {
        logger.loading("Loading Reverse Whois data");

        const response = await axios.get(`${URL}/reversewhois/?q=${term}`);
        const html = response.data;
        const $ = cheerio.load(html);

        const table = $('table').eq(2);

        table.find('tr:gt(0)').each((index, element) => {
            const columns = $(element).find('td');

            const domainName = columns.eq(0).text().trim();
            const creationDate = columns.eq(1).text().trim();
            const registrar = columns.eq(2).text().trim();

            diskover.reverseWhois.push({ domainName, creationDate, registrar });
        });

        diskover.reverseWhois.pop();
        diskover.reverseWhois.splice(0, 3);

        logger.loading("Reverse Whois has been retrieved");

    } catch (error) {
        console.log(error)
        logger.loading("An error occured while loading data from viewdns")
    }
}