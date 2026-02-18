import { useMemo } from "react";
import { FaUsers, FaBoxOpen } from "react-icons/fa";
import { AiOutlineClockCircle } from "react-icons/ai";

import DashboardStats from "./DashboardStats";
import useAdminDashboardStats from "../hooks/useAdminDashboardStats";
import DashboardStatus from "./DashboardStatusAdmin";

const DashbrodAdmin = () => {
  // ✅ hook থেকে data আসবে
  const { loading, stats } = useAdminDashboardStats();

  return (
    <div>
      <div className="container items-center px-2 py-4 m-auto mt-0">
        <DashboardStats />
        <DashboardStatus />
      </div>
    </div>
  );
};

export default DashbrodAdmin;
