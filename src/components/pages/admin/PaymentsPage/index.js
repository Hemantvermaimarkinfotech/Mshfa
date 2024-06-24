import './index.scss';

import React from "react";

import { PageHeader, GlobalError, PageActions } from "components/layout";
import { SearchInput, SelectInput, DateInput } from "components/forms";
import { Table } from "components/common";

import tableConfig from 'config/table.config';
import { useConfig } from "hooks/config";
import { useTable } from "hooks/table";
import { TokenStorage } from "services";
import { useFile } from "hooks/file";

const PaymentsPage = ({ route }) => {

  const {
    rows,
    dataIsLoading,
    dataError,
    itemsPerPage,
    currentPage,
    onPageChange,
    rowsCount,
    setSearch,
    setParam,
    getParam,
    onChangeSort
  } = useTable(tableConfig.payments);

  const { previewFile } = useFile();

  const paymentMethods = useConfig('paymentMethods');
  const paymentServices = useConfig('paymentServices');

  const generateInvoice = (row) => {
    previewFile(`pdf/order/${row.relationId}/${TokenStorage.getToken()}`, `invoice${row.id}.pdf`);
  }

  if (dataError) {
    if (!rows || rows === []) {
      return <GlobalError />
    }
  }

  const handleChangeType = (event) => {
    setParam('service', event.target.value);
  }

  const handleChangeMethod = (event) => {
    setParam('paymentMethod', event.target.value);
  }

  const handleDateChange = (date) => {
    setParam(date);
  }

  return (
    <div className={'page page--with-table payments-page'}>
      <PageHeader>
        <div>
          <SelectInput size="small" label={"All payments"} value={getParam("service")} onChange={handleChangeType} options={paymentServices} />
        </div>
        <PageActions>
          <SearchInput placeholder={`Search by Patient, Doctor or Pharmacy`} onChange={setSearch} />
          <SelectInput size="small" label={"Filter by Payment method"} value={getParam("paymentMethod")} onChange={handleChangeMethod} options={paymentMethods} />
          <DateInput
            label={"Select date(s)"}
            value={{ dateFrom: getParam("dateFrom"), dateTo: getParam("dateTo") }}
            onChange={handleDateChange}
            isRange={true}
          />
        </PageActions>
      </PageHeader>
      <Table
        loading={dataIsLoading}
        page={currentPage}
        onPageChange={onPageChange}
        onSortModelChange={onChangeSort}
        items={rows}
        rowCount={rowsCount}
        onCellButtonClick={generateInvoice}
        emptyMessage={"No payments"}
        paginationMode={tableConfig.paginationModes.SERVER}
        columns={tableConfig.payments.columns}
        limit={itemsPerPage}
      />
    </div>
  )
}

export default PaymentsPage;
