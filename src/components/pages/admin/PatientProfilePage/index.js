import './index.scss';

import React, { useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { GlobalAppRouter } from "routes";
import { get } from "lodash";
import { Block, CheckCircleOutline } from '@material-ui/icons';
import { useSnackbar } from 'notistack';

import {
    PageHeader,
    PageActions,
    PageMetadata,
    Breadcrumbs,
    PageTitle,
    GlobalLoader,
    GlobalMessage,
    Tabs,
    Paper,
    TitledText,
    TitledTextVerified, PageBody,
} from "components/layout";
import { SecondaryButton } from 'components/layout/buttons';
import noAvatar from 'assets/images/no-avatar.svg';
import { usePatient, usePatientAPI } from "hooks/patients";
import archive from "assets/images/archive.svg";
import AdminPatientAppointments from "./AdminPatientAppointments";
import AdminPatientOrders from "./AdminPatientOrders";
import AdminPatientPayments from "./AdminPatientPayments";
import PatientInfo from "components/common/PatientInfo";
import AdminPatientTests from "./AdminPatientTests";
import AdminPatientAttachments from "./AdminPatientAttachments";
import AdminPatientSickLeaves from "./AdminPatientSickLeaves";
import AdminPatientPrescriptions from "./AdminPatientPrescriptions";
import { InsurancePopup, IDCardPopup, ConfirmationDialog, ContractPopup } from "components/common";
import { useDialog } from "hooks/common";
import { Link } from "@material-ui/core";
import {FormattedMessage} from "react-intl";

const PatientProfilePage = ({ route }) => {

    const { id, activeTab: currentTab } = useParams();

    const getActiveTab = () => {
        switch (currentTab) {
            case 'orders':
                return 2;
            default:
                return 0;
        }
    }

    const [activeTab, setActiveTab] = useState(getActiveTab());

    const history = useHistory();
    const { open, close } = useDialog();
    const { patient, patientLoading, patientError, refetchPatient } = usePatient(id);
    const { togglePatientStatus, deletePatient } = usePatientAPI();
    const { enqueueSnackbar } = useSnackbar();

    const handleOnCancel = () => {
        close();
    }

    const deletePatientConfirmation = () => {
        open(ConfirmationDialog, { onConfirm: handleArchivePatient, onCancel: handleOnCancel, text: "Are you sure you want to archive the patient?" }, { title: 'Confirmation' });
    }

    const onActiveToggleConfirmation = () => {
        if (!patient.isBlocked) {
            open(ConfirmationDialog, { onConfirm: onActiveToggle, onCancel: handleOnCancel, text: `Are you sure you want to block the patient?` }, { title: 'Confirmation' });
        } else {
            onActiveToggle();
        }
    }

    const handleArchivePatient = () => {
        deletePatient({ id: patient.id, action: "archive" })
          .then(response => {
              close();
              if (response.success) {
                  history.push(GlobalAppRouter.paths.patients)
                  enqueueSnackbar('Patient archived');
              } else {
                  enqueueSnackbar('Error happened');
              }
          })
    }

    const onActiveToggle = () => {
        togglePatientStatus({ id: patient.id, action: "block" })
          .then(response => {
              close();
              if (response.success) {
                  enqueueSnackbar(response.isBlocked ? 'Patient was blocked' : 'Patient was activated');
              } else {
                  enqueueSnackbar('Error happened');
              }
          })
    }

    const showInsurance = () => {
        open(InsurancePopup, { patient, onCancel: close }, { title: <FormattedMessage id={'dialog.title.insurance'}/> });
    }

    const showIDCard = () => {
        open(IDCardPopup, { patient, onCancel: close }, { title: <FormattedMessage id={'words.common.id-card-number'}/> });
    }

    const showContract = () => {
        open(ContractPopup, { patient, onCancel: close }, { title: <FormattedMessage id={'dialog.title.contract'}/> });
    }

    const handleChangeStatus = () => {};

    if (patientLoading) {
        return <GlobalLoader />
    }

    if (patientError && !patient) {
        return <GlobalMessage message={`Sorry, patient with id ${id} was not found`} />
    }

    return (
        <div className={'page page--blue patient-profile-page'}>
            <PageHeader>
                <PageMetadata>
                    <Breadcrumbs route={route} />
                    <PageTitle title={route.meta?.title} />
                </PageMetadata>
                <PageActions>
                    <SecondaryButton text={'Archive'} icon={<img className={'profile-dropdown__icon'} src={archive} alt=""/>} onClick={deletePatientConfirmation} />
                    {
                        patient.isBlocked ?
                            <SecondaryButton text={'Activate'} icon={<CheckCircleOutline />} onClick={onActiveToggleConfirmation} /> :
                            <SecondaryButton text={'Block'} icon={<Block />} onClick={onActiveToggleConfirmation} />

                    }
                </PageActions>
            </PageHeader>
            <PageBody>
                <Paper className={'patient-profile-page__sidebar'}>
                    <div className={'profile-card'}>
                        <div className="profile-card__header">
                            <img src={patient.avatar || noAvatar} alt="" className="profile-card__avatar"/>
                            <span className="profile-card__name">{ `${patient.firstName} ${patient.lastName}`}</span>
                            <span className="profile-card__desc">{`UHI: ${patient.uhi}`}</span>
                        </div>
                        <div className="profile-card__body">
                            <TitledTextVerified localeId={'words.common.email'} isVerified={patient.isEmailConfirmed}>{patient.email}</TitledTextVerified>
                            <TitledTextVerified localeId={'words.common.phone-number'} isVerified={patient.isPhoneConfirmed}>{patient.phone || 'N/A'}</TitledTextVerified>

                            <TitledText localeId={'words.common.id-card-number'}><Link onClickCapture={showIDCard}>{get(patient, 'idCard.number',) || 'N/A'}</Link></TitledText>
                            <TitledText localeId={'words.common.insurance'}><Link onClickCapture={showInsurance}>{get(patient, 'insurance.number',) || 'N/A'}</Link></TitledText>
                            <TitledText localeId={'words.common.contract-number'}>{patient.contract ? <Link onClickCapture={showContract}>{patient.contract}</Link>: 'N/A'}</TitledText>
                        </div>
                    </div>
                </Paper>
                <Paper className={'patient-profile-page__content'}>
                    <Tabs
                        classes = {"patient-profile-page__appointments"}
                        initialValue={activeTab}
                        onTabChanged={setActiveTab}
                        items={[
                            'Patient info',
                            <FormattedMessage id={'words.common.appointments'}/>,
                            <FormattedMessage id={'words.common.orders'}/>,
                            <FormattedMessage id={'words.common.payments'}/>,
                            <FormattedMessage id={'words.common.prescriptions'}/>,
                            <FormattedMessage id={'words.common.lab-tests'}/>,
                            <FormattedMessage id={'words.common.attachments'}/>,
                            <FormattedMessage id={'words.common.sick-leaves'}/>
                        ]}
                    >
                        <div className="profile-info profile-info--professional">
                            <PatientInfo patient={patient}/>
                        </div>
                        <div className="profile-info profile-info--appointments">
                            <AdminPatientAppointments patientId={patient.id}/>
                        </div>
                        <div className="profile-info profile-info--orders">
                            <AdminPatientOrders patientId={patient.id}/>
                        </div>
                        <div className="profile-info profile-info--payments">
                            <AdminPatientPayments patientId={patient.id}/>
                        </div>
                        <AdminPatientPrescriptions patientId={patient.id}/>
                        <AdminPatientTests patientId={patient.id}/>
                        <div className="profile-info profile-info--attachments">
                            <AdminPatientAttachments patientId={patient.id}/>
                        </div>
                        <div className="profile-info profile-info--sick-leaves">
                            <AdminPatientSickLeaves patientId={patient.id}/>
                        </div>
                    </Tabs>
                </Paper>
            </PageBody>
        </div>
    )
}

export default PatientProfilePage;
