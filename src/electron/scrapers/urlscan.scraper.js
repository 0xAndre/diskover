const axios = require('axios');

const logger = require('../logger');

// models
const Subdomain = require('./../models/Subdomain');

const _URL = "https://urlscan.io/api/v1/search/?q="

module.exports.scraper = async (term, lastId, diskover) => {
    await getData(term, lastId, diskover)
}

async function getData(term, lastId, diskover) {
    try {
        try {
            logger.loading("Discovering URLS from domain");
            let url = `${_URL}${term}`

            if (lastId) {
                let epochTime = new Date().getTime()
                url += `&search_after=${epochTime},${lastId}`
            }

            const response = await axios.get(url);
            const data = response.data;

            for (const result of data.results) {
                const urlDiscovered = result.page.url
                const subdomain = result.page.domain

                if (!diskover.urlsDiscovered.some(s => s.url === urlDiscovered)) {
                    diskover.urlsDiscovered.push({ url: urlDiscovered });
                }

                if (!diskover.subdomains.some(s => s.url === subdomain) && subdomain.includes(term)) {
                    diskover.subdomains.push(new Subdomain(subdomain));
                }
            }


            let currentlastId = data.results[data.results.length - 1]._id;

            if (lastId !== null && currentlastId === lastId) {
                return;
            }

            await getData(term, currentlastId, diskover);

            logger.loading("All URLs has been discovered");
        } catch (error) {
            console.error(`Error getting urlscan data: ${error.message}`);
        }
    } catch (error) {
        console.error(error)
        return;
    }
}