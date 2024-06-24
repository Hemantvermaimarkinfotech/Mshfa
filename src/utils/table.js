export const reduceRedundantColumns = (columns, blacklist) => {
    return columns.filter(column => !blacklist.includes(column.field));
}