import './index.scss';

import React from "react";
import { Dialog as MaterialDialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';

import { NeutralButton, PrimaryButton } from 'components/layout/buttons';
import {FormattedMessage} from "react-intl";

const Dialog = ({ title, children, onClose, onSubmit, contentClassName = '', open=true, ...rest }) => {

    return (
        <MaterialDialog className={'dialog'} onBackdropClick={onClose} onClose={onClose} open={open} {...rest}>
            {title && (
                <DialogTitle>
                    <span className={'dialog__title'}>{title}</span>
                    <IconButton onClick={onClose} className={'dialog__close'}>
                        <Close />
                    </IconButton>
                </DialogTitle>
            )}
            <DialogContent className={contentClassName}>
                {children}
            </DialogContent>
            {onSubmit &&
                <DialogActions>
                    <NeutralButton text={<FormattedMessage id={'words.common.cancel'}/>} onClick={onClose} />
                    <PrimaryButton text={<FormattedMessage id={'words.common.done'}/>} onClick={onSubmit} />
                </DialogActions>}
        </MaterialDialog>
    )
}

export default Dialog;
