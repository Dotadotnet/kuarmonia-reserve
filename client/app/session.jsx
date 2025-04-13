"use client";

import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import {
  usePersistSessionQuery,
  useCreateSessionMutation
} from "@/services/session/sessionApi";
import { setSession } from "@/features/auth/authSlice";
import Screen from "@/components/shared/loading/Screen";

const Session = ({ children }) => {
  const dispatch = useDispatch();
  const [createSession] = useCreateSessionMutation();
  const { data: sessionData, error: sessionError, isFetching } = usePersistSessionQuery();
  const session = useMemo(() => sessionData?.data || null, [sessionData]);
  useEffect(() => {
    if (!isFetching && session) {
      dispatch(setSession(session));
    } else if (!isFetching && sessionError) {
      createSession();
    }
  }, [dispatch, session, sessionError, createSession, isFetching]);
   if(!isFetching){
     return <>{children}</>;
   }else{
    return <><Screen /></>
   }
};

export default Session;
