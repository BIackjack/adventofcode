const Utils = require('../utils');
Utils.getInput('02')
.then(input => {

    // Part 1
    const part1 = input.reduce((acc, curr) => {
        [min, max, letter, password] = curr.split(/\W+/);
        const nbMatches = password.match(RegExp(`${letter}`, 'g'))?.length ?? 0;
        return Number(min) <= nbMatches && nbMatches <= Number(max) ? acc + 1 : acc;
    }, 0)
    
    // Part 2
    const part2 = input.reduce((acc, curr) => {
        [first, second, letter, password] = curr.split(/\W+/);
        return (password[--first] === letter) !== (password[--second] === letter) ? acc + 1 : acc;
    }, 0)
    

    // Display
    console.log(part1);
    console.log(part2);
})
.catch(console.error);
