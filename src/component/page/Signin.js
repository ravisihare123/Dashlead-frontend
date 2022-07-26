import React, { useState } from "react";
import { postData } from "../../FetchNodeServices";
import { useNavigate } from "react-router-dom";
import { reactLocalStorage } from 'reactjs-localstorage'


export default function Signin() {
  const [email, setEmail] = useState("vermavikas949@gmail.com");
  const [password, setPassword] = useState("1234");
  var navigate = useNavigate();

  const handleSignin = async () => {
    if (email != "" && password != "") {
      var result = await postData("signin/fillsignin", { email: email,password: password,});

      if (result) {
        reactLocalStorage.set('token', result.token);
        //alert(result.data[0].email);
        var frontToken = reactLocalStorage.get('token');
        //alert(JSON.stringify(frontToken))
        if(frontToken){
        navigate('/home')
        
        }else{
          alert ("some thing error")
        }
        
      } else {
        alert("unsuccessful");
      }
    } else {
      alert("please Enter Your Email and Password");
    }
  };

  const handleNewaccount = () => {
    navigate("/signup");
  };

  return (
    <div>
      <div class="row text-center ps-0 pe-0 ms-0 me-0">
        <div class=" col-xl-3 col-lg-5 col-md-5 d-block mx-auto">
          <div class="text-center mb-2">
            <a href="index.html">
              <img
                src="../assets/img/brand/logo.png"
                class="header-brand-img"
                alt="logo"
              />
              <img
                src="../assets/img/brand/logo-light.png"
                class="header-brand-img theme-logos"
                alt="logo"
              />
            </a>
          </div>
          <div class="card custom-card">
            <div class="card-body pd-45">
              <h4 class="text-center">Signin to Your Account</h4>
              <form>
                <div class="form-group text-start">
                  <label>Email</label>
                  <input
                    class="form-control"
                    placeholder="Enter your email"
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div class="form-group text-start">
                  <label>Password</label>
                  <input
                    class="form-control"
                    placeholder="Enter your password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <a
                  class="btn ripple btn-main-primary btn-block"
                  type="button"
                  onClick={() => handleSignin()}
                >
                  Sign In
                </a>
              </form>
              <div class="mt-3 text-center">
                <p class="mb-1">
                  <a href="">Forgot password?</a>
                </p>
                <p class="mb-0">
                  Don't have an account?{" "}
                  <a onClick={() => handleNewaccount()}>Create an Account</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
