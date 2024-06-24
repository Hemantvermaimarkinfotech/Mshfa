import React from "react";
import { Form, Formik } from "formik";

const WizardForm = ({ onNextStep, currentStep, isLastStep, children, formData, onSubmit, submitOnLastStep=true }) => {

    const steps = React.Children.toArray(children);
    const step = steps[currentStep - 1];

    const handleSubmit = async (values, bag) => {

        if (step.props.onSubmit) {
            await step.props.onSubmit();
        }
        if (!submitOnLastStep || isLastStep(currentStep)) {
            return onSubmit(values, bag);
        } else {
            bag.setTouched({});
            onNextStep(values);
        }
    };

    return (
        <Formik
            initialValues={formData}
            onSubmit={handleSubmit}
            validationSchema={step.props.validationSchema}
        >
            {() => <Form>{step}</Form>}
        </Formik>
    );
};

export default WizardForm;