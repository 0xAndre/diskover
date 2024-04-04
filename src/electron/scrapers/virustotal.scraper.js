const axios = require('axios');
const buffer = require('buffer');
const logger = require('../logger');

// models
const Subdomain = require('./../models/Subdomain');

const _URL = "https://www.virustotal.com/ui/domains/"

const headers = {
    'X-Tool': 'vt-ui-main',
    'Accept-Ianguage': 'en-US,en;q=0.9,es;q=0.8',
    'X-VT-Anti-Abuse-Header': 'QW1vY2tlZHN0cmluZw=='
};

const axiosConfig = {
    headers: headers
};

module.exports.scraper = async (term, offset, diskover) => {
    await getData(term, offset, diskover)
}

async function getData(term, offset, diskover) {
    try {
        try {
            logger.loading("Get subdomains from VirusTotal");
            let cursor = Buffer.from(JSON.stringify({ "limit": 10, "offset": offset })).toString('base64');

            let url = `${_URL}${term}/subdomains?cursor=${cursor}&limit=10&relationships=resolutions`

            const response = await axios.get(url, axiosConfig);

            if (response.data.data.length == 0) {
                return;
            }

            for (const result of response.data.data) {
                const subdomain = result.id

                if (!diskover.subdomains.some(s => s.url === subdomain) && subdomain.includes(term)) {
                    diskover.subdomains.push(new Subdomain(subdomain));
                }
            }

            await getData(term, offset + 10, diskover);
        } catch (error) {
            console.error(`Error getting urlscan data: ${error.message}`);
        }
    } catch (error) {
        console.error(error)
        return;
    }
}