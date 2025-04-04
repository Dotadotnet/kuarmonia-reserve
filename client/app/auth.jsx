
"use client";

import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { usePersistLoginQuery } from "@/services/auth/authApi";
import { setUser } from "@/features/auth/authSlice";


const Auth = ({ children }) => {
  const dispatch = useDispatch();
  const { data: userData, error: userError } = usePersistLoginQuery();
  const user = useMemo(() => userData?.data || {}, [userData]);
  useEffect(() => {
    if (userData && !userError) {
      dispatch(setUser(user));
    }

    if (userError?.data) {
    }
  }, [userData, userError, dispatch, user]);

  return <>{children}</>;
};

export default Auth;