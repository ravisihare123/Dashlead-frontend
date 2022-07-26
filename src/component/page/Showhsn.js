import React, { useEffect, useState } from "react";
import Header from "../Header";
import Sidenav from "../Sidenav";
import { ServerURL, postData, getData,postImageData } from "../../FetchNodeServices";
import useStyles from "../Styles/productStyle";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Button, Grid, TextField, Avatar, Input, Divider } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Swal from "sweetalert2";
import { reactLocalStorage } from "reactjs-localstorage";

export default function Showhsn() {
    const classes = useStyles();
    const navigate = useNavigate();
    const [list, setList] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const[hsnid,setHsnid]=useState();

  const[hsncode,setHsncode]=useState();
    const[igst,setIgst]=useState()
    const[sgst,setSgst]=useState()
const[cgst,setCgst]=useState()
const[description,setDescription]=useState();
    const [open, setOpen] = useState(false);

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
          name: "HSN Id",
          selector: (row) => row.hsnid,
        },
        {
          name: "Hsn code ",
          selector: (row) => row.hsncode,
        },
        {
          name: "Igst",
          selector: (row) => row.igst,
        },
        {
          name: "Sgst",
          selector: (row) => row.sgst,
        },
        {
          name: "Cgst",
          selector: (row) => row.cgst,
        },
        // {
        //   name: "Image",
        //   selector: (row) => (
        //     <img
        //       src={`${ServerURL}/images/${row.image}`}
        //       style={{ width: 80, borderRadius: "25%" }}
        //     />
        //   ),
        // },
        {
            name: "Description",
            selector: (row) => row.description,
          },
      ];
    
      const handleHsn = () => {
        navigate("/hsn");
      };


      const fetchHsn = async (page) => {
   
        var result = await getData(
          `hsn/displayhsn?page=${page}&per_page=${perPage}&delay=1`
        );
        setList(result.result);
        setTotalRows(result.total);
       
      };

      const fetchHsns = async (page) => {
   
        var result = await getData("hsn/displayhsn");
        if (result.result) {
          setList(result.result);
        } else {
          reactLocalStorage.remove("token");
          window.location.reload();
        }
        
       
      };
      useEffect(function () {
        fetchHsns()
      fetchHsn(1);
    }, []);

    const handlePageChange = (perPage) => {
        fetchHsn(perPage);
      };
    
      const handlePerRowsChange = async (newPerPage, page) => {
      
    
        var result = await getData(
          `hsn/displayhsn?page=${page}&per_page=${newPerPage}&delay=1`
        );
    
        setList(result.result);
        setPerPage(newPerPage);
       
      };

      const handleOpen=(row)=>{
        setOpen(true);
          setHsnid(row.hsnid)
        setHsncode(row.hsncode);
        setIgst(row.igst);
        setSgst(row.sgst);
        setCgst(row.cgst);
        setDescription(row.description);
     
        
      }


      const handleSubmit = async () => {
        
        
//         var formData=new FormData();
//         formData.append("hsnid",hsnid)
//         formData.append("hsncode",hsncode)
//         formData.append("igst",igst)
//         formData.append("sgst",sgst)
// formData.append("cgst",cgst)

//         formData.append("description",description)
       
        var result = await postData("hsn/edithsndata",{hsnid:hsnid,
            hsncode:hsncode,
            igst:igst,
            sgst:sgst,
            cgst:cgst,
            description:description});
        if (result.result) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your Hsn has been saved",
            showConfirmButton: false,
            timer: 3000,
          });
          fetchHsns()
        } else {
          Swal.fire({
            position: "center",
            icon: "fail",
            title: "fail to fill Hsn",
            showConfirmButton: false,
            timer: 3000,
          });
        }
         open(false);
      };
    
      const handleClose = () => {
       
        setOpen(false);
      fetchHsns();
      //setButtonOpen(false);
      
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
            var dresult = await postData("hsn/deletehsn", {
              hsnid: row.hsnid,
            });
            if (dresult.result)
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            fetchHsns();
          }
        });
    
      };

      const EditHsn = () => {
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
            HSN 
          </Grid>
         

  <Grid item xs={12}>
              <TextField container="outlined" InputLabelProps={{style:{color:'#000'}}}  inputProps={{style:{color:'black'}}}label="HSN CODE"
              value={hsncode}
               onChange={(event)=>setHsncode(event.target.value)} 
               fullWidth/>
          </Grid>
          <Grid item xs={12}>
              <TextField container="outlined" InputLabelProps={{style:{color:'#000'}}}  inputProps={{style:{color:'black'}}}label="Igst"
              value={igst}
               onChange={(event)=>setIgst(event.target.value)} 
               fullWidth/>
          </Grid>
          <Grid item xs={12}>
              <TextField container="outlined" InputLabelProps={{style:{color:'#000'}}}  inputProps={{style:{color:'black'}}}label="Sgst"
              value={sgst}
               onChange={(event)=>setSgst(event.target.value)} 
               fullWidth/>
          </Grid>
          <Grid item xs={12}>
              <TextField container="outlined" InputLabelProps={{style:{color:'#000'}}}  inputProps={{style:{color:'black'}}}label="Cgst"
              value={cgst}
               onChange={(event)=>setCgst(event.target.value)} 
               fullWidth/>
          
          </Grid>  

          <Grid item xs={12}>
              <TextField container="outlined" InputLabelProps={{style:{color:'#000'}}}  inputProps={{style:{color:'black'}}}label="Description"
               value={description}
               onChange={(event)=>setDescription(event.target.value)} 
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
        <div>
        <div>
        <Header />
      </div>
      <div>
        <Sidenav />
      </div>
      <div className={classes.subdiv}>
        <Button class="btn btn-success" onClick={handleHsn}>
          Add HSN
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
        {EditHsn()}
</div>

        </div>
    )
}