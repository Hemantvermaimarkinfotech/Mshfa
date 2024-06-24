import React from "react";

import { WeekScheduleField } from "components/forms";
import { useErrorMessage } from "hooks/formErrorMessage";

const WorkingHoursInfo = ( { onDelete }) => {

    useErrorMessage();
    return (
        <>
            <div className="create-pharmacy-form__body">
                <div className="create-pharmacy-form__row">
                    <WeekScheduleField onDelete={onDelete} fieldName="workingHours" />
                </div>
            </div>
        </>
    )
}

export default WorkingHoursInfo;