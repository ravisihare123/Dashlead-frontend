import React, { useState, useEffect } from "react";
import Header from "../Header";
import Sidenav from "../Sidenav";
import MaterialTable from "@material-table/core";
import { makeStyles } from "@mui/styles";
import {
  getData,
  ServerURL,
  postImageData,
  postData,
} from "../../FetchNodeServices";
import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";
import { Button, Grid, TextField, Avatar, Input, Divider } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { reactLocalStorage } from "reactjs-localstorage";

const useStyles = makeStyles({
  subdiv: {
    padding: 10,
    background: "#8760fb",
    marginTop: 50,
    width: 1200,
    marginLeft: 300,
    marginTop: 150,
  },
  csubdiv: {
    padding: 10,
    background: "#8760fb",
    marginTop: 50,
    width: "95%",
  },
});

export default function Showcategory() {
  const classes = useStyles();
  var navigate = useNavigate();
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const [categoryid, setCategoryid] = useState();

  const [categoryname, setCategoryname] = useState();
  const [description, setDescription] = useState();
  const [Image, setImage] = useState({ bytes: "", filename: "/cloth.jpg" });
  const handleImage = (event) => {
    setButtonOpen(true);
    setImage({
      bytes: event.target.files[0],
      filename: URL.createObjectURL(event.target.files[0]),
    });
  };

  const [openButton, setButtonOpen] = useState(false);
  const [tempIcon, setTempicon] = useState("");
  // const [uploadbtn,setUploadbtn]=useState()

  const handleSubmit = async () => {
    var result = await postImageData("category/editcategorydata", {
      categoryid: categoryid,
      categoryname: categoryname,
      description: description,
      image: Image.bytes,
    });
    if (result.result) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your category has been saved",
        showConfirmButton: false,
        timer: 3000,
      });
      fetchCategory();
    } else {
      Swal.fire({
        position: "center",
        icon: "fail",
        title: "fail to fill category",
        showConfirmButton: false,
        timer: 3000,
      });
    }
    open(false);
  };

  const handleOpen = (rowData) => {
    setCategoryid(rowData.categoryid);
    setCategoryname(rowData.categoryname);
    setDescription(rowData.description);
    setImage({ bytes: "", filename: `${ServerURL}/images/${rowData.image}` });
    setTempicon(rowData.image);
    setOpen(true);
    // setUploadbtn(true)
  };

  const handleClose = () => {
    setOpen(false);
    setImage({ bytes: "", filename: `${ServerURL}/images/${tempIcon}` });
    fetchCategory();
    setButtonOpen(false);
    // setUploadbtn(true)
  };

  const fetchCategory = async () => {
    var result = await getData("category/displaycategory");
    if (result.result) {
      setList(result.result);
    } else {
      reactLocalStorage.remove("token");
      window.location.reload();
    }
  };

  useEffect(function () {
    fetchCategory();
  }, []);
  const handleCategory = () => {
    navigate("/category");
  };

  const handleDelete = async (rowData) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        var dresult = await postData("category/deletecategory", {
          categoryid: rowData.categoryid,
        });
        if (dresult.result)
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        fetchCategory();
      }
    });
  };

  const Edit = () => {
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <div className={classes.csubdiv}>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  style={{ fontSize: 20, fontWeight: "bold", color: "#FFF" }}
                >
                  Edit Catagory
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    container="outlined"
                    value={categoryname}
                    InputLabelProps={{ style: { color: "#FFF" } }}
                    inputProps={{ style: { color: "black" } }}
                    label="Category"
                    onChange={(event) => setCategoryname(event.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    container="outlined"
                    value={description}
                    InputLabelProps={{ style: { color: "#FFF" } }}
                    inputProps={{ style: { color: "black" } }}
                    label="Description"
                    onChange={(event) => setDescription(event.target.value)}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <Divider style={{ background: "#FFF" }} />
                </Grid>

                <Grid
                  item
                  xs={6}
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <label htmlFor="contained-button-file">
                    <Input
                      onChange={(event) => handleImage(event)}
                      accept="image/*"
                      id="contained-button-file"
                      multiple
                      type="file"
                    />
                    <Button
                      style={{
                        background: "#FFF",
                        color: "#8760fb",
                        fontWeight: "bold",
                      }}
                      variant="contained"
                      component="span"
                      fullWidth
                    >
                      Upload
                    </Button>
                  </label>
                </Grid>
                <Grid
                  item
                  xs={6}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src={Image.filename}
                    variant="rounded"
                    sx={{ width: 56, height: 56 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    onClick={handleSubmit}
                    style={{
                      background: "#FFF",
                      color: "#8760fb",
                      fontWeight: "bold",
                    }}
                    variant="contained"
                    component="span"
                    fullWidth
                  >
                    Edit Data
                  </Button>
                </Grid>
              </Grid>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  function Display() {
    return (
      <MaterialTable
        title={
          <Button
            variant="contained"
            style={{ background: "#8760fb" }}
            onClick={handleCategory}
            fullWidth
          >
            Add Category
          </Button>
        }
        columns={[
          { title: "ID", field: "categoryid" },
          { title: "Name", field: "categoryname" },
          { title: "Description", field: "description" },
          {
            title: "ICON",
            field: "image",
            render: (rowData) => (
              <img
                src={`${ServerURL}/images/${rowData.image}`}
                style={{ width: 80, borderRadius: "25%" }}
              />
              // <input variant="contained" style={{borderRadius:10,height:50}}></input>
            ),
          },
        ]}
        data={list}
        actions={[
          {
            icon: "edit",
            tooltip: "Save User",
            onClick: (event, rowData) => handleOpen(rowData),
          },
          {
            icon: "delete",
            tooltip: "Delete User",
            onClick: (event, rowData) => handleDelete(rowData),
          },
        ]}
        pagination={[]}
      />
    );
  }

  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <Sidenav />
      </div>

      <div className={classes.subdiv}>
        {Display()}
        {Edit()}
      </div>
    </div>
  );
}
