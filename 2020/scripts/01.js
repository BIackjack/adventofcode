const Utils = require('../../utils');
Utils.getInput('01')
.then(input => {

    // Part 1
    input.some(leftHandSide => {
        const chosenRightHandSide = input.find(candidate => parseInt(leftHandSide) + parseInt(candidate) === 2020);
        if (chosenRightHandSide) {
            console.log(leftHandSide * chosenRightHandSide);
            return true;
        }
    })
    
    // Part 2
    input.some(a => {
        return input.some(b => {
            if (Number(a) + Number(b) < 2020) {
                return input.some(c => {
                    if (Number(a) + Number(b) + Number(c) === 2020) {
                        console.log(a * b * c);
                        return true;
                    }
                })
            }
        })
    })
})
.catch(console.error);
