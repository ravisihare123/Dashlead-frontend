import React,{useState} from 'react'
import { Avatar,Button } from '@material-ui/core'; 





export default function Productquantity(props){
    const [qty,setQty]=useState(props.value)
   const handlePlus=()=>{
   var v=qty+1
   if(v<10)
   setQty(v)
   props.onChange(v)

   }

   const handleMinus=()=>{
    var v=qty-1
    if(v>=0)
    setQty(v)
    props.onChange(v)
 
    }
 







    return(
        <>
         {qty==0?<div style={{display:'flex',alignItems:'center',padding:2,margin:2}}><Button onClick={()=>handlePlus()} style={{width:150,background:'#8760fb',color:'#FFF'}} variant="contained">Add Quantity</Button></div>:
         <div style={{display:'flex',alignItems:'center',padding:2,margin:2}}>
             <Avatar onClick={()=>handleMinus()} style={{ background:'#8760fb',color:'#FFF',marginRight:15}} variant="square">
            -
              </Avatar>
             <span style={{ background:'#FFF',color:'#000',marginRight:15}}>
                 {qty}
             </span> 
             <Avatar onClick={()=>handlePlus()} style={{ background:'#8760fb',color:'#FFF',marginLeft:15}} variant="square">
             +
              </Avatar>
             

         </div>}

        </>
    )
}