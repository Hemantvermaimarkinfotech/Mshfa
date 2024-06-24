import './index.scss';

import React, { useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import state from "apollo/state";
import { Edit, Block, Delete, CheckCircle, CheckCircleOutline } from '@material-ui/icons';
import { useSnackbar } from 'notistack';

import { GlobalAppRouter } from "routes";
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
    TitledBlock, PageBody,
} from "components/layout";
import { Table, DiplomasList, WeekScheduleTable, ConfirmationDialog, ProfileAvatar } from 'components/common';
import { PrimaryButton, SecondaryButton } from 'components/layout/buttons';
import { useDoctor, useDoctorAPI } from 'hooks/doctors';
import { mapCountryCodesToReadableLanguages } from "utils/languages";

import tableConfig from 'config/table.config';

import fakeStamp from 'assets/images/fake_stamp.jpg';
import AdminDoctorAppointments from "./AdminDoctorAppointments";
import { daysArrayToRanges, dayRangeToString, formatISOtoHumanReadable, READABLE_DATE_FORMAT } from "utils/date";
import { useDialog } from "hooks/common";
import {FormattedMessage} from "react-intl";

const DoctorProfilePage = ({ route }) => {

    const { id, activeTab: currentTab } = useParams();
    const { doctor, doctorLoading, doctorError } = useDoctor(id);
    const { deleteDoctor, toggleDoctorsStatus, createDoctor } = useDoctorAPI();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const { open, close } = useDialog();
    const [isDoctorBlocked, setDoctorBlocked] = useState(null);

    const getActiveTab = () => {
        switch (currentTab) {
            case 'schedule':
                return 1;
            default:
                return 0;
        }
    }
    const [activeTab, setActiveTab] = useState(getActiveTab());
    const history = useHistory();

    useEffect(() => {
        if (doctor) {
            setDoctorBlocked(doctor.isBlocked)
        }
        return () => {
            closeSnackbar();
        }
    }, [doctor])

    const handleOnCancel = () => {
        close();
    }

    const deleteDoctorConfirmation = () => {
        open(ConfirmationDialog, { onConfirm: handleDeleteDoctor, onCancel: handleOnCancel, text: "Are you sure you want to delete the doctor? All doctor’s scheduled appointments would be rejected!" }, { title: 'Confirmation' });
    }

    const onActiveToggleConfirmation = () => {
        if (!doctor.isBlocked) {
            open(ConfirmationDialog, { onConfirm: onActiveToggle, onCancel: handleOnCancel, text: `Are you sure you want to block the ${doctor.firstName} ${doctor.lastName}? (all future appointments of the doctor would be rejected and the doctor would not be available for booking)` }, { title: 'Confirmation' });
        } else {
            onActiveToggle();
        }
    }

    const handleDeleteDoctor = () => {
        deleteDoctor({ doctorId: doctor.id })
            .then(data => {
                close();
                if (data?.success) {
                    enqueueSnackbar('Doctor was deleted');
                    history.push(GlobalAppRouter.paths.doctors)
                }
            });
    }

    const onActiveToggle = () => {
        toggleDoctorsStatus({ id: doctor.id, action: "block" })
            .then((data) => {
                close();
                if (data?.success) {
                    enqueueSnackbar(data.isBlocked ? 'Doctor was blocked' : 'Doctor was activated');
                }
            });
    }

    const handleEditDoctor = () => {
        if (activeTab === 1) {
            state.doctorProfileRedirect(`${GlobalAppRouter.paths.doctorsProfile}${id}/schedule`);
            history.push(`${GlobalAppRouter.paths.doctorsEdit}${id}/schedule`)
        } else {
            state.doctorProfileRedirect(`${GlobalAppRouter.paths.doctorsProfile}${id}`);
            history.push(`${GlobalAppRouter.paths.doctorsEdit}${id}/professional`)
        }
    }

    if (doctorLoading) {
        return <GlobalLoader />
    }
    if (doctorError || !doctor) {
        console.log(doctorError);
        console.log(doctor);
        return <GlobalMessage message={`Sorry, doctor with id ${id} was not found`} />
    }

    const renderCertificationMark = () => {
        return (
            <div className={'profile-info__certificate'}>
                <CheckCircle />
                <span className={'profile-info__text'}><FormattedMessage id={'words.common.board-certified'}/></span>
            </div>
        )
    }

    return (
        <div className={'page page--blue doctor-profile-page'}>
            <PageHeader>
                <PageMetadata>
                    <Breadcrumbs route={route} />
                    <PageTitle title={route.meta?.title} />
                </PageMetadata>
                <PageActions>
                    <SecondaryButton text={<FormattedMessage id={'words.common.delete'}/>} icon={<Delete />} onClick={deleteDoctorConfirmation} />
                    {
                        isDoctorBlocked ?
                            <SecondaryButton text={'Activate'} icon={<CheckCircleOutline />} onClick={onActiveToggle} /> :
                            <SecondaryButton text={'Block'} icon={<Block />} onClick={onActiveToggleConfirmation} />

                    }
                    <PrimaryButton text={<FormattedMessage id={'words.common.edit'}/>} icon={<Edit />} onClick={handleEditDoctor}/>
                </PageActions>
            </PageHeader>

            <PageBody classes="doctor-profile-page__body">
                <Paper className={'doctor-profile-page__sidebar'}>
                    <div className={'profile-card'}>
                        <div className="profile-card__header">
                            <ProfileAvatar size="large" image={doctor.avatar} classes="profile-card__avatar" />
                            <span className="profile-card__name">{ `${doctor.firstName} ${doctor.lastName}`}</span>
                            <span className="profile-card__id">ID: {doctor.doctorId || 'N/A'}</span>
                            <span className="profile-card__desc">{doctor.workModel?.val || "N/A"}</span>
                        </div>
                        <div className="profile-card__body">
                            <TitledText localeId={'words.common.birth-date'}>{formatISOtoHumanReadable(doctor.dob, READABLE_DATE_FORMAT) || 'N/A'}</TitledText>
                            <TitledText localeId={'words.common.gender'}>{doctor.gender?.val || "N/A"}</TitledText>
                            <TitledText localeId={'words.common.languages'}>
                                {doctor.languages?.length ? mapCountryCodesToReadableLanguages(doctor.languages) : 'N/A'}
                            </TitledText>
                            <TitledText localeId={'words.common.email'}>{doctor.email}</TitledText>
                            <TitledText localeId={'words.common.phone-number'}>{doctor.phone || 'N/A'}</TitledText>
                            <TitledText title={'Admin Notes'}>{doctor.adminNotes || 'N/A'}</TitledText>
                        </div>
                    </div>
                </Paper>
                <Paper className={'doctor-profile-page__content'}>
                    <Tabs
                        initialValue={activeTab}
                        onTabChanged={setActiveTab}
                        items={['Professional info', 'Schedule', <FormattedMessage id={'words.common.appointments'}/>]}
                    >
                        <div className="profile-info profile-info--professional">
                            <TitledBlock title={'Specialties'}>
                                <Table className={'doctor-specialities'} columns={tableConfig.specializations.columns} items={doctor.specializations} limit={3} headerHeight={40} />
                            </TitledBlock>
                            {doctor.boardCertified && renderCertificationMark()}
                            <TitledBlock localeId={'words.common.appointments'}>
                                <Table columns={tableConfig.educations.columns} items={doctor.educations} limit={3} headerHeight={40} />
                            </TitledBlock>
                            <TitledBlock localeId={'words.common.diploma'}>
                                <DiplomasList items={doctor.diplomas} />
                            </TitledBlock>
                            <TitledBlock title={"Doctor's stamp"}>
                                <div className={'profile-info__stamp stamp'}>
                                    <div className="stamp__image">
                                        <img src={doctor.doctorStamp || fakeStamp} alt=""/>
                                    </div>
                                    <span className={'stamp__text'}>{'Was added on August 20, 2020'}</span>
                                </div>
                            </TitledBlock>
                        </div>
                        <div className="profile-info profile-info--schedule">
                            <TitledBlock title={'Weekly schedule'}>
                                <WeekScheduleTable items={doctor.schedules} />
                            </TitledBlock>
                            <TitledBlock title={'Appointment time box (New / Follow-up)'}>
                                <span className={'profile-info__text'}>{doctor.appointmentTimeBox.val || 'N/A'} / </span>
                                <span className={'profile-info__text'}>{doctor.appointmentTimeBoxFollowup.val || 'N/A'}</span>
                            </TitledBlock>
                            <TitledBlock title={'Service cost (New / Follow-up)'}>
                                    <span className={'profile-info__text'}>KD {doctor.serviceCost} / </span>
                                    <span className={'profile-info__text'}>KD {doctor.serviceCostFollowup}</span>
                            </TitledBlock>
                            <TitledBlock title={'Days off'}>
                                <span className={'profile-info__text'}>
                                    {daysArrayToRanges(doctor.daysOff).map(dayRange => dayRangeToString(dayRange)).join(', ')}
                                </span>
                            </TitledBlock>
                        </div>
                        <div className="profile-info profile-info--appointments">
                            <AdminDoctorAppointments doctorId={doctor.id} />
                        </div>
                    </Tabs>
                </Paper>
            </PageBody>
        </div>
    )
}

export default DoctorProfilePage;
