import './index.scss';

import React from "react";

import tableConfig from "config/table.config";
import { AppointmentDetailsPage, Table } from "components/common";
import { DateInput, SelectInput } from "components/forms";
import { useTable } from "hooks/table";
import { useConfig } from "hooks/config";
import { useDialog } from "hooks/common";
import { periodOptions } from "config/common.config";
import { reduceRedundantColumns } from "utils/table";
import { PageActions } from "components/layout";
import {useIntl} from "react-intl";

const AdminPatientAppointments = ({ patientId }) => {

  const { appointmentStatuses } = useConfig();
  const { open, close } = useDialog();

  const {
    rows,
    dataIsLoading,
    itemsPerPage,
    currentPage,
    onPageChange,
    rowsCount,
    setParam,
    getParam,
    onChangeSort
  } = useTable(tableConfig.appointments, {patient: patientId});

  const intl = useIntl()

  const appointmentsColumns = reduceRedundantColumns(tableConfig.appointments.columns, ['patient.uhi', 'patient', 'paymentType', 'actions']);

  const handleViewAppointment = (params) => {
    open(AppointmentDetailsPage, { appointmentId: params.row.id, onCancel: handleOnCancel }, { title: intl.formatMessage({id: 'words.common.appointment-details'}), maxWidth: false, contentClassName: 'dialog-content-style' });
  }

  const handleOnCancel = () => {
    close();
  }

  const handleChangeStatus = (event) => {
    setParam('status', event.target.value);
  }

  const handleChangePeriod = (event) => {
      setParam('period', event.target.value);
  }

  const handlePageChange = (e, page) => {
    onPageChange(e, page);
  };

  const handleDateChange = (date) => {
    setParam(date);
  }

  return <div className={'appointments'}>
    <div className={'appointments__header'}>
      <div>
        <SelectInput size="small" label={"All appointments"} value={getParam("period")} onChange={handleChangePeriod} options={periodOptions} />
      </div>
      <PageActions>
        <SelectInput size="small" label={"Filter by statuses"} value={getParam("status")} onChange={handleChangeStatus} options={appointmentStatuses} />
        <DateInput
            label={"Select date(s)"}
            value={{dateFrom: getParam("dateFrom"), dateTo: getParam("dateTo")}}
            onChange={handleDateChange}
            isRange={true}
        />
      </PageActions>
    </div>
    <Table
      limit={itemsPerPage}
      page={currentPage}
      loading={dataIsLoading}
      emptyMessage={'You have no appointments yet'}
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

export default AdminPatientAppointments;
