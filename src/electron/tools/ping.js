// Import the ping library
var ping = require('ping');

// Export an asynchronous function named "isAlive" which takes a host parameter
module.exports.isAlive = async (host) => {
    try {
        // Use the ping library's promise-based API to probe the host with a timeout of 1 millisecond
        let result = await ping.promise.probe(host, { timeout: 1 });

        // Extract the relevant information from the ping result
        const ipInfo = {
            alive: result.alive, // Boolean indicating whether the host is alive
            ip: result.numeric_host // The IP address of the host
        };

        // Return the extracted information
        return ipInfo;
    } catch (error) {
        // If an error occurs during the process, return an empty object
        return {};
    }
}
