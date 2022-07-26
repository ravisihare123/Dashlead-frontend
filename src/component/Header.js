import React from 'react'
import { useNavigate } from 'react-router-dom'




export default function Header(){
	var navigate=useNavigate()



const handleSignup=()=>{
	navigate("/signup")
}




return(
    <div>

<div class="main-header side-header sticky">
			<div class="container-fluid main-container">
				<div class="main-header-left sidemenu">
					<a class="main-header-menu-icon" href="" id="mainSidebarToggle"><span></span></a>
				</div>
				<a class="main-header-menu-icon  horizontal  d-lg-none" href="" id="mainNavShow"><span></span></a>
				<div class="main-header-left horizontal">
					<a class="main-logo" href="index.html">
						<img src="/assets/img/brand/logo.png" class="header-brand-img desktop-logo" alt="logo"/>
						<img src="/assets/img/brand/logo-light.png" class="header-brand-img desktop-logo theme-logo" alt="logo"/>
					</a>
				</div>
				<div class="main-header-right">
					<button class="navbar-toggler navresponsive-toggler d-lg-none ms-auto collapsed" type="button"
						data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent-4"
						aria-controls="navbarSupportedContent-4" aria-expanded="false"
						aria-label="Toggle navigation"> <span
							class="navbar-toggler-icon fe fe-more-vertical "></span>
					</button>
					<div class="navbar navbar-expand-lg navbar-collapse responsive-navbar p-0">
						<div class="collapse navbar-collapse" id="navbarSupportedContent-4">
							<ul class="nav nav-item header-icons navbar-nav-right ms-auto">
								{/* <!-- Theme-Layout --> */}
								<div class="dropdown  d-flex">
									<a class="nav-link icon theme-layout nav-link-bg layout-setting">
										<span class="dark-layout"><i class="fe fe-moon"></i></span>
										<span class="light-layout"><i class="fe fe-sun"></i></span>
									</a>
								</div>
								{/* <!-- Theme-Layout --> */}
								<li class="dropdown header-search">
									<a class="nav-link icon header-search">
										<i class="fe fe-search"></i>
									</a>
									<div class="dropdown-menu">
										<div class="main-form-search p-2">
											<input class="form-control" placeholder="Search" type="search"/>
											<button class="btn"><i class="fe fe-search"></i></button>
										</div>
									</div>
								</li>
								<li class="dropdown">
									<a class="nav-link icon full-screen-link">
										<i class="fe fe-maximize fullscreen-button"></i>
									</a>
								</li>
								<li class="dropdown main-header-notification">
									<a class="nav-link icon" href="">
										<i class="fe fe-bell"></i>
										<span class="pulse bg-danger"></span>
									</a>
									<div class="dropdown-menu">
										<div class="header-navheading">
											<p class="main-notification-text">You have 1 unread notification<span
													class="badge bg-pill badge-primary ms-3">View all</span></p>
										</div>
										<div class="main-notification-list">
											<a href="view-mail.html" class="media new">
												<div class="main-img-user online"><img alt="avatar"
														src="/assets/img/users/5.jpg"/></div>
												<div class="media-body">
													<p>Congratulate <strong>Olivia James</strong> for New template
														start</p>
													<span>Oct 15 12:32pm</span>
												</div>
											</a>
											<a href="view-mail.html" class="media">
												<div class="main-img-user"><img alt="avatar"
														src="/assets/img/users/2.jpg"/>
												</div>
												<div class="media-body">
													<p><strong>Joshua Gray</strong> New Message Received</p>
													<span>Oct 13
														02:56am</span>
												</div>
											</a>
											<a href="view-mail.html" class="media">
												<div class="main-img-user online"><img alt="avatar"
														src="/assets/img/users/3.jpg"/></div>
												<div class="media-body">
													<p><strong>Elizabeth Lewis</strong> added new schedule realease
													</p><span>Oct
														12 10:40pm</span>
												</div>
											</a>
										</div>
										<div class="dropdown-footer">
											<a href="mail-inbox.html">View All Notifications</a>
										</div>
									</div>
								</li>
								<li class="dropdown main-profile-menu">
									<a class="main-img-user"><img alt="avatar"
											src="/assets/img/users/1.jpg" onClick={()=>handleSignup()} /></a>
									
								</li>
								<li class="dropdown header-settings">
									<a href="" class="nav-link icon" data-bs-toggle="sidebar-right"
										data-bs-target=".sidebar-right">
										<i class="fe fe-align-right"></i>
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		{/* <!-- End Main Header--> */}



    </div>
)



}
