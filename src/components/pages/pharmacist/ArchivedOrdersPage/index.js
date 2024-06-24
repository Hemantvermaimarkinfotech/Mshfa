import './index.scss';

import React from "react";
import { useHistory } from 'react-router-dom';

import { useTable } from "hooks/table";
import { useConfig } from "hooks/config";

import { PageHeader, PageActions, PageTitle, PageMetadata } from "components/layout";
import { DateInput, SearchInput, SelectInput } from "components/forms";
import { Table } from "components/common";

import tableConfig from 'config/table.config';
import { GlobalAppRouter } from "routes";

const ArchivedOrdersPage = ({ route }) => {

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
        setSearch
    } = useTable(tableConfig.archivedOrders, { period: 'past' });

    const handleChangeStatusSearch = (event) => {
        if (event.target.value) {
            setParam('status', [event.target.value]);
        } else {
            setParam('status', null);
        }
    }

    const handleRowClick = (params) => {
        history.push(GlobalAppRouter.paths.archivedOrdersDetails + `${params.row.id}`)
    }

    const getOrderStatusFilter = () => {
        const status = getParam("status");
        if (status && status.length) return status[0];
        return '';
    }

    return (
        <div className={'page page--with-table archived-orders-page'}>
            <PageHeader>
                <PageMetadata>
                    <PageTitle title={route.meta.title} caption={rowsCount === 1 ? `${rowsCount} order` : `${rowsCount} orders`} />
                </PageMetadata>
                <PageActions>
                    <SearchInput placeholder={`Search order by Order ID, Name or Phone number`} onChange={setSearch} />
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
                onRowClick={handleRowClick}
                limit={itemsPerPage}
                page={currentPage}
                loading={dataIsLoading}
                emptyMessage={'You have no orders yet'}
                columns={tableConfig.archivedOrders.columns}
                onPageChange={onPageChange}
                rowCount={rowsCount}
                items={rows}
                paginationMode={tableConfig.paginationModes.SERVER}
            />
        </div>
    )
}

export default ArchivedOrdersPage;