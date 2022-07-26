import React,{useEffect, useState} from 'react'
import useStyles from '../Styles/categoryStyle';
import { getData,postImageData } from '../../FetchNodeServices';
import Header from '../Header'
import Sidenav from '../Sidenav'
import Swal from 'sweetalert2';

import {Button,Grid,TextField,Avatar,Input,MenuItem,FormControl,InputLabel,Select} from '@mui/material'
import { useNavigate } from 'react-router-dom';








export default function Product(){
    const classes=useStyles();
    var navigate =useNavigate();
    const[categoryid,setCategoryid]=useState();
const[list,setList]=useState([])
    const[productname,setProductname]=useState();
    const[description,setDescription]=useState();
    const[price,setPrice]=useState();
    const[Image,setImage]=useState({bytes:'',filename:"/cloth.jpg"});
    const[refresh,setrefresh]=useState([])
    const[hsnid,setHsnid]=useState();
    const[hsnlist,setHsnlist]=useState([])
    
    
    const handleImage=(event)=>{
setImage({bytes:event.target.files[0],filename:URL.createObjectURL(event.target.files[0])})
    }

const handleSubmit=async()=>{

    var result= await postImageData("product/insertproduct",{categoryid:categoryid,productname:productname,description:description,price:price,image:Image.bytes})
    if(result.result){
         Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your Product has been saved',
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

const handleCategory=(event)=>{
  setCategoryid(event.target.value)
}

const fetchCategory=async ()=>{
  const result= await getData('category/displaycategory')
  setList(result.result)

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
fetchHsn()
},[])

const fillCategory=()=>{
  return list.map((item)=>{
    return(
      <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
    )
  })
}

    const handleDisplayList=()=>{
        navigate("/showproduct")
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
            Product
          </Grid>
          <Grid item xs={6}>
<Button
 onClick={()=>handleDisplayList()} 
 className={classes.listButton} variant="contained"  fullWidth>
   List Product
  </Button>
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
              <TextField container="outlined" InputLabelProps={{style:{color:'#000'}}}  inputProps={{style:{color:'black'}}}label="Product Name"
              value={productname}
               onChange={(event)=>setProductname(event.target.value)} 
               fullWidth/>
          </Grid>


          <Grid item xs={12}>
              <TextField container="outlined" InputLabelProps={{style:{color:'#000'}}}  inputProps={{style:{color:'black'}}}label="Description"
               value={description}
               onChange={(event)=>setDescription(event.target.value)} 
               fullWidth/>
          </Grid>


          
          <Grid item xs={12}>
              <TextField container="outlined" InputLabelProps={{style:{color:'#000'}}}  inputProps={{style:{color:'black'}}}label="Price"
               value={price}
               onChange={(event)=>setPrice(event.target.value)} 
               fullWidth/>
          </Grid>

          <Grid item xs={6} style={{justifyContent:'center',alignItems:'center'}}>
            
          <label htmlFor="contained-button-file">
  <Input
   onChange={(event)=>handleImage(event)}
   accept="image/*" id="contained-button-file" multiple={true} type="file" />
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
  sx={{ width: 50, height: 50 }}
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