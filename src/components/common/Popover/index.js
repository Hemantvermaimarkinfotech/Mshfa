import React from "react";
import { Popover as MaterialPopover } from "@material-ui/core";

const Popover = ({ open, anchor, onClose, children , anchorOrigin, transformOrigin, ...rest}) => {

    return (
        <MaterialPopover
            className={'popover'}
            open={open}
            anchorEl={anchor}
            onClose={onClose}
            anchorOrigin={anchorOrigin || {
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={transformOrigin || {
                vertical: 'top',
                horizontal: 'center',
            }}
            {...rest}
        >
            {children}
        </MaterialPopover>
    )
}

export default Popover;
