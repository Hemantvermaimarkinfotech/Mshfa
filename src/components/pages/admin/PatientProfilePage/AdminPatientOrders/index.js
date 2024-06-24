import './index.scss';

import React from "react";

import { GlobalAppRouter } from "routes";
import { useHistory } from "react-router-dom";
import { DateInput, SelectInput } from "components/forms";
import { useConfig } from "hooks/config";
import { useTable } from "hooks/table";
import { reduceRedundantColumns } from "utils/table";
import { periodOptions } from "config/common.config";
import tableConfig from "config/table.config";
import { Table } from "components/common";
import { PageActions, PageHeader } from "components/layout";

const AdminPatientOrders = ({ patientId }) => {

  const { orderStatuses } = useConfig();

  const history = useHistory();

  const {
    rows,
    dataIsLoading,
    itemsPerPage,
    currentPage,
    rowsCount,
    onPageChange,
    getParam,
    setParam,
    dataError,
    onChangeSort
  } = useTable(tableConfig.orders, { patient: patientId });

  const tableColumns = reduceRedundantColumns(tableConfig.orders.columns, ['user']);

  const handleChangePeriodSearch = (event) => {
    setParam('period', event.target.value);
  }

  const handleChangeStatusSearch = (event) => {
    if (event.target.value) {
      setParam('status', [event.target.value]);
    } else {
      setParam('status', null);
    }
  }

  const getOrderStatusFilter = () => {
    const status = getParam("status");
    if (status && status.length) return status[0];
    return '';
  }

  const handleRowClick = (params) => {
    history.push(GlobalAppRouter.paths.patientOrderDetails + `${patientId}/${params.row.id}`)
  }

  return <div className={'orders'}>
    <PageHeader>
      <div>
        <SelectInput size="small" label={"All orders"} value={getParam("period")} onChange={handleChangePeriodSearch} options={periodOptions} />
      </div>
      <PageActions>
        <SelectInput size="small" label={"Filter by statuses"} value={getOrderStatusFilter()} onChange={handleChangeStatusSearch} options={orderStatuses} />
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
        emptyMessage={'You have no orders yet'}
        columns={tableColumns}
        onRowClick={handleRowClick}
        onPageChange={onPageChange}
        onSortModelChange={onChangeSort}
        rowCount={rowsCount}
        items={rows}
        paginationMode={tableConfig.paginationModes.SERVER}
    />
  </div>
}

export default AdminPatientOrders;
