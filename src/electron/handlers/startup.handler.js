// Import required modules
const { app, ipcMain } = require('electron'); // Electron modules for application and inter-process communication
const logger = require('../logger'); // Logger module for logging messages

// Import configuration files
let diskover = require('../configurations/diskover.model.json'); // Import diskover configuration
const urls = require('./../configurations/app.url.json'); // Import application URLs

// Import scrapers
const crt = require('./../scrapers/crt.scraper'); // Import scraper for crt.sh
const viewDns = require('./../scrapers/viewdns.scraper'); // Import scraper for viewdns.info
const infoSite = require('./../scrapers/infoSite.scraper'); // Import scraper for information site
const shodan = require('./../scrapers/shodan.scraper'); // Import scraper for Shodan
const dns = require('./../scrapers/dns.scraper'); // Import scraper for DNS
const grep = require('./../scrapers/grep.scraper'); // Import scraper for grep
const urlScan = require('./../scrapers/urlscan.scraper'); // Import scraper for URL scan

// Import tools
const ping = require('./../tools/ping'); // Import ping tool for checking host availability

// Export initialization function
module.exports.initialize = async () => {
    // Handle 'startup' message from the renderer process
    ipcMain.handle('startup', async (event, term) => {
        try {

            let payload = JSON.parse(term);

            // Set the site to be discovered
            diskover.site = payload.url;

            // Run URL scan scraper
            if (payload.runUrlsDiscovered) {
                await urlScan.scraper(payload.url, null, diskover);
            }

            if (payload.runCodeSnippets) {
                // Run grep scraper
                await grep.scraper(payload.url, diskover);
            }

            // Run scraping functions in parallel for each URL
            const scrapingPromises = urls.map(async (url) => {
                const scrapingFunction = getScrapingFunction(url);
                await scrapingFunction(url, payload.url, diskover);
            });

            // Wait for all scraping tasks to complete
            await Promise.all(scrapingPromises);

            // Run infoSite scraper
            await infoSite.scraper(payload.url, diskover);

            // Check if subdomains are online and update diskover object accordingly
            if (payload.runSubdomain) {
                for (let subdomain of diskover.subdomains) {
                    logger.loading(`Checking if the domain is online: ${subdomain.url}`);
                    let ipInfo = await ping.isAlive(subdomain.url);
                    subdomain.isAlive = ipInfo.alive;
                    subdomain.ip = subdomain.isAlive ? ipInfo.ip : null;
                }
            }

            // Run DNS scraper
            await dns.scraper(payload.url, diskover);

            // Log loading completion message
            logger.loading("All information has been loaded");

            diskover.runSubdomain = payload.runSubdomain;
            diskover.runUrlsDiscovered = payload.runUrlsDiscovered;
            diskover.runCodeSnippets = payload.runCodeSnippets;

            // Return the diskover object
            return diskover;
        } catch (error) {
            // Log error if any occurs during the process
            console.error('Error scraping websites in parallel:', error);
            return [];
        }
    });
}

// Function to determine which scraping function to use based on the URL
function getScrapingFunction(url) {
    if (url.includes('crt.sh')) {
        return crt.scraper;
    }

    if (url.includes('viewdns.info')) {
        return viewDns.scraper;
    }
}
