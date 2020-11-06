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
    return arr.slice().sort((a,b) => param === "asc" ? compare(a,b) : compare(b,a));
}
