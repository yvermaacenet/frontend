import axios from "axios";
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../../Partials/Footer";
import Navbar from "../../Partials/Navbar";
import Page_Header from "../../Partials/Page_Header";
import Sidebar from "../../Partials/Sidebar";
import { SketchPicker } from "react-color";
import reactCSS from "reactcss";
const Cabin_Add = () => {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    status: false,
  });
  const [getChooseColor, setGetChooseColor] = useState({
    displayColorPicker: false,
    color: {
      r: "150",
      g: "85",
      b: "255",
      a: "1",
    },
  });
  const inputEvent = (event) => {
    const { name, value } = event.target;
    setInputData((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const styles = reactCSS({
    default: {
      color: {
        height: "20px",
        borderRadius: "2px",
        background: `rgba(${getChooseColor?.color.r}, ${getChooseColor?.color.g}, ${getChooseColor?.color.b}, ${getChooseColor?.color.a})`,
      },
      swatch: {
        width: "30%",
        padding: "10px",
        marginLeft: "30px",
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
  const handleClick = () => {
    setGetChooseColor({
      ...getChooseColor,
      displayColorPicker: !getChooseColor?.displayColorPicker,
    });
  };

  const handleClose = () => {
    setGetChooseColor({ ...getChooseColor, displayColorPicker: false });
  };

  const handleChange = (color) => {
    setGetChooseColor({ ...getChooseColor, color: color?.rgb });
    setInputData({ ...inputData, color_code: getChooseColor?.color });
  };
  const onCabinAddButton = (e) => {
    e.preventDefault();
    async function add_cabin() {
      const result = await axios
        .post(`/cabin_add`, inputData)
        .then((res) => {
          return alert(res?.data.message), navigate("/cabin_list");
        })
        .catch((err) => console.log(err));
    }
    add_cabin();
  };

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
                page_title_button="Back"
                page_title_button_link="/cabin_list"
              />
              <div class="row">
                <div class="card">
                  <div class="card-body">
                    <form class="forms-sample">
                      <div className="row">
                        <div className="col-md-3">
                          <div class="form-group">
                            <label>Cabin Name </label>
                            <input
                              type="text"
                              name="name"
                              class="form-control form-control-sm"
                              onChange={inputEvent}
                              value={inputData?.name}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div class="form-group row">
                            <label> Pick cabin color </label>
                            <div style={styles.swatch} onClick={handleClick}>
                              <div
                                style={{
                                  ...styles.color,
                                }}
                              />
                            </div>
                            {getChooseColor.displayColorPicker ? (
                              <div style={styles.popover}>
                                <div
                                  style={styles.cover}
                                  onClick={handleClose}
                                />
                                <SketchPicker
                                  color={getChooseColor.color}
                                  onChange={handleChange}
                                />
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div class="form-group row">
                            <label>Status </label>

                            <label class="switch ms-4 mt-2">
                              <input
                                type="checkbox"
                                name="status"
                                class="form-control form-control-sm"
                                onChange={() => {
                                  return setInputData({
                                    ...inputData,
                                    status: !inputData?.status,
                                  });
                                  // onStatusChange(!checkedStatus)
                                }}
                              />
                              <span class="slider round"></span>
                            </label>
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        class="btn btn-sm btn-gradient-primary me-2"
                        onClick={onCabinAddButton}
                      >
                        Submit
                      </button>
                    </form>
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

export default Cabin_Add;