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
    const mySort = (arr) => {
        return arr.slice().sort((a,b) => compare(a,b))
    }
    return param === "asc" ? mySort(arr) : mySort(arr).reverse();
}
