import "./index.scss";

import React, { useRef } from "react";
import { Edit } from '@material-ui/icons';
import { useSnackbar } from "notistack";
import { omit } from 'lodash';

import { TitledBlock, TitledText } from "components/layout";
import { formatDate, getYearsFromDate } from "utils/date";
import { AddressList } from "components/common";
import { EditProfileInfoForm } from "components/forms";
import { TextFormatter } from "services";
import { keyValArrayToString } from "utils/text";
import { SecondaryButton } from 'components/layout/buttons';
import { useDialog } from 'hooks/common';
import { usePatientAPI } from 'hooks/patients';
import {FormattedMessage} from "react-intl";

const PatientInfo = ({ patient, showAddress = true, editable = false, order }) => {

    const { open, close } = useDialog();
    const { updatePatient } = usePatientAPI();
    const { enqueueSnackbar } = useSnackbar();
    const formRef = useRef(null);

    const getPatientArea = (addresses) => {
        if (!Array.isArray(addresses) || !addresses.length) return 'N/A';
        return addresses.find(address => address.isPrimary)?.area || 'N/A';
    }

    const handleOpenEditProfileModal = () => {
        open(EditProfileInfoForm, { defaultValues: patient, ref: formRef, onSubmit: handleUpdatePatient }, { title: 'Edit Patient Info', maxWidth: false, onCancel: close, onSubmit: handleSubmitForm })
    }

    const toKey = (keyValObject) => keyValObject.key;

    const handleUpdatePatient = (values) => {

        const { allergies, diseases, socialHabits, occupation, area, height, weight, additionalInfo } = values;

        const newArea = patient.addresses.find(address => address.isPrimary) || patient.addresses[0];

        updatePatient({
            patientId: patient.id,
            occupation: occupation || '',
            medicalInfo: {
                allergies: allergies.map(toKey),
                diseases: diseases.map(toKey),
                socialHabits: socialHabits.map(toKey),
                height,
                weight,
                additionalInfo
            },
            addresses: [{...omit(newArea, '__typename'), area }]
        })
            .then((response) => {
                close();
                return response?.success ? enqueueSnackbar('Patient was successfully updated!') : enqueueSnackbar('Something went wrong');
            })
    }

    const handleSubmitForm = () => {
        if (formRef.current) {
            formRef.current?.submitForm();
        }
    }

    return (
        <div className={'patient-info'}>
            {editable && <SecondaryButton classes={"patient-edit-button"} onClick={handleOpenEditProfileModal} text={<FormattedMessage id={'words.common.edit'}/>} icon={<Edit className={'edit-icon'} />} />}
            <TitledBlock localeId={'words.common.general-info'}>
              <div className="patient-info__row">
                <TitledText localeId={'words.common.birth-date'}>{formatDate(patient.dob) || 'N/A'}</TitledText>
                <TitledText title={'Age'}>{getYearsFromDate(patient.dob) || 'N/A'}</TitledText>
                <TitledText localeId={'words.common.gender'}>{patient.gender?.val || 'N/A'}</TitledText>
                <TitledText localeId={'words.common.marital-status'}>{patient.maritalStatus?.val || 'N/A'}</TitledText>
              </div>
              <div className="patient-info__row">
                <TitledText localeId={'words.common.nationality'}>{patient.nationality?.val || 'N/A'}</TitledText>
                <TitledText localeId={'words.common.languages'}>{keyValArrayToString(patient.languages)}</TitledText>
                <TitledText localeId={'words.common.occupation'}>{patient?.occupation?.val || 'N/A'}</TitledText>
                <TitledText localeId={'words.common.area'}>{getPatientArea(patient.addresses)}</TitledText>
              </div>
            </TitledBlock>
            { showAddress && <TitledBlock title={<FormattedMessage id={'words.common.addresses'}/>}>
              <AddressList items={patient.addresses} />
            </TitledBlock>}
            <TitledBlock localeId={'words.common.medical-info'}>
              <div className="patient-info__row">
                <TitledText localeId={'words.common.blood-type'}>{patient?.medicalInfo?.bloodType || 'N/A'}</TitledText>
                <TitledText localeId={'words.common.weight'}>{TextFormatter.formatWeight(patient?.medicalInfo?.weight)}</TitledText>
                <TitledText localeId={'words.common.height'}>{TextFormatter.formatHeight(patient?.medicalInfo?.height)}</TitledText>
                <TitledText title={'BMI'}>{patient?.medicalInfo?.bmi || 'N/A'}</TitledText>

              </div>
              <div className="patient-info__row patient-info__row--wide">
                <TitledText localeId={'words.common.allergies'}>{keyValArrayToString(patient?.medicalInfo?.allergies)}</TitledText>
              </div>
              <div className="patient-info__row patient-info__row--wide">
                <TitledText localeId={'words.common.diseases'}>{keyValArrayToString(patient?.medicalInfo?.diseases)}</TitledText>
              </div>
              <div className="patient-info__row patient-info__row--wide">
                <TitledText localeId={'words.common.social-habits'}>{keyValArrayToString(patient?.medicalInfo?.socialHabits)}</TitledText>
              </div>
              <div className="patient-info__row patient-info__row--wide">
                <TitledText localeId={'words.common.additional-info'}>{patient?.medicalInfo?.additionalInfo || 'N/A'}</TitledText>
              </div>
            </TitledBlock>
      </div>
    );
}

export default PatientInfo;
