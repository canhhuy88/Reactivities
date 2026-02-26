import { MenuItem } from "@mui/material";
import React from "react";
import { NavLink } from "react-router";

export default function MenuItemLink({
  children,
  to,
}: {
  children: React.ReactNode;
  to: string;
}) {
  return (
    <MenuItem
      component={NavLink}
      to={to}
      sx={{
        fontStyle: "1.2rem",
        color: "inherit",
        textTransform: "uppercase",
        fontWeight: "bold",
        "&.active": {
          color: "yellow",
        },
      }}
    >
      {children}
    </MenuItem>
  );
}
