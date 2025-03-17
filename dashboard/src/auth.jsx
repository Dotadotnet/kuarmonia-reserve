import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { usePersistLoginQuery } from "@/services/auth/authApi";
import { addAdmin } from "@/features/auth/authSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const Auth = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: adminData, error: adminError } = usePersistLoginQuery();
  const admin = useMemo(() => adminData?.data || {}, [adminData]);
  useEffect(() => {
    if (adminData && !adminError) {
      toast.success(adminData?.description, { id: "auth" });
      dispatch(addAdmin(admin));
    }

    if (adminError?.data) {
      toast.error(adminError?.data?.description, { id: "auth" });
      navigate("/signin");

    }
  }, [adminData, adminError, dispatch, admin]);

  return <>{children}</>;
};

export default Auth;
