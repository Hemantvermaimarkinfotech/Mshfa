import './index.scss';

import React, { useState } from "react";
import { Visibility, VisibilityOff } from '@material-ui/icons';

import { TextField } from 'components/forms';

const PasswordField = (props) => {

    const [visible, setVisible] = useState(false);

    const handleToggleVisibility = () => {
        setVisible((prevState) => !prevState);
    }

    const iconProps = {
        className: 'password-field__icon',
        onClick: handleToggleVisibility
    }

    return (
        <div className={'password-field'}>
            <TextField type={visible ? 'text' : 'password'} {...props} />
            {visible ? <Visibility {...iconProps} style={{ color: "#5f5f5f" }} /> : <VisibilityOff {...iconProps} />}
        </div>
    )
}

export default PasswordField;