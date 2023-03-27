import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const CureentDate = new Date().getFullYear();
  return (
    <>
      <div class="container-fluid d-flex justify-content-between">
        <span class="text-muted d-block text-center text-sm-start d-sm-inline-block">
          Copyright © {CureentDate}. All Rights Reserved
        </span>
        <span class="float-none float-sm-end mt-1 mt-sm-0 text-end">
          <NavLink
            to="https://www.acenet.io/"
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            AceNet Consulting Pvt Ltd
          </NavLink>
        </span>
      </div>
    </>
  );
};

export default Footer;
