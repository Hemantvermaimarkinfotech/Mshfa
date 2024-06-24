import { useQuery, useMutation } from "@apollo/client";
import { PackagesApi } from "api";

export const usePackages = (variables = {}) => {
  const { data, loading, error, refetch } = useQuery(
    PackagesApi.getAllPackages(),
    {
      variables,
    }
  );
  let packages;

  if (data?.packageList) {
    packages = data.packageList.edges.map((edge) => edge.node);
  }
 
  return {
    packages,
    packagesLoading: loading,
    packagesError: error,
    refetchPackages: refetch,
  };
};

export const usePackage = (id) => {
  const { data, loading, error, refetch } = useQuery(
    PackagesApi.getPackageById(),
    {
      variables: { id },
      errorPolicy: "all",
    }
  );

  let thePackage;

  if (data?.packageDetails) {
    thePackage = data.packageDetails;
  }

  return { thePackage, packageLoading: loading, packageError: error, refetch };
};

export const usePackagesApi = () => {
  const cacheFunc = {
    update(cache) {
      cache.evict({ id: "ROOT_QUERY", fieldName: "packageList" });
    },
  };

  const [create] = useMutation(PackagesApi.createPackage(), cacheFunc);
  const [update] = useMutation(PackagesApi.updatePackage(), cacheFunc);
  const [packageDelete] = useMutation(PackagesApi.deletePackage(), cacheFunc);

  const deletePackage = (data) => {
    return packageDelete({ variables: { input: data } }).then(
      (response) => response.data?.packageDelete
    );
  };

  const createPackage = (data) => {
    return create({ variables: { input: data } }).then(
      (response) => response.data?.packageCreate
    );
  };
  
  const updatePackage = (data) => {
    return update({ variables: { input: data } }).then(
      (response) => response.data?.packageUpdate
    );
  };

  return {
    createPackage,
    deletePackage,
    updatePackage,
  };
};
