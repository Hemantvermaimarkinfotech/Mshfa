import { useQuery } from "@apollo/client";

import { UserAPI } from "api";

export const useUser = () => {
  const userRole = localStorage.getItem("role")?.toLowerCase() || "";
  const { data, loading, error } = useQuery(UserAPI.me(), {
    fetchPolicy: "cache-first",
    variables: {
      isDoctor: userRole === "doctor",
      isPharmacist: userRole === "pharmacist",
    },
  });

  let user = {};
  let permissions = [];

  if (data && data.me) {
    const role = data.me.role.toLowerCase();
    const groups = data?.me?.groups;

    if (groups && groups.length > 0) {
      permissions = groups[0]?.permissions || [];
    }
    if (role) {
      if (role === "admin" || role === "super admin") {
        user = { role, id: data.me.id };
      } else {
        if (data.me[role]) {
          const { id } = data.me;
          const { id: roleId, ...userData } = data.me[role];
          const roleIdName = `${role}Id`;
          user = { ...userData, role, id, ...{ [roleIdName]: roleId } };
        }
      }
    }
  }

  return { user, userLoading: loading, userError: error, permissions };
};
