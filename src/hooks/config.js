import { useQuery } from "@apollo/client";
import { get } from "lodash";
import { ConfigAPI} from 'api';

export const useConfig = (name) => {
  const { data } = useQuery(ConfigAPI.getConfig(), {fetchPolicy: "cache-first"});
  console.log('calll config',data)
  return (name ? get(data, `config.${name}`) : data?.config) || {};
}

export const useDrugList = () => {
  const { data, loading } = useQuery(ConfigAPI.getDrugList(), {fetchPolicy: "cache-first"});
  return { loading, drugs: get(data, `listOfDrugs`) || [] };
}

