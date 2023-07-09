import React, { useState, useEffect } from "react";
import styles from "./Variation.module.css";

import { ChevronDown, ChevronUp } from "tabler-icons-react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

function Variation(props) {


    const allCollapsed = props.allCollapsed;

    const [collapsed, setCollapsed] = useState(allCollapsed);
    const [variationData, setVariationData] = useState([]);

    useEffect(() => {
        setVariationData(props.Variation);
    }, [props.Variation]);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };


const onCellValueChanged = (params) => {
    props.setIsDataChanged(true);
};

    

    let isDataChanged = props.isDataChanged;
    let setIsDataChanged = props.setIsDataChanged;
    let hangedData = props.changedData;
    let setChangedData = props.setChangedData;







    
    const rowData = variationData
        ? variationData.map((variation) => {

            return {
                date: new Date(variation.date * 1000).toLocaleDateString(),
                // consigned: variation.consignedDealerName !== null ? (variation.reconsignedDealerName !== null ? variation.consignedDealerName + " >> " + variation.reconsignedDealerName : variation.consignedDealerName) : (variation.reconsignedDealerName !== null ? variation.reconsignedDealerName : "")
                consigned: (variation.consignedDealerInitials ? variation.consignedDealerInitials : variation.consignedDealerName),
                reconsigned: (variation.reconsignedDealerInitials ? variation.reconsignedDealerInitials : variation.reconsignedDealerName),
                note: variation.note,
                stretched: variation.stretched,
                sold : variation.sold,
            };
        })
        : [];

    const columnDefs = [
        {
            headerName: "Date",
            field: "date",
            editable: true,
            maxWidth: 110,
            sortable: false,
        },
        {
            headerName: "Consigned",
            field: "consigned",
            sortable: false,
            filter: true,
            editable: true,
        },
        {
            headerName: "Reconsigned",
            field: "reconsigned",
            sortable: false,
            filter: true,
            editable: true,
        },
        { 
            headerName: "Note",
            field: "note",
            sortable: false,
            filter: true,
            editable: true,
            cellEditor: 'agLargeTextCellEditor',
            cellEditorPopup: true,
            cellEditorParams: {
            maxLength: 100,
            rows: 10,
            cols: 50
        }
        },
        { 
            headerName: "St.",
            field: "stretched",
            sortable: false,
            filter: false,
            editable: false,
            maxWidth: 70,
            cellRenderer: params => {
                return <input type='checkbox' checked = {params.value} />;
            }
        },
        {
            headerName: "Sld.",
            field: "sold",
            sortable: false,
            filter: false,
            editable: false,
            maxWidth: 70,
            cellRenderer: params => {
                return <input type='checkbox' checked = {params.value} />;
            }

        }
    ];
    

    const onGridSizeChanged = (params) => {
        params.api.sizeColumnsToFit();
    };

    return (
        <div>
            <div className={`${styles.variation} d-flex flex-row`}>
                <h5>{variationData.length === 0 ? "No Variations" : variationData[0].code}</h5>
                <span>
                    {collapsed ? (
                        <ChevronDown onClick={toggleCollapsed} className={`${styles["variation-chevron"]}`} />
                    ) : (
                        <ChevronUp onClick={toggleCollapsed} className={`${styles["variation-chevron"]}`} />
                    )}
                </span>
            </div>
            {collapsed ? null : (
                <div className={`ag-theme-alpine custom-ag-grid ${styles["ag-theme-alpine"]}`} style={{ height: "auto", width: "100%" }}>
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={columnDefs}
                        domLayout="autoHeight"
                        onGridSizeChanged={onGridSizeChanged}
                        onCellValueChanged={onCellValueChanged}
                    />
                </div>
            )}
        </div>
    );
    
}

export default Variation;
