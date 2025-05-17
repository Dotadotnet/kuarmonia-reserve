import { CalendarClock, Language, Wallet, Zap } from "lucide-react";
import Clock from "@/components/icons/Clock";
import Bag from "@/components/icons/Bag";
import Person from "@/components/icons/Person";

const OpportunityMeta = ({ opportunity }) => (
  <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-x-2 text-sm">
        <Bag /> نوع همکاری: <span>{opportunity?.jobType}</span>
      </div>
      <div className="flex items-center gap-x-2 text-sm">
        <Wallet className="w-4 h-4" /> حقوق: <span>{opportunity?.salary}</span>
      </div>
      <div className="flex items-center gap-x-2 text-sm">
        <Clock /> زمان ایجاد: <span>{new Date(opportunity?.createdAt).toLocaleDateString("fa-IR-u-ca-persian")}</span>
      </div>
    </div>
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-x-2 text-sm">
        <Person /> ظرفیت: <span>{opportunity?.capacity}</span>
      </div>
      <div className="flex items-center gap-x-2 text-sm">
        <Zap className="w-4 h-4" /> نوع کار: <span>{opportunity?.positionType}</span>
      </div>
      <div className="flex items-center gap-x-2 text-sm">
        <Language className="w-4 h-4" /> زبان‌ها: <span>{opportunity?.languages?.join("، ")}</span>
      </div>
    </div>
  </div>
);

export default OpportunityMeta;