import React from "react";

import { useFormikContext } from "formik";
import { useConfig } from "hooks/config";
import { InputAdornment } from "@material-ui/core";
import { useErrorMessage } from "hooks/formErrorMessage";
import { RadioGroupField, TextField } from "components/forms/index";
import { TitledBlock } from "components/layout";
import { doctorCommissionType } from "config/doctor";

const PriceInfo = ({ errors }) => {

    const formik = useFormikContext();
    useErrorMessage(errors);
    return (
        <>
            <div className="create-doctor-form__body">
                <div className="create-doctor-form__row">
                    <TitledBlock title={"Commission"}>
                        <div className="create-doctor-form__row--twin amount-field">
                        <TextField
                            type={'number'}
                            size={'small'}
                            name={'serviceCost'}
                            label={'Consultation price'}
                            value={formik.values.serviceCost}
                            onChange={formik.handleChange}
                            error={formik.touched.serviceCost && Boolean(formik.errors.serviceCost)}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">KD</InputAdornment>,
                            }}
                        />
                        </div>
                    </TitledBlock>
                </div>
                <div className="create-doctor-form__row">
                    <TitledBlock title={"Follow-up commission"}>
                        <div className="create-doctor-form__row--twin amount-field">
                        <TextField
                            type={'number'}
                            size={'small'}
                            name={'serviceCostFollowup'}
                            label={'Follow-up consultation price'}
                            value={formik.values.serviceCostFollowup}
                            onChange={formik.handleChange}
                            error={formik.touched.serviceCostFollowup && Boolean(formik.errors.serviceCostFollowup)}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">KD</InputAdornment>,
                            }}
                        />
                        </div>
                    </TitledBlock>
                </div>
                {/*<div className="create-doctor-form__row">*/}
                {/*    <TitledBlock title={"Commission"}>*/}
                {/*        <RadioGroupField*/}
                {/*            size={'small'}*/}
                {/*            options={[{key: doctorCommissionType.FLAT, val: 'Flat amount'}, {key: doctorCommissionType.PERCENT, val: 'Percent'}]}*/}
                {/*            value={formik.values.commissionType}*/}
                {/*            name={`commissionType`}*/}
                {/*            onChange={formik.handleChange}*/}
                {/*        />*/}
                {/*        <div className="create-doctor-form__row--twin">*/}
                {/*            { formik.values.commissionType === doctorCommissionType.FLAT &&*/}
                {/*                <TextField*/}
                {/*                    size={'small'}*/}
                {/*                    name={'flatCommission'}*/}
                {/*                    label={'Flat commission'}*/}
                {/*                    value={formik.values.flatCommission}*/}
                {/*                    onChange={formik.handleChange}*/}
                {/*                    error={formik.touched.flatCommission && Boolean(formik.errors.flatCommission)}*/}
                {/*                    InputProps={{*/}
                {/*                        startAdornment: <InputAdornment position="start">KD</InputAdornment>,*/}
                {/*                    }}*/}
                {/*                />*/}
                {/*            }*/}
                {/*            { formik.values.commissionType === doctorCommissionType.PERCENT &&*/}
                {/*                <TextField*/}
                {/*                    size={'small'}*/}
                {/*                    name={'percentCommission'}*/}
                {/*                    label={'Percent commission'}*/}
                {/*                    value={formik.values.percentCommission}*/}
                {/*                    onChange={formik.handleChange}*/}
                {/*                    error={formik.touched.percentCommission && Boolean(formik.errors.percentCommission)}*/}
                {/*                    InputProps={{*/}
                {/*                        endAdornment: <InputAdornment position="end">%</InputAdornment>,*/}
                {/*                    }}*/}
                {/*                />*/}
                {/*            }*/}
                {/*        </div>*/}
                {/*    </TitledBlock>*/}
                {/*</div>*/}
                {/*<div className="create-doctor-form__row">*/}
                {/*    <TitledBlock title={"Consultation Fees"}>*/}
                {/*        <div className="create-doctor-form__row--twin amount-field">*/}
                {/*            <TextField*/}
                {/*                type={'number'}*/}
                {/*                size={'small'}*/}
                {/*                name={'consultationAmount'}*/}
                {/*                label={'Consultation price'}*/}
                {/*                value={formik.values.consultationPrice}*/}
                {/*                onChange={formik.handleChange}*/}
                {/*                error={formik.touched.consultationPrice && Boolean(formik.errors.consultationPrice)}*/}
                {/*                InputProps={{*/}
                {/*                    // startAdornment: <InputAdornment position="start">KD</InputAdornment>,*/}

                {/*                }}*/}
                {/*            />*/}
                {/*        </div>*/}
                {/*        <div className="create-doctor-form__row--twin amount-field">*/}
                {/*            <TextField*/}
                {/*                size={'small'}*/}
                {/*                name={'walkInPrice'}*/}
                {/*                label={'WalkIn price'}*/}
                {/*                value={formik.values.walkInPrice}*/}
                {/*                onChange={formik.handleChange}*/}
                {/*                error={formik.touched.walkInPrice && Boolean(formik.errors.walkInPrice)}*/}
                {/*                InputProps={{*/}
                {/*                    startAdornment: <InputAdornment position="start">KD</InputAdornment>,*/}
                {/*                }}*/}
                {/*            />*/}
                {/*        </div>*/}
                {/*    </TitledBlock>*/}
                {/*</div>*/}
            </div>
        </>
    )
}
export default PriceInfo;