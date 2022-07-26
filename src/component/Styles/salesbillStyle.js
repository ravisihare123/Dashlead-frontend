import { makeStyles } from "@mui/styles";

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
      
        background: "#8760fb",
        marginTop: 40,
        width: 600,
      },
    title:{
        fontWeight: "bold",
        fontSize:24,
    },
    addButton: {
        backgroundColor: "#FFF!important",
        color: "#8760fb !important",
        fontWeight: "bold",
        borderRadius: "20px !important",
      },
      editBtn: {
        background: "#686de0!important",
        color: "#FFF",
        fontWeight: "bold",
        width:80,
        height:30,
        borderRadius:10,
      },
      deleteBtn: {
        background: "#ff7979!important",
        color: "#FFF",
        fontWeight: "bold",
        width:80,
        height:30,
        borderRadius:10,
      },
});


export default useStyles;