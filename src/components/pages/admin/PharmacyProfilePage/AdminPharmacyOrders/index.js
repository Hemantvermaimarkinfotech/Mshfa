import './index.scss';

import React from "react";
import { useHistory } from "react-router-dom";
import { GlobalAppRouter } from "routes";

import { DateInput, SearchInput, SelectInput } from "components/forms";
import tableConfig from "config/table.config";
import { useConfig } from "hooks/config";
import { useTable } from "hooks/table";
import { reduceRedundantColumns } from "utils/table";
import { Table } from "components/common";
import { periodOptions } from "config/common.config";
import { PageActions, PageHeader } from "components/layout";

const AdminPharmacyOrders = ({ pharmacyId }) => {

  const history = useHistory();
  const { orderStatuses } = useConfig();

  const {
    rows,
    dataIsLoading,
    itemsPerPage,
    currentPage,
    rowsCount,
    onPageChange,
    setSearch,
    getParam,
    setParam,
    dataError,
  } = useTable(tableConfig.orders, { pharmacy: pharmacyId });

  const tableColumns = reduceRedundantColumns(tableConfig.orders.columns, ['pharmacy']);

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
    history.push(`${GlobalAppRouter.paths.pharmacyOrderDetails}${pharmacyId}/${params.row.id}`)
  }

  return <div className={'orders'}>
    <PageHeader>
      <div>
        <SelectInput size="small" label={"All orders"} value={getParam("period")} onChange={handleChangePeriodSearch} options={periodOptions} />
      </div>
      <PageActions>
        <SearchInput placeholder={`Search by Order ID, Patient or Pharmacy `} onChange={setSearch} />
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
        onPageChange={onPageChange}
        rowCount={rowsCount}
        items={rows}
        onRowClick={handleRowClick}
        paginationMode={tableConfig.paginationModes.SERVER}
    />
  </div>
}

export default AdminPharmacyOrders;