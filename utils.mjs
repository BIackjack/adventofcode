import {createReadStream} from 'fs';
import {readFile} from 'fs/promises';
import {createInterface} from 'readline';

const getLineReader = (dayQuery) => {
    return createInterface({
        input: createReadStream('../inputs/' + dayQuery)
    });
}

export const getInput = async (dayQuery) => {
    const input = [];
    for await (const line of getLineReader(dayQuery)) {
        input.push(line);
    }

    return input;
}

export const getFile = async (dayQuery) => {
    return readFile('../inputs/' + dayQuery, 'utf8');
}