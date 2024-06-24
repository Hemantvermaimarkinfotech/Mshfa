import './index.scss';

import React from 'react';

const DeleteConfirmationDialog = ({ type }) => {

    const resolveType = (type) => {
        if (type === 'doctorTests') {
            return 'test';
        } else if (type === 'sickLeave') {
            return 'sick leave'
        }
        return type;
    }

    return (
        <div className={'delete-confirmation-dialog'}>
            <p className={'delete-confirmation-dialog__message'}>{`Are you sure you want to delete the ${resolveType(type)}?`}</p>
        </div>
    )
}

export default DeleteConfirmationDialog;