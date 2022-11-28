import React, { useMemo } from "react";
import { useAppSelector } from "../store";
import { UserRole } from "../utils/types";

const useUserRole = () => {
  const { value: user, status: userState } = useAppSelector(
    (state) => state.user
  );

  const isAdmin = useMemo(() => [UserRole.Admin].includes(user?.role), [user]);

  const isSuperAdmin = useMemo(
    () => [UserRole.SuperAdmin].includes(user?.role),
    [user]
  );

  const isUser = useMemo(() => [UserRole.User].includes(user?.role), [user]);

  return {
    isUser,
    isAdmin,
    isSuperAdmin,
  };
};

export default useUserRole;
