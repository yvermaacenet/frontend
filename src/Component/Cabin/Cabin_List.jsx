import axios from "axios";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Footer from "../../Partials/Footer";
import Navbar from "../../Partials/Navbar";
import Page_Header from "../../Partials/Page_Header";
import Sidebar from "../../Partials/Sidebar";
import { SketchPicker } from "react-color";
import reactCSS from "reactcss";
const Cabin_List = () => {
  const [getCabinList, setGetCabinList] = useState([]);
  const [getChooseColor, setGetChooseColor] = useState({
    displayColorPicker: true,
    color: {
      r: "241",
      g: "112",
      b: "19",
      a: "1",
    },
  });
  console.log("getCabinList", getCabinList);
  useEffect(() => {
    async function get_cabin_list() {
      const result_cabin_list = await axios.get("cabin_list");
      const resp_cabin_list = result_cabin_list.data;
      console.log("resp_cabin_list", resp_cabin_list);
      setGetCabinList(resp_cabin_list);
    }
    get_cabin_list();
  }, []);
  const styles = reactCSS({
    default: {
      color: {
        width: "36px",
        height: "14px",
        borderRadius: "2px",
      },
      swatch: {
        padding: "5px",
        background: "#fff",
        borderRadius: "1px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        display: "inline-block",
        cursor: "pointer",
      },
      popover: {
        position: "absolute",
        zIndex: "2",
      },
      cover: {
        position: "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
    },
  });
  // const handleClick = () => {
  //   setGetChooseColor({
  //     displayColorPicker: !getChooseColor?.displayColorPicker,
  //   });
  // };

  // const handleClose = () => {
  //   setGetChooseColor({ displayColorPicker: false });
  // };

  // const handleChange = (color) => {
  //   setGetChooseColor({ color: color?.rgb });
  // };
  return (
    <>
      <div class="container-scroller">
        <Navbar />
        <div class="container-fluid page-body-wrapper">
          <Sidebar />
          <div class="main-panel">
            <div class="content-wrapper">
              <Page_Header
                page_title="Cabin"
                page_title_icon="mdi-home-modern"
                page_title_button="Add"
                page_title_button_link="/cabin_add"
              />
              <div class="row">
                <div class="card">
                  <div class="card-body">
                    <table class="table table-striped">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Color code</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getCabinList.map((value, index) => {
                          return (
                            <tr>
                              <td>{index + 1}</td>
                              <td>{value.name}</td>
                              <td>
                                <div
                                  style={styles.swatch}
                                  // onClick={handleClick}
                                >
                                  <div
                                    style={{
                                      ...styles.color,
                                      background: `rgba(${value?.color_code?.r}, ${value?.color_code?.g}, ${value?.color_code?.b}, ${value?.color_code?.a})`,
                                    }}
                                  />
                                </div>
                                {/* {getChooseColor?.displayColorPicker ? (
                                  <div style={styles.popover}>
                                    <div
                                      style={styles.cover}
                                      onClick={handleClose}
                                    />
                                    <SketchPicker
                                      color={getChooseColor?.color_code}
                                      onChange={handleChange}
                                    />
                                  </div>
                                ) : null} */}
                              </td>
                              <td>
                                {value?.status ? (
                                  <label class="badge badge-success">
                                    Active
                                  </label>
                                ) : (
                                  <label class="badge badge-danger">
                                    Deactive
                                  </label>
                                )}
                              </td>

                              <td>
                                <NavLink to={`/cabin_update/${value?._id}`}>
                                  <button
                                    type="button"
                                    class="btn btn-sm btn-inverse-dark btn-icon"
                                    title="Edit"
                                  >
                                    <i class="mdi mdi-table-edit"></i>
                                  </button>
                                </NavLink>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <footer class="footer">
              <Footer />
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cabin_List;