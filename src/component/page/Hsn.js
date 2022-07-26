import React,{useState} from 'react'
import useStyles from '../Styles/categoryStyle';
import { postData,postImageData } from '../../FetchNodeServices';
import Header from '../Header'
import Sidenav from '../Sidenav'
import Swal from 'sweetalert2';

import {Button,Grid,TextField,Avatar,Input} from '@mui/material'
import { useNavigate } from 'react-router-dom';








export default function Hsn(){
    const classes=useStyles();
    var navigate =useNavigate();
    const[hsncode,setHsncode]=useState();
    const[igst,setIgst]=useState()
    const[sgst,setSgst]=useState()

    const[cgst,setCgst]=useState()

    const[description,setDescription]=useState();

  




    const[refresh,setrefresh]=useState([])
    
    
    
    
    const handleSubmit=async()=>{
      
      var result= await postData("hsn/inserthsn",{hsncode:hsncode,igst:igst,sgst:sgst,cgst:cgst,description:description})
      if(result.result){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your HSN has been saved',
          showConfirmButton: false,
          timer: 3000,
          
        })
      }
      else{
        Swal.fire({
          position: 'center',
          icon: 'fail',
          title: 'fail to fill HSN',
          showConfirmButton: false,
          timer: 3000
        })
      }
setrefresh(!refresh)
}


    const handleDisplayList=()=>{
        navigate("/showhsn")
    }

return(
    <div>
     <div>
           <Header/>
           </div>
           <div>
           <Sidenav/>
           </div>
           <div className={classes.subdiv}>
           <Grid container spacing={2}>
          <Grid item xs={6} style={{fontSize:20,fontWeight:"bold",color:'#000'}}>
            HSN 
          </Grid>
          <Grid item xs={6}>
<Button
 onClick={()=>handleDisplayList()} 
 className={classes.listButton} variant="contained"  fullWidth>
   List Hsn
  </Button>
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

         
<Grid item xs={6}>
<Button
  onClick={()=>handleSubmit()}
  className={classes.submitBtn}variant="contained" component="span" fullWidth>
    Submit
  </Button>
</Grid>
<Grid item xs={6}>
<Button 
// onClick={()=>handleReset()}
className={classes.restBtn} variant="contained" component="span" fullWidth>
    Reset
  </Button>
</Grid>







</Grid>

       
</div>
    </div>
)

}

