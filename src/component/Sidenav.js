import React from 'react'
import { useNavigate } from 'react-router-dom'
import { reactLocalStorage } from 'reactjs-localstorage'



export default function Sidenav(){
var navigate=useNavigate()


const handleShowproduct= ()=>{
	navigate("/showproduct")
}

const handleShowCategory= ()=>{
	navigate("/showcategory")
}

const handleShowhsn= ()=>{
	navigate("/showhsn")
}


const handleSales= ()=>{
	navigate("/sales")
}
const handleShowcustomer= ()=>{
	navigate("/showcustomer")
}


const handleDashboard=()=>{
	navigate("/dashboard")
}


const handleLogout= ()=>{
	var token= reactLocalStorage.get("token")
var deleteToken =reactLocalStorage.clear();
if(deleteToken!=token){
	alert("successfully logout")
			navigate("/signin")
}else{
	alert("something wrong")
		}
	
	
	}



    return(
<div>
 {/* <!-- Sidemenu --> */}
 <div class="main-sidebar main-sidemenu main-sidebar-sticky side-menu">
			<div class="sidemenu-logo">
				<a class="main-logo" href="index.html">
					<img src="/assets/img/brand/logo.png" class="header-brand-img desktop-logo" alt="logo"/>
					<img src="/assets/img/brand/icon.png" class="header-brand-img icon-logo" alt="logo"/>
					<img src="/assets/img/brand/logo-light.png" class="header-brand-img desktop-logo theme-logo"
						alt="logo"/>
					<img src="/assets/img/brand/icon-light.png" class="header-brand-img icon-logo theme-logo"
						alt="logo"/>
				</a>
			</div>
			<div class="main-sidebar-body">
				<div class="slide-left disabled" id="slide-left"><svg xmlns="http://www.w3.org/2000/svg"
					fill="#7b8191" width="24" height="24" viewBox="0 0 24 24">
					<path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z" />
				</svg></div>
				<ul class="nav  hor-menu">
					<li class="nav-label">Dashboard</li>
					<li class="nav-item">
						<a class="nav-link" ><i class="fe fe-airplay"></i><span
								class="sidemenu-label" onClick={handleDashboard}>Dashboard</span></a>
					</li>
					<li class="nav-label">Applications</li>
					{/* <li class="nav-item">
						<a class="nav-link with-sub" href=""><i class="fe fe-box"></i><span
								class="sidemenu-label">Apps</span><i class="angle fe fe-chevron-right"></i></a>
						<ul class="nav-sub">
							<li class="side-menu-label1"><a href="javascript:void(0)">Apps</a></li>
							
							
						</ul>
					</li> */}
					{/* <li class="nav-item">
						<a class="nav-link" ><i class="fe fe-list"></i><span
								class="sidemenu-label" onClick={handleCategory} >Category</span></a>
					</li> */}
					<li class="nav-item">
						<a class="nav-link" ><i class="fe fe-list"></i><span
								class="sidemenu-label" onClick={handleShowCategory} >Category</span></a>
					</li>
					
					<li class="nav-item">
						<a class="nav-link" ><i class="fe fe-box"></i><span
								class="sidemenu-label" onClick={handleShowproduct} >Product</span></a>
					</li>

					<li class="nav-item">
						<a class="nav-link" ><i class="fe fe-align-justify"></i><span
								class="sidemenu-label" onClick={handleShowhsn} >HSN</span></a>
					</li>
					<li class="nav-item">
						<a class="nav-link" ><i class="fe fe-align-justify"></i><span
								class="sidemenu-label" onClick={handleShowcustomer} >Customer</span></a>
					</li>

					<li class="nav-label">SALES</li>


					<li class="nav-item">
						<a class="nav-link" ><i class="fe fe-align-justify"></i><span
								class="sidemenu-label" onClick={handleSales} >Sales</span></a>
					</li>

					<li class="nav-item">
						<a class="nav-link" ><i class="fe fe-log-out"></i><span
								class="sidemenu-label" onClick={handleLogout} >Logout</span></a>
					</li>
				</ul>
				<div class="slide-right" id="slide-right"><svg xmlns="http://www.w3.org/2000/svg" fill="#7b8191"
					width="24" height="24" viewBox="0 0 24 24">
					<path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z" />
				</svg></div>
			</div>
		</div>
		{/* <!-- End Sidemenu --> */}











</div>

)
}