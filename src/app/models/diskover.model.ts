export class Diskover {
    site!: string;
    ipsHistory!: any[];
    subdomains!: Subdomain[];
    siteName!: string;
    description!: string;
    faviconUrl!: string;
    dns!: any[];
    reverseWhois!: any[];
    grep!: any[];
    urlsDiscovered!: any[];
    runSubdomain!: boolean;
    runUrlsDiscovered!: boolean;
    runCodeSnippets!: boolean;

}

export class Subdomain {
    url: string;
    isAlive: boolean;
    ip: any;

    constructor(url: string, isAlive: boolean = false, ip: any) {
        this.url = url;
        this.isAlive = isAlive;
        this.ip = ip;
    }
}