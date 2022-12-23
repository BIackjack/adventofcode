const Utils = require('../../utils');
Utils.getFile('06')
.then(file => {

    // Part 1
    const part1 = file.split('\n\n').reduce((acc, entry) => new Set(entry.match(/\w/g)).size + acc, 0);
    
    // Part 2
    const part2 = file
        .split('\n\n')
        .map(entry => {
            const asArray = entry.match(/\w/g), asSet = new Set(asArray), nbPeople = entry.split(/\n/g).length;
            return [...asSet].filter(setLetter => asArray.filter(arrLetter => arrLetter === setLetter).length === nbPeople)
        })
        .reduce((acc, array) => array.length + acc, 0);

    // Display
    console.log(part1);
    console.log(part2);
})
.catch(console.error);