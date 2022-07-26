import React, { useEffect, useState } from "react";
import Header from "../Header";
import Sidenav from "../Sidenav";
import { ServerURL, postData, getData,postImageData } from "../../FetchNodeServices";
import useStyles from "../Styles/productStyle";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Button, Grid, TextField, Avatar, Input, Divider,Select,FormControl,MenuItem,InputLabel} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Swal from "sweetalert2";
import { reactLocalStorage } from "reactjs-localstorage";

export default function Showproduct() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const[categorylist,setCategorylist]=useState([])
  const[hsnlist,setHsnlist]=useState([])
  const [open, setOpen] = useState(false);
  const[productid,setProductid]=useState();
  const[hsnid,setHsnid]=useState();
  const[categoryid,setCategoryid]=useState();
  
  const[productname,setProductname]=useState();
  const[description,setDescription]=useState();
  const[price,setPrice]=useState();
  const[Image,setImage]=useState({bytes:'',filename:"/cloth.jpg"});
  
  
  const [tempIcon, setTempicon] = useState("");
//const [openButton, setButtonOpen] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const handleImage=(event)=>{
    
setImage({bytes:event.target.files[0],filename:URL.createObjectURL(event.target.files[0])})
    }

    const handleOpen=(row)=>{
    setOpen(true);
      setProductid(row.productid)
      setHsnid(row.hsnid)
    setCategoryid(row.categoryid);
    setProductname(row.productname);
    setDescription(row.description);
    setPrice(row.price)
    setImage({ bytes: "", filename: `${ServerURL}/images/${row.image}` });
    setTempicon(row.image);
  }

  const handleDelete = async (row) => {
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
        var dresult = await postData("product/deleteproduct", {
          productid: row.productid,
        });
        if (dresult.result)
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        fetchProducts();
      }
    });

  };

  const columns = [
    {
        name: "Edit",
        cell:(row) => <button className={classes.editBtn} onClick={()=>handleOpen(row)}>Edit</button>
    },
    {
        name: "Delete",
        cell:(row) => <button className={classes.deleteBtn} onClick={()=>handleDelete(row)} >Delete</button>,
    },
    {
      name: "Product Id",
      selector: (row) => row.productid,
    },
    {
      name: "HSN Id",
      selector: (row) => row.hsncode,
    },
    {
      name: "Category Name",
      selector: (row) => row.categoryname,
    },
    {
      name: "Product Name",
      selector: (row) => row.productname,
    },
    {
      name: "Description",
      selector: (row) => row.description,
    },
    {
      name: "Price",
      selector: (row) => row.price,
    },
    {
      name: "Image",
      selector: (row) => (
        <img
          src={`${ServerURL}/images/${row.image}`}
          style={{ width: 80, borderRadius: "25%" }}
        />
      ),
    },
  ];

  const handleProduct = () => {
    navigate("/product");
  };

  const fetchProduct = async (page) => {
   
    var result = await getData(
      `product/displayproduct?page=${page}&per_page=${perPage}&delay=1`
    );
    setList(result.result);
    setTotalRows(result.total);
   
  };
  const fetchProducts = async (page) => {
   
   var result = await getData("product/displayproduct"
   );
   if (result.result) {
    setList(result.result);
  } else {
    reactLocalStorage.remove("token");
    window.location.reload();
  }
   
  
 };

  useEffect(function () {
      fetchProducts()
    fetchProduct(1);
  }, []);

  const handlePageChange = (perPage) => {
    fetchProduct(perPage);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
  

    var result = await getData(
      `product/displayproduct?page=${page}&per_page=${newPerPage}&delay=1`
    );

    setList(result.result);
    setPerPage(newPerPage);
   
  };
  const handleSubmit = async () => {
    // productid:productid,
    //   categoryid: categoryid,
    //   productname: productname,
    //   description: description,
    //   price:price,
    //   image: Image.bytes,
    var formData=new FormData();
    formData.append("productid",productid)
    formData.append("hsnid",hsnid)

    formData.append("categoryid",categoryid)
    formData.append("productname",productname)
    formData.append("description",description)
    formData.append("price",price)
    formData.append("image",Image.bytes)
    var result = await postImageData("product/editproductdata",formData);
    if (result.result) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your category has been saved",
        showConfirmButton: false,
        timer: 3000,
      });
      fetchProducts()
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


  

  const handleClose = () => {
      setImage({ bytes: "", filename: `${ServerURL}/images/${tempIcon}` });
      setOpen(false);
    fetchProducts();
    //setButtonOpen(false);
    
  };
  const handleCategory=(event)=>{
    setCategoryid(event.target.value)
  }
  
  const fetchCategory=async ()=>{
    const result= await getData('category/displaycategory')
    setCategorylist(result.result)
  
  }
  const fillCategory=()=>{
    return categorylist.map((item)=>{
      return(
        <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
      )
    })
  }


  const handleHsn=(event)=>{
    setHsnid(event.target.value)
  }
  
  const fetchHsn=async ()=>{
    const result= await getData('hsn/displayhsn')
    setHsnlist(result.result)
  
  }
  const fillHsn=()=>{
    return hsnlist.map((item)=>{
      return(
        <MenuItem value={item.hsnid}>{item.hsncode}</MenuItem>
      )
    })
  }


  useEffect(function(){
    fetchCategory();
    fetchHsn();
    },[])




  const EditProduct = () => {
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
                  Edit Product
                </Grid>
                <Grid item xs={12}>
                <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" style={{color:'#000'}}>Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={categoryid}
          label="Category"
          onChange={handleCategory}
        >
         {fillCategory()}
        </Select>
      </FormControl>
          </Grid>
          <Grid item xs={12}>
          <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" style={{color:'#000'}}>HsnCode</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={hsnid}
          label="HsnCode"
          onChange={handleHsn}
        >
         {fillHsn()}
        </Select>
      </FormControl>
          </Grid>
                <Grid item xs={12}>
                  <TextField
                    container="outlined"
                    value={productname}
                    InputLabelProps={{ style: { color: "#FFF" } }}
                    inputProps={{ style: { color: "black" } }}
                    label="Product Name"
                    onChange={(event) => setProductname(event.target.value)}
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
                  <TextField
                    container="outlined"
                    value={price}
                    InputLabelProps={{ style: { color: "#FFF" } }}
                    inputProps={{ style: { color: "black" } }}
                    label="Price"
                    onChange={(event) => setPrice(event.target.value)}
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

  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <Sidenav />
      </div>
      <div className={classes.subdiv}>
        <Button class="btn btn-success" onClick={handleProduct}>
          Add Product
        </Button>
        <DataTable
          columns={columns}
          data={list}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
        />
      </div>
      <div>
        {EditProduct()}
</div>
    </div>
  );
}
