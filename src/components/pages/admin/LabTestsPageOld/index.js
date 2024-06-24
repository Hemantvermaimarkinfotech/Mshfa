import './index.scss';

import React, { useState } from "react";
import { useSnackbar } from "notistack";

import { PageTitle, PageHeader, PageMetadata, PageActions } from "components/layout";
import { Popover, Table, LabTestActionsDropdown } from "components/common";
import { DateInput, SearchInput, SelectInput } from "components/forms";

import tableConfig from 'config/table.config';
import { testRequestStatus } from 'config/test_request';
import { useTable } from "hooks/table";
import { useConfig } from "hooks/config";
import { useTestRequestAPI } from "hooks/testRequest";

const LabTestsPageOld = ({ route }) => {

  const [selectedRow, setSelectedRow] = useState(null);
  const [popoverAnchor, setPopoverAnchor] = useState(null);

  const { testRequestStatuses } = useConfig();

  const { enqueueSnackbar } = useSnackbar();

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
  } = useTable(tableConfig.tests);

  const { toggleTestRequestStatus } = useTestRequestAPI();

  const onComplete = () => {
    handleClosePopover();
    toggleTestRequestStatus({ id: selectedRow.id, status: testRequestStatus.COMPLETED })
        .then(response => {
          if (response.success) {
            enqueueSnackbar('Lab test completed');
          } else {
            enqueueSnackbar('Error')
          }
        })
        .catch(() => enqueueSnackbar('Error'));
  }

  const onStart = () => {
    handleClosePopover();
    toggleTestRequestStatus({ id: selectedRow.id, status: testRequestStatus.IN_PROGRESS })
        .then(response => {
          if (response.success) {
            enqueueSnackbar('Lab test started');
          } else {
            enqueueSnackbar('Error')
          }
        })
        .catch(error => enqueueSnackbar('Error'));
  }

  const onReject = () => {
    handleClosePopover();
    toggleTestRequestStatus({ id: selectedRow.id, status: testRequestStatus.REJECTED })
        .then(response => {
          if (response.success) {
            enqueueSnackbar('Lab test rejected');
          } else {
            enqueueSnackbar('Error')
          }
        })
        .catch(() => enqueueSnackbar('Error'));
  }

    const handleOpenPopover = (anchor) => {
        setPopoverAnchor(anchor);
    };

    const handleClosePopover = () => {
    setSelectedRow(null)
    setPopoverAnchor(null);
  };

  const handleMenuClicked = (ref, row) => {
    setSelectedRow(row)
    handleOpenPopover(ref.current);
  }

  const handleChangeStatusSearch = (event) => {
      setParam('status', event.target.value);
  }

  return (
    <div className={'page page--with-table tests-page'}>
      <Popover
          open={Boolean(popoverAnchor)}
          anchor={popoverAnchor}
          onClose={handleClosePopover}
      >
        <LabTestActionsDropdown onComplete={onComplete} onStart={onStart} onReject={onReject} status={selectedRow && selectedRow.status.key}/>
      </Popover>
      <PageHeader>
        <PageMetadata>
          <PageTitle title={route.meta.title} caption={`${rowsCount} tests`} />
        </PageMetadata>
        <PageActions>
          <SearchInput placeholder={`Search by patient’s name, UHID`} onChange={setSearch} />
          <SelectInput size="small" label={"Filter by statuses"} value={getParam("status")} onChange={handleChangeStatusSearch} options={testRequestStatuses} />
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
          emptyMessage={'You have no tests yet'}
          columns={tableConfig.tests.columns}
          onCellButtonClick={handleMenuClicked}
          onPageChange={onPageChange}
          rowCount={rowsCount}
          items={rows}
          paginationMode={tableConfig.paginationModes.SERVER}
      />
    </div>
  )
}

export default LabTestsPageOld;