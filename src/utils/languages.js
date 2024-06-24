import languages from 'mock/languages.json';

export const mapCountryCodesToReadableLanguages = (codes) => {
    const langs = codes.map(code => languages[code.key]?.name)
        .filter(name => !!name);

    return langs.length ?
        langs.join(', ') : undefined;
}