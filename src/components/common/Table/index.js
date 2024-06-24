import "./index.scss";

import React from "react";
import { LinearProgress } from "@material-ui/core";
import TablePagination from "@material-ui/core/TablePagination";
import { DataGrid, GridOverlay } from "@material-ui/data-grid";

const Table = ({
  items = [],
  height,
  columns,
  limit = 10,
  paginationMode = "client",
  rowCount = 0,
  page = 0,
  onPageChange,
  loading,
  error,
  emptyMessage,
  sortModel,
  onCellButtonClick,
  onSortModelChange = () => {},
  ...rest
}) => {
  const shouldRenderPagination = items.length > limit || rowCount > limit;

  const renderLoader = () => {
    return (
      <GridOverlay>
        <div style={{ position: "absolute", top: 0, width: "100%" }}>
          <LinearProgress />
        </div>
      </GridOverlay>
    );
  };

  const isNextButtonDisabled = () =>
    loading || getRowCount() <= (page + 1) * limit;

  const getRowCount = () => {
    return rowCount || (items && items.length) || 0;
  };

  const renderFooter = () => {
    return (
      <TablePagination
        component="div"
        backIconButtonProps={{ disabled: loading || !page }}
        nextIconButtonProps={{ disabled: isNextButtonDisabled() }}
        count={getRowCount()}
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={limit}
        rowsPerPageOptions={[]}
      />
    );
  };

  const renderEmptyTable = () => {
    return (
      <GridOverlay>
        <div className={"table__message"}>
          {emptyMessage || "Sorry, no results found"}
        </div>
      </GridOverlay>
    );
  };
   return (
    <div className={"table"} style={{ width: "100%" }}>
      <DataGrid
        sortingMode="server"
        onSortModelChange={onSortModelChange}
        page={page}
        rows={items}
        pageSize={limit}
        rowCount={getRowCount()}
        paginationMode={paginationMode}
        columns={columns}
        loading={loading}
        autoHeight={true}
        disableColumnResize={true}
        disableColumnMenu={true}
        disableColumnSelector={true}
        disableSelectionOnClick={true}
        disableClickEventBubbling={true}
        hideFooter={!shouldRenderPagination}
        components={{
          LoadingOverlay: renderLoader,
          NoRowsOverlay: renderEmptyTable,
          Footer: renderFooter,
        }}
        componentsProps={{
          CellMenuClicked: onCellButtonClick,
        }}
        {...rest}
      />
    </div>
  );
};

export default Table;
