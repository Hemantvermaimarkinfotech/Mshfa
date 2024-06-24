import isEmail from 'validator/lib/isEmail';
import { array, object, string, addMethod } from "yup";
import { isSameOrBefore, isBefore } from "utils/date";

export const emailValidator = {
    name: 'email',
    message: 'Email must be valid',
    test: (value = "") => isEmail(value)
};

addMethod(array, "validOrder", function() {
    return this.test("isValidOrder", function(timeList, context) {
        let error = null;
        timeList.forEach((timeInterval, index) => {
            if (index === 0) return;
            if (!timeInterval.timeFrom || !timeList[index - 1].timeTo) return;
            if (!isSameOrBefore(timeList[index - 1].timeTo, timeInterval.timeFrom)) {
                error =  this.createError({ path: `${context.path}.${index}.timeFrom`, message: "Start Time must be after previous time slot" });
            }
        })
        return error || true;
    });
});

export function  workingDayValidator() {
    return array(object({
        timeFrom: string()
            .nullable(true)
            .test(
                'not empty',
                'Start Time cant be empty',
                function(value) {
                    return !!value;
                }
            ),
        timeTo: string()
            .nullable(true)
            .test(
                'not empty',
                'End time cant be empty',
                function(value) {
                    return !!value;
                }
            )
            .test(
                "start_time_test",
                "Start time must be before end time",
                function(value) {
                    const { timeFrom } = this.parent;
                    return isBefore(timeFrom, value);
                }
            )
    })).validOrder("Not valid date start");
}