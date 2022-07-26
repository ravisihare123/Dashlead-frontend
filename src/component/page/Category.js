import React,{useState} from 'react'
import useStyles from '../Styles/categoryStyle';
import { postData,postImageData } from '../../FetchNodeServices';
import Header from '../Header'
import Sidenav from '../Sidenav'
import Swal from 'sweetalert2';

import {Button,Grid,TextField,Avatar,Input} from '@mui/material'
import { useNavigate } from 'react-router-dom';









export default function Category(){
    const classes=useStyles();
    var navigate =useNavigate();
    const[categoryname,setCategoryName]=useState();
    const[description,setDescription]=useState();
    const[Image,setImage]=useState({bytes:'',filename:"/cloth.jpg"});
  




    const[refresh,setrefresh]=useState([])
    
    const handleImage=(event)=>{
  setImage({bytes:event.target.files[0],filename:URL.createObjectURL(event.target.files[0])})
    }
    
    
    const handleSubmit=async()=>{
      
      var result= await postImageData("category/insertcategory",{categoryname:categoryname,description:description,image:Image.bytes})
      if(result.result){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your category has been saved',
          showConfirmButton: false,
          timer: 3000,
          
        })
      }
      else{
        Swal.fire({
          position: 'center',
          icon: 'fail',
          title: 'fail to fill category',
          showConfirmButton: false,
          timer: 3000
        })
      }
setrefresh(!refresh)
}


    const handleDisplayList=()=>{
        navigate("/showcategory")
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
            Category 
          </Grid>
          <Grid item xs={6}>
<Button
 onClick={()=>handleDisplayList()} 
 className={classes.listButton} variant="contained"  fullWidth>
   List Category
  </Button>
  </Grid>

  <Grid item xs={12}>
              <TextField container="outlined" InputLabelProps={{style:{color:'#000'}}}  inputProps={{style:{color:'black'}}}label="Catagory"
              value={categoryname}
               onChange={(event)=>setCategoryName(event.target.value)} 
               fullWidth/>
          </Grid>


          <Grid item xs={12}>
              <TextField container="outlined" InputLabelProps={{style:{color:'#000'}}}  inputProps={{style:{color:'black'}}}label="Description"
               value={description}
               onChange={(event)=>setDescription(event.target.value)} 
               fullWidth/>
          </Grid>

          <Grid item xs={6} style={{justifyContent:'center',alignItems:'center'}}>
            
          <label htmlFor="contained-button-file">
  <Input
   onChange={(event)=>handleImage(event)}
   accept="image/*" id="contained-button-file" multiple type="file" />
  <Button className={classes.uploadBtn} variant="contained" component="span" fullWidth>
    Upload
  </Button>
</label>

</Grid>
<Grid item xs={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
<Avatar
  alt="Remy Sharp"
  src={Image.filename}
  variant='rounded'
  sx={{ width: 56, height: 56 }}
/>
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