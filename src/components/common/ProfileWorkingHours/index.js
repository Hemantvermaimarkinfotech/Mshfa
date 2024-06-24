import './index.scss';

import React, { useState } from "react";
import moment from "moment";
import cx from "classnames";
import { formatDate, weekDays } from "utils/date";

import { Collapse } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { TitledTextActionButton } from "components/layout";
import {useIntl} from "react-intl";

const ProfileWorkingHours = ({ workingHours, showHeader=true }) => {

    const [isOpened, setIsOpened] = useState(false);
    const intl = useIntl()

    const handleChangeState = () => {
        setIsOpened(opened => !opened);
    }

    const renderWorkingHours = (dayName, isCurrentDay = false) => {
        return <div key={dayName} className="day-working-hours">
            <div className="day-name">{dayName}</div>
            <div className="working-hours">
                {workingHours && workingHours[dayName] && workingHours[dayName].length > 0 ? workingHours[dayName]
                    .map((dayHours, key) => <div key={`${dayName}-${key}`} className="hours-interval">
                        {`${formatDate(dayHours.timeFrom, 'hh:mm', 'hh:mm A')} - ${formatDate(dayHours.timeTo, 'hh:mm', 'hh:mm A')}`}
                    </div>) : 'Off'}
            </div>
            {isCurrentDay && <div className="current-day">({intl.formatMessage({id: 'words.common.today'})})</div>}
        </div>
    }


    const getTodayWorkingHours = () => {
        const currentDay = moment().format('ddd').toLowerCase();
        return renderWorkingHours(currentDay, true);
    }

    const titleClasses = cx({
        'is-opened': isOpened
    });

    return (
        <div className="profile-working-hours">
            {showHeader ? <TitledTextActionButton
                classes={titleClasses}
                title={'Working hours'}
                onClick={handleChangeState}
                icon={<ExpandMore/>}
            >
                {getTodayWorkingHours()}
                <Collapse direction="down" in={isOpened} >
                    <div>
                        { weekDays.map(weekDay => renderWorkingHours(weekDay)) }
                    </div>

                </Collapse>
            </TitledTextActionButton> : <div>
                { weekDays.map(weekDay => renderWorkingHours(weekDay)) }
            </div>}

        </div>
        )
};

export default ProfileWorkingHours;
