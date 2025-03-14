import React, { useState, useRef, useMemo } from "react";
import DashBoardHome from "./DashBoardHome";
import DashboardPage from "./DashboardPage";

const DashboardContent = () => {
  return (
    <div className="flex-1 p-12 bg-[#060b27] space-y-8 rounded-lg">
      <DashboardPage />
    </div>
  );
};
export default DashboardContent;
