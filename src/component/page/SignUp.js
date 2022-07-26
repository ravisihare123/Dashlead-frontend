import React, { useState } from 'react'
import { postData } from '../../FetchNodeServices'
import { useNavigate } from 'react-router-dom'





export default function SignUp(){

	const[name,setName]=useState('')
	const[email,setEmail]=useState('')
	const[password,setPassword]=useState('')
	var navigate=useNavigate()


	const handleSubmit=async()=>{
		//e.preventDefault()
		
		var result = await postData("signup/register",{name:name,email:email,password:password 
		})
		
		if(result.result){
			navigate('/signin')
			
			alert("successful")

		}else{
			alert("unsuccessful")
		}

		// alert(name+ email + password);
	}
	
const handleOldaccount=()=>{
     navigate('/signin')
}






    return(
        <div>
            <div class="row text-center ps-0 pe-0 ms-0 me-0">
				<div class=" col-xl-3 col-lg-5 col-md-5 d-block mx-auto">
					<div class="text-center mb-2">
						<a  href="index.html">
                            <img src="../assets/img/brand/logo.png" class="header-brand-img" alt="logo"/>
                            <img src="../assets/img/brand/logo-light.png" class="header-brand-img theme-logos" alt="logo"/>
                        </a>
					</div>
					<div class="card custom-card pd-45">
						<div class="card-body">
							<h4 class="text-center">Signup to Your Account</h4>
							
							<form >
								<div class="form-group text-start">
									<label>Name</label>
									<input class="form-control" placeholder="Enter your Name" type="text" onChange={(e)=>setName(e.target.value)}/>
								</div>
								<div class="form-group text-start">
									<label>Email</label>
									<input class="form-control" placeholder="Enter your email" type="text"
									onChange={(e)=>setEmail(e.target.value)}/>
								</div>
								<div class="form-group text-start">
									<label>Password</label>
									<input class="form-control" placeholder="Enter your password" type="password"
									onChange={(e)=>setPassword(e.target.value)}/>
								</div>
								<button type='button' class="btn ripple btn-main-primary btn-block" onClick={() => handleSubmit()} >Create Account</button>
								{/* <button onClick={()=>alert(name+"  "+email+"   "+password)}>click me</button> */}
							</form>
							<div class="mt-3 text-center">
								<p class="mb-0">Already have an account? <a onClick={()=>handleOldaccount()}>Sign In</a></p>
							</div>
						</div>
					</div>
				</div>
			</div>
            




        </div>
    )
}