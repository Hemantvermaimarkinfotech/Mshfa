import './index.scss';

import React from "react";
import { TokenStorage } from "services";
import { useFile } from "hooks/file";

import tableConfig from "config/table.config";
import { useTable } from "hooks/table";
import { useDoctors } from "hooks/doctors";
import { Table, UserAvatar } from "components/common";
import { DateInput, SearchInput, SelectInput } from "components/forms";
import { PageActions } from "components/layout";
import noAvatar from "assets/images/no-avatar.svg";

const AdminPatientSickLeaves = ({ patientId }) => {

  const {
    rows,
    dataIsLoading,
    itemsPerPage,
    currentPage,
    rowsCount,
    onPageChange,
    getParam,
    setParam,
    debounceSetParam,
    dataError,
  } = useTable(tableConfig.sickLeaves, { patient: patientId });

  const { doctors } = useDoctors({ patientSickLeave: patientId });


  const { uploadFile } = useFile();

  const generateSickLeave = (row) => {
    uploadFile(`pdf/sick-leave/${row.sickLeaveNum}/${TokenStorage.getToken()}`, `sickleave${row.sickLeaveNum}.pdf`);
  }

  const debounceSearch = (val) => {
    debounceSetParam('companyName', val);
  }

  const handleChangeDoctor = (event) => {
    setParam('doctor', event?.target?.value || null);
  }

  const handleDateChange = (date) => {
    setParam(date);
  }

  const renderDoctor = (doctor) => {
    if (doctor) {
      return <UserAvatar user={doctor}/>
    }
    return null;
  }

  const renderDoctorOption = (option) => {
    return renderDoctor(option);
  }

  const renderValue = (value) => {
    if (!value) return '';
    const doctor = doctors?.find(doctor => doctor.id === value);
    if (doctor) {
      return renderDoctor(doctor);
    }
    handleChangeDoctor(null);
    return '';
  }

  return <div className={'sick-leaves'}>
    <div className={'sick-leaves__header'}>
      <SelectInput
          label={"All doctors"}
          value={getParam("doctor")}
          onChange={handleChangeDoctor}
          options={ doctors }
          renderOption={renderDoctorOption}
          renderValue={renderValue}
      />
      <PageActions>
        <SearchInput placeholder={`Search by ID or Company name`} onChange={debounceSearch} />
        <DateInput
            label={"Select date(s)"}
            value={{dateFrom: getParam("dateFrom"), dateTo: getParam("dateTo")}}
            onChange={handleDateChange}
            isRange={true}
        />
      </PageActions>
    </div>
    <Table
        limit={itemsPerPage}
        page={currentPage}
        loading={dataIsLoading}
        emptyMessage={'You have no sick leaves yet'}
        columns={tableConfig.sickLeaves.columns}
        onCellButtonClick={generateSickLeave}
        onPageChange={onPageChange}
        rowCount={rowsCount}
        items={rows}
        paginationMode={tableConfig.paginationModes.SERVER}
    />
  </div>}

export default AdminPatientSickLeaves;