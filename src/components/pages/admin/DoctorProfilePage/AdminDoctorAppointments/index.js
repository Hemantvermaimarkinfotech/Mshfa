import React, { useState } from "react";
import './index.scss';
import tableConfig from "config/table.config";

import commonConfig, { periodOptions } from "config/common.config";
import { useTable } from "hooks/table";
import { useDialog } from "hooks/common";
import { reduceRedundantColumns } from "utils/table";

import { AppointmentDetailsPage, Table } from "components/common";

import { DateInput, SelectInput, StatusSelect } from "components/forms";
import { useConfig } from "hooks/config";
import { PageActions } from "components/layout";
import {getTranslatedStatusId} from "../../../../../utils/text";
import {useIntl} from "react-intl";


const AdminDoctorAppointments = ({ doctorId }) => {

  const { open, close } = useDialog();
  const { appointmentStatuses } = useConfig();
  const intl = useIntl()
  const {
    rows,
    dataIsLoading,
    itemsPerPage,
    currentPage,
    onPageChange,
    rowsCount,
    getParam,
    setParam,
    onChangeSort
  } = useTable(tableConfig.appointments, { doctor: doctorId });

  const [timeSlot, setTimeSlot] = useState('');
  const [status, setStatus] = useState('');

  const appointmentsColumns = reduceRedundantColumns(tableConfig.appointments.columns, ['uhi', 'doctor', 'paymentMethod', 'actions']);

  const handleOnCancel = () => {
    close();
  }

  const handleViewAppointment = (params) => {
    open(AppointmentDetailsPage, { appointmentId: params.row.id, onCancel: handleOnCancel }, { title: intl.formatMessage({id: 'words.common.appointment-details'}), maxWidth: false, contentClassName: 'dialog-content-style' });
  }

  const handleChangePeriodSearch = (event) => {
    setParam('period', event.target.value);
  }

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
    setParam('status', event.target.value);
  }

  return <div className={'appointments'}>
    <div className={'appointments__header'}>
      <div>
        <SelectInput size="small" label={"All appointments"} value={getParam("period")} onChange={handleChangePeriodSearch} options={periodOptions} />
      </div>
      <PageActions>
        <SelectInput size="small" label={"Filter by statuses"} value={getParam("status")} onChange={handleChangeStatus} options={appointmentStatuses.map(status => ({...status, val: intl.formatMessage({id: getTranslatedStatusId(status.val)})}))} />
        <DateInput
            label={"Select date(s)"}
            value={{ dateFrom: getParam("dateFrom"), dateTo: getParam("dateTo") }}
            onChange={setParam}
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
      onPageChange={onPageChange}
      rowCount={rowsCount}
      onRowClick={handleViewAppointment}
      onSortModelChange={onChangeSort}
      items={rows}
      paginationMode={tableConfig.paginationModes.SERVER}
    />
  </div>
}

export default AdminDoctorAppointments;
