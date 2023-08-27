import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export const SidebarData = [
  {
    title: "DashBoard",
    icon: <DashboardIcon />,
    link: "/dashboard",
  },
  {
    title: "Recent",
    icon: <AccessTimeIcon />,
    link: "/recent-images",
  },
];
