class Subdomain {
    constructor(url, isAlive = false) {
        this.url = url;
        this.isAlive = isAlive;
    }
}

module.exports = Subdomain;