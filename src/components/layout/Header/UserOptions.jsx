import React, { useState } from "react";
import "./header.css";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import avatar2 from "../../../Images/avatar2.png";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DashBoardIcon from "@material-ui/icons/Dashboard";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import { logOut } from "../../../actions/userAction";

const UserOptions = ({ user }) => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  function logoutUser() {
    dispatch(logOut());
    alert.success("Logged Out Successfully");
    navigate("/");
  }
  function dashboard() {
    navigate("/admin/dashboard");
  }
  function orders() {
    navigate("/orders");
  }
  function profile() {
    navigate("/profile");
  }
  const [open, setOpen] = useState(false);
  const options = [
    { title: "Profile", icon: <PersonIcon />, direct: profile },
    { title: "Orders", icon: <ListAltIcon />, direct: orders },
    { title: "LogOut", icon: <ExitToAppIcon />, direct: logoutUser },
  ];
  
  if (user.role === "Admin" || user.role === "admin")
    options.unshift({
      title: "Dashboard",
      icon: <DashBoardIcon />,
      direct: dashboard,
    });
    
  return (
    <>
      <SpeedDial
        className="speedDialFragment"
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        icon={
          <img
            className="speedDialIcon"
            src={`${user.avatar.url ? user.avatar.url : avatar2}`}
            alt="profileICon"
          />
        }
        direction="down"
      >
        {options.map((e) => (
          <SpeedDialAction
            tooltipTitle={e.title}
            icon={e.icon}
            onClick={() => e.direct()}
            key={e.title}
            tooltipOpen
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default UserOptions;
