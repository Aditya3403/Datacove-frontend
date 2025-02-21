import React, { useState, useRef, useMemo } from "react";
import DashBoardHome from "./DashBoardHome";

const DashboardContent = () => {
  return (
    <div className="flex-1 p-12 bg-[#060b27] space-y-8">
      <DashBoardHome />
    </div>
  );
};
export default DashboardContent;
