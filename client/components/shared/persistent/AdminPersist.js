

import { usePersistAdminQuery } from "@/services/auth/adminAuthApi";

import { useMemo } from "react";
import { useDispatch } from "react-redux";
import Screen from "../../../app/Loading";
import { useEffect } from "react";
import { addAdmin } from "@/features/auth/authSlice";

const AdminPersist = ({ children }) => {
  const { data, isLoading, error } = usePersistAdminQuery();
  const admin = useMemo(() => data?.data || {}, [data]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (Object?.keys(admin).length > 0) {
      dispatch(addAdmin(admin));
    }
    if (error) {
      console.log(error?.data?.message);
    }
  }, [error, admin, dispatch]);

  if (isLoading) {
    return <Screen />;
  }

  return <>{children}</>;
};

export default AdminPersist;
