module.exports = {
    getInput: async (dayQuery) => {
        const lineReader = require('readline').createInterface({
            input: require('fs').createReadStream('../inputs/' + dayQuery)
        });
        
        const input = []
        for await (const line of lineReader) {
            input.push(line)
        }

        return input;
    }
}