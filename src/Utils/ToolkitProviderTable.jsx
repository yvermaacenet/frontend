import React, { useState } from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import filterFactory from "react-bootstrap-table2-filter";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
const { SearchBar, ClearSearchButton } = Search;
const ToolkitProviderTable = ({ tableData, columns, onClick }) => {
  // const [showFilter, setShowFilter] = useState(false);

  const [states, setstates] = useState(tableData);
  const paginationList = paginationFactory({
    page: 1,
    lastPageText: "Last",
    firstPageText: "First",
    nextPageText: ">",
    prePageText: "<",
    sizePerPageList: [
      {
        text: "10",
        value: 10,
      },
      {
        text: "25",
        value: 25,
      },
      {
        text: "50",
        value: 50,
      },
      {
        text: "All",
        value: states?.length,
      },
    ],
    showTotal: false,
  });
  return (
    <div class="card">
      <div class="card-body">
        <div className="table-responsive">
          <ToolkitProvider
            bootstrap4
            keyField="id"
            data={tableData}
            columns={columns}
            search={{
              searchFormatted: true,
              beforeSearch: (oldResult) => setstates(oldResult),
              afterSearch: (newResult) => setstates(newResult),
            }}
          >
            {(props) => (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    margin: "1rem auto",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <SearchBar
                      {...props.searchProps}
                      style={{ width: "100%", marginLeft: "5px" }}
                      srText=""
                    />

                    <ClearSearchButton
                      className="ms-2 btn btn-danger clearButton btn-icon mdi mdi-close"
                      text={<i class="bi bi-x-lg"></i>}
                      {...props.searchProps}
                    />
                    {/* <button onClick={() => setShowFilter(!showFilter)}>Toggle Filter</button> */}
                  </div>

                  <div
                    style={{
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <OverlayTrigger
                      overlay={<Tooltip id="tooltip">Clear Filters</Tooltip>}
                    >
                      <button
                        type="button"
                        class="me-2 btn btn-outline-primary btn-sm"
                        onClick={onClick}
                      >
                        <i class="bi bi-filter"></i>
                      </button>
                    </OverlayTrigger>
                    {/* <i class="bi bi-download me-3 fs-5"></i>

                    <button
                      type="button"
                      class="me-2 btn btn-outline-primary btn-sm"
                    >
                      <i class="bi bi-printer"></i> Print
                    </button>

                    <button
                      type="button"
                      class="me-2 btn btn-outline-secondary btn-sm"
                    >
                      <i class="bi bi-filetype-csv"></i> CSV
                    </button> */}

                    {/* <button
                      type="button"
                      class="me-2 btn btn-outline-dark btn-sm"
                    >
                      <i class="bi bi-filetype-pdf"></i>PDF
                    </button> */}
                  </div>
                </div>
                <BootstrapTable
                  keyField="id"
                  hover
                  condensed
                  pagination={paginationList}
                  {...props.baseProps}
                  noDataIndication="No Record Found"
                  striped
                  // rowStyle={{ backgroundColor: "red" }}
                  rowClasses="custom-row-class"
                  filter={filterFactory()}
                  filterStyle={{ backgroundColor: "red" }}
                  filterPosition="top"
                  filtersClasses="fff"
                  overflowX="scroll"
                  style={{ fontSize: "4px" }}
                />
              </>
            )}
          </ToolkitProvider>
        </div>
      </div>
    </div>
  );
};

export default ToolkitProviderTable;
