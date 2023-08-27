import React from "react";
import { SidebarData } from "./SidebarData";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import Logo from "./Logo";

export default function Sidebar() {
  return (
    <div
      style={{ backgroundColor: "#64748b" }}
      className="h-full w-[250px] border-r-1 "
    >
      <Logo />
      <ul className="h-auto w-full p-0">
        {SidebarData.map((val, key) => {
          return (
            <li
              key={key}
              className="w-full h-[60%] list-none my-2 mr-2 p-2 flex flex-row text-white justify-center items-center hover:cursor-pointer"
              onClick={() => (window.location.pathname = val.link)}
            >
              <div
                className="flex-[30%] grid place-items-center"
                style={{ color: "white" }}
              >
                {val.icon}
              </div>
              <div className="flex-[70%]" style={{ color: "white" }}>
                {val.title}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
