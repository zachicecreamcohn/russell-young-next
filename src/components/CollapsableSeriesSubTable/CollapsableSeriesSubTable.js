// this is a wrapper component for the MUI-datatable component

import React from 'react';
import MUIDataTable from 'mui-datatables';
// allow it to have a state
import { useState } from 'react';

import './CollapsableSeriesSubTable.css';



function CollapsableSeriesSubTable(props) {
    // generate a random id for this table
    const id = Math.random().toString(36).substr(2, 9);


    // has a state to keep track of data to display in the table
    const [parentsData, setParentsData] = useState([]);

    // a collapsed prop is passed in to this component. When that prop changes, the state of the table will change
    const [collapsed, setCollapsed] = useState(props.collapsed);

    // this function will toggle the state of the table
    const toggleState = () => {


        setCollapsed(!collapsed);
        updateCollapsed();


        // if the data state var is empty, get the data from the api
        if (parentsData.length === 0 && collapsed) {
            fetch("https://api.russellyoung.zachcohndev.com/demo/parents-from-series?seriesID=" + props.seriesID)
            .then(response => response.json())
            .then(data => {
                
      
        
                data = data.series_names;
 

                // reformat the data
                let dataForTable = [];
                for (let i = 0; i < data.length; i++) {
                    let row = [];
                    row.push(data[i].title);
                    row.push(data[i].year);
                    row.push(data[i].medium);
                    row.push(data[i].size);
                    dataForTable.push(row);
                }

                // set the data state var
                setParentsData(dataForTable);
                }
                )
                .catch((error) => {
                    console.error('Error:', error);
                }
                );
        }
    }

    // this function adds or removes the class .collapsed from the table
    const updateCollapsed = () => {
        // get this element
        const element = document.getElementById(id);
        // if the state is collapsed, add the class .collapsed
        if (collapsed) {
            element.classList.add('collapsed');
        } else {
            // if the state is expanded, remove the class .collapsed
            element.classList.remove('collapsed');
        }

    }

    // check for changes in the collapsed prop

    React.useEffect(() => {
        toggleState();

        
    }, [props.collapsed]);







    // define the columns for the table
    const columns = [
        {
            name: "Title",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Year",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Medium",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Size",
            options: {
                filter: true,
                sort: true,
            }
        }
    ];





    return (
        <div className='collapsable-datatable collapsed' id={id}>
            <MUIDataTable
                title={props.title}
                data={parentsData}
                columns={columns}
                options={{
                    filterType: 'multiselect',
                    selectableRows: 'none',
                    selectableRowsOnClick: true,
                    selectableRowsHeader: false,
                    rowsPerPage: 5,
                }}
            />
        </div>
    );
}



export default CollapsableSeriesSubTable;