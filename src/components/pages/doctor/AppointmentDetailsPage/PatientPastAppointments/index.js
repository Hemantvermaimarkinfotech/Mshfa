import './index.scss';

import React from "react";
import {useIntl} from "react-intl";

import tableConfig from "config/table.config";
import { AppointmentDetailsPage, Table } from "components/common";
import { useTable } from "hooks/table";
import { useDialog } from "hooks/common";
import { reduceRedundantColumns } from "utils/table";


const PatientPastAppointments = ({ patientId }) => {

  const { open, close } = useDialog();

  const {
    rows,
    dataIsLoading,
    itemsPerPage,
    currentPage,
    onPageChange,
    rowsCount,
    onChangeSort
  } = useTable(tableConfig.appointments, { patient: patientId, period: 'past', ordering: '-start' });

  const intl = useIntl()

  const appointmentsColumns = reduceRedundantColumns(tableConfig.appointments.columns, ['patient.uhi', 'patient', 'paymentType', 'actions']);

  const handleViewAppointment = (params) => {
    open(AppointmentDetailsPage, { appointmentId: params.row.id, onCancel: handleOnCancel }, { title: intl.formatMessage({id: 'words.common.appointment-details'}), maxWidth: false, contentClassName: 'dialog-content-style' });
  }

  const handleOnCancel = () => {
    close();
  }

  const handlePageChange = (e, page) => {
    onPageChange(e, page);
  };

  return <div className={'appointments'}>
    <Table
      limit={itemsPerPage}
      page={currentPage}
      loading={dataIsLoading}
      emptyMessage={'There are no past appointments'}
      columns={appointmentsColumns}
      onPageChange={handlePageChange}
      onRowClick={handleViewAppointment}
      onSortModelChange={onChangeSort}
      rowCount={rowsCount}
      items={rows}
      paginationMode={tableConfig.paginationModes.SERVER}
    />
  </div>
}

export default PatientPastAppointments;
