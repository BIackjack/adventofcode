const Utils = require('../../utils');
Utils.getFile('04')
.then(file => {
    const KEYS = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

    // Part 1
    const part1 = file.split('\n\n').reduce((acc, entry) => {
        const isValid = entry.match(RegExp(`(${KEYS.join('|')}):\S*\s?`, 'g'))?.length === KEYS.length;
        return isValid ? acc + 1 : acc;
    }, 0);
    
    // Part 2
    const AUTHORIZED_ECL = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];

    const checkHeightValidity = height => {
        const [amount, unit] = [height?.slice(0, -2), height?.slice(-2)];
        return unit === 'cm' && 150 <= amount && amount <= 193 
            || unit === 'in' && 59 <= amount && amount <= 76;
    };

    const getKey = entry => key => entry.split(key + ':')[1]?.split(/\s|\n/)?.shift();

    const part2 = file.split('\n\n').reduce((acc, entry) => {
        const [byr, iyr, eyr, hgt, hct, ecl, pid] = KEYS.map(getKey(entry));
        const isValid = 1920 <= byr && byr <= 2002
                     && 2010 <= iyr && iyr <= 2020
                     && 2020 <= eyr && eyr <= 2030
                     && checkHeightValidity(hgt)
                     && /#[0-9a-f]{6}$/g.test(hct)
                     && AUTHORIZED_ECL.includes(ecl)
                     && pid?.length === 9;
        return isValid ? acc + 1 : acc;
    }, 0);
    
    // Display
    console.log(part1);
    console.log(part2);
})
.catch(console.error);