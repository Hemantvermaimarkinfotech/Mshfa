import React, { useCallback, useEffect, useState } from 'react';
import { useFormikContext } from "formik";
import { debounce } from "lodash";

const AutoSave = ({ debounceMs, shouldSave = true }) => {

    const formik = useFormikContext();

    const [firstRender, setFirstRender] = useState(true);

    const debouncedSubmit = useCallback(debounce(() => formik.submitForm(), debounceMs), [debounceMs, formik.submitForm]);

    useEffect(() => {
        if (firstRender) {
            setFirstRender(false);
        } else {
            if (shouldSave) {
                debouncedSubmit();
            }
        }
    }, [debouncedSubmit, formik.values, shouldSave]);
    return <></>;
};

export default AutoSave;