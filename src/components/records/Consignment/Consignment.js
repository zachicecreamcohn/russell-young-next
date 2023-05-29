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




  useEffect(() => {
    // after 3 seconds, set dataLoaded to true
    setTimeout(() => {
      setDataLoaded(true);
    }, 500);


    props.setRightContent(<Consign
    alertSuccess={props.alertSuccess}
    alertError={props.alertError}
    />)
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
  
    const rowData = [  
    {
        date: "2021-01-01",
        from: "John Doe",
        to: "Jane Doe",
        series: "Series 1",
        artwork: "Artwork 1",
        colorway: "Colorway 1",
        cat: "Cat 1",
        note: "Note 1",
        price: "$100",
    },
    {
        date: "2021-01-02",
        from: "John Doe",
        to: "Jane Doe",
        series: "Series 2",
        artwork: "Artwork 2",
        colorway: "Colorway 2",
        cat: "Cat 2",
        note: "Note 2",
        price: "$200",
    },
    {
        date: "2021-01-01",
        from: "John Doe",
        to: "Jane Doe",
        series: "Series 1",
        artwork: "Artwork 1",
        colorway: "Colorway 1",
        cat: "Cat 1",
        note: "Note 1",
        price: "$100",
    },
    {
        date: "2021-01-02",
        from: "John Doe",
        to: "Jane Doe",
        series: "Series 2",
        artwork: "Artwork 2",
        colorway: "Colorway 2",
        cat: "Cat 2",
        note: "Note 2",
        price: "$200",
    },
    {
        date: "2021-01-01",
        from: "John Doe",
        to: "Jane Doe",
        series: "Series 1",
        artwork: "Artwork 1",
        colorway: "Colorway 1",
        cat: "Cat 1",
        note: "Note 1",
        price: "$100",
    },
    {
        date: "2021-01-02",
        from: "John Doe",
        to: "Jane Doe",
        series: "Series 2",
        artwork: "Artwork 2",
        colorway: "Colorway 2",
        cat: "Cat 2",
        note: "Note 2",
        price: "$200",
    },
    {
        date: "2021-01-01",
        from: "John Doe",
        to: "Jane Doe",
        series: "Series 1",
        artwork: "Artwork 1",
        colorway: "Colorway 1",
        cat: "Cat 1",
        note: "Note 1",
        price: "$100",
    },
    {
        date: "2021-01-02",
        from: "John Doe",
        to: "Jane Doe",
        series: "Series 2",
        artwork: "Artwork 2",
        colorway: "Colorway 2",
        cat: "Cat 2",
        note: "Note 2",
        price: "$200",
    },
    {
        date: "2021-01-01",
        from: "John Doe",
        to: "Jane Doe",
        series: "Series 1",
        artwork: "Artwork 1",
        colorway: "Colorway 1",
        cat: "Cat 1",
        note: "Note 1",
        price: "$100",
    },
    {
        date: "2021-01-02",
        from: "John Doe",
        to: "Jane Doe",
        series: "Series 2",
        artwork: "Artwork 2",
        colorway: "Colorway 2",
        cat: "Cat 2",
        note: "Note 2",
        price: "$200",
    },
    {
        date: "2021-01-01",
        from: "John Doe",
        to: "Jane Doe",
        series: "Series 1",
        artwork: "Artwork 1",
        colorway: "Colorway 1",
        cat: "Cat 1",
        note: "Note 1",
        price: "$100",
    },
    {
        date: "2021-01-02",
        from: "John Doe",
        to: "Jane Doe",
        series: "Series 2",
        artwork: "Artwork 2",
        colorway: "Colorway 2",
        cat: "Cat 2",
        note: "Note 2",
        price: "$200",
    },{
        date: "2021-01-01",
        from: "John Doe",
        to: "Jane Doe",
        series: "Series 1",
        artwork: "Artwork 1",
        colorway: "Colorway 1",
        cat: "Cat 1",
        note: "Note 1",
        price: "$100",
    },
    {
        date: "2021-01-02",
        from: "John Doe",
        to: "Jane Doe",
        series: "Series 2",
        artwork: "Artwork 2",
        colorway: "Colorway 2",
        cat: "Cat 2",
        note: "Note 2",
        price: "$200",
    },
    {
        date: "2021-01-01",
        from: "John Doe",
        to: "Jane Doe",
        series: "Series 1",
        artwork: "Artwork 1",
        colorway: "Colorway 1",
        cat: "Cat 1",
        note: "Note 1",
        price: "$100",
    },
    {
        date: "2021-01-02",
        from: "John Doe",
        to: "Jane Doe",
        series: "Series 2",
        artwork: "Artwork 2",
        colorway: "Colorway 2",
        cat: "Cat 2",
        note: "Note 2",
        price: "$200",
    },
    {
        date: "2021-01-01",
        from: "John Doe",
        to: "Jane Doe",
        series: "Series 1",
        artwork: "Artwork 1",
        colorway: "Colorway 1",
        cat: "Cat 1",
        note: "Note 1",
        price: "$100",
    },
    {
        date: "2021-01-02",
        from: "John Doe",
        to: "Jane Doe",
        series: "Series 2",
        artwork: "Artwork 2",
        colorway: "Colorway 2",
        cat: "Cat 2",
        note: "Note 2",
        price: "$200",
    },
    {
        date: "2021-01-01",
        from: "John Doe",
        to: "Jane Doe",
        series: "Series 1",
        artwork: "Artwork 1",
        colorway: "Colorway 1",
        cat: "Cat 1",
        note: "Note 1",
        price: "$100",
    },
    {
        date: "2021-01-02",
        from: "John Doe",
        to: "Jane Doe",
        series: "Series 2",
        artwork: "Artwork 2",
        colorway: "Colorway 2",
        cat: "Cat 2",
        note: "Note 2",
        price: "$200",
    },
    {
        date: "2021-01-01",
        from: "John Doe",
        to: "Jane Doe",
        series: "Series 1",
        artwork: "Artwork 1",
        colorway: "Colorway 1",
        cat: "Cat 1",
        note: "Note 1",
        price: "$100",
    },
    {
        date: "2021-01-02",
        from: "John Doe",
        to: "Jane Doe",
        series: "Series 2",
        artwork: "Artwork 2",
        colorway: "Colorway 2",
        cat: "Cat 2",
        note: "Note 2",
        price: "$200",
    },
    {
        date: "2021-01-01",
        from: "John Doe",
        to: "Jane Doe",
        series: "Series 1",
        artwork: "Artwork 1",
        colorway: "Colorway 1",
        cat: "Cat 1",
        note: "Note 1",
        price: "$100",
    },
    {
        date: "2021-01-02",
        from: "John Doe",
        to: "Jane Doe",
        series: "Series 2",
        artwork: "Artwork 2",
        colorway: "Colorway 2",
        cat: "Cat 2",
        note: "Note 2",
        price: "$200",
    },
    {
        date: "2021-01-01",
        from: "John Doe",
        to: "Jane Doe",
        series: "Series 1",
        artwork: "Artwork 1",
        colorway: "Colorway 1",
        cat: "Cat 1",
        note: "Note 1",
        price: "$100",
    },
    {
        date: "2021-01-02",
        from: "John Doe",
        to: "Jane Doe",
        series: "Series 2",
        artwork: "Artwork 2",
        colorway: "Colorway 2",
        cat: "Cat 2",
        note: "Note 2",
        price: "$200",
    },
    {
        date: "2021-01-01",
        from: "John Doe",
        to: "Jane Doe",
        series: "Series 1",
        artwork: "Artwork 1",
        colorway: "Colorway 1",
        cat: "Cat 1",
        note: "Note 1",
        price: "$100",
    },
    {
        date: "2021-01-02",
        from: "John Doe",
        to: "Jane Doe",
        series: "Series 2",
        artwork: "Artwork 2",
        colorway: "Colorway 2",
        cat: "Cat 2",
        note: "Note 2",
        price: "$200",
    },
    {
        date: "2021-01-01",
        from: "John Doe",
        to: "Jane Doe",
        series: "Series 1",
        artwork: "Artwork 1",
        colorway: "Colorway 1",
        cat: "Cat 1",
        note: "Note 1",
        price: "$100",
    },
    {
        date: "2021-01-02",
        from: "John Doe",
        to: "Jane Doe",
        series: "Series 2",
        artwork: "Artwork 2",
        colorway: "Colorway 2",
        cat: "Cat 2",
        note: "Note 2",
        price: "$200",
    },
    {
        date: "2021-01-01",
        from: "John Doe",
        to: "Jane Doe",
        series: "Series 1",
        artwork: "Artwork 1",
        colorway: "Colorway 1",
        cat: "Cat 1",
        note: "Note 1",
        price: "$100",
    },
    {
        date: "2021-01-02",
        from: "John Doe",
        to: "Jane Doe",
        series: "Series 2",
        artwork: "Artwork 2",
        colorway: "Colorway 2",
        cat: "Cat 2",
        note: "Note 2",
        price: "$200",
    },
    {
        date: "2021-01-01",
        from: "John Doe",
        to: "Jane Doe",
        series: "Series 1",
        artwork: "Artwork 1",
        colorway: "Colorway 1",
        cat: "Cat 1",
        note: "Note 1",
        price: "$100",
    },
    {
        date: "2021-01-02",
        from: "John Doe",
        to: "Jane Doe",
        series: "Series 2",
        artwork: "Artwork 2",
        colorway: "Colorway 2",
        cat: "Cat 2",
        note: "Note 2",
        price: "$200",
    },
    {
        date: "2021-01-01",
        from: "John Doe",
        to: "Jane Doe",
        series: "Series 1",
        artwork: "Artwork 1",
        colorway: "Colorway 1",
        cat: "Cat 1",
        note: "Note 1",
        price: "$100",
    },
    {
        date: "2021-01-02",
        from: "John Doe",
        to: "Jane Doe",
        series: "Series 2",
        artwork: "Artwork 2",
        colorway: "Colorway 2",
        cat: "Cat 2",
        note: "Note 2",
        price: "$200",
    },
    {
        date: "2021-01-01",
        from: "John Doe",
        to: "Jane Doe",
        series: "Series 1",
        artwork: "Artwork 1",
        colorway: "Colorway 1",
        cat: "Cat 1",
        note: "Note 1",
        price: "$100",
    },
    {
        date: "2021-01-02",
        from: "John Doe",
        to: "Jane Doe",
        series: "Series 2",
        artwork: "Artwork 2",
        colorway: "Colorway 2",
        cat: "Cat 2",
        note: "Note 2",
        price: "$200",
    }
    ];

  const columnDefs = [
    {
      headerName: "Date",
      field: "date",
      sortable: true,
      filter: true,
    //   resizable: true,
      cellRendererFramework: (params) => <Datepicker value={params.value} onChange={(newValue) => params.setValue(newValue)} />,
      cellStyle: { display: "flex",
    cursor: "pointer" },
    },
    {
      headerName: "From",
      field: "from",
      sortable: true,
      filter: true,
    //   resizable: true,
      editable: true,
      cellStyle: {
        cursor: "pointer"
      }
    },
    {
      headerName: "To",
      field: "to",
      sortable: true,
      filter: true,
    //   resizable: true,
      editable: true,
      cellStyle: {
        cursor: "pointer"
      }
    },
    {
      headerName: "Series",
      field: "series",
      sortable: true,
      filter: true,
    //   resizable: true,
      editable: true,
      cellStyle: {
        cursor: "pointer"
      }
    },
    {
      headerName: "Artwork",
      field: "artwork",
      sortable: true,
      filter: true,
    //   resizable: true,
      editable: true,
      cellStyle: {
        cursor: "pointer"
      }
    },
    {
      headerName: "Colorway",
      field: "colorway",
      sortable: true,
      filter: true,
    //   resizable: true,
      editable: true,
      cellStyle: {
        cursor: "pointer"
      }
    },
    {
      headerName: "Cat #",
      field: "cat",
      sortable: true,
      filter: true,
    //   resizable: true,
      editable: true,
      cellStyle: {
        cursor: "pointer"
      }
    },
    {
      headerName: "Note",
      field: "note",
      sortable: true,
      filter: true,
    //   resizable: true,
      editable: true,
      cellStyle: {
        cursor: "pointer"
      }
    },
    {
      headerName: "Price",
      field: "price",
      sortable: true,
      filter: true,
    //   resizable: true,
      editable: true,
      cellStyle: {
        cursor: "pointer"
      },
    },
  ];

  useEffect(() => {
    console.log("Consignment component mounted");
  }, []);

  return (
    <div className={styles.container}>
      {dataLoaded ? (
        <>
          <div className={`ag-theme-alpine custom-ag-grid ${styles["ag-theme-alpine"]}`}>
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

          />
            </div>
        </>
      ) : (
        <SkeletonTable />
      )}

    </div>
  );
}

export default Consignment;
