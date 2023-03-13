import React from "react";
import { NavLink } from "react-router-dom";

const Page_Header = ({
  page_title,
  page_title_icon,
  page_title_button,
  page_title_button_link,
}) => {
  return (
    <>
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white me-2">
            <i class={`mdi ${page_title_icon}`}></i>
          </span>
          {page_title}
        </h3>
        {page_title_button === "Overview" ? (
          <nav aria-label="breadcrumb">
            <ul className="breadcrumb">
              <li className="breadcrumb-item active" aria-current="page">
                <span></span>Overview
                <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>
              </li>
            </ul>
          </nav>
        ) : page_title_button === "Add" ? (
          <h3 className="page-title">
            <NavLink to={page_title_button_link}>
              <span className="page-title-icon bg-gradient-primary text-white me-2">
                <i class={`mdi mdi-plus`}></i>
              </span>
            </NavLink>
          </h3>
        ) : page_title_button === "Back" ? (
          <h3 className="page-title">
            <NavLink to={page_title_button_link}>
              <span className="page-title-icon bg-gradient-primary text-white me-2">
                <i class={`mdi mdi-keyboard-backspace`}></i>
              </span>
            </NavLink>
          </h3>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Page_Header;

// <nav aria-label="breadcrumb">
//   <ol class="breadcrumb">
//     <li class="breadcrumb-item"><a href="#">Home</a></li>
//     <li class="breadcrumb-item"><a href="#">Library</a></li>
//     <li class="breadcrumb-item active" aria-current="page">Data</li>
//   </ol>
// </nav>
