import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "./Avatar";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between w-full h-[70px] bg-bcol border-b-2 border-b1col">
      <div className="flex items-center ">
        <input
          type="text"
          className="ml-[50px] w-[300px] p-2 h-[25px] rounded-l-lg"
          placeholder="search"
        />
        <button className="bg-orange p-2 h-[25px] flex items-center justify-center rounded-r-lg">
          <SearchIcon />
        </button>
      </div>
      <div className="mr-[50px]">
        <Avatar />
      </div>
    </div>
  );
}
