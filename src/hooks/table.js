import { useQuery } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
import { debounce, get, omit } from "lodash";
import { ordering } from "../config/table.sort";
import { datadogLogs } from "@datadog/browser-logs";

export const useTable = (tableConfig = {}, defaultParams = {}) => {
  const itemsPerPage = () => tableConfig.itemsPerPage || null;

  const [params, setParams] = useState({
    first: itemsPerPage(),
    after: null,
    search: "",
  });

  const [searchStr, setSearchStr] = useState("");

  const [currentPage, setCurrentPage] = useState(0);

  const [responseData, setResponseData] = useState({
    rowsCount: 0,
    rows: [],
    startCursor: null,
    endCursor: null,
  });
  const buildQuery = (params) => {
    let response = defaultParams;
    if (tableConfig && tableConfig.defaultSort) {
      if (!params.ordering) {
        response.ordering = tableConfig.defaultSort;
      }
    }
    return {
      ...response,
      ...omit(
        params,
        Object.keys(params).filter(
          (param) => [undefined, null, ""].indexOf(params[param]) !== -1
        )
      ),
    };
  };
  const { data, loading, error, refetch } = useQuery(tableConfig.dataApi(), {
    errorPolicy: "all",
    fetchPolicy: "cache-first",
    variables: buildQuery(params),
    onError: (err) => {
      // Log the error to Datadog
      datadogLogs.logger.error("GraphQL request failed in table", err);
    },
  });

  useEffect(() => {
    if (error) {
      datadogLogs.logger.error("GraphQL request failed", error);
    }
  }, [error]);

  const debounceUpdateParams = useCallback(debounce(setParams, 1000), [
    setParams,
  ]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!loading) {
      if (data) {
        const pageInfo = get(data, `${tableConfig.dataPath}.pageInfo`, {});

        setResponseData({
          rowsCount: get(data, `${tableConfig.dataPath}.totalCount`, 0),
          rows: get(data, `${tableConfig.dataPath}.edges`, []).map(
            (edge) => edge.node
          ),

          startCursor: pageInfo.startCursor,
          endCursor: pageInfo.endCursor,
        });
      } else {
        setResponseData({
          rowsCount: 0,
          rows: [],
          startCursor: null,
          endCursor: null,
        });
      }
    }
  }, [data, tableConfig.dataPath, loading]);

  const refetchData = () => {
    refetch(buildQuery(params));
  };

  const onChangeSort = (sortModel) => {
    const model =
      process.env.NODE_ENV === "development"
        ? sortModel?.sortModel?.[0]
        : sortModel?.[0];
    if (model) {
      const order = ordering[tableConfig.name][model.field];
      setParams((params) => ({
        ...params,
        ordering: model.sort === "asc" ? order : `-${order}`,
      }));
    } else {
      setParams((params) => ({ ...params, ordering: undefined }));
    }
  };

  const resetPage = () => ({
    first: itemsPerPage(),
    after: null,
    before: null,
    last: null,
  });

  const onNextPage = () => {
    if (loading) return;
    setParams((params) => {
      return {
        ...params,
        before: null,
        after: responseData.endCursor,
        first: itemsPerPage(),
        last: null,
      };
    });
  };

  const onPrevPage = () => {
    if (loading) return;
    setParams((params) => {
      return {
        ...params,
        before: responseData.startCursor,
        first: null,
        last: itemsPerPage(),
        after: null,
      };
    });
  };

  const onPageChange = (event, page) => {
    if (loading) return;
    if (currentPage > page) {
      setCurrentPage((page) => page - 1);
      onPrevPage();
    } else if (currentPage < page) {
      setCurrentPage((page) => page + 1);
      onNextPage();
    }
  };

  const getFirstPage = () => ({
    first: itemsPerPage(),
    after: null,
    before: null,
    last: null,
  });

  const setSearch = (search) => {
    if (search !== searchStr) {
      debounceUpdateParams({
        ...params,
        search: search,
        ...getFirstPage(),
      });
      setSearchStr(search);
      setCurrentPage(0);
    }
  };

  const debounceSetParam = (name, search) => {
    if (search !== searchStr) {
      debounceUpdateParams({
        ...params,
        [name]: search,
        ...getFirstPage(),
      });
      setSearchStr(search);
      setCurrentPage(0);
    }
  };

  const setParam = (key, value) => {
    setCurrentPage(0);
    if (typeof key === "object") {
      setParams((params) => {
        return { ...params, ...key, ...resetPage() };
      });
    } else {
      setParams((params) => {
        return { ...params, [key]: value || null, ...resetPage() };
      });
    }
  };

  const getParam = (key) => {
    return params[key] || "";
  };
  return {
    rows: responseData.rows,
    rowsCount: responseData.rowsCount,
    itemsPerPage: itemsPerPage(),
    refetchData,
    onNextPage,
    onPrevPage,
    onPageChange,
    currentPage,
    setSearch,
    debounceSetParam,
    setParam,
    getParam,
    onChangeSort,
    searchStr,
    dataIsLoading: loading,
    dataError: error,
  };
};
