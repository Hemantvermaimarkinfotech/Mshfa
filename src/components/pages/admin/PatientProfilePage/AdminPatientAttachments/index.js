import './index.scss';

import React from "react";

import tableConfig from "config/table.config";
import { useTable } from "hooks/table";
import { uploadType } from "config/upload";
import { uploadedByOptions } from "config/common.config";

import { Table } from "components/common";
import { DateInput, SelectInput } from "components/forms";

const AdminPatientAttachments = ({ patientId }) => {

  const {
    rows,
    dataIsLoading,
    itemsPerPage,
    currentPage,
    onPageChange,
    rowsCount,
    setParam,
    getParam,
  } = useTable(tableConfig.attachments, { category: uploadType.ATTACHMENT, patient: patientId });

  const handleChangeUploadedBy = (event) => {
    setParam('uploadedBy', event.target.value);
  }

  const handleDateChange = (date) => {
    setParam(date);
  }

  return <div className={'attachments'}>
    <div className={'attachments__header'}>
      <SelectInput size="small" label={"Uploaded By"} value={getParam("uploadedBy")} onChange={handleChangeUploadedBy} options={uploadedByOptions} />
      <DateInput
          label={"Select date(s)"}
          value={{dateFrom: getParam("dateFrom"), dateTo: getParam("dateTo")}}
          onChange={handleDateChange}
          isRange={true}
      />
    </div>
    <Table
        limit={itemsPerPage}
        page={currentPage}
        loading={dataIsLoading}
        emptyMessage={'You have no attachments yet'}
        columns={tableConfig.attachments.columns}
        onPageChange={onPageChange}
        rowCount={rowsCount}
        items={rows}
        paginationMode={tableConfig.paginationModes.SERVER}
    />
  </div>}

export default AdminPatientAttachments;