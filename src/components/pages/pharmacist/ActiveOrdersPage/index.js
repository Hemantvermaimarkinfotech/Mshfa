import "./index.scss";

import React from "react";
import { useHistory } from "react-router-dom";

import { useTable } from "hooks/table";
import { useConfig } from "hooks/config";

import {
  PageHeader,
  PageActions,
  PageMetadata,
  PageTitle,
} from "components/layout";
import { DateInput, SearchInput, SelectInput } from "components/forms";
import { Table } from "components/common";

import tableConfig from "config/table.config";
import { GlobalAppRouter } from "routes";



const ActiveOrdersPage = ({ route }) => {
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
      setSearch,
    } = useTable(tableConfig.activeOrders, { period: "future" });
  
    const handleChangeStatusSearch = (event) => {
      if (event.target.value) {
        setParam("status", [event.target.value]);
      } else {
        setParam("status", null);
      }
    };
  
    const getOrderStatusFilter = () => {
      const status = getParam("status");
      if (status && status.length) return status[0];
      return "";
    };
  
    const handleRowClick = (params) => {
      history.push(GlobalAppRouter.paths.activeOrdersDetails + `${params.row.id}`);
    };
  
    return (
      <div className={"page page--with-table active-orders-page"}>
        <PageHeader>
          <PageMetadata>
            <PageTitle
              title={route.meta.title}
              caption={
                rowsCount === 1 ? `${rowsCount} order` : `${rowsCount} orders`
              }
            />
          </PageMetadata>
          <PageActions>
            <SearchInput
              placeholder={`Search order by Order ID, Name or Phone number`}
              onChange={setSearch} // Set the setSearch function from useTable hook
            />
            <SelectInput
              size="small"
              label={"Filter by statuses"}
              value={getOrderStatusFilter()}
              onChange={handleChangeStatusSearch}
              options={orderStatuses}
            />
            <DateInput
              label={"Select date(s)"}
              value={{
                dateFrom: getParam("dateFrom"),
                dateTo: getParam("dateTo"),
              }}
              onChange={setParam}
              isRange={true}
            />
          </PageActions>
        </PageHeader>
        <Table
          onRowClick={handleRowClick}
          limit={itemsPerPage}
          page={currentPage}
          loading={dataIsLoading}
          emptyMessage={"You have no orders yet"}
          columns={tableConfig.activeOrders.columns}
          onPageChange={onPageChange}
          rowCount={rowsCount}
          items={rows}
          paginationMode={tableConfig.paginationModes.SERVER}
        />
      </div>
    );
  };
  
  export default ActiveOrdersPage;