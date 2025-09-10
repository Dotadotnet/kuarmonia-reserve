import JWT from "@/utils/jwt.util";
import { useSelector } from "react-redux";
import Tooltip from "../../tooltip/Tooltip";
import { CiUser } from "react-icons/ci";
import { FaUserCog } from "react-icons/fa";

const LargeDevice = () => {
  const admin = useSelector((state) => state?.auth);

 const image = new JWT().decodeAccessToken(localStorage.getItem("accessToken")); 
  return (
    <section>
      <div className="flex flex-row gap-x-4">
        {localStorage.getItem("accessToken") && Object.keys(admin).length > 0 ? (
          <Tooltip text="داشبود" txtColor="text-white">
          <button
            className="p-1.5 border  rounded  border-primary/20 dark:border-gray-800"
            onClick={() => {window.location.href = '/dashboard'}}
          >
            <FaUserCog className="text-lg" />
          </button>
        </Tooltip>
        ) : (
          <Tooltip text="ورود" txtColor="text-white">
          <button
            className="p-1.5 border  rounded  border-primary/20 dark:border-gray-800"
            onClick={() => {window.location.href = '/auth/signup'}}
          >
            <CiUser className="text-lg" />
          </button>
        </Tooltip>
        )}
      </div>
    </section>
  );
};

export default LargeDevice;
