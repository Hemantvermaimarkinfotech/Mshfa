import moment from 'moment';

export const DEFAULT_DATE_FORMAT = "YYYY-MM-DD";
export const READABLE_DATE_FORMAT = "D MMMM YYYY";
export const READABLE_DATE_FORMAT_SHORT = "D MMM YYYY";
export const DEFAULT_DATE_TIME_FORMAT = "D MMMM YYYY, h:mm:ss A";
export const DEFAULT_DATE_TIME_FORMAT_SHORT = "DD.MM.YY, h:mm:ss A";

export const formatISOtoHumanReadable = (ISODate, format = DEFAULT_DATE_FORMAT) => {
    if (!ISODate) return "";
    return moment(ISODate).format(format);
}

export const getDaysFromNow = (date) => {
    return moment().diff(moment(date), 'days');
}

export const getSecondsToTime = (date) => {
    return moment(date).diff(moment(), 'seconds');
}

export const utcToLocalTime = (date, inputFormat = "HH:mm:ss", outputFormat = 'h:mm A') => {
    return moment(`${date}+00:00`, `${inputFormat}Z`).format(outputFormat)
}

export const formatDate = (date, inputFormat = 'YYYY-MM-DD', outputFormat = 'DD MMMM YYYY') => {
    if (!date) return null;
    return moment(date, inputFormat).format(outputFormat);
};

export const getYearsFromDate = (date, inputFormat = 'YYYY-MM-DD') => {
    if (!date) return null;
    return moment().diff(moment(date, inputFormat), 'years').toString();
};

export const isSameOrBefore = (startTime, endTime) => {
    return moment(startTime, 'h:mm A').isSameOrBefore(moment(endTime, 'h:mm A'));
}

export const isBefore = (startTime, endTime) => {
    return moment(startTime, 'h:mm A').isBefore(moment(endTime, 'h:mm A'));
}


export const rangeToDaysArray = (dateStart, dateEnd) => {
    let result = [];
    const endDate = new Date(dateEnd);
    for( let dt = new Date(dateStart); dt <= endDate; dt.setDate(dt.getDate()+1)) {
        result.push(new Date(dt).toISOString().slice(0,10));
    }
    return result;
}

export const daysArrayToRanges = (daysArray) => {
    if (!daysArray || daysArray.length === 0) return [];
    let result = [];
    let currRange = { dateFrom: daysArray[0], dateTo: daysArray[0], length: 1  };

    const appendCurrRangeToResult = (currentDay) => {
        if (currRange.length > 1) {
            result.push({dateFrom: currRange.dateFrom, dateTo: currRange.dateTo})
        } else {
            result.push(currRange.dateFrom);
        }
        if (currentDay) {
            currRange = {dateFrom: currentDay, dateTo: currentDay, length: 1};
        }
    }

    for (let i = 1; i <= daysArray.length; i++) {
        if (daysArray[i]) {
            if (moment(daysArray[ i ]).diff(moment(currRange.dateTo), 'days') === 1) {
                currRange.dateTo = daysArray[i];
                currRange.length ++;
            } else {
                appendCurrRangeToResult(daysArray[i]);
            }
        }
    }
    appendCurrRangeToResult();
    return result;

}

export const rangesToDaysArray = (daysRange) => {
    return daysRange.reduce((acc, currentVal) => {
        if (typeof currentVal === "string") {
            acc.push(currentVal);
        }
        if (typeof currentVal === "object") {
            if (currentVal.hasOwnProperty("dateFrom") && currentVal.hasOwnProperty("dateTo")) {
                if (!currentVal.dateFrom) return acc;
                if (!currentVal.dateTo) {
                    acc.push(currentVal.dateFrom);
                    return acc;
                }
                return acc.concat(rangeToDaysArray(currentVal.dateFrom, currentVal.dateTo));
            }
        }
        return acc;
    }, [])
}

export const dayRangeToString = (dayRange, format = "DD MMMM YYYY") => {
    if (typeof dayRange === "string") return formatISOtoHumanReadable(dayRange, format);
    if (typeof dayRange === "object") {
        if (!dayRange.dateFrom) return '';
        if (!dayRange.dateTo) {
            return formatISOtoHumanReadable(dayRange.dateFrom, format);
        }
        return `${formatISOtoHumanReadable(dayRange.dateFrom, format)} - ${formatISOtoHumanReadable(dayRange.dateTo, format)}`;
    }
}

export const minutesToHumanReadable = (minutes=0, defaultValue  = "N/A") => {
    if (!minutes) return defaultValue;
    const hours = Math.ceil(minutes / 60);
    const minutesLeft = minutes - hours * 60;
    const formatHours = (hours) => {
        return hours ?
            hours === 1 ? `${hours} hour ` : `${hours} hours `
            : '';
    }
    const formatMinutes = (minutes) => {
        return minutes ?
            minutes === 1 ? `${minutes} minute` : `${minutes} minutes`
            : '';
    }
    return `${formatHours(hours)}${formatMinutes(minutesLeft)}`

}

export const getAgeFromDateOfBirthday = (dob) => {
    if (!dob) return null;
    return moment().diff(moment(dob), 'years');
}

export const weekDays = ['sun', 'mon', 'tue', 'thu', 'wed', 'fri', 'sat']

