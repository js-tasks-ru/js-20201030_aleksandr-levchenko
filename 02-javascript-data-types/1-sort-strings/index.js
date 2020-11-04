/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
    const compare = (a, b) => {
        return a.localeCompare(b, "ru", {caseFirst: "upper"})
    }
    return param === "asc" ?
        arr.slice().sort((a,b) => compare(a,b)) :
        arr.slice().sort((a,b) => compare(a,b)).reverse();
}
