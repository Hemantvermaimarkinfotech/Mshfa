import './index.scss';

import React, { memo } from "react";
import { useHistory } from 'react-router-dom';
import { VariableSizeList } from 'react-window'
import memoize from 'memoize-one';
import { StatusBar } from 'components/common';
import { StartAppointmentButton } from 'components/layout/buttons'
import { Paper } from "components/layout";
import { formatISOtoHumanReadable } from 'utils/date';
import { GlobalAppRouter } from "routes";
import { sortByDateProperty } from "utils/appointments";

import noAvatar from 'assets/images/no-avatar.svg';


const Board = ({ data, user }) => {

    const PAGE_PADDING = 500;
    const COLUMN_WIDTH = 328;
    const COLUMN_GUTTER = 16;
    const APPOINTMENT_ITEM_SIZE = 102;
    const APPOINTMENT_ITEM_SIZE_IN_PROGRESS = 154;
    const APPOINTMENT_ITEM_GUTTER = 10;

    const history = useHistory();

    const isLastIndex = (array, index) => (array.length - 1) === index;
    const accumulateNumbers = (acc, number) => acc + number;

    const handleStartAppointment = (id) => {
        const { paths: { futureAppointmentsDetails } } = GlobalAppRouter;
        history.push(futureAppointmentsDetails + id)
    }

    const renderScrollableBoxForColumns = ({ data, index, style }) => {
        const item = data[index];
        return item ? renderBoardColumn(item, style) : null;
    }

    const renderBoardColumn = (column, style) => {

        const { appointments, date } = column;

        const formattedDate = formatISOtoHumanReadable(date, 'D MMMM');

        const itemSize = (index) => {
            const appointment = appointments[index];
            const isInProgress = appointment.status.val === 'In progress';
            const itemSize = isInProgress ? APPOINTMENT_ITEM_SIZE_IN_PROGRESS : APPOINTMENT_ITEM_SIZE;
            return isLastIndex(appointments, index) ? itemSize : itemSize + APPOINTMENT_ITEM_GUTTER;
        }

        const calculateListHeight = () => {
            const height = appointments
                .map((appointment, index, array) => {
                    const isInProgress = appointment.status.val === 'In progress';
                    const itemHeight = isInProgress ? APPOINTMENT_ITEM_SIZE_IN_PROGRESS : APPOINTMENT_ITEM_SIZE;
                    return isLastIndex(array, index) ? itemHeight : itemHeight + APPOINTMENT_ITEM_GUTTER;
                })
                .reduce(accumulateNumbers, 0);

            return height > 700 ? 700 : height;
        }

        return (
            <div className={'board-column'} key={date + Math.random()} style={style}>
                <Paper className="board-column__content">
                    <h4 className={'board-column__title'}>{formattedDate}</h4>
                    <VariableSizeList layout="vertical" itemData={sortByDateProperty(appointments, 'start')} itemCount={appointments.length} itemSize={itemSize} width={'100%'} height={calculateListHeight()}>
                        {renderScrollableBoxForItems}
                    </VariableSizeList>
                </Paper>
            </div>
        )
    }

    const renderScrollableBoxForItems = ({ data, index, style }) => {
        const item = data[index];
        return item ? renderBoardItem(item, style) : null;
    }

    const renderBoardItem = (item, style) => {

        const { start, patient } = item;

        const isInProgress = item.status.val === 'In progress';

        const formattedTime = formatISOtoHumanReadable(start, 'hh:mm a');

        const renderName = (firstName, lastName) => {

            if (!firstName && !lastName) {
                return 'No Name';
            }

            return `${firstName} ${lastName}`
        }

        return (
            <div className={'board-item'} key={item.date + Math.random()} style={style} onClick={() => handleStartAppointment(item.id)}>
                <div className="board-item__content">
                    <div className="board-item__header">
                        <span className={'board-item__date'}>{formattedTime}</span>
                        <StatusBar status={item.status.val} type={'appointments'} />
                    </div>
                    <div className="board-item__patient">
                        <img className={'board-item__avatar'} src={patient.avatar || noAvatar} alt="patient's avatar" />
                        <div className={'board-item__info'}>
                            <span className={'board-item__name'}>{renderName(patient.firstName, patient.lastName)}</span>
                            <span className={'board-item__caption'}>UHI: {patient.uhi}</span>
                        </div>
                    </div>
                    {isInProgress && <StartAppointmentButton />}
                </div>
            </div>
        )
    }

    const columnSize = (index) => {
        return isLastIndex(data, index) ? COLUMN_WIDTH + PAGE_PADDING : COLUMN_WIDTH + COLUMN_GUTTER;
    }

    return (
        <div className={'board'}>
            <VariableSizeList layout="horizontal" itemData={data} height={800} itemCount={data.length} itemSize={columnSize} width={5500}>
                {renderScrollableBoxForColumns}
            </VariableSizeList>
        </div>
    )
}

export default Board;
