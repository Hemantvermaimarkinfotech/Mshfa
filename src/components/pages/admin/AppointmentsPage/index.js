import "./index.scss";
import { datadogLogs } from "@datadog/browser-logs";

import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { PageHeader, PageActions, GlobalError } from "components/layout";
import {
  SearchInput,
  SelectInput,
  DateInput,
  CheckboxField,
} from "components/forms";
import tableConfig from "config/table.config";
import { periodOptions, categoryOptions } from "config/common.config";
import { useConfig } from "hooks/config";
import { useTable } from "hooks/table";
import { useDialog } from "hooks/common";
import { appointmentActions, paymentMethods } from "config/appointment";
import {
  AppointmentDetailsPage,
  AppointmentActionsPopup,
  Popover,
  AppointmentActionsDropdown,
  Table,
  InsurancePopup,
  ContractPopup,
} from "components/common";
import PatientLoad from "components/containers/PatientLoad";
import { getTranslatedStatusId } from "utils/text";

const AppointmentsPage = () => {
  // Initialize the Datadog Logger
  datadogLogs.init({
    clientToken: process.env.REACT_APP_DATADOG_CLIENT_TOKEN,
    site: "datadoghq.com",
    sessionSampleRate: 100,
    isCollectingError: true,
    silentMultipleInit: true,
    forwardErrorsToLogs: true,
    trackSessionAcrossSubdomains: true,
  });

  const { open, close } = useDialog();
  const { appointmentStatuses } = useConfig();
  const intl = useIntl();
  const [selectedRow, setSelectedRow] = useState(null);
  const [popoverAnchor, setPopoverAnchor] = useState(null);

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
    onChangeSort,
  } = useTable(tableConfig.appointments, { ordering: "-start" });

  const handleClosePopover = () => {
    setSelectedRow(null);
    setPopoverAnchor(null);
  };

  const handleMenuClicked = (ref, row) => {
    setSelectedRow(row);
    setPopoverAnchor(ref.current);
  };

  const handleOnCancel = () => {
    close();
  };

  const handleOnConfirm = () => {
    close();
  };

  const handleAppointmentAction = (action, row) => {
    try {
      if (typeof action === "string") {
        if (
          [appointmentActions.CONFIRM, appointmentActions.DECLINE].indexOf(
            action
          ) !== -1
        ) {
          openAppointmentActionPopup(action, row.id);
        } else if (action === "show-payment_type") {
          if (row.patient.id) {
            if (row.paymentType === paymentMethods.INSURANCE) {
              open(
                PatientLoad,
                {
                  component: InsurancePopup,
                  patientId: row.patient.id,
                  onCancel: close,
                },
                { title: <FormattedMessage id={"dialog.title.insurance"} /> }
              );
            } else if (row.paymentType === paymentMethods.CONTRACT) {
              open(
                PatientLoad,
                {
                  component: ContractPopup,
                  patientId: row.patient.id,
                  onCancel: close,
                },
                { title: <FormattedMessage id={"dialog.title.contract"} /> }
              );
            }
          }
        }
      } else {
        handleMenuClicked(action, row);
      }
    } catch (error) {
      // Log the error to Datadog
      datadogLogs.logger.error(`Error in handleAppointmentAction: ${error}`);
    }
  };

  const handleViewAppointment = (params) => {
    try {
      open(
        AppointmentDetailsPage,
        { appointmentId: params.row.id, onCancel: handleOnCancel },
        {
          title: <FormattedMessage id={"words.common.appointment-details"} />,
          maxWidth: false,
          contentClassName: "dialog-content-style",
        }
      );
    } catch (error) {
      // Log the error to Datadog
      datadogLogs.logger.error(`Error in handleViewAppointment: ${error}`);
    }
  };

  const openAppointmentActionPopup = (action, id) => {
    try {
      let title = (
        <FormattedMessage
          id="dialog.title.appointment.reject"
          defaultMessage="Reject Appointment"
        />
      );
      switch (action) {
        case appointmentActions.CONFIRM:
          title = (
            <FormattedMessage
              id="dialog.title.appointment.areyousure"
              defaultMessage="Are You sure?"
            />
          );
          break;
        case appointmentActions.RESCHEDULE:
          title = (
            <FormattedMessage
              id="dialog.title.appointment.reschedule"
              defaultMessage="Reschedule appointment"
            />
          );
          break;
        case appointmentActions.REASSIGN:
          title = (
            <FormattedMessage
              id="dialog.title.appointment.reassign"
              defaultMessage="Reassign Doctor"
            />
          );
          break;
        case appointmentActions.DECLINE:
          title = (
            <FormattedMessage
              id="dialog.title.appointment.decline"
              defaultMessage="Decline Appointment"
            />
          );
          break;
      }
      open(
        AppointmentActionsPopup,
        {
          appointmentId: id,
          action,
          onCancel: handleOnCancel,
          onConfirm: handleOnConfirm,
        },
        { title: title, maxWidth: false }
      );
    } catch (error) {
      // Log the error to Datadog
      datadogLogs.logger.error(`Error in openAppointmentActionPopup: ${error}`);
    }
  };

  const handleActionClick = (action) => {
    openAppointmentActionPopup(action, selectedRow.id);
    handleClosePopover();
  };

  const handleChangePeriodSearch = (event) => {
    try {
      setParam("period", event.target.value);
    } catch (error) {
      // Log the error to Datadog
      datadogLogs.logger.error(`Error in handleChangePeriodSearch: ${error}`);
    }
  };

  const handleChangeCategorySearch = (event) => {
    setParam("category", event.target.value);
  };

  const handleChangeStatusSearch = (event) => {
    setParam("status", event.target.value);
  };

  if (dataError) {
    return <GlobalError />;
  }

  const handleSearchInputChange = (event) => {
    try {
      const value = event.target.value;
      setSearch(value);
    } catch (error) {
      // Log the error to Datadog
      datadogLogs.logger.error(`Error in handleSearchInputChange: ${error}`);
    }
  };

  return (
    <div className={"page page--with-table appointments-page"}>
      <Popover
        open={Boolean(popoverAnchor)}
        anchor={popoverAnchor}
        onClose={handleClosePopover}
      >
        <AppointmentActionsDropdown
          appointment={selectedRow}
          onActionClick={handleActionClick}
        />
      </Popover>
      <PageHeader>
        <div style={{ display: "flex" }}>
          <SelectInput
            style={{ marginRight: "16px" }}
            size="small"
            label={"All appointments"}
            value={getParam("period")}
            onChange={handleChangePeriodSearch}
            options={periodOptions}
          />
          <CheckboxField
            title={"Only with Sick Leaves"}
            className="sick-leaves-checkbox"
            checked={!!getParam("patientSickLeave")}
            onChange={(event) => {
              try {
                const value = event.target.value === "off" ? "on" : null;
                setParam("patientSickLeave", value);
              } catch (error) {
                datadogLogs.logger.error(
                  // Log the error to Datadog
                  `Error in onChangeCheckboxField: ${error}`
                );
              }
            }}
            value={getParam("patientSickLeave") ? "on" : "off"}
          />
        </div>
        <PageActions>
          <SearchInput
            placeholder={`Search by patient’s name, UHID`}
            onChange={handleSearchInputChange}
          />
          <SelectInput
            multiple
            size="small"
            label={"Filter by statuses"}
            value={getParam("status") || []}
            onChange={handleChangeStatusSearch}
            options={appointmentStatuses?.map((status) => ({
              ...status,
              val: intl.formatMessage({
                id: getTranslatedStatusId(status.val),
              }),
            }))}
          />
          <SelectInput
            size="small"
            label={"Fitler by category"}
            value={getParam("category")}
            onChange={handleChangeCategorySearch}
            options={categoryOptions}
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
        limit={itemsPerPage}
        page={currentPage}
        loading={dataIsLoading}
        emptyMessage={"You have no appointments yet"}
        columns={tableConfig.appointments.columns}
        onRowClick={handleViewAppointment}
        onCellButtonClick={handleAppointmentAction}
        onPageChange={onPageChange}
        rowCount={rowsCount}
        onSortModelChange={onChangeSort}
        items={rows}
        paginationMode={tableConfig.paginationModes.SERVER}
      />
    </div>
  );
};

export default AppointmentsPage;
