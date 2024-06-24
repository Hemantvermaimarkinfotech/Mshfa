import './index.scss';

import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import tableConfig from 'config/table.config';

import { useTable } from "hooks/table";

import { PageTitle, PageHeader, PageMetadata, GlobalError } from "components/layout";
import { Table } from "components/common";
import { appointmentStatus } from "config/appointment";
import { GlobalAppRouter } from "routes";

const UnresolvedAppointmentsPage = ({ route }) => {

    const { paths: { unresolvedAppointmentsDetails } } = GlobalAppRouter;
    const history = useHistory();
    const {
      rows,
      dataIsLoading,
      dataError,
      itemsPerPage,
      currentPage,
      onPageChange,
      rowsCount,
      refetchData,
    } = useTable(tableConfig.pastAppointments, { status: appointmentStatus.UNRESOLVED, ordering: '-start' });

    useEffect(() => {
        refetchData()
    }, []);

    if (dataError) {
        return <GlobalError />
    }

    const handleViewAppointment = (params) => {
        history.push(unresolvedAppointmentsDetails + params.row.id);
    }

    return (
        <div className={'page page--with-table past-appointments-page'}>
            <PageHeader>
                <PageMetadata>
                    <PageTitle title={route.meta.title} />
                </PageMetadata>
            </PageHeader>
            <Table
                loading={dataIsLoading}
                limit={itemsPerPage}
                page={currentPage}
                items={rows}
                rowCount={rowsCount}
                onPageChange={onPageChange}
                onRowClick={handleViewAppointment}
                columns={tableConfig.pastAppointments.columns}
                paginationMode={tableConfig.paginationModes.SERVER}
                emptyMessage={'You have no unresolved appointments'}
            />
        </div>
    )
}

export default UnresolvedAppointmentsPage;