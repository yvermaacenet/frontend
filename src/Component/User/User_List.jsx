import axios from "axios";
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../Partials/Footer";
import Navbar from "../../Partials/Navbar";
import Page_Header from "../../Partials/Page_Header";
import Sidebar from "../../Partials/Sidebar";
import { useParams } from "react-router-dom";
import MaterialReactTable from "material-react-table";
import { Box, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { ExportToCsv } from "export-to-csv";
import RefreshIcon from "@mui/icons-material/Refresh";
import { IconButton, Tooltip } from "@mui/material";
import { useAlert } from "react-alert";

const User_List = () => {
  const alert = useAlert();
  const specificDate = "2023-05-01";
  const navigate = useNavigate();
  const { status_code } = useParams();
  const LocalStorageData = JSON.parse(localStorage.getItem("loggedin"));
  const [getUserList, setGetUserList] = useState([]);
  // const [getStatus_code, setStatus_code] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // setStatus_code(status_code);
    setLoading(true);
    async function get_user_list() {
      await axios
        .get(`/user_list/${status_code}`, {
          headers: { Access_Token: LocalStorageData?.generate_auth_token },
        })
        .then(async (result_user_list) => {
          return await axios
            .get(`/on_boarding`, {
              headers: {
                Access_Token: LocalStorageData?.generate_auth_token,
              },
            })
            .then(async (result) => {
              const resp = result?.data;
              console.log("resp", resp);
              console.log("result_user_list", result_user_list);
              const tt = await result_user_list?.data.map((a) => ({
                ...a,
                ...resp?.find((b) => b?.user_id === a?._id),
              }));
              console.log("tt", tt);
              return await axios
                .get(`/off_boarding`, {
                  headers: {
                    Access_Token: LocalStorageData?.generate_auth_token,
                  },
                })
                .then(async (result) => {
                  const resp = result?.data;
                  const pp = await tt?.map((aa) => ({
                    ...aa,
                    ...resp?.find((bb) => bb?.employee_id === aa?._id),
                  }));
                  return setGetUserList(pp);
                })
                .catch((err) => {
                  if (err?.response?.status === 500) {
                    navigate("/error_500");
                  } else {
                    navigate("/error_403");
                  }
                });
            })
            .catch((err) => {
              if (err?.response?.status === 500) {
                navigate("/error_500");
              } else {
                navigate("/error_403");
              }
            });
        })
        .catch((err) => {
          if (err?.response?.status === 500) {
            navigate("/error_500");
          } else {
            navigate("/error_403");
          }
        });
      setLoading(false);
    }
    get_user_list();
  }, [status_code]);
  const compareDates = (d1, d2) => {
    let date1 = new Date(d1);
    let date2 = new Date(d2);

    if (date1 < date2) {
      return false;
    } else if (date1 >= date2) {
      const s1 = new Date(date1.getTime() + 10 * 24 * 60 * 60 * 1000);
      const s2 = new Date(Date.now());
      if (s1 > s2) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  const compareDates1 = (d1, d2) => {
    let date1 = new Date(d1);
    let date2 = new Date(d2);

    if (date1 < date2) {
      return false;
    } else {
      return true;
    }
  };
  const columns = useMemo(
    () => [
      // {
      //   accessorKey: "Employee ID", //access nested data with dot notation
      //   header: "Employee Id",
      // },

      {
        accessorFn: (row) => `${row["First Name"]} ${row["Last Name"]}`, //accessorFn used to join multiple data into a single cell
        id: "name", //id is still required when using accessorFn instead of accessorKey
        header: "Name",
        size: 250,
        Cell: ({ renderedCellValue, row }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <img
              alt="avatar"
              height={30}
              src={row.original.Photo}
              loading="lazy"
              style={{ borderRadius: "50%" }}
            />

            {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
            <span>{renderedCellValue}</span>
            <span
              className="badge badge-success"
              style={{
                borderRadius: "20px",
                display:
                  compareDates(
                    row.original?.creation_date?.split("T")[0],
                    specificDate
                  ) === true
                    ? "inline-block"
                    : "none",
              }}
            >
              New Joining
            </span>
          </Box>
        ),
      },
      {
        accessorKey: "Personal Mobile Number", //normal accessorKey
        header: "Phone",
      },
      {
        accessorKey: "Email address",
        header: "Email",
      },
      {
        // accessorKey: "Acenet Role",
        accessorFn: (row) =>
          `${row["Acenet Role"] === "" ? "Team member" : row["Acenet Role"]} `,
        header: "Acenet Role",
      },
      {
        id: "onboarding",
        header: "Onboarding",
        columnDefType: "display", //turns off data column features like sorting, filtering, etc.
        enableColumnOrdering: true, //but you can turn back any of those features on if you want like this
        Cell: ({ row }) => {
          return (
            compareDates1(
              row.original.creation_date?.split("T")[0],
              specificDate
            ) === true && (
              <button
                type="button"
                className={`btn btn-sm ${
                  row.original?.hr_on_boarding_status === true &&
                  row.original?.finance_on_boarding_status === true
                    ? "btn-inverse-success"
                    : row.original?.initiate_on_boarding_status === true
                    ? "btn-inverse-danger"
                    : "btn-inverse-info"
                } ms-2`}
                title="Onboarding"
                onClick={() => {
                  const confirmationButton = window.confirm(
                    row.original.hr_on_boarding_status === true &&
                      row.original.finance_on_boarding_status === true
                      ? "Do you really want to check onboarding?"
                      : "Do you really want to initiate onboarding?"
                  );
                  if (confirmationButton === true) {
                    navigate(`/on_boarding/${row.original._id}`);
                  }
                }}
              >
                {row.original?.hr_on_boarding_status === true &&
                row.original?.finance_on_boarding_status === true
                  ? "Completed"
                  : row.original?.initiate_on_boarding_status === true
                  ? "Pending"
                  : "Initiate"}
              </button>
            )
          );
        },
      },
      {
        id: "offboarding",
        header: "Offboarding",
        columnDefType: "display", //turns off data column features like sorting, filtering, etc.
        enableColumnOrdering: true, //but you can turn back any of those features on if you want like this
        Cell: ({ row }) => (
          <button
            // type="button"
            className={`btn btn-sm ${
              row.original?.hr_off_boarding_status === true &&
              row.original?.finance_off_boarding_status === true &&
              row.original?.management_off_boarding_status === true
                ? "btn-inverse-success"
                : row.original?.initiate_off_boarding_status === true
                ? "btn-inverse-danger"
                : "btn-inverse-info"
            } ms-2`}
            title="Offboarding"
            onClick={() => {
              const confirmationButton = window.confirm(
                row.original.hr_off_boarding_status === true &&
                  row.original.finance_off_boarding_status === true &&
                  row.original.management_off_boarding_status === true
                  ? "Do you really want to check resignation?"
                  : "Do you really want to initiate resignation?"
              );
              if (confirmationButton === true) {
                navigate(`/off_boarding/${row.original._id}`);
              }
            }}
          >
            {row.original?.hr_off_boarding_status === true &&
            row.original?.finance_off_boarding_status === true &&
            row.original?.management_off_boarding_status === true
              ? "Completed"
              : row.original?.initiate_off_boarding_status === true
              ? "Pending"
              : "Initiate"}
          </button>
        ),
      },
    ],
    []
  );
  const csvOptions = {
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: false,
    headers: columns.map((c) => c.header),
  };

  const csvExporter = new ExportToCsv(csvOptions);
  const handleExportRows = (rows) => {
    csvExporter.generateCsv(rows.map((row) => row.original));
  };

  const handleExportData = () => {
    csvExporter.generateCsv(getUserList);
  };
  const refreshData = () => {
    setLoading(true);
    async function loadZohoData() {
      await axios
        .post(`/compare_data_between_zoho_and_database`, {
          headers: { Access_Token: LocalStorageData?.generate_auth_token },
        })
        .then((result) => {
          return setLoading(false), alert.success(result.data.message);
        });
    }
    loadZohoData();
  };
  console.log("getUserList", getUserList);
  return (
    <>
      <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              <Page_Header
                page_heading="Employee List"
                // page_title="User"
                page_title_icon="mdi-account-multiple-outline"
                page_title_button=""
                page_title_button_link="/dashboard"
              />
              {loading && (
                <div className="loader-container">
                  <div className="loader"></div>
                </div>
              )}
              {/* <div className="row">
                <div class="col-lg-12 grid-margin stretch-card">
                  <button
                    type="button"
                    className="btn btn-sm btn-inverse-info btn-fw ms-1"
                    onClick={() => setStatus_code("active_employee")}
                  >
                    All
                  </button>

                  <button
                    type="button"
                    className="btn btn-sm btn-inverse-primary btn-fw ms-1"
                    onClick={() => setStatus_code("pending_onboarding_employee")}
                  >
                    Pending Onboarding
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-inverse-dark btn-fw ms-1"
                    onClick={() => setStatus_code("pending_offboarding_employee")}
                  >
                    Pending Offboarding
                  </button>
                </div>
              </div> */}
              <div className="row">
                <div class="col-lg-12 grid-margin stretch-card">
                  <div className="card">
                    <div
                      className="card-body"
                      style={{
                        maxWidth: "100%",
                        overflow: "hidden",
                        overflowX: "scroll",
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <span class="card-description">
                          {status_code === "active_employee"
                            ? "Employee List"
                            : status_code === "pending_onboarding_employee"
                            ? "Pending Onboarding Employee List"
                            : "Pending Offboarding Employee List"}
                        </span>
                      </div>
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Name</th>

                            <th>Phone</th>
                            <th>Email</th>
                            {/* {(status_code === "active_employee" ||
                              status_code ===
                                "pending_offboarding_employee") && (
                              <th>Offboarding</th>
                            )} */}
                            <th>Status</th>

                            <th>Action </th>
                          </tr>
                        </thead>
                        <tbody>
                          {getUserList?.map((value, index) => {
                            return (
                              <tr key={index}>
                                <td className="py-1">
                                  <img src={value?.Photo} alt="image" />
                                </td>
                                <td>
                                  {value["First Name"]} {value["Last Name"]}
                                  <span
                                    className="badge badge-success"
                                    style={{
                                      borderRadius: "20px",
                                      display:
                                        compareDates(
                                          value?.creation_date?.split("T")[0],
                                          specificDate
                                        ) === true
                                          ? "inline-block"
                                          : "none",
                                    }}
                                  >
                                    New Joining
                                  </span>
                                </td>

                                <td>
                                  {value["Personal Mobile Number"] === ""
                                    ? "NA"
                                    : value["Personal Mobile Number"]}
                                </td>
                                <td> {value["Email address"]} </td>

                                <td>
                                  <>
                                    {compareDates1(
                                      value?.creation_date?.split("T")[0],
                                      specificDate
                                    ) === true && !value?.on_boarding_status ? (
                                      <label
                                        className={`text-danger fw-bold
                                         ms-2`}
                                      >
                                        Pending Onboarding
                                      </label>
                                    ) : (
                                      <>
                                        {value?.initiate_off_boarding_status ===
                                        false ? (
                                          <label
                                            className={`text-success fw-bold
                                             ms-2`}
                                          >
                                            Active
                                          </label>
                                        ) : value?.offboarding_hr
                                            ?.hr_off_boarding_status === true &&
                                          value?.offboarding_finance
                                            ?.finance_off_boarding_status ===
                                            true &&
                                          value?.offboarding_management
                                            ?.management_off_boarding_status ===
                                            true ? (
                                          <label
                                            className={`text-muted fw-bold
                                         ms-2`}
                                          >
                                            Deactive
                                          </label>
                                        ) : (
                                          <label
                                            className={`text-danger fw-bold
                                           ms-2`}
                                          >
                                            Pending Offboarding
                                          </label>
                                        )}

                                        {/* {(status_code === "active_employee" ||
                                          status_code ===
                                            "pending_offboarding_employee") &&
                                          (compareDates1(
                                            value?.creation_date?.split("T")[0],
                                            specificDate
                                          ) === false ||
                                            value?.on_boarding_status) && (
                                            <button
                                              type="button"
                                              className={`btn btn-sm ${
                                                !value?.initiate_off_boarding_status &&
                                                "btn-inverse-info"
                                              } ms-2`}
                                              title="Offboarding"
                                              onClick={() => {
                                                const confirmationButton =
                                                  !value?.initiate_off_boarding_status &&
                                                  window.confirm(
                                                    value?.offboarding_hr
                                                      ?.hr_off_boarding_status ===
                                                      true &&
                                                      value?.offboarding_finance
                                                        ?.finance_off_boarding_status ===
                                                        true &&
                                                      value
                                                        ?.offboarding_management
                                                        ?.management_off_boarding_status ===
                                                        true
                                                      ? "Do you really want to check offboarding?"
                                                      : "Do you really want to initiate offboarding?"
                                                  );
                                                if (
                                                  confirmationButton === true
                                                ) {
                                                  navigate(
                                                    `/off_boarding/${value?._id}`
                                                  );
                                                } else if (
                                                  value?.initiate_off_boarding_status ===
                                                  true
                                                ) {
                                                  navigate(
                                                    `/off_boarding/${value?._id}`
                                                  );
                                                }
                                              }}
                                              style={{
                                                display:
                                                  value?.offboarding_hr
                                                    ?.hr_off_boarding_status ===
                                                    true &&
                                                  value?.offboarding_finance
                                                    ?.finance_off_boarding_status ===
                                                    true &&
                                                  value?.offboarding_management
                                                    ?.management_off_boarding_status ===
                                                    true
                                                    ? "none"
                                                    : "inline",
                                              }}
                                            >
                                              {!value?.initiate_off_boarding_status &&
                                                "Initiate Offboarding"}
                                            </button>
                                          )} */}
                                      </>
                                    )}
                                  </>
                                  {/* ========================================= */}
                                </td>

                                <td>
                                  {(status_code === "active_employee" ||
                                    status_code ===
                                      "pending_offboarding_employee") && (
                                    <>
                                      {(compareDates1(
                                        value?.creation_date?.split("T")[0],
                                        specificDate
                                      ) === false ||
                                        value?.on_boarding_status) && (
                                        <button
                                          type="button"
                                          className={`btn btn-sm btn-inverse-info
                                        } ms-2`}
                                          title="Offboarding"
                                          onClick={() => {
                                            const confirmationButton =
                                              !value?.initiate_off_boarding_status &&
                                              window.confirm(
                                                value?.offboarding_hr
                                                  ?.hr_off_boarding_status ===
                                                  true &&
                                                  value?.offboarding_finance
                                                    ?.finance_off_boarding_status ===
                                                    true &&
                                                  value?.offboarding_management
                                                    ?.management_off_boarding_status ===
                                                    true
                                                  ? "Do you really want to check offboarding?"
                                                  : "Do you really want to initiate offboarding?"
                                              );
                                            if (confirmationButton === true) {
                                              navigate(
                                                `/off_boarding/${value?._id}`
                                              );
                                            } else if (
                                              value?.initiate_off_boarding_status ===
                                              true
                                            ) {
                                              navigate(
                                                `/off_boarding/${value?._id}`
                                              );
                                            }
                                          }}
                                          disabled={
                                            value?.offboarding_hr
                                              ?.hr_off_boarding_status ===
                                              true &&
                                            value?.offboarding_finance
                                              ?.finance_off_boarding_status ===
                                              true &&
                                            value?.offboarding_management
                                              ?.management_off_boarding_status ===
                                              true
                                              ? true
                                              : false
                                          }
                                        >
                                          {/* {
                                          // value?.offboarding_hr
                                          //   ?.hr_off_boarding_status === true &&
                                          // value?.offboarding_finance
                                          //   ?.finance_off_boarding_status ===
                                          //   true &&
                                          // value?.offboarding_management
                                          //   ?.management_off_boarding_status ===
                                          //   true ? (
                                          //   "Completed"
                                          // ) :
                                          value?.initiate_off_boarding_status ===
                                          true ? (
                                            <i
                                              className="mdi mdi-dots-vertical"
                                              title="Offboarding"
                                            ></i>
                                          ) : (
                                            <i
                                              className="mdi mdi-dots-vertical"
                                              title="Offboarding"
                                            ></i>
                                          )
                                        } */}
                                          <i
                                            className="mdi mdi-dots-vertical"
                                            title="Offboarding"
                                          ></i>
                                        </button>
                                      )}
                                    </>
                                  )}
                                  {/* ========== Action for Onboarding=============== */}
                                  {status_code ===
                                    "pending_onboarding_employee" &&
                                    compareDates1(
                                      value?.creation_date?.split("T")[0],
                                      specificDate
                                    ) === true && (
                                      <button
                                        type="button"
                                        className={`btn btn-sm btn-inverse-info ms-2`}
                                        title="Onboarding"
                                        onClick={() => {
                                          navigate(
                                            `/on_boarding/${value?._id}`
                                          );
                                        }}
                                      >
                                        {/* {value?.hr?.hr_on_boarding_status ===
                                        true &&
                                      value?.finance
                                        ?.finance_on_boarding_status ===
                                        true ? (
                                        "we"
                                      ) : value?.initiate_on_boarding_status ===
                                        true ? (
                                        "Pending"
                                      ) : (
                                        <i
                                          className="mdi mdi-dots-vertical"
                                          title="Onboarding"
                                        ></i>
                                      )} */}
                                        <i
                                          className="mdi mdi-dots-vertical"
                                          title="Onboarding"
                                        ></i>
                                      </button>
                                    )}
                                  {/* {compareDates1(
                                    value?.creation_date?.split("T")[0],
                                    specificDate
                                  ) === true && (
                                    <button
                                      type="button"
                                      className={`btn btn-sm btn-inverse-info ms-2`}
                                      title="Onboarding"
                                      onClick={() => {
                                        navigate(`/on_boarding/${value?._id}`);
                                      }}
                                    >
                                      
                                      <i
                                        className="mdi mdi-dots-horizontal"
                                        title="View Onboarding"
                                      ></i>
                                    </button>
                                  )} */}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      {/* <MaterialReactTable
                        columns={columns}
                        data={getUserList}
                        enableRowSelection //showing checkbox
                        positionToolbarAlertBanner="bottom"
                        enableBottomToolbar={true}
                        enableColumnResizing
                        enableColumnVirtualization
                        enableGlobalFilterModes
                        enablePagination={true}
                        enablePinning
                        enableRowNumbers
                        enableRowVirtualization
 
                        renderTopToolbarCustomActions={({ table }) => (
                          <Box
                            sx={{
                              display: "flex",
                              gap: "1rem",
                              p: "0.5rem",
                              flexWrap: "wrap",
                            }}
                          >
                            <div className="row">
                              <div class="col-lg-12 grid-margin stretch-card">
                                <button
                                  type="button"
                                  className="btn btn-sm btn-inverse-dark btn-fw ms-1"
                                  onClick={handleExportData}
                                >
                                  Export All Data
                                </button>
                                 <button
                                  type="button"
                                  className="btn btn-sm btn-inverse-dark btn-fw ms-1"
                                  disabled={
                                    table.getPrePaginationRowModel().rows
                                      .length === 0
                                  }
                                   onClick={() =>
                                    handleExportRows(
                                      table.getPrePaginationRowModel().rows
                                    )
                                  }
                                 >
                                  Export All Rows
                                </button> 
                                <button
                                  type="button"
                                  className="btn btn-sm btn-inverse-dark btn-fw ms-1"
                                  disabled={
                                    table.getRowModel().rows.length === 0
                                  }
                                  //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
                                  onClick={() =>
                                    handleExportRows(table.getRowModel().rows)
                                  }
                                >
                                  Export Page Rows
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-sm btn-inverse-dark btn-fw ms-1"
                                  disabled={
                                    !table.getIsSomeRowsSelected() &&
                                    !table.getIsAllRowsSelected()
                                  }
                                  //only export selected rows
                                  onClick={() =>
                                    handleExportRows(
                                      table.getSelectedRowModel().rows
                                    )
                                  }
                                  startIcon={<FileDownloadIcon />}
                                  variant="contained"
                                >
                                  Export Selected Rows
                                </button>
                                <Tooltip arrow title="Refresh Data">
                                  <IconButton>
                                    <RefreshIcon onClick={refreshData} />
                                  </IconButton>
                                </Tooltip>
                              </div>
                            </div>
                          </Box>
                        )}
                      /> */}
                    </div>
                  </div>
                </div>
              </div>

              {/* ============= Modal =================== */}
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

export default User_List;
