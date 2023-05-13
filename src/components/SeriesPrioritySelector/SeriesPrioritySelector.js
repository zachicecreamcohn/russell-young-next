import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
const initialList = [];
import styles from "./SeriesPrioritySelector.module.css";
import { ChevronRight, Trash } from 'tabler-icons-react';
function SeriesPrioritySelector() {
  const [list, setList] = useState(initialList);
  const [seriesNames, setSeriesNames] = useState([]);
  const [selectedSeries, setSelectedSeries] = useState(null);

  useEffect(() => {
    const names = getSeriesNames();
    setSeriesNames(names);
  }, []);

  function getSeriesNames() {
    let seriesNames = [];

    // get from local storage
    let seriesList = JSON.parse(localStorage.getItem("seriesInfo"));
    for (let i = 0; i < seriesList.length; i++) {
      seriesNames.push({
        content: seriesList[i].series,
        id: seriesList[i].seriesID,
      });
    }

    return seriesNames;
  }

  const handleAdd = () => {
    if (selectedSeries && !list.includes(selectedSeries)) {
      setList((prevState) => [...prevState, selectedSeries]);
      setSelectedSeries(null);
    }
  };

  const handleRemove = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(list);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setList(items);
  };

  function getIds() {
    return list.map((item) => item.id);
  }

  return (
    <>

      <div className={styles["priority-list-container"]}>
        <div className={styles.list}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="list">
            {(provided) => (
              <ol {...provided.droppableProps} ref={provided.innerRef}>
                {list.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={String(item.id)}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      ><div>
                        {item.content}{" "}
                          <Trash size={22}
                          onClick={() => handleRemove(item.id)}/>
                        </div>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ol>
            )}
          </Droppable>
        </DragDropContext>
        </div>
        <div className={styles['input-container']}>
      <Autocomplete
        id="priority-selector"
          sx={{
            marginTop: "10px",
            maxWidth: "300px",
            width: 400,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "black",
              },
              "&:hover fieldset": {
                borderColor: "black",
              },
              "&.Mui-focused fieldset": {
                borderColor: "black",
              },
              backgroundColor: "white",
            },
          }}
          value={selectedSeries}
          onChange={(event, newValue) => {
            setSelectedSeries(newValue);
          }}
          options={seriesNames}
          getOptionLabel={(option) => option.content}
          renderInput={(params) => (
            <TextField {...params} label="Select Series" variant="outlined" size="small"/>
          )}
        />
        <button className={styles.addbtn} onClick={handleAdd}><ChevronRight size={22}/></button>
        </div>
      </div>
      
    </>
  );
}

export default SeriesPrioritySelector;
