import './index.scss';

import React from "react";

import tableConfig from "config/table.config";
import { TokenStorage } from "services";
import { useFile } from "hooks/file";
import { Table } from "components/common";
import { DateInput, SelectInput } from "components/forms";

import { reduceRedundantColumns } from "utils/table";
import { useTable } from "hooks/table";
import { useConfig } from "hooks/config";
import { PageHeader, GlobalError, PageActions } from "components/layout";

const AdminPatientPayments = ({ patientId }) => {

  const { previewFile } = useFile();

  const {
    rows,
    dataIsLoading,
    dataError,
    itemsPerPage,
    currentPage,
    onPageChange,
    rowsCount,
    setParam,
    getParam,
    onChangeSort
  } = useTable(tableConfig.payments, { patient: patientId });

  const generateInvoice = (row) => {
    previewFile(`pdf/order/${row.relationId}/${TokenStorage.getToken()}`, `invoice${row.id}.pdf`);
  }

  const paymentMethods = useConfig('paymentMethods');
  const paymentServices = useConfig('paymentServices');

  const tableColumns = reduceRedundantColumns(tableConfig.payments.columns, ['patient']);

  const handleChangeType = (event) => {
    setParam('service', event.target.value);
  }

  const handleChangeMethod = (event) => {
    setParam('paymentMethod', event.target.value);
  }

  if (dataError) {
    if (!rows || rows === []) {
      return <GlobalError />
    }
  }

  return <div className={'payments'}>
    <PageHeader>
      <div>
        <SelectInput size="small" label={"All payments"} value={getParam("service")} onChange={handleChangeType} options={paymentServices} />
      </div>
      <PageActions>
        <SelectInput size="small" label={"Filter by Payment method"} value={getParam("paymentMethod")} onChange={handleChangeMethod} options={paymentMethods} />
        <DateInput
            label={"Select date(s)"}
            value={{ dateFrom: getParam("dateFrom"), dateTo: getParam("dateTo") }}
            onChange={setParam}
            isRange={true}
        />
      </PageActions>
    </PageHeader>
    <Table
      limit={itemsPerPage}
      page={currentPage}
      loading={dataIsLoading}
      emptyMessage={'You have no payments yet'}
      columns={tableColumns}
      onPageChange={onPageChange}
      onSortModelChange={onChangeSort}
      rowCount={rowsCount}
      items={rows}
      onCellButtonClick={generateInvoice}
      paginationMode={tableConfig.paginationModes.SERVER}
    />
  </div>
}

export default AdminPatientPayments;
