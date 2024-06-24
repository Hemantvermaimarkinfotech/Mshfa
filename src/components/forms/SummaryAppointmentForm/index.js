import './index.scss';

import React, {useMemo, useRef, useState} from "react";
import {Formik, FieldArray} from 'formik';
import {Delete, Add, Edit} from '@material-ui/icons';
import {omit} from 'lodash';
import {useSnackbar} from "notistack";

import {
    TextField,
    AttachmentsField,
    Dropzone,
    AddPrescriptionForm,
    AddTestForm,
    AddReferralForm,
    AddSickLeaveForm,
    AutocompleteInput
} from 'components/forms';
import {BoxLoader, TitledBlock} from 'components/layout';
import {Prescription, TestsList, Referral, SickLeave} from 'components/common';
import {SecondaryButton} from 'components/layout/buttons';

import {useAppointmentAPI} from "hooks/appointments";
import {useConfig} from "hooks/config";
import {useDialog} from "hooks/common";

import DeleteConfirmationDialog
    from 'components/pages/doctor/AppointmentDetailsPage/components/DeleteConfirmationDialog'
import {useIntl} from "react-intl";


const initialComplaintsValues = {
    complaints: [
        {
            complaint: '',
            details: ''
        }
    ]
}

const initialSignsValues = {
    signs: [
        {
            sign: '',
            details: ''
        }
    ]
}

const initialGeneralValues = {
    diagnosis: '',
    resolution: ''
}

const SummaryAppointmentForm = ({data}) => {

    const {updateAppointment, uploadToAppointment} = useAppointmentAPI(data.id);
    const {enqueueSnackbar} = useSnackbar();
    const [loadingAttachments, setLoadingAttachments] = useState([]);
    const [isSignsSending, setSignsSending] = useState(false);
    const [isComplaintsSending, setComplaintsSending] = useState(false);
    const intl = useIntl()

    const refs = {
        prescription: useRef(),
        test: useRef(),
        referral: useRef(),
        sickLeave: useRef(),
    }

    const config = useConfig();

    const diagnosisArray = useMemo(() => config.diagnosis.map(diagnos => diagnos.val), [config]);

    const {open, close} = useDialog();

    const newComplaint = {
        complaint: '',
        details: ''
    }

    const newSign = {
        sign: '',
        details: ''
    }

    const isLastItem = (index, array) => {
        return index === array.length - 1;
    }

    const handleSubmit = (type) => (values) => {
        if (type === 'complaints') {
            setComplaintsSending(true)
            const resolveComplaint = (complaint) => {
                return complaint.complaint ?
                    complaint.complaint.key ? complaint.complaint.key : complaint.complaint
                    : "";
            }
            const complaintsToSend = values.complaints
                .map((complaint) => {
                    const {__typename, ...rest} = complaint;
                    return {...rest, complaint: resolveComplaint(complaint)}
                });

            updateAppointment({
                appointmentId: data.id,
                complaints: complaintsToSend,
            })
                .then(() => {
                    setComplaintsSending(false)
                });
        } else if (type === 'signs') {
            setSignsSending(true)
            const resolveSign = (sign) => {
                return sign.sign ?
                    sign.sign.key ? sign.sign.key : sign.sign
                    : "";
            }
            const signsToSend = values.signs
                .map((sign) => {
                    const {__typename, ...rest} = sign;
                    return {...rest, sign: resolveSign(sign)}
                });

            updateAppointment({
                appointmentId: data.id,
                signs: signsToSend,
            })
                .then(() => {
                    setSignsSending(false)
                });
        } else {
            updateAppointment({
                appointmentId: data.id,
                ...values,
            })
                .then(() => null);
        }

    }

    const handleSelectFiles = (files) => {
        const file = files[0];
        setLoadingAttachments([{filename: file.name, file: file.name, loading: true}]);
        uploadToAppointment({appointmentId: data.id, category: "attachment", file})
            .then(() => {
                setLoadingAttachments([]);
            })
    }

    const handleRemoveFile = (id) => {
        updateAppointment({appointmentId: data.id, attachments: [{id, delete: true}]})
            .then(() => enqueueSnackbar('Attachment was successfully removed'));
    }

    const handleRejectFiles = (rejections) => {
        const errors = rejections.map(rejected => {
            return `${rejected.file.name}:\n ${rejected.errors.map(error => error.message).join(' | ')}`
        });
        enqueueSnackbar(errors.join('\n \n'), {persist: true, variant: 'error', style: {whiteSpace: 'pre-line'}})
    }

    const handleOpenConfirmationDialog = (type) => {
        open(DeleteConfirmationDialog, {type}, {
            title: 'Confirmation',
            onCancel: handleCancelConfirmationDialog,
            onSubmit: () => handleConfirmConfirmationDialog(type)
        })
    }

    const handleCancelConfirmationDialog = () => {
        close();
    }

    const handleConfirmConfirmationDialog = (type) => {
        handleDeleteItemByType(type);
        handleCancelConfirmationDialog();
    }


    const handleSubmitForm = (type) => {
        if (refs[type]?.current) {
            refs[type]?.current?.submitForm();
        }
    }

    const handleCloseModal = (isSuccess = true) => {
        close();
        isSuccess ?
            enqueueSnackbar('Data was successfully updated') :
            enqueueSnackbar('Error happened', {variant: 'error'})
        ;
    }

    const handleAddPrescriptionFormSubmit = ({items, notes}) => {
        const prescriptionItems = items.map((item) => omit(item, '__typename'));
        updateAppointment({appointmentId: data.id, prescription: {notes, items: prescriptionItems}})
            .then((res) => handleCloseModal(res.success));
    }

    const handleAddTestFormSubmit = ({items}) => {
        updateAppointment({
            appointmentId: data.id, tests: items.map(t => {
                if (t.id) return {id: t.id, delete: !!t.delete}
                return {testId: t.key}
            })
        })
            .then((res) => handleCloseModal(res.success));
    }

    const handleAddSickLeaveSubmit = (values) => {
        updateAppointment({appointmentId: data.id, sickLeave: omit(values, '__typename')})
            .then((res) => handleCloseModal(res.success));
    }

    const handleAddReferralSubmit = (values) => {
        updateAppointment({appointmentId: data.id, referral: omit(values, '__typename')})
            .then((res) => handleCloseModal(res.success));
    }
    const handleOpenModal = (type) => {
        switch (type) {
            case 'prescription':
                open(AddPrescriptionForm, {
                    defaultValues: data.prescription,
                    ref: refs.prescription,
                    onSubmit: handleAddPrescriptionFormSubmit
                }, {title: intl.formatMessage({id: 'words.common.add-prescription'}), maxWidth: false, onSubmit: () => handleSubmitForm('prescription')});
                break;
            case 'tests':
                open(AddTestForm, {
                    defaultValues: {items: data.doctorTests},
                    ref: refs.test,
                    onSubmit: handleAddTestFormSubmit
                }, {title: 'Add tests', maxWidth: false, onSubmit: () => handleSubmitForm('test')});
                break;
            case 'sick-leave':
                open(AddSickLeaveForm, {
                    defaultValues: data.sickLeave,
                    ref: refs.sickLeave,
                    onSubmit: handleAddSickLeaveSubmit
                }, {title: 'Sick leave', maxWidth: false, onSubmit: () => handleSubmitForm('sickLeave')});
                break;
            case 'referral':
                open(AddReferralForm, {
                    defaultValues: data.referral,
                    ref: refs.referral,
                    onSubmit: handleAddReferralSubmit
                }, {title: 'Referral', maxWidth: false, onSubmit: () => handleSubmitForm('referral')});
                break;
        }
    }

    const renderActionsBar = (handlers) => {
        return (
            <div className={'actions-bar'}>
                <Edit onClick={handlers.onEdit}/>
                <Delete onClick={handlers.onRemove}/>
            </div>
        )
    }

    const setComplaintsFormValues = (data) => {
        const {complaints} = data;
        return {
            ...initialComplaintsValues,
            complaints: complaints.length > 0 ? complaints : initialComplaintsValues.complaints,
        }
    }

    const setSignsFormValues = (data) => {
        const {signs} = data;
        return {
            ...initialSignsValues,
            signs: signs.length > 0 ? signs : initialSignsValues.signs,
        }
    }

    const setGeneralFormValues = (data) => {
        const {resolution, diagnosis} = data;
        return {
            ...initialGeneralValues,
            resolution,
            diagnosis
        }
    }


    const handleDeleteItemByType = (type) => {
        switch (type) {
            case "doctorTests":
                const testsToDelete = data.doctorTests.map(test => ({...omit(test, ['__typename', 'title']), delete: true}));
                updateAppointment({appointmentId: data.id, tests: testsToDelete});
                break;
            case "referral":
                updateAppointment({appointmentId: data.id, referral: {delete: true}}).then((response) => {
                    if (response.success) {
                        enqueueSnackbar('Referral deleted');
                    }
                });
                break;
            case "sickLeave":
                updateAppointment({appointmentId: data.id, sickLeave: {delete: true}}).then((response) => {
                    if (response.success) {
                        enqueueSnackbar('Sick leave deleted');
                    }
                });
                break;
            default:
                updateAppointment({appointmentId: data.id, [type]: {id: data[type].id, delete: true}});
        }
    }

    const doctorAttachments = data.attachments.filter(attachment => attachment.category === 'Attachment' && attachment.uploadedBy === 'Doctor');

    const onDeleteBtnClick = (replaceFn, index, itemId, formikProps) => {
        replaceFn(index, {id: itemId, delete: true});
        formikProps.handleSubmit();
    }

    const onBlur = (type, replaceFn, index, item, formikProps) => {
        if (type === 'complaint') {
            if (item.complaint === null) {
                replaceFn(index, {id: item.id, delete: true});
            }
        } else if (type === 'sign') {
            if (item.sign === null) {
                replaceFn(index, {id: item.id, delete: true});
            }
        }
        formikProps.handleSubmit();
    }

    return (
        <div className={'summary-appointment-form'}>
            <Formik onSubmit={handleSubmit('complaints')} initialValues={setComplaintsFormValues(data)}
                    enableReinitialize={true}>
                {(props) => {
                    return (
                        <>
                            <div className={'summary-appointment-form__part'}>
                                <FieldArray name={'complaints'}>
                                    {({push, replace, remove}) => {
                                        // const complaintsKeys = props.values.complaints?.map(({complaint}) => complaint?.key)
                                        return props.values.complaints &&
                                        props.values.complaints.length > 0 ?
                                            props.values.complaints.map((complaint, index) => {
                                                return !complaint.delete ?
                                                    (
                                                        <div className={'summary-appointment-form__row'}
                                                             key={index}>
                                                            <div className={'summary-appointment-form__fields'}>
                                                                <AutocompleteInput
                                                                    label={'Complaint'}
                                                                    options={config.complains}
                                                                    onChange={props.handleChange}
                                                                    value={props.values.complaints?.[index]?.complaint}
                                                                    error={props.touched.complaints?.[index]?.complaint && Boolean(props.errors.complaints?.[index]?.complaint)}
                                                                    errorText={props.touched.complaints?.[index]?.complaint && props.errors.complaints?.[index]?.complaint}
                                                                    name={`complaints.${index}.complaint`}
                                                                    onBlur={() => onBlur('complaint', replace, index, complaint, props)}
                                                                />
                                                                <TextField
                                                                    multiline
                                                                    size={'small'}
                                                                    inputProps={{ maxLength: 255 }}
                                                                    disabled={!props.values.complaints?.[index]?.complaint}
                                                                    name={`complaints.${index}.details`}
                                                                    label={intl.formatMessage({id: 'words.common.details'})}
                                                                    value={props.values.complaints?.[index]?.details}
                                                                    onChange={props.handleChange}
                                                                    error={props.touched.complaints?.[index]?.details && Boolean(props.errors.complaints?.[index]?.details)}
                                                                    helperText={props.touched.complaints?.[index]?.details && props.errors.complaints?.[index]?.details}
                                                                    onBlur={props.handleSubmit}
                                                                />
                                                            </div>
                                                            <div className={'summary-appointment-form__action'}>
                                                                {
                                                                    isLastItem(index, props.values.complaints) ?
                                                                        isComplaintsSending ?
                                                                            <div className={'load-button'}><BoxLoader
                                                                                lines={5} scale={0.8} top={'50%'}/>
                                                                            </div> :
                                                                            <Add className={`add-button`}
                                                                                 onClick={() => push(newComplaint)}/> :
                                                                        <Delete className={'delete-button'}
                                                                                onClick={() => onDeleteBtnClick(replace, index, complaint.id, props)}/>
                                                                }
                                                            </div>
                                                        </div>
                                                    ) : null;
                                            })
                                            : null;
                                    }}
                                </FieldArray>
                            </div>
                        </>
                    )
                }}
            </Formik>
            <div className={'summary-appointment-form__separator'}/>
            <Formik onSubmit={handleSubmit('signs')} initialValues={setSignsFormValues(data)} enableReinitialize={true}>
                {(props) => {
                    return (
                        <>
                            <div className={'summary-appointment-form__part'}>
                                <FieldArray name={'signs'}>
                                    {({push, replace}) => {
                                        // const signsKeys = props.values.signs.map(({sign}) => sign?.key);
                                        return props.values.signs &&
                                        props.values.signs.length > 0 ?
                                            props.values.signs.map((sign, index) => {
                                                return !sign.delete ? (
                                                    <div className={'summary-appointment-form__row'}
                                                         key={index}>
                                                        <div className={'summary-appointment-form__fields'}>
                                                            <AutocompleteInput
                                                                label={'Sign'}
                                                                options={config.signs}
                                                                onChange={props.handleChange}
                                                                value={props.values.signs?.[index]?.sign}
                                                                error={props.touched.signs?.[index]?.sign && Boolean(props.errors.signs?.[index]?.sign)}
                                                                errorText={props.touched.signs?.[index]?.sign && props.errors.signs?.[index]?.sign}
                                                                name={`signs.${index}.sign`}
                                                                onBlur={() => onBlur('sign',replace, index, sign, props)}
                                                            />
                                                            <TextField
                                                                multiline
                                                                size={'small'}
                                                                name={`signs.${index}.details`}
                                                                label={intl.formatMessage({id: 'words.common.details'})}
                                                                value={props.values.signs?.[index]?.details}
                                                                onChange={props.handleChange}
                                                                error={props.touched.signs?.[index]?.details && Boolean(props.errors.signs?.[index]?.details)}
                                                                helperText={props.touched.signs?.[index]?.details && props.errors.signs?.[index]?.details}
                                                                onBlur={props.handleSubmit}
                                                            />
                                                        </div>
                                                        <div className={'summary-appointment-form__action'}>
                                                            {
                                                                isLastItem(index, props.values.signs) ?
                                                                    isSignsSending ?
                                                                        <div className={'load-button'}><BoxLoader
                                                                            lines={5} scale={0.8} top={'50%'}/></div> :
                                                                        <Add className={`add-button`}
                                                                             onClick={() => push(newSign)}/> :
                                                                    <Delete className={'delete-button'}
                                                                            onClick={() => onDeleteBtnClick(replace, index, sign.id, props)}/>
                                                            }
                                                        </div>
                                                    </div>
                                                ) : null;
                                            })
                                            : null;
                                    }}
                                </FieldArray>
                            </div>
                        </>
                    )
                }}
            </Formik>
            <div className={'summary-appointment-form__separator'}/>
            <Formik onSubmit={handleSubmit('general')} initialValues={setGeneralFormValues(data)}
                    enableReinitialize={true}>
                {(props) => {
                    return (
                        <>
                            <div className={'summary-appointment-form__part'}>
                                <div className={'summary-appointment-form__part'}>
                                    <div className={'summary-appointment-form__subpart'}>
                                        <AutocompleteInput
                                            blurOnSelect
                                            autoSelect
                                            creatable={true}
                                            name={'diagnosis'}
                                            label={intl.formatMessage({id: 'words.common.details'})}
                                            options={diagnosisArray}
                                            onChange={props.handleChange}
                                            error={props.touched.diagnosis && Boolean(props.errors.diagnosis)}
                                            value={props.values.diagnosis}
                                            onBlur={props.handleSubmit}
                                        />
                                    </div>
                                    <div className={'summary-appointment-form__subpart'}>
                                        <TextField
                                            multiline
                                            size={'small'}
                                            name={`resolution`}
                                            label={intl.formatMessage({id: 'words.common.doctor-note'})}
                                            value={props.values.resolution}
                                            onChange={props.handleChange}
                                            error={props.touched.resolution && Boolean(props.errors.resolution)}
                                            helperText={props.touched.resolution && props.errors.resolution}
                                            onBlur={props.handleSubmit}
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }}
            </Formik>
            <TitledBlock title={'Attach files'}>
                <AttachmentsField items={[...doctorAttachments, ...loadingAttachments]} onRemove={handleRemoveFile}/>
                <Dropzone onSelect={handleSelectFiles} onReject={handleRejectFiles}/>
            </TitledBlock>
            {data.prescription && (
                <TitledBlock localeId={'words.common.prescription'} actionsBar={renderActionsBar({
                    onRemove: () => handleOpenConfirmationDialog('prescription'),
                    onEdit: () => handleOpenModal('prescription')
                })}>
                    <Prescription data={data.prescription} compact={true}/>
                </TitledBlock>
            )}
            {(data.doctorTests && data.doctorTests.length > 0) && (
                <TitledBlock title={'Tests'} actionsBar={renderActionsBar({
                    onRemove: () => handleOpenConfirmationDialog('doctorTests'),
                    onEdit: () => handleOpenModal('tests')
                })}>
                    <TestsList items={data.doctorTests} compact/>
                </TitledBlock>
            )}
            {data.referral && (
                <TitledBlock title={'Referral'} actionsBar={renderActionsBar({
                    onRemove: () => handleOpenConfirmationDialog('referral'),
                    onEdit: () => handleOpenModal('referral')
                })}>
                    <Referral data={data.referral}/>
                </TitledBlock>
            )}
            {data.sickLeave && (
                <TitledBlock title={'Sick leave'} actionsBar={renderActionsBar({
                    onRemove: () => handleOpenConfirmationDialog('sickLeave'),
                    onEdit: () => handleOpenModal('sick-leave')
                })}>
                    <SickLeave data={data.sickLeave}/>
                </TitledBlock>
            )}

            <div className={'summary-appointment-form__buttons'}>
                {!data.prescription &&
                <SecondaryButton text={intl.formatMessage({id: 'words.common.add-prescription'})} onClick={() => handleOpenModal('prescription')}/>}
                {!data.doctorTests.length > 0 &&
                <SecondaryButton text={'Add tests'} onClick={() => handleOpenModal('tests')}/>}
                {!data.referral &&
                <SecondaryButton text={'Referral'} onClick={() => handleOpenModal('referral')}/>}
                {!data.sickLeave &&
                <SecondaryButton text={'Sick leave'} onClick={() => handleOpenModal('sick-leave')}/>}
            </div>
        </div>
    )
}

export default SummaryAppointmentForm;
