/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
    if (typeof size === 'undefined') return string;

    const countOfSymbols = {};
    const arr = string.split("");

    const result = arr.filter(str => {
        countOfSymbols[str] = (countOfSymbols[str] || 0) + 1
        return countOfSymbols[str] <= size;
    });

    return result.join('');
}
