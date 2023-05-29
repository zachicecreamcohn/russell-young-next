import React, { Component } from 'react';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Dayjs from 'dayjs';
import { TextField } from '@mui/material';
import styles from "./Datepicker.module.css";

class Datepicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value ? Dayjs(props.value) : Dayjs(),
    };
  }

  render() {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDatePicker
          className={styles.datepicker}
              value={this.state.value}
              onChange={(newValue) => {
                  this.setState({ value: newValue });
              }}
              onAccept={(newValue) => {
                  if (this.props.onChange) {
                      this.props.onChange(newValue);
                  }
              }}
              renderInput={(params) => 
                <TextField 
                  {...params} 
                  className={styles.input}
           
                    variant="standard"
                    size="small"
                />}
          />
      </LocalizationProvider>
    );
  }
}

export default Datepicker;
