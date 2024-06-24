export const replaceParamsPlaceholdersWithParamsValues = (path, params) => {
    const paramsKeys = Object.keys(params);
    if (paramsKeys.length === 0)  {
        return path;
    } else {
        return paramsKeys
            .reduce((path, param) => path.replace(`:${param}`, params[param]), path)
    }
}