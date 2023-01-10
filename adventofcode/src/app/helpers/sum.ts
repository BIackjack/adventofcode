export function sum(...input: Array<string>): number {
    if (input.length == 0) {
      return 0;
    }
    return input.reduce((acc, curr) => acc + parseInt(curr), 0);
}