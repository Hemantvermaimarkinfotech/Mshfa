export default {
    passwordRegExp: /^.*(?=.{8,})(?=.*\d)(?=.*[A-Za-z])(^[a-zA-Z0-9@\$=!:.#%]+$)/,
    educationMinYear: 1920,
    educationMaxYear: new Date().getFullYear(),
    addressBlocksOptions: Array.from({length: 20}, (_, i) => {
        const block = (i + 1).toString()
        return {key: block, val: `Block ${block}`};
    }),
    deliveryTimes: [{ key: 30, val: "30 min" },{ key: 60, val: "1 hour" }, ...Array.from({length: 46}, (_, i) => {
        const minutes = ((i + 3) * 30);
        return {key: minutes, val: `${minutes / 60} hours`};
    })],
    doctorTypes: {
        schedule: 1,
        walkIn: 2
    }
}