import React from "react";
import styles from "./Consignment.module.css";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Datepicker from "@/components/_common/grid/Datepicker/Datepicker";
import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import Consign from "../Consign/Consign";
import SkeletonTable from "../SkeletonTable/SkeletonTable";

function Consignment(props) {

  useEffect(() => {
    props.setRightContent(<Consign />);
  }, []);


  const [dataLoaded, setDataLoaded] = useState(false);
  const gridRef = useRef(null); // necessary for use of Grid API
  const [rowData, setRowData] = useState([]);
  const [consignees, setConsignees] = useState([]);

  
  // define columns
  const [columnDefs, setColumnDefs] = useState([
    {
      field: "date",
      headerName: "Date",
      editable: false,
      cellRendererFramework: (params) => (
        <Datepicker
          value={params.value}
          onChange={(newValue) => params.setValue(newValue)}
        />
      ),
      cellStyle: {
        display: "flex",
        alignItems: "center",
      },
    },
    {
      field: "toInitials",
      headerName: "To",
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: [],
           },
    },
    {
      field: "series",
      headerName: "Series",
      cellEditor: "agLargeTextCellEditor",
      cellEditorPopup: true,
      cellEditorParams: {
        maxLength: "300", // override the editor defaults
        cols: "50",
        rows: "6",
      },    },
    {
      field: "artwork",
      headerName: "Artwork",
      cellEditor: "agLargeTextCellEditor",
      cellEditorPopup: true,
      cellEditorParams: {
        maxLength: "300", // override the editor defaults
        cols: "50",
        rows: "6",
      },
    },
    {
      field: "colorway",
      headerName: "Colorway",
      cellEditor: "agLargeTextCellEditor",
      cellEditorPopup: true,
      cellEditorParams: {
        maxLength: "300", // override the editor defaults
        cols: "50",
        rows: "6",
      },
    },
    {
      field: "cat",
      headerName: "Cat #",
    },
    {
      field: "note",
      headerName: "Note",
      cellEditor: "agLargeTextCellEditor",
      cellEditorPopup: true,
      cellEditorParams: {
        maxLength: "300", // override the editor defaults
        cols: "50",
        rows: "6",
      },
    },
    {
      field: "price",
      headerName: "Price",
    },
  ]);

  // set common grid options
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      editable: true,
      cellStyle: {
        cursor: "pointer",
      },
    }),
    []
  );



  useEffect(() => {
    getConsignees()
      .then((consignees) => {
        const newColumnDefs = [...columnDefs];
        newColumnDefs[1].cellEditorParams.values = consignees.map(
          (consignee) => consignee.initials
        );
       
        
        setColumnDefs(newColumnDefs);
      })
      .catch((error) => {
        console.error("Error fetching consignees:", error);
      });
  }, []);
  
  // ...
  
  async function getConsignees() {
    const response = await fetch("/api/records/consignment/consignees");
    const data = await response.json();
    if (data.success) {
      const consignees = data.consignees.map((consignee) => ({
        id: consignee.dealerid,
        name: consignee.dealer,
        initials: consignee.initials,
      }));
      setConsignees(consignees);
      return consignees;
    }
    throw new Error("Failed to fetch consignees");
  }
  
  
  
  
  
  




  function formatPrice(priceString, cents=false) {
    const price = parseFloat(priceString);

    if (!isNaN(price)) {
      // format price to USD
      const formattedPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      if (!cents) {
        return formattedPrice.slice(0, -3);
      }


      return formattedPrice;
    } else {
      return "";
    }
  }

  // get and load data from backend
  useEffect(() => {
    async function getData() {
      const response = await fetch("/api/records/consignment/allRecords", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (data.success) {
        const parsedData = parseData(data.data);
        setRowData(parsedData);
        setDataLoaded(true);
      }
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
        const price = formatPrice(row.price);
        row.initials ? row.initials = row.initials.toUpperCase() : row.initials = "";
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
          price: price,
          varid: row.varid,
        };
      });
    }

    getData();
  }, [setDataLoaded, setRowData]);

  function onGridReady(params) {
    gridRef.current = params.api;

    gridRef.current.sizeColumnsToFit();
    // resize grid on window resize
    window.addEventListener("resize", () => {
      setTimeout(() => {
        gridRef.current.sizeColumnsToFit();
      });
    });
  }

  function handleChange(params) {
    props.alertSuccess(
      `Saved changes to "${params.colDef.headerName}"`,
    );
  }

  return (
    <div className={styles.container}>
      {dataLoaded ? (
        <div
          className={`ag-theme-alpine custom-ag-grid ${styles["ag-theme-alpine"]}`}
          style={{ height: "100%", width: "100%" }}
        >
          <AgGridReact
            ref={gridRef} // necessary for use of Grid API
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
            onCellValueChanged={(params) => handleChange(params)}
            suppressDragLeaveHidesColumns={true}
            suppressMakeColumnVisibleAfterUnGroup={true}
            suppressRowGroupHidesColumns={true}
            rowGroupPanelShow='always'
            />

        <div className={styles.footer}>
          <div className={styles.left}>
            </div>
          <div className={styles.right}>
            <p>{rowData.length.toLocaleString('en-US')} records</p>
        </div>
        </div>
        </div>
      ) : (
        <SkeletonTable />
      )}
    </div>
  );
}

export default Consignment;
