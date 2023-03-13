import React, { useState } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
//MRT Imports
import MaterialReactTable from "material-react-table";

//Material-UI Imports
import {
  Box,
  Button,
  ListItemIcon,
  MenuItem,
  Typography,
  TextField,
} from "@mui/material";
import { ExportToCsv } from "export-to-csv";
// //Date Picker Imports
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

//Icons Imports
import { AccountCircle, Send, Download } from "@mui/icons-material";
import { BaseURL } from "./AxiosApi";
import { NavLink } from "react-router-dom";
const MaterialTable = (props) => {
  const { columnData, tableData, loading, renderDetailPanel } = props;
  const handleExportData = () => {
    csvExporter.generateCsv(tableData);
  };
  const csvOptions = {
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: false,
    headers: columnData.map((c) => c.header),
  };
  const csvExporter = new ExportToCsv(csvOptions);
  const handleExportRows = (rows) => {
    csvExporter.generateCsv(rows.map((row) => row.original));
  };
  return (
    <div>
      <MaterialReactTable
        columns={columnData}
        data={tableData}
        enableStickyHeader
        enableColumnFilterModes
        enableColumnOrdering
        enableGrouping
        enableClickToCopy
        enablePinning
        enableRowActions
        enableRowSelection={false}
        globalFilterFn="fuzzy"
        initialState={{ showColumnFilters: false }}
        positionToolbarAlertBanner="bottom"
        state={{ isLoading: loading }}
        renderDetailPanel={renderDetailPanel}
        //   renderDetailPanel={({ row }) => (
        //     <Box
        //       sx={{
        //         display: "flex",
        //         justifyContent: "space-around",
        //         alignItems: "center",
        //       }}
        //     >
        //       {/* <img
        //   alt="avatar"
        //   height={200}
        //   src={row.original.avatar}
        //   loading="lazy"
        //   style={{ borderRadius: '50%' }}
        // /> */}
        //       <Box sx={{ textAlign: "center" }}>
        //         <Typography variant="h4">Signature Catch Phrase:</Typography>
        //         <Typography variant="h1">
        //           &quot;{tableData[0].email_old}&quot;
        //         </Typography>
        //       </Box>
        //     </Box>
        //   )}
        renderRowActionMenuItems={({ row, closeMenu }) => [
          <MenuItem
            key={0}
            data-bs-toggle="modal"
            data-bs-target="#ExtraLargeModal"
            onClick={() => {
              props?.getSendID(
                row?.original.id,
                row?.original.first_name_old,
                row?.original.last_name_old
              );
              closeMenu();
            }}
            sx={{ m: 0 }}
          >
            <ListItemIcon>
              <AccountCircle className="me-2" />
              View Profile
            </ListItemIcon>
          </MenuItem>,

          <MenuItem
            key={1}
            // onClick={(event) => {
            //   return event.preventDefault(), closeMenu();
            // }}
            sx={{ m: 0 }}
            disabled={row?.original.cv_displayname === "" ? true : false}
          >
            <a
              href={`${BaseURL}/documents/download/media/documents/candidate/cv/${row?.original.cv_displayname}/`}
              style={{ height: "20px" }}
            >
              <ListItemIcon>
                <Download className="me-2" /> Download CV
              </ListItemIcon>
            </a>
          </MenuItem>,
        ]}
        renderTopToolbarCustomActions={({ table }) => {
          //   const handleDeactivate = () => {
          //     table.getSelectedRowModel().flatRows.map((row) => {
          //       alert("deactivating " + row.getValue("name"));
          //     });
          //   };
          //   const handleActivate = () => {
          //     table.getSelectedRowModel().flatRows.map((row) => {
          //       alert("activating " + row.getValue("name"));
          //     });
          //   };
          //   const handleContact = () => {
          //     table.getSelectedRowModel().flatRows.map((row) => {
          //       alert("contact " + row.getValue("name"));
          //     });
          //   };
          return (
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {/* <Button
                color="error"
                disabled={!table.getIsSomeRowsSelected()}
                onClick={handleDeactivate}
                variant="contained"
              >
                Deactivate
              </Button> */}
              <Button
                color="primary"
                //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
                onClick={handleExportData}
                // startIcon={<FileDownloadIcon />}
                variant="contained"
              >
                Export All Data
              </Button>
              <Button
                color="primary"
                //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
                onClick={() => handleExportRows(table.getRowModel().rows)}
                // startIcon={<FileDownloadIcon />}
                variant="contained"
              >
                Export Page Rows
              </Button>

              {/* <Button
                color="success"
                disabled={!table.getIsSomeRowsSelected()}
                onClick={handleActivate}
                variant="contained"
              >
                Activate
              </Button>
              <Button
                color="info"
                disabled={!table.getIsSomeRowsSelected()}
                onClick={handleContact}
                variant="contained"
              >
                Contact
              </Button> */}
            </div>
          );
        }}
      />
    </div>
  );
};

export default MaterialTable;
