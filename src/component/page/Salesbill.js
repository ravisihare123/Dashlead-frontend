import React, { useEffect, useState } from "react";
import Header from "../Header";
import Sidenav from "../Sidenav";
import useStyles from "../Styles/salesbillStyle";
import { useNavigate } from "react-router-dom";
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
import DataTable from "react-data-table-component";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Select1 from "react-select";
import Swal from "sweetalert2";
import { reactLocalStorage } from "reactjs-localstorage";
import moment from "moment";
import Chart from 'react-google-charts'

export default function Salesbill() {
  const [list, setList] = useState([]);
  const classes = useStyles();
  var navigate = useNavigate();
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [billno, setBillno] = useState();
  const [date, setDate] = useState();
  const [customerId, setCustomerId] = useState();
  const [qty, setQty] = useState(0);
  const [productlist, setProductlist] = useState([]);
  const [data, setData] = useState([]);
  const [productlistid, setProductlistid] = useState([]);
  const [newArray, setNewArray] = useState([]);
  const [Customerlist, setCustomerList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const [statename, setStatename] = useState();
  const [price, setPrice] = useState();
  const [productid, setProductid] = useState();
  const [productname, setProductname] = useState();
  const [hsncode, setHsncode] = useState();
  const [sgst, setSgst] = useState(0);
  const [cgst, setCgst] = useState(0);
  const [igst, setIgst] = useState(0);
  const [grandTotal, setgrandTotal] = useState(0);
  const [salesid, setSalesId] = useState();
  const[chart,setChart]=useState([])


  const columns = [
    {
      name: "Edit",
      cell: (row) => (
        <button className={classes.editBtn} onClick={()=>handleOpen(row)}>
          Edit
        </button>
      ),
    },
    {
      name: "Delete",
      cell: (row) => (
        <button className={classes.deleteBtn} onClick={()=>handleDelete1(row)}>
          Delete
        </button>
      ),
    },
    {
      name: "Bill No",
      selector: (row) => row.billno,
    },
    {
      name: "Customer Name",
      selector: (row) => row.name,
    },
    {
      name: "Date",
      selector: (row) => row.date.slice(0, 10),
    },

    {
      name: "Grand Total",
      selector: (row) => row.grandtotal,
    },
  ];

  const handleSales = () => {
    navigate("/sales");
  };

  const fetchBill = async (page) => {
    var result = await getData(
      `sale/displaybill?page=${page}&per_page=${perPage}&delay=1`
    );
    setList(result.result);
    setTotalRows(result.total);
  };

  useEffect(function () {
    fetchBill(1);
  }, []);

  const handlePageChange = (perPage) => {
    fetchBill(perPage);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    var result = await getData(
      `sale/displaybill?page=${page}&per_page=${perPage}&delay=1`
    );

    setList(result.result);
    setPerPage(newPerPage);
  };

  const handleCustomer = (event) => {
    setStatename(Customerlist[event.target.value].state);
    setCustomerId(Customerlist[event.target.value].customerid);
  };

  const fetchCustomer = async () => {
    const result = await getData("sale/displaycustomer");
    setCustomerList(result.result);
  };

  const fillCustomer = () => {
    return Customerlist.map((item, index) => {
      return (
        <MenuItem value={item.customerid}>
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
      qty: event.qty,
      subtotal: event.subtotal,
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
    } else {
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

    statename == 5
      ? setgrandTotal(sum + Tcgst + Tsgst)
      : setgrandTotal(sum + Tigst);
  };

  const Quantity = (index, item, e) => {
    setQty(e.target.value);

    var temp = data;
    temp[index].qty = e.target.value;
    temp[index].subtotal = temp[index].price * e.target.value;
    temp[index].customerid = customerId;
    // data[index].grandtotal=grandTotal
    setData([...temp]);

  
  };

  const handlePrice = (index, e) => {
    setPrice(e.target.value);

    var temp = data;
    temp[index].price = e.target.value;
    temp[index].subtotal = e.target.value * temp[index].qty;
    temp[index].customerid = customerId;
    // data[index].grandtotal=grandTotal
    setData([...temp]);

    // for(var s in data){
    //   subTotal=data[s].subTotal*(data[s].igst/100)
    // }
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
                onChange={(e) => handlePrice(index, e)}
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

  const handleSubmit = async () => {
    var result = await postData("sale/editsale", [
      { data: data },
      {
        salesid:salesid,
        billno: billno,
        date: date,
        customerid: customerId,
        igst: igst,
        sgst: sgst,
        cgst: cgst,
        subTotal: subTotal,
        grandtotal: grandTotal,
      },
    ]);
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
  };

  useEffect(
    function () {
      Total();
    },
    [data]
  );

  useEffect(function () {
    fetchCustomer();
    fetchProduct();
    handleproductid();
  }, []);


  const handleOpen = (row) => {
    setOpen(true);
setSalesId(row.salesid)
    setBillno(row.billno);
    setDate(row.date.slice(0, 10));
    setStatename(row.state);
    setCustomerId(row.customerid);
    setSubTotal(row.subtotal);
    setSgst(row.totalsgst);
    setCgst(row.totalcgst);
    setIgst(row.totaligst);
    setgrandTotal(row.grandtotal);
    alert(JSON.stringify(row.grandtotal));
    fetchSalesitem(row.salesid);
  };

  const handleClose = () => {
    setOpen(false);
    fetchBill();
  };

  const handleDelete1 = async (row) => {
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
        var dresult = await postData("sale/deletesale", {
          salesid: row.salesid,
        });
        if (dresult.result)
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        fetchBill();
      }
    });
  };

  const fetchSalesitem = async (salesid) => {
    var result = await postData("sale/displaysalesitem", { salesid: salesid });

    if (result.result) {
      setData(result.result);
      setStatename(result.result[0].state);
    setCustomerId(result.result[0].customerid);
      setSubTotal(result.result[0].subtotal);
      setSgst(result.result[0].totalsgst);
      setCgst(result.result[0].totalcgst);
      setIgst(result.result[0].totaligst);
      setgrandTotal(result.result[0].grandtotal);
      
      alert(JSON.stringify(result.result));
    }
  };

  function Gst() {
    return (
      <>
        {" "}
        {statename == 5 ? (
          <>
            <TableRow>
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
            </TableRow>
          </>
        ) : (
          <>
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
            </TableRow>
          </>
        )}
      </>
    );
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
                <input
                  value={grandTotal.toFixed(2)}
                  disabled
                  style={{ borderRadius: 10 }}
                ></input>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  

  const EditSale = () => {
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="1200px"
        >
          <DialogContent>
            <div style={{ width: "700px" }}>
              <Grid container spacing={2}>
                <Grid item xs={12} className={classes.title}>
                  Sales
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    container="outlined"
                    value={billno}
                    InputLabelProps={{ style: { color: "#000" } }}
                    inputProps={{
                      style: { background: "#FFF", color: "black" },
                    }}
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
                    inputProps={{
                      style: { background: "#FFF", color: "black" },
                    }}
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
                      onChange={(event) => handleCustomer(event)}
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

              {/* <Grid item xs={6}>
          <Button className="my-3" variant="contained" color="success"onClick={()=>handleSubmit()} fullWidth>Insert Data</Button>
        </Grid> */}

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

  useEffect(function () {
   LineData();
  }, []);


  // {/* ///////////////////////////////line charts/////////////////////////////////////////////  */}
  const LineData = async () => {
  var result  = await getData("sale/displaychart")

  if (result.result) {
 
		setData(result.result)

     
    } else {
      reactLocalStorage.remove("token");
      window.location.reload();
    }

  
  
  }
  
  
  // [
	// 	['x', 'Mens'],
	// 	[0, 0],
	// 	[1, 1],
	// 	[2, 23],
	// 	[3, 1],
	// 	[4, 18],
	// 	[5, 9],
	// 	[6, 1],
	// 	[7, 27],
  //   [8, 18],
  //   [9, 27],
  //   [10, 20],
  //   [11, 27],
  //   [12, 33],
	//   ]
	  const LineChartOptions = {
		hAxis: {
		  title: 'Months',
		},
		vAxis: {
		  title: 'Sales In Months',
		},
		series: {
		  4: { curveType: 'function' },
		},
	  }
	  const MultiLineChart =()=> {
		
		  return (
			<div className="container mt-7">
			  <h2>Sales</h2>
			  <Chart
				width={'900px'}
				height={'500px'}
				chartType="LineChart"
				loader={<div>Loading Chart</div>}
				data={data}
				options={LineChartOptions}
				rootProps={{ 'data-testid': '2' }}
			  />
			</div>
		  )
		
	  }

  // {/* ///////////////////////////////line charts/////////////////////////////////////////////  */}




  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <Sidenav />
      </div>
      <div className={classes.subdiv}>
        <Button class="btn btn-success" onClick={handleSales}>
          Add Sales
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
      {EditSale()}
      <div style={{marginLeft:"300px"}}>
	{MultiLineChart()}
</div>
    </div>
  );
}
