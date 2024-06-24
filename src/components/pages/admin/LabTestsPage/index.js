import './index.scss';

import React from "react";
import {useIntl} from "react-intl";
import { useHistory } from "react-router-dom";

import { useTable } from "hooks/table";
import { useConfig } from "hooks/config";
import tableConfig from 'config/table.config';
import { periodOptions } from 'config/common.config';
import { GlobalAppRouter } from "routes";

import { PageHeader, PageActions } from "components/layout";
import { DateInput, SearchInput, SelectInput } from "components/forms";
import { Table } from "components/common";
import {getTranslatedStatusId} from "utils/text";


const LabTestsPage = () => {

    const { orderStatuses } = useConfig();
    const intl = useIntl()

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
        onChangeSort
    } = useTable(tableConfig.orders, {category: '2'});


    const handleCellClick = (params) => {
        params.field === 'patient'
            ?
            history.push(GlobalAppRouter.paths.patientsProfile + `${params.row.patient.id}`)
            :
            history.push(GlobalAppRouter.paths.ordersDetails + `${params.row.id}`)
    }

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

    return (
        <div className={'page page--with-table orders-page'}>
            <PageHeader>
                <div>
                    <SelectInput size="small" label={"All orders"} value={getParam("period")} onChange={handleChangePeriodSearch} options={periodOptions} />
                </div>
                <PageActions>
                    <SearchInput placeholder={`Search by ID, Patient or Pharmacy`} onChange={setSearch} />
                    <SelectInput
                        size="small"
                        label={"Filter by statuses"}
                        value={getOrderStatusFilter()}
                        onChange={handleChangeStatusSearch}
                        options={orderStatuses.map(status => ({...status, val: intl.formatMessage({id: getTranslatedStatusId(status.val)})}))} />
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
                onCellClick={handleCellClick}
                emptyMessage={'You have no lab tests yet'}
                columns={tableConfig.orders.columns}
                onPageChange={onPageChange}
                onSortModelChange={onChangeSort}
                rowCount={rowsCount}
                items={rows}
                paginationMode={tableConfig.paginationModes.SERVER}
            />
        </div>
    )
}

export default LabTestsPage;
