"use client";

import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import {
  usePersistSessionQuery,
  useCreateSessionMutation
} from "@/services/session/sessionApi";
import { setSession } from "@/features/auth/authSlice";

const Session = ({ children }) => {
  const dispatch = useDispatch();
  const [createSession] = useCreateSessionMutation();
  const { data: sessionData, error: sessionError, isFetching } = usePersistSessionQuery();

  // مقدار session را فقط بعد از دریافت دیتا مقداردهی می‌کنیم
  const session = useMemo(() => sessionData?.data || null, [sessionData]);

  useEffect(() => {
    if (!isFetching && session) {
      dispatch(setSession(session));
    } else if (!isFetching && sessionError) {
      createSession();
    }
  }, [dispatch, session, sessionError, createSession, isFetching]);

  return <>{children}</>;
};

export default Session;
