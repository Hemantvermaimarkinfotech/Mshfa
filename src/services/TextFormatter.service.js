
const DOCTOR_WORK_MODELS = {
    1 : "Scheduled",
    2 : "Walk In"
}

export default class TextFormatter {
    static formatWeight = (weight, units = 'kg', defaultValue = 'N/A') => {
        if (!weight) return defaultValue;
        return `${weight} ${units}`;
    }

    static formatHeight = (height, units = 'cm', defaultValue = 'N/A') => {
        if (!height) return defaultValue;
        return `${height} ${units}`;
    }

    static formatAddress = (data, defaultVal = 'N/A') => {
        const getBlock = () => {
            return data.block ? `Block ${data.block}` : null;
        }
        return [data.area, getBlock(), data.street, data.building, data.apartment, data.additionalInfo].filter(field => !!field).join(', ') || defaultVal;
    }

    static formatDoctorWorkModel = (value) => {

        if (value && value.hasOwnProperty('key') && DOCTOR_WORK_MODELS.hasOwnProperty(parseInt(value.key))) {
            return DOCTOR_WORK_MODELS[parseInt(value.key)];
        }
        return DOCTOR_WORK_MODELS[1];
    }

}