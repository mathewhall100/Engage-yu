// **** Table sort functions activated by clicking column headings ****

// Sort in descending order
export const desc = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {return -1}
    if (b[orderBy] > a[orderBy]) {return 1}
    return 0;
};

//Sort columns
export const stableSort = (array, cmp)=>  {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
};

//Start sorting columns
export const getSorting = (order, orderBy) => {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
};