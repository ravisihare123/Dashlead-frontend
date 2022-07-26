import React, { useEffect, useState } from "react";
import Header from "../Header";
import Sidenav from "../Sidenav";
import { ServerURL, postData, getData,postImageData } from "../../FetchNodeServices";
import useStyles from "../Styles/productStyle";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Button, Grid, TextField,Select,FormControl,MenuItem,InputLabel} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Swal from "sweetalert2";
import { reactLocalStorage } from "reactjs-localstorage";

export default function Showcustomer() {
    const classes=useStyles();
    var navigate =useNavigate();
    const[customerid,setCustomerid]=useState('');
    const[name,setName]=useState('')
    const[mobile,setMobile]=useState('');
    const[whatsapp,setWhatsapp]=useState('');
    const[address,setAddress]=useState('');
    const[state,setState]=useState('');
    const[city,setCity]=useState('');
    const[gstno,setGstno]=useState('');
    const[list,setList]=useState([]);
    const[citylist,setCityList]=useState([])
    const[statelist,setStateList]=useState([]);

    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const[open,setOpen]=useState(false)




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
          name: "Name",
          selector: (row) => row.name,
        },
        {
          name: "Mobile ",
          selector: (row) => row.mobile,
        },
        {
          name: "Whatsapp",
          selector: (row) => row.whatsapp,
        },
        {
          name: "Address",
          selector: (row) => row.address,
        },
        {
          name: "State",
          selector: (row) => row.statename,
        },
       
        {
            name: "City",
            selector: (row) => row.cityname,
          },
          {
            name: "Gstno",
            selector: (row) => row.gstno,
          },
      ];

      const handleCustomer = () => {
        navigate("/customer");
      };


      
      const fetchCustomer = async (page) => {
   
        var result = await getData(
          `customer/displaycustomer?page=${page}&per_page=${perPage}&delay=1`
        );
        setList(result.result);
        setTotalRows(result.total);
       
      };

      const fetchCustomers = async (page) => {
   
        var result = await getData( "customer/displaycustomer");
        if (result.result) {
          setList(result.result);
        } else {
          reactLocalStorage.remove("token");
          window.location.reload();
        }
        
       
      };
      useEffect(function () {
        fetchCustomers()
      fetchCustomer(1);
    }, []);


    const handlePageChange = (perPage) => {
        fetchCustomer(perPage);
      };
    
      const handlePerRowsChange = async (newPerPage, page) => {
      
    
        var result = await getData(
          `customer/displaycustomer?page=${page}&per_page=${newPerPage}&delay=1`
        );
    
        setList(result.result);
        setPerPage(newPerPage);
       
      };


      const handleOpen=(row)=>{
        setOpen(true);
          setCustomerid(row.customerid)
        setName(row.name);
        setMobile(row.mobile);
        setWhatsapp(row.whatsapp);
        setAddress(row.address);
        setState(row.state);
        setCity(row.city);
        setGstno(row.gstno);
     
        
      }

      const handleSubmit = async () => {
    
               
                var result = await postData("customer/editcustomerdata",{customerid:customerid,name:name,mobile:mobile,whatsapp:whatsapp,address:address
                ,state:state,city:city,gstno:gstno});
                if (result.result) {
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your Customer has been saved",
                    showConfirmButton: false,
                    timer: 3000,
                  });
                  fetchCustomers()
                } else {
                  Swal.fire({
                    position: "center",
                    icon: "fail",
                    title: "fail to fill Customer",
                    showConfirmButton: false,
                    timer: 3000,
                  });
                }
                 open(false);
              };

              const handleClose = () => {
       
                setOpen(false);
              fetchCustomers();
            };

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
                    var dresult = await postData("customer/deletecustomer", {
                      customerid: row.customerid,
                    });
                    if (dresult.result)
                    Swal.fire("Deleted!", "Your file has been deleted.", "success");
                    fetchCustomers();
                  }
                });
            
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
                setCityList(result.result);
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
                return citylist.map((item) => {
                  return <MenuItem value={item.id}>{item.city}</MenuItem>;
                });
              };



              const EditCustomer = () => {
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
                          <Grid item xs={12} style={{fontSize:20,fontWeight:"bold",color:'#000'}}>
            EDIT CUSTOMER
          </Grid>
          

  <Grid item xs={12}>
              <TextField container="outlined" InputLabelProps={{style:{color:'#000'}}}  inputProps={{style:{color:'black'}}}label="Name"
              value={name}
               onChange={(event)=>setName(event.target.value)} 
               fullWidth/>
          </Grid>
          <Grid item xs={12}>
              <TextField container="outlined" InputLabelProps={{style:{color:'#000'}}}  inputProps={{style:{color:'black'}}}label="Mobile No."
              value={mobile}
               onChange={(event)=>setMobile(event.target.value)} 
               fullWidth/>
          </Grid>
          <Grid item xs={12}>
              <TextField container="outlined" InputLabelProps={{style:{color:'#000'}}}  inputProps={{style:{color:'black'}}}label="Whatsapp No."
              value={whatsapp}
               onChange={(event)=>setWhatsapp(event.target.value)} 
               fullWidth/>
          </Grid>
          <Grid item xs={12}>
              <TextField container="outlined" InputLabelProps={{style:{color:'#000'}}}  inputProps={{style:{color:'black'}}}label="Address"
              value={address}
               onChange={(event)=>setAddress(event.target.value)} 
               fullWidth/>
          
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
              <TextField container="outlined" InputLabelProps={{style:{color:'#000'}}}  inputProps={{style:{color:'black'}}}label="Gst No."
              value={gstno}
               onChange={(event)=>setGstno(event.target.value)} 
               fullWidth/>
          
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
            
        
        





    return(
        <div> <div>
        <Header />
      </div>
      <div>
        <Sidenav />
      </div>
      <div className={classes.subdiv}>
        <Button class="btn btn-success" onClick={handleCustomer}>
          Add Customer
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
        {EditCustomer()}
</div>





        </div>
    )
}