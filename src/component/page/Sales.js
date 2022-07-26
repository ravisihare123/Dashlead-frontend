import React, { useState, useEffect } from "react";
import Header from "../Header";
import Sidenav from "../Sidenav";
import useStyles from "../Styles/salesStyle";
import {
  Grid,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Button,
} from "@mui/material";
import {
  ServerURL,
  postData,
  getData,
  postImageData,
} from "../../FetchNodeServices";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Select1 from "react-select";
import { reactLocalStorage } from "reactjs-localstorage";
import Productquantity from "./Productquantity";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Sales(props) {
  const classes = useStyles();
  var navigate =useNavigate();
  const [billno, setBillno] = useState();
  const [date, setDate] = useState();
  const [customerId, setCustomerId] = useState();
 // const [productid, setProductid] = useState(0);
  const [qty, setQty] = useState(0);
  const [list, setList] = useState([]);
  const [productlist, setProductlist] = useState([]);
  const [data, setData] = useState([]);
  const [productlistid, setProductlistid] = useState([]);
  const [newArray, setNewArray] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const[statename,setStatename]=useState()
  const[price,setPrice]=useState()
  const [productid, setProductid] = useState();
  const [productname, setProductname] = useState();
  const [hsncode, setHsncode] = useState();



  
  
  const [sgst, setSgst] = useState(0);
  const [cgst, setCgst] = useState(0);
  const [igst, setIgst] = useState(0);
  const [grandTotal,setgrandTotal] =useState(0)


  const handleCustomer = (event) => {
    setStatename(list[event.target.value].state);
    setCustomerId(list[event.target.value].customerid);
  };

  const fetchCustomer = async () => {
    const result = await getData("sale/displaycustomer");
    setList(result.result);
  };

  const fillCustomer = () => {
    return list.map((item,index) => {
      return (
        <MenuItem value={index}>
          {item.name} , {item.statename}
        </MenuItem>
      );
    });
  };

  const handleProduct = (event) => {
    var temp = data;
    temp.push({
      productid: event.value,
      productname: event.label,
      hsnid: event.hsnid,
      hsncode: event.hsncode,
      price: event.price,
      igst: event.igst,
      sgst: event.sgst,
      cgst: event.cgst,
      qty:event.qty,
      subtotal:event.subtotal,
    

    });
    
    setData([...temp]);
    setPrice(event.price);
    setProductid(event.value);
    setProductname(event.label);
    setHsncode(event.hsncode);
    

  };

  const fetchProduct = async () => {
    const result = await getData("sale/displayproduct");

    if (result.result) {
      setProductlist(result.result);
    }
    else {
      reactLocalStorage.remove("token");
      window.location.reload();
    }
     //alert(JSON.stringify(result.result));
  };

  const handledelete = (index) => {
    var temp = data;

    var test = temp.splice(index);
    // delete temp[index];

    console.log(test);
    setData([...test]);
    setRefresh(!refresh);
  };

  const Total = () => {
    let sum = 0,
      Tsgst = 0,
      Tcgst = 0,
      Tigst = 0;

    for (let i = 0; i < data.length; i++) {
      sum += data[i].subtotal;
      Tsgst += (sum * data[i].sgst) / 100;
      Tcgst += (sum * data[i].cgst) / 100;
      Tigst += (sum * data[i].igst) / 100;
    }
    setSubTotal(sum);
    setSgst(Tsgst);
    setCgst(Tcgst);
    setIgst(Tigst);

    statename==5?setgrandTotal(sum+Tcgst+Tsgst):setgrandTotal(sum+Tigst)
  };

  const Quantity = (index, item, e) => {
    setQty(e.target.value);

    var temp = data;
    temp[index].qty = e.target.value;
    temp[index].subtotal = temp[index].price * e.target.value;
    temp[index].customerid = customerId;
    // data[index].grandtotal=grandTotal
    setData([...temp]);
   
    // for(var s in data){
    //   subTotal=data[s].subTotal*(data[s].igst/100)
    // }
  };

  const handlePrice = (index, e) => {
    setPrice(e.target.value);

    var temp = data;
    temp[index].price = e.target.value;
    temp[index].subtotal =  e.target.value * temp[index].qty;
    temp[index].customerid = customerId;
    // data[index].grandtotal=grandTotal
    setData([...temp]);
   
    // for(var s in data){
    //   subTotal=data[s].subTotal*(data[s].igst/100)
    // }
  };

  const handleDisplaybill = () => {
    navigate("/salesbill");
  };

  const selectTable = () => {
    return data.map((item, index) => {
      return (
        <>
          <TableRow key={index}>
            <TableCell align="left">
              <i class="fe fe-trash-2" onClick={() => handledelete(index)}></i>
            </TableCell>
            <TableCell align="left">{item.productname}</TableCell>
            <TableCell align="right">{item.hsncode}</TableCell>
            <TableCell align="right">
              <input
                
                value={item.price}
                onChange={(e)=>handlePrice(index,e)}
                style={{ borderRadius: 10 }}
              ></input>
            </TableCell>
            <TableCell align="right">
              <input
                value={item.qty}
                onChange={(e) => Quantity(index, item, e)}
                //onChange={(value) => handleQtyChange(value, item)}
                style={{ borderRadius: 10 }}
              ></input>
            </TableCell>
            {/* {Quantity()} */}
            <TableCell align="right">
              {item.qty > 0 ? (
                <input
                  value={item.price * item.qty}
                  //+(data[index].sgst)/100
                  style={{ borderRadius: 10 }}
                  onChange={(e) => setSubTotal(e.target.value)}
                ></input>
              ) : (
                <>
                  <input
                    // value={item.price * item.qty}
                    style={{ borderRadius: 10 }}
                    onChange={(e) => setSubTotal(e.target.value)}
                  ></input>
                </>
              )}
              <button onClick={() => alert(JSON.stringify(data))}>Qty</button>
            </TableCell>
          </TableRow>
        </>
      );
    });
  };

  const handleproductid = async () => {
    var result = await getData("sale/displayproductbyid");

    if (result.result) {
      setProductlistid(result.result);
    } else {
      reactLocalStorage.remove("token");
      window.location.reload();
    }
  };

  const handleSubmit=async () => {
    
             
    var result = await postData("sale/insertsale",[{data:data},
      {
      billno: billno,
      date: date,
      customerid: customerId,
      igst: igst,
      sgst: sgst,
      cgst: cgst,
      subTotal: subTotal,
      grandtotal: grandTotal,
     }]);
    if (result.result) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your Sale has been saved",
        showConfirmButton: false,
        timer: 3000,
      });
     
    } else {
      Swal.fire({
        position: "center",
        icon: "fail",
        title: "fail to fill sale",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  }

  // productid:productid,
  //    productname:productname,
  //    hsncode:hsncode,
  //    price:price,
  //    qty:qty

  useEffect(function () {
    Total();
  }, [data]);

  useEffect(function () {
    fetchCustomer();
    fetchProduct();
    handleproductid();
  }, []);


  function Gst(){
    return(<>      {statename==5?<><TableRow>
        <TableCell colSpan={4}></TableCell>
        <TableCell align="right">SGST %</TableCell>
        <TableCell align="right">
          <input
            disabled
            value={sgst.toFixed(2)}
            style={{ borderRadius: 10 }}
          ></input>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={4}></TableCell>
        <TableCell align="right">CGST %</TableCell>
        <TableCell align="right">
          <input
            disabled
            value={cgst.toFixed(2)}
            style={{ borderRadius: 10 }}
          ></input>
        </TableCell>
      </TableRow></>:<>
      <TableRow>
        <TableCell colSpan={4}></TableCell>
        <TableCell align="right">IGST %</TableCell>
        <TableCell align="right">
          <input
            disabled
            value={igst.toFixed(2)}
            style={{ borderRadius: 10 }}
          ></input>
        </TableCell>
      </TableRow></>}
    </>)
  
    
  }

  function SpanningTable() {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell>ACTION</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell align="right">HSN CODE</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Qty</TableCell>
              <TableCell align="right">Sub Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* <TableRow>
              <TableCell align="left">{data.map((item)=>item.productname)}</TableCell>
              <TableCell align="right">
                {data.map((item) => item.hsnid)}
              </TableCell>
              <TableCell align="right">
                <input
                  disabled
                  value={data.map((item) => item.price)}
                  style={{ borderRadius: 10 }}
                ></input>
              </TableCell>
              <TableCell align="right">
                <input value={qty} onChange={(e)=>setQty(e.target.value)} style={{ borderRadius: 10 }}></input>
              </TableCell>
              <TableCell align="right">
                <input   value={data.map((item) => item.price) * qty} style={{ borderRadius: 10 }}></input>
              </TableCell>
            </TableRow> */}

            {selectTable()}

            <TableRow>
              <TableCell colSpan={4}></TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">
                <input
                  disabled
                  value={subTotal.toFixed(2)}
                  style={{ borderRadius: 10 }}
                ></input>
              </TableCell>
            </TableRow>
           
{Gst()}
            <TableRow>
              <TableCell colSpan={4}></TableCell>
              <TableCell align="right">Grand Total</TableCell>
              <TableCell align="right">
                <input value={grandTotal.toFixed(2)} disabled style={{ borderRadius: 10 }}></input>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
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
        <Grid container spacing={2}>
          <Grid item xs={6} className={classes.title}>
            Sales
          </Grid>
          <Grid item xs={6}>
            <Button
              onClick={() => handleDisplaybill()}
              className={classes.listButton}
              variant="contained"
              fullWidth
            >
              List Bill
            </Button>
          </Grid>

          <Grid item xs={6}>
            <TextField
              container="outlined"
              value={billno}
              InputLabelProps={{ style: { color: "#000" } }}
              inputProps={{ style: { background: "#FFF", color: "black" } }}
              label="Enter Bill No."
              onChange={(event) => setBillno(event.target.value)}
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              container="outlined"
              value={date}
              InputLabelProps={{ style: { color: "#000" } }}
              inputProps={{ style: { background: "#FFF", color: "black" } }}
              label=" "
              type="date"
              onChange={(event) => setDate(event.target.value)}
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel
                id="demo-simple-select-label"
                style={{ color: "#000" }}
              >
                Customer Name , state
              </InputLabel>
              <Select
                style={{ background: "#FFF" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={customerId}
                label="Customer Name"
                onChange={(event)=>handleCustomer(event)}
              >
                {fillCustomer()}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <Select1
              onChange={(event) => handleProduct(event)}
              //onChange= {(event) =>setData([...data, productlistid[event.target.value]])}
              //  value={data}
              options={productlist}
            />
          </Grid>
          <Grid item xs={6}></Grid>
        </Grid>
        <Grid>{SpanningTable()}</Grid>

        <Grid item xs={6}>
          <Button className="my-3" variant="contained" color="success"onClick={()=>handleSubmit()} fullWidth>Insert Data</Button>
        </Grid>
      </div>
    </div>
  );
}

/*////////////////mui select ////////////////////////////////////////////////////////////////////////*/

// const fillProduct = () => {
//   return productlistid.map((item, index) => {
//     return <MenuItem value={index}>{item.productname}</MenuItem>;
//   });
//   //index +
// };

// const handleQtyChange = (value, item) => {
//   item["qty"] = value;
//   if (value > 0) {
//     setQty(value);
//     alert(JSON.stringify(newArray));
//   } else {
//   }

//   setRefresh(!refresh);
// };

// const fillTable = () => {
//   return newArray.map((item, index) => {
//     return (
//       <>
//         <TableRow>
//         <TableCell align="left" ><i class="fe fe-delete"></i>

//           </TableCell>
//           <TableCell align="left">{item.productname}</TableCell>
//           <TableCell align="right">{item.hsncode}</TableCell>
//           <TableCell align="right">
//             <input
//               disabled
//               value={item.price}
//               style={{ borderRadius: 10 }}
//             ></input>
//           </TableCell>
//           <TableCell align="right">
//             {/* <input type="number" value={qty}  onChange={(e)=>setQty(e.target.value)}   style={{borderRadius:10}}></input> */}
//             <Productquantity
//               value={0}
//               onChange={(value) => handleQtyChange(value, item)}
//             />
//           </TableCell>
//           <TableCell align="right">
//             <input
//               value={item.price * item.qty}
//               style={{ borderRadius: 10 }}
//             ></input>
//           </TableCell>
//         </TableRow>
//       </>
//     );
//   });
// };

/* {fillTable()} */

/* <button onClick={()=>   alert(JSON.stringify(data))}></button> */

/* <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel
                id="demo-simple-select-label"
                style={{ color: "#000" }}
              >
                Product Name
              </InputLabel>

              <Select
                style={{ background: "#FFF" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                //value={index}
                label="Customer Name"
                onChange={(event) =>
                  setNewArray([...newArray, productlistid[event.target.value]])
                }
              >
                {fillProduct()}
              </Select>
            </FormControl>
          </Grid> */

/*////////////////mui select ENds Here ////////////////////////////////////////////////////////////////////////*/
