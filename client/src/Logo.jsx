import React from "react";
import WebAssetIcon from "@mui/icons-material/WebAsset";

export default function Logo() {
  return (
    <div
      className="font-bold font-arial text-2xl flex gap-2 p-4"
      style={{ color: "white" }}
    >
      <WebAssetIcon className="text-white" style={{ fontSize: "40px" }} />
      DAM
    </div>
  );
}
