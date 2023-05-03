import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../Partials/Footer";
import Navbar from "../../Partials/Navbar";
import Page_Header from "../../Partials/Page_Header";
import Sidebar from "../../Partials/Sidebar";
import { SketchPicker } from "react-color";
import { useAlert } from "react-alert";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import reactCSS from "reactcss";
const Cabin_Add = () => {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const alert = useAlert();
  const LocalStorageData = JSON.parse(localStorage.getItem("loggedin"));
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [inputData, setInputData] = useState({
    status: true,
  });
  const [getChooseColor, setGetChooseColor] = useState({
    displayColorPicker: false,
    color: {
      r: Math?.floor(Math?.random() * 255),
      g: Math?.floor(Math?.random() * 255),
      b: Math?.floor(Math?.random() * 255),
      a: "1",
    },
  });
  useEffect(() => {
    const get_user_list = async () => {
      const res = await axios.get("/get_location", {
        headers: { Access_Token: LocalStorageData?.generate_auth_token },
      });
      setLocation(res.data);
    };
    get_user_list();
  }, []);
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
        background: `rgba(${getChooseColor?.color?.r}, ${getChooseColor?.color?.g}, ${getChooseColor?.color?.b}, ${getChooseColor?.color?.a})`,
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
    setLoading(true);
    async function add_cabin() {
      await axios
        .post(
          `/cabin_add`,
          {
            ...inputData,
            location: locationList.location,
            color_code: getChooseColor?.color,
          },
          {
            headers: { Access_Token: LocalStorageData?.generate_auth_token },
          }
        )
        .then((resp) => {
          return alert.show(resp?.data.message), navigate("/cabin_list");
        })
        .catch((err) => {
          if (err?.response.status === 500) {
            navigate("/error_500");
          } else {
            navigate("/error_403");
          }
        });
      setLoading(false);
    }
    add_cabin();
  };

  const handleLocationChangeEvent = (e) => {
    const { name, value } = e.target;
    setLocationList((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const add_location_submit = async (e) => {
    e.preventDefault();
    const res = await axios.post("/location_add", locationList, {
      headers: { Access_Token: LocalStorageData?.generate_auth_token },
    });
    alert?.success(res.data.message);
    setLocationList("");
    if (res.data.message === "created") {
      setModal(false);
    }
  };

  return (
    <>
      <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              <Page_Header
                page_title="Cabin"
                page_title_icon="mdi-home-modern"
                page_title_button="Back"
                page_title_button_link="/cabin_list"
              />
              {loading && (
                <div className="loader-container">
                  <div className="loader"></div>
                </div>
              )}
              <div className="row">
                <div class="col-lg-12 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <form className="forms-sample">
                        <div className="row">
                          <div className="col-md-3">
                            <div className="form-group">
                              <label>Cabin Name </label>
                              <input
                                type="text"
                                name="name"
                                className="form-control form-control-sm"
                                onChange={inputEvent}
                                placeholder="Enter cabin name"
                                value={inputData?.name}
                              />
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="form-group">
                              <div className="d-flex justify-content-between">
                                <label>Location </label>
                                <button
                                  className="btn btn-light btn-sm h-25"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setModal(true);
                                  }}
                                >
                                  Add
                                </button>
                                <PureModal
                                  header="Add Location"
                                  // footer={
                                  //   <div>
                                  //     <form type="submit">
                                  //       <button className="btn btn-primary btn-sm">
                                  //         Create
                                  //       </button>
                                  //     </form>
                                  //   </div>
                                  // }
                                  isOpen={modal}
                                  closeButton="X"
                                  closeButtonPosition="bottom"
                                  onClose={() => {
                                    setModal(false);
                                    return true;
                                  }}
                                >
                                  <div>
                                    <form>
                                      <input
                                        className="form-control"
                                        name="name"
                                        onChange={handleLocationChangeEvent}
                                        placeholder="Enter the Location name"
                                      />
                                      <button
                                        type="submit"
                                        onClick={add_location_submit}
                                        className="btn btn-primary mt-2"
                                      >
                                        Create
                                      </button>
                                    </form>
                                  </div>
                                </PureModal>
                              </div>
                              <select
                                className="form-control h-100"
                                name="location"
                                value={locationList.name}
                                onChange={handleLocationChangeEvent}
                              >
                                <option>Select Location</option>
                                {location.map((item) => {
                                  return (
                                    <option value={item.name}>
                                      {item.name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="form-group row">
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
                            <div className="form-group row">
                              <label>Status </label>

                              <label className="switch ms-4 mt-2">
                                <input
                                  type="checkbox"
                                  name="status"
                                  className="form-control form-control-sm"
                                  onChange={() => {
                                    return setInputData({
                                      ...inputData,
                                      status: !inputData?.status,
                                    });
                                    // onStatusChange(!checkedStatus)
                                  }}
                                  checked={inputData.status}
                                />
                                <span className="slider round"></span>
                              </label>
                            </div>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="btn btn-sm btn-gradient-primary me-2"
                          onClick={onCabinAddButton}
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <footer className="footer">
              <Footer />
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cabin_Add;
