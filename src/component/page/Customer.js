import React, { useState, useEffect } from "react";
import useStyles from "../Styles/categoryStyle";
import { postData, postImageData, getData } from "../../FetchNodeServices";
import Header from "../Header";
import Sidenav from "../Sidenav";
import Swal from "sweetalert2";

import {
  Button,
  Grid,
  TextField,
  Input,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Customer() {
  const classes = useStyles();
  var navigate = useNavigate();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [gstno, setGstno] = useState();
  const [list, setList] = useState([]);
  const [statelist, setStateList] = useState([]);
  const [refresh, setRefresh] = useState([]);

  const handleDisplayList = () => {
    navigate("/showcustomer");
  };

  const handleSubmit = async () => {
    var result = await postData("customer/insertcustomer", {
      name: name,
      mobile: mobile,
      whatsapp: whatsapp,
      address: address,
      state: state,
      city: city,
      gstno: gstno,
    });
    if (result.result) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your Customer has been saved",
        showConfirmButton: false,
        timer: 3000,
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "fail",
        title: "fail to fill Customer",
        showConfirmButton: false,
        timer: 3000,
      });
    }
    setRefresh(!refresh);
  };
  const handleState = (event) => {
    setState(event.target.value);
  };

  const handleCity = (event) => {
    setCity(event.target.value);
  };

  const fetchState = async () => {
    const result = await getData("customer/states");
    setStateList(result.result);
  };

  const fetchCity = async () => {
    // setList([])
    const result = await postData("customer/city", { stateid: state });
    setList(result.result);
    // alert(JSON.stringify(result.result))
  };
  useEffect(
    function () {
      fetchState();
      fetchCity();
    },
    [state]
  );

  const fillState = () => {
    return statelist.map((item) => {
      return <MenuItem value={item.id}>{item.name}</MenuItem>;
    });
  };

  const fillCity = () => {
    return list.map((item) => {
      return <MenuItem value={item.id}>{item.city}</MenuItem>;
    });
  };

  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <Sidenav />
      </div>
      <div className={classes.subdiv}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={6}
            style={{ fontSize: 20, fontWeight: "bold", color: "#000" }}
          >
            Customer
          </Grid>
          <Grid item xs={6}>
            <Button
              onClick={() => handleDisplayList()}
              className={classes.listButton}
              variant="contained"
              fullWidth
            >
              List Customer
            </Button>
          </Grid>

          <Grid item xs={12}>
            <TextField
              container="outlined"
              InputLabelProps={{ style: { color: "#000" } }}
              inputProps={{ style: { color: "black" } }}
              label="Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              container="outlined"
              InputLabelProps={{ style: { color: "#000" } }}
              inputProps={{ style: { color: "black" } }}
              label="Mobile No."
              value={mobile}
              onChange={(event) => setMobile(event.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              container="outlined"
              InputLabelProps={{ style: { color: "#000" } }}
              inputProps={{ style: { color: "black" } }}
              label="Whatsapp No."
              value={whatsapp}
              onChange={(event) => setWhatsapp(event.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              container="outlined"
              InputLabelProps={{ style: { color: "#000" } }}
              inputProps={{ style: { color: "black" } }}
              label="Address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel
                id="demo-simple-select-label"
                style={{ color: "#000" }}
              >
                State
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={state}
                label="Category"
                onChange={handleState}
              >
                {fillState()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel
                id="demo-simple-select-label"
                style={{ color: "#000" }}
              >
                CITY
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={city}
                label="Category"
                onChange={handleCity}
              >
                {fillCity()}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              container="outlined"
              InputLabelProps={{ style: { color: "#000" } }}
              inputProps={{ style: { color: "black" } }}
              label="Gst No."
              value={gstno}
              onChange={(event) => setGstno(event.target.value)}
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <Button
              onClick={() => handleSubmit()}
              className={classes.submitBtn}
              variant="contained"
              component="span"
              fullWidth
            >
              Submit
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              // onClick={()=>handleReset()}
              className={classes.restBtn}
              variant="contained"
              component="span"
              fullWidth
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

// <Grid item xs={12}>
// <FormControl fullWidth>
// <InputLabel id="demo-simple-select-label" style={{color:'#000'}}>State</InputLabel>
// <Select
// labelId="demo-simple-select-label"
// id="demo-simple-select"
// value={state}
// label="Category"
// onChange={handleState}
// >
// {/* {fillCategory()} */}
// </Select>
// </FormControl>
// </Grid>

// <Grid item xs={12}>
// <FormControl fullWidth>
// <InputLabel id="demo-simple-select-label" style={{color:'#000'}}>CITY</InputLabel>
// <Select
// labelId="demo-simple-select-label"
// id="demo-simple-select"
// value={city}
// label="Category"
// onChange={handleCity}
// >
//  {fillCategory()}
// </Select>
// </FormControl>
// </Grid>
