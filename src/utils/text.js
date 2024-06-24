export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const keyValArrayToString = (data, divider = ', ', defaultValue = 'N/A') => {
    if (!Array.isArray(data) || !data.length) return defaultValue;
    return data.map(object => object.val).join(divider);
}

export const arrayToString = (data, divider = ', ', defaultValue = 'N/A') => {
    if (!Array.isArray(data) || !data.length) return defaultValue;
    return data.join(divider);
}

export const getTranslatedStatusId = (status) => `${status.split(' ').join('-').toLowerCase()}`;
