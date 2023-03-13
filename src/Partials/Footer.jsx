import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div class="container-fluid d-flex justify-content-between">
        <span class="text-muted d-block text-center text-sm-start d-sm-inline-block">
          Copyright © 2022. All Rights Reserved
        </span>
        <span class="float-none float-sm-end mt-1 mt-sm-0 text-end">
          <NavLink to="https://www.acenet.io/" target="_blank">
            AceNet Consulting Pvt Ltd
          </NavLink>
        </span>
      </div>
    </>
  );
};

export default Footer;
