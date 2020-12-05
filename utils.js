const getLineReader = (dayQuery) => {
    return require('readline').createInterface({
        input: require('fs').createReadStream('../inputs/' + dayQuery)
    });
}

module.exports = {
    getInput: async (dayQuery) => {
        const input = [];
        for await (const line of getLineReader(dayQuery)) {
            input.push(line);
        }

        return input;
    },

    getFile: async (dayQuery) => {
        return require('fs').promises.readFile('../inputs/' + dayQuery, 'utf8');
    },
}