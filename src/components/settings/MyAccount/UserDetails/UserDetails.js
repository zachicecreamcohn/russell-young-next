import React, { useState } from "react";
import styles from "./UserDetails.module.css";
import { TextField, Button } from "@mui/material";

function UserDetails(props) {
  const [userDetailsData, setUserDetailsData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    company: "",
  });

  const handleChange = (e) => {
    setUserDetailsData({
      ...userDetailsData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically pass the userDetails to a function that handles your form submission
  };

  return (
      <><TextField

      label="First Name"
      variant="outlined"
      size="small"
      sx={{
        width: 250,
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
        },
        marginBottom: 2,
        marginTop: 5
      }} /><TextField

        label="Last Name"
        variant="outlined"
        size="small"
        sx={{
          width: 250,
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
          },
          marginBottom: 2,
        }} /><TextField

        label="Email"
        variant="outlined"
        size="small"
        sx={{
          width: 250,
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
          },
          marginBottom: 2,
        }} /><TextField

        label="Username"
        variant="outlined"
        size="small"
        sx={{
          width: 250,
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
          },
          marginBottom: 2,
        }} /><TextField

        variant="outlined"
        value="**********"
        disabled
        size="small"
        sx={{
          width: 250,
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "black",
            },
            "&:hover fieldset": {
              borderColor: "black",
            },
            "&.Mui-focused: fieldset": {
              borderColor: "black",
            },
           
          },
          marginBottom: 2,
        }} /><TextField

        label="Company"
        variant="outlined"
        size="small"
        sx={{
          width: 250,
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
          },
        }} /></>
  );
}
      
export default UserDetails;
