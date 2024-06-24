export const filterByText = (items, fields, text) => {
    return items.filter((item) => {
        return fields
            .map(field => item[field])
            .filter(value => typeof value === 'string')
            .some((value) => value.includes(text))
    })
}

export const filterByStatus = (items, status) => {
    return items.filter(item => item.status.toLowerCase() === status.toLowerCase());
}