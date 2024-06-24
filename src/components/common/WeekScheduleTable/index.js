import './index.scss';

import React from "react";

import { formatDate, weekDays } from "utils/date";

const WeekScheduleTable = ( { items }) => {

    const renderSlot = (dayHours, index) => {
        return <li className={'week-schedule-table__slot'} key={index}>
            {`${formatDate(dayHours.timeFrom, 'hh:mm', 'hh:mm A')} - ${formatDate(dayHours.timeTo, 'hh:mm', 'hh:mm A')}`}
        </li>
    }

    const renderDay = (dayName, index) => {
        return (
            <li className={'week-schedule-table__day'} key={index}>
                <span className={'week-schedule-table__title'}>{dayName}</span>
                <ul className={'week-schedule-table__slots'}>
                    {items && items[dayName] && items[dayName].length > 0 ? items[dayName]
                        .map((dayHours, key) => renderSlot(dayHours, key)) : 'Off'}
                </ul>
            </li>
        )
    }

    return (
        <div className={'week-schedule-table'}>
            <ul className={'week-schedule-table__list'}>
                {weekDays.map(renderDay)}
            </ul>
        </div>
    )
}

export default WeekScheduleTable;