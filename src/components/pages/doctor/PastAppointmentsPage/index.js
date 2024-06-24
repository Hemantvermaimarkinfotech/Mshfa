import './index.scss';

import React, { useEffect } from "react";
import {useIntl} from "react-intl";

import tableConfig from 'config/table.config';

import { useTable } from "hooks/table";
import { useDialog } from "hooks/common";

import { PageTitle, PageHeader, PageMetadata, GlobalError } from "components/layout";
import { AppointmentDetailsPage, Table } from "components/common";


const PastAppointmentsPage = ({ route }) => {

    const { open, close } = useDialog();
    const intl = useIntl()

    const {
      rows,
      dataIsLoading,
      dataError,
      itemsPerPage,
      currentPage,
      onPageChange,
      rowsCount,
      refetchData,
    } = useTable(tableConfig.pastAppointments, { period: 'past', ordering: '-start' });

    useEffect(() => {
        refetchData()
    }, []);

    if (dataError) {
        return <GlobalError />
    }

    const handleOnCancel = () => {
        close();
    }

    const handleViewAppointment = (params) => {
        open(AppointmentDetailsPage, { appointmentId: params.row.id, onCancel: handleOnCancel }, { title: intl.formatMessage({id: 'words.common.appointment-details'}), maxWidth: false, contentClassName: 'dialog-content-style' });
    }

    return (
        <div className={'page page--with-table past-appointments-page'}>
            <PageHeader>
                <PageMetadata>
                    <PageTitle title={route.meta.title} />
                </PageMetadata>
            </PageHeader>
            <Table
                loading={dataIsLoading}
                limit={itemsPerPage}
                page={currentPage}
                items={rows}
                rowCount={rowsCount}
                onPageChange={onPageChange}
                onRowClick={handleViewAppointment}
                columns={tableConfig.pastAppointments.columns}
                paginationMode={tableConfig.paginationModes.SERVER}
                emptyMessage={'You have no past appointments yet'}
            />
        </div>
    )
}

export default PastAppointmentsPage;
