import { reactLocalStorage } from "reactjs-localstorage";

var axios = require("axios");
var ServerURL = "http://localhost:5000";


// const postData=async(url,formData)=>{

//     try{
//         var response= await fetch(`http://localhost:5000/${url}`,
//         {method:'POST',
//       mode:'cors',
//         headers:{"content-type":"application/json;charset=utf-8"},
//             body:formData,
//         })
//         const result= await response.json()
//         console.log(result)
//         return result
//     }
//     catch(e){
//         return null
//     }
//    }

const getData = async (url) => {
  try {
   var token = reactLocalStorage.get('token')
    var response = await fetch(`${ServerURL}/${url}`,{headers:{"authorization":"bearer "+token}}); 
    var result = await response.json();
    return result;
  } catch (e) {
reactLocalStorage.remove('token')
window.location.reload()

    return null;
  }
};

const postData = async (url, body) => {
  try {
    var response = await axios({
      method: "POST",
      url: `${ServerURL}/${url}`,
      headers: { "content-type": "application/json" },
      data: body,
    });
    var result = await response.data;
    return result;
  } catch (e) {
    return null;
  }
};

const postImageData = async (url, formData) => {
  try {
    var response = await axios.post(`${ServerURL}/${url}`, formData, {
      headers: { "content-type": "multipart/form-data" },
    });
    var result = await response.data;
    return result;
  } catch (e) {
    return null;
  }
};

export { postData, getData, ServerURL, postImageData };
