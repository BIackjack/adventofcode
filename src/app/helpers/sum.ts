export function sum(...input: Array<string | number>): number {
    if (input.length == 0) {
      return 0;
    }
    return input.reduce((acc: number, curr) => acc + (typeof curr === 'number' ? curr : parseInt(curr)), 0);
}