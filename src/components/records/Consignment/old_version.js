import React from "react";
import styles from "./Consignment.module.css";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Datepicker from "@/components/_common/grid/Datepicker/Datepicker";
import { useEffect, useState } from "react";
import Consign from "../Consign/Consign";
import SkeletonTable from "../SkeletonTable/SkeletonTable";

function Consignment(props) {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(100);
  const [loadingMore, setLoadingMore] = useState(false);

  async function getData() {
    setLoadingMore(true);
    const response = await fetch("/api/records/consignment/allRecords", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pageNumber, pageSize }),
    });
    const data = await response.json();

    if (data.success) {
      const parsedData = parseData(data.data);
      setRowData((prevData) => [...prevData, ...parsedData]);
      setDataLoaded(true);
      setLoadingMore(false);
    }

    //
  }

  function parseData(data) {
    const templateObj = {
      date: 123456789,
      from: "John Doe",
      to: "Jane Doe",
      series: "Series 1",
      artwork: "Artwork 1",
      colorway: "Colorway 1",
      cat: "Cat 1",
      note: "Note 1",
      price: 100,
      varid: 123,
    };

    return data.map((row) => {
      return {
        ...templateObj,
        date: row.date,
        from: row.dealer, //TODO: add dealer to the query (the response is just the TO)
        fromInitials: row.initials, // TODO: add initials to the query (the response is just the TO)
        to: row.dealer,
        toInitials: row.initials,
        series: row.series,
        artwork: row.title,
        colorway: row.subTitle2,
        cat: row.code,
        note: row.note,
        price: row.price,
        varid: row.varid,
      };
    });
  }

  useEffect(() => {
    // get data for page when page number changes
    getData();
  }, [pageNumber]);

  function triggerPopulateOfNewRows() {
    console.log("triggerPopulateOfNewRows");
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  }

  useEffect(() => {
    setPageNumber(1);

    props.setRightContent(
      <Consign
        alertSuccess={props.alertSuccess}
        alertError={props.alertError}
      />
    );
  }, []);

  function handleChange(params) {
    console.log(params);
    props.alertSuccess("Saved!");
  }

  function handleCellEditingStopped(params) {
    const updatedRowData = rowData.map((row) => {
      if (row.id === params.data.id) {
        return { ...row, [params.colDef.field]: params.value };
      }
      return row;
    });
    handleChange(params);
  }

  const columnDefs = [
    {
      headerName: "Date",
      field: "date",
      //   resizable: true,
      cellRendererFramework: (params) => (
        <Datepicker
          value={params.value}
          onChange={(newValue) => params.setValue(newValue)}
        />
      ),
    },
    // {
    //   headerName: "From",
    //   field: "from",
    //   sortable: true,
    //   filter: true,
    //   //   resizable: true,
    //   editable: true,
    //   cellStyle: {
    //     cursor: "pointer",
    //   },
    // },
    {
      headerName: "To",
      field: "toInitials",
      
    },
    {
      headerName: "Series",
      field: "series",
     
    },
    {
      headerName: "Artwork",
      field: "artwork",
      
    },
    {
      headerName: "Colorway",
      field: "colorway",
      
    },
    {
      headerName: "Cat #",
      field: "cat",
      
    },
    {
      headerName: "Note",
      field: "note",
      
    },
    {
      headerName: "Price",
      field: "price",
    },
  ];

  const defaultColDef = {
    sortable: true,
    filter: true,
    editable: true,
    cellStyle: {
      cursor: "pointer",
    },
    rowGroup: true, hide: true
  };

  useEffect(() => {
    console.log("Consignment component mounted");
  }, []);

  return (
    <div className={styles.container}>
      {dataLoaded ? (
        <>
          <div
            className={`ag-theme-alpine custom-ag-grid ${styles["ag-theme-alpine"]}`}
          >
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              domLayout="autoHeight"
              onGridSizeChanged={(params) => {
                params.api.sizeColumnsToFit();
              }}
              onCellValueChanged={(params) => {
                handleChange(params);
              }}

              rowModelType="clientSide"
              
            />
          </div>
          <div className={styles["load-more-button-container"]}>
            <button
              className={styles["load-more-button"] + " theme-design"}
              onClick={triggerPopulateOfNewRows}
              disabled={loadingMore}
            >
              Load More
            </button>
          </div>
        </>
      ) : (
        <SkeletonTable />
      )}
    </div>
  );
}

export default Consignment;
