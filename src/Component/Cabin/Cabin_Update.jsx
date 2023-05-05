import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../Partials/Footer";
import Navbar from "../../Partials/Navbar";
import Page_Header from "../../Partials/Page_Header";
import Sidebar from "../../Partials/Sidebar";
import { SketchPicker } from "react-color";
import reactCSS from "reactcss";
import { useAlert } from "react-alert";
const Cabin_Update = () => {
  const alert = useAlert();
  const { _id } = useParams();
  const navigate = useNavigate();
  const LocalStorageData = JSON.parse(localStorage.getItem("loggedin"));
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState([]);

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
  useEffect(() => {
    const get_user_list = async () => {
      const res = await axios.get("/get_location", {
        headers: { Access_Token: LocalStorageData?.generate_auth_token },
      });
      setLocation(res.data);
    };
    get_user_list();
  }, []);
  useEffect(() => {
    setLoading(true);
    async function get_user_data() {
      await axios
        .get(`/cabin_list_by_id/${_id}`, {
          headers: { Access_Token: LocalStorageData?.generate_auth_token },
        })
        .then((resp) => {
          return (
            setInputData(resp?.data),
            setGetChooseColor({
              ...getChooseColor,
              color: resp?.data?.color_code,
            })
          );
        })
        .catch((err) => {
          if (err.response.status === 500) {
            navigate("/error_500");
          } else {
            navigate("/error_403");
          }
        });
      setLoading(false);
    }
    get_user_data();
  }, []);
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
  const onCabinUpdateButton = (e) => {
    e.preventDefault();
    setLoading(true);
    async function add_cabin() {
      await axios
        .put(`/cabin_update/${_id}`, inputData, {
          headers: { Access_Token: LocalStorageData?.generate_auth_token },
        })
        .then((resp) => {
          return alert.success(resp.data.message), navigate("/cabin_list");
        })

        .catch((err) => {
          if (err.response.status === 500) {
            navigate("/error_500");
          } else {
            navigate("/error_403");
          }
        });
      setLoading(false);
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
              {loading && (
                <div className="loader-container">
                  <div class="loader"></div>
                </div>
              )}
              <div class="row">
                <div class="col-lg-12 grid-margin stretch-card">
                  <div class="card">
                    <div class="card-body">
                      <form class="forms-sample">
                        <div className="row">
                          <div className="col-md-3">
                            <div class="form-group">
                              <label>Location</label>
                              <select
                                className="form-control h-100"
                                name="location"
                                value={inputData.location}
                                onChange={inputEvent}
                                disabled
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
                                  }}
                                  checked={inputData.status}
                                />
                                <span class="slider round"></span>
                              </label>
                            </div>
                          </div>
                        </div>

                        <button
                          type="submit"
                          class="btn btn-sm btn-gradient-primary me-2"
                          onClick={onCabinUpdateButton}
                        >
                          Submit
                        </button>
                      </form>
                    </div>
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

export default Cabin_Update;
