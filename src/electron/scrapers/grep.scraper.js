const axios = require('axios');

const logger = require('../logger');

const URL = "https://grep.app/api/search?q="

module.exports.scraper = async (term, diskover) => {
    let numPages = await getNumberOfPages(term);
    await getCodeSnippets(numPages, term, diskover);
}

async function getCodeSnippets(numPages, term, diskover) {
    try {
        logger.loading("Get Code snippets");

        for (let i = 1; i <= numPages; i++) {
            try {
                const response = await axios.get(`${URL}${term}&page=${i}`);
                const data = response.data;

                for (const hit of data.hits.hits) {
                    const snippet = hit.content.snippet.replace(/<table.*?>|<\/table>/g, '');
                    const id = hit.id.raw;
                    const branch = hit.branch.raw;
                    diskover.grep.push({ snippet, id: formatURL(id, branch), branch });
                }
            } catch (error) {
                continue;
            }
        }

        logger.loading("Code snippets has been retrieved");
    } catch (error) {
        console.log(error)
        return;
    }
}


async function getNumberOfPages(term) {
    try {
        logger.loading("Get Code Snippets Pages");
        const response = await axios.get(`${URL}${term}`);
        const data = response.data;
        let numberOfItems = Math.ceil(data.hits.total / 10)
        logger.loading(`Found ${numberOfItems} pages`);
        return numberOfItems;
    } catch (error) {
        return 0;
    }
}

function formatURL(url, branch) {
    try {
        const slashNonBranchIndex = url.indexOf('/', url.indexOf('/', url.indexOf('/') + 1) + 1);
        const slashBranchIndex = url.indexOf('/', url.indexOf('/', url.indexOf('/', url.indexOf('/') + 1) + 1) + 1);

        let returnURL = ""
        if (url.includes(branch)) {
            returnURL = url.slice(0, slashBranchIndex + 1) + 'blob/' + url.slice(slashBranchIndex + 1);
        } else {
            returnURL = url.slice(0, slashNonBranchIndex + 1) + `blob/${branch}/` + url.slice(slashNonBranchIndex + 1);
        }

        returnURL = returnURL.replace(/^g\//, 'https://github.com/');
        return returnURL;
    } catch (error) {
        console.log(error)
        return url;
    }

}