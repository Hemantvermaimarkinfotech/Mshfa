import { useSnackbar } from "notistack";
import { useEffect, useMemo, useState } from "react";
import { useFormikContext } from "formik";
import { get } from "lodash";

export const useErrorMessage = (apiErrors = [], formikContext) => {
    const context = useFormikContext();
    const formik = formikContext || context;
    const [currentMessage, setCurrentMessage] = useState();
    const [errors, setErrors] = useState([]);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const errorFields = useMemo(() => {

        const getErrors = (path = []) => {
            let response = [];
            const data = path.length ? get(formik.errors, path.join('.')) : formik.errors;
            const touched = path ? get(formik.touched, path.join('.')) : formik.touched;
            if(typeof data === 'object') {
                Object.keys(data).forEach(key => {
                    response = response.concat(getErrors([...path, key]));
                })
            } else if (Array.isArray(data)) {
                data.forEach((val, key) => {
                    response = response.concat(getErrors([...path, key]));
                })
            } else {
                if (data && touched) {
                    response.push(data);
                }
            }
            return response;
        };

        return [...getErrors(), ...apiErrors];
    }, [formik, apiErrors])

    useEffect(() => {
        if (JSON.stringify(errorFields) !== currentMessage) {
            setCurrentMessage(JSON.stringify(errorFields));
            setErrors(errorFields);
        }
    }, [errorFields, currentMessage])

    useEffect(() => {

        if (errors.length) {
            const message =  <div>
                {errors.map((currVal, currIndex) =>
                    <div key={`error_${currIndex}`}>{currVal}</div>
                )}
            </div>;
            closeSnackbar();
            let messID = enqueueSnackbar(message, {
                    variant: "error",
                    autoHideDuration: null,
                    preventDuplicate: true,
                    anchorOrigin: {horizontal: "right", vertical: "top"},
                    onClick: () => {
                        closeSnackbar(messID);
                    }
            });
        } else {
            closeSnackbar();
        }

    }, [errors]);
}