import React, { useState, useEffect } from 'react';
import styles from "./EditableInput.module.css";
import $ from 'jquery';
import { TextField, TextareaAutosize } from '@mui/material';

function EditableInput(props) {
    let value_from_props = props.value;
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(props.value);
    const randomID = Math.random().toString(36).substring(7);
   

  useEffect(() => {
    if (!isEditing) {
        // check if the value has changed
        if (value !== value_from_props) {
            // if so, save the new value
            save(value);
            value_from_props = value;

        }
    }




    }, [isEditing]);
    // check if a save function was passed in as a prop
    const saveFunction = props.save;
   // if not, define a default save function
    const defaultSaveFunction = () => {
    }

    // if a save function was passed in as a prop, use it. Otherwise, use the default save function
    const save = saveFunction ? saveFunction : defaultSaveFunction;

  const handleDoubleClick = (event) => {
    setIsEditing(true);
    $(`#${randomID}`).trigger("focus");
    
    
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
        setIsEditing(false);
    }
    }


  const handleBlur = () => {
    setIsEditing(false);
  }

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  return (
    <div
    className={styles.container}
    onDoubleClick={(event) => handleDoubleClick(event) }
    >
      {isEditing ?

      (props.multiline ?
        <TextareaAutosize
        id={randomID}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        autoFocus
        size="small"
        variant="outlined"
        minRows={props.rows}
        className={styles.textarea}
        /> : 
        <TextField
        id={randomID}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        autoFocus
        fullWidth
        size="small"
        variant="outlined"
        sx={{
            // width: 300,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'black',
              },
              '&:hover fieldset': {
                borderColor: 'black',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'black',
              },
            },
          }}
        
        
        
        /> ) :

        <p>
        {value}</p>
      }
    </div>


  );

}

export default EditableInput;
