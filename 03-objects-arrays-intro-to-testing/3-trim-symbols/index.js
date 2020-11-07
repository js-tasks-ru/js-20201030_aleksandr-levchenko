/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
    const countOfSymbols = {};
    return typeof size !== 'undefined' ? string.split("").filter(function(n) {
        countOfSymbols[n] = (countOfSymbols[n]||0) + 1
        return countOfSymbols[n] <= size;
    }).join("") : string;
}
