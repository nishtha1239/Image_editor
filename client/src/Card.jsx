import React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { useImage } from "./Context";
import { saveAs } from "file-saver";
import axios from "axios";

const options = ["Download", "Delete", "Edit"];
const ITEM_HEIGHT = 48;

export default function Card(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { setSelectedImage } = useImage();
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEdit = (e) => {
    e.preventDefault();
    setSelectedImage(props.src);
    handleClose();
    navigate("/edit");
  };

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`/images/${props.id}`)
      .then((response) => {
        console.log("Image deleted successfully");
        navigate(0);
      })
      .catch((error) => {
        console.error("Error deleting image:", error);
      });
    handleClose();
  };

  const handleDownload = (e) => {
    e.preventDefault();
    saveAs(props.src, "downloaded-image.jpg");
    handleClose();
  };

  return (
    <div
      style={{ backgroundColor: "#eeeeee" }}
      className="w-[250px]  shadow-md rounded-md p-4 flex flex-col "
    >
      <IconButton
        aria-label="more"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        className="self-end"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            onClick={
              option === "Download"
                ? handleDownload
                : option === "Delete"
                ? handleDelete
                : option === "Edit"
                ? handleEdit
                : null
            }
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
      <div className="w-full mb-2 overflow-hidden rounded-md">
        <img
          src={props.src}
          alt="card-1"
          className="w-full h-[200px] object-cover cursor-pointer border-2 border-gray-200"
          onClick={props.onClick}
        />
        <div className="flex mt-2 gap-2 flex-wrap">
          {props.tags &&
            props.tags.map((tag, index) => {
              return (
                <div
                  key={index + tag}
                  className="bg-gray-200 text-[1rem] rounded-full px-2 py-1 text-center"
                >
                  {tag}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
