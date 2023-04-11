import axios from "axios";
import React, { useState, useEffect, createContext } from "react";
import Footer from "../../Partials/Footer";
import Navbar from "../../Partials/Navbar";
import Page_Header from "../../Partials/Page_Header";
import Sidebar from "../../Partials/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";
import Profile_Form from "./Profile_Form";
const FirstName = createContext();
const Profile_Update = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  // const [getUserData, setGetUserData] = useState([]);

  // useEffect(() => {
  //   async function get_user_data() {
  //     const result_get_user_data = await axios(`/get_user_list_By_Id/${_id}`);
  //     const resp_get_user_data = result_get_user_data?.data[0];
  //     setGetUserData(resp_get_user_data);
  //   }
  //   get_user_data();
  // }, []);
  // console.log("getUserDataasas", getUserData);
  // const inputEvent = (event) => {
  //   const { name, value } = event.target;
  //   setInputData((preValue) => {
  //     return {
  //       ...preValue,
  //       [name]: value,
  //     };
  //   });
  // };

  // const onUpdateButton = (e) => {
  //   e.preventDefault();
  //   async function updateData() {
  //     const result = await axios
  //       .put(`/user_update/${_id}`, inputData)
  //       .then((res) => {
  //         return alert(res?.data.message), navigate("/user_list");
  //       })
  //       .catch((err) => console.log(err));
  //   }
  //   updateData();
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
                page_title="Profile"
                page_title_icon="mdi-account-outline"
                page_title_button="Back"
                page_title_button_link="/dashboard"
              />
              <div class="row">
                <div class="card">
                  <div class="card-body">
                    <Profile_Form
                      multiselect_disabled={false}
                      status_hide={true}
                    />
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

export default Profile_Update;
export { FirstName };
