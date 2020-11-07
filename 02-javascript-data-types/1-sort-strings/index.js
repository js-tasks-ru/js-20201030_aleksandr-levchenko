/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {

    const mySort = (array, dir) => {
        return [...array].sort((a,b) =>
            dir * a.localeCompare(b, ["ru", "en"], {caseFirst: "upper"}));
    }

    switch(param) {
        case 'asc':
            return mySort(arr, 1);
        case 'desc':
            return mySort(arr, -1)
        default:
            return arr;
    }
}
