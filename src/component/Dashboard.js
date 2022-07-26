import React,{useEffect, useState} from 'react'
import Header from './Header';
import Sidenav from './Sidenav';
import Chart from 'react-google-charts'
import{getData} from '../FetchNodeServices'




export default function Dashboard(){
	const [data, setData] = useState();



	


	const LineData =async()=>{
		var result  = await getData("sale/displaychart")

		if (result.result) {
		// 	var temp = data;
		// 	// temp.push({
		// 	//   mon:event.mon,
		// 	//   total:event.total
		// 	// });
		

		// 	for(var i=0;i<result.result.length;i++){
		// 	temp.push([result.result[i].mon,result.result[i].total]);
		// 	}

		// 	setData(temp)
		// alert(result.result)

		setData(result.result)

		  } else {
			localStorage.clear("token");
			window.location.reload();
		  }
	  
		

}

useEffect(function () {
	LineData();
   }, []);
	  const LineChartOptions = {
		hAxis: {
		  title: 'Months',
		},
		vAxis: {
		  title: 'Popularity',
		},
		series: {
		  1: { curveType: 'function' },
		},
	  }
	  const MultiLineChart =()=> {
		
		  return (
			<div className="container mt-5">
			  <h2>Sales</h2>
			  {/* {data} */}
			  <Chart
				width={'700px'}
				height={'410px'}
				chartType="LineChart"
				loader={<div>Loading Chart</div>}
				data={data}
				options={LineChartOptions}
				rootProps={{ 'data-testid': '2' }}
			  />
			</div>
		  )
		
	  }





    return(
        <div>
       <div>
           <Header/>
           </div>
           <div>
           <Sidenav/>
           </div>

        
        {/* <!-- Main Content--> */}<div>
		<div class="main-content side-content pt-0">
			<div class="side-app">

				<div class="main-container container-fluid">

					{/* <!-- Page Header --> */}
					<div class="page-header">
						<div>
							<h2 class="main-content-title tx-24 mg-b-5">Welcome To Dashboard</h2>
							<ol class="breadcrumb">
								<li class="breadcrumb-item"><a href="#">Home</a></li>
								<li class="breadcrumb-item active" aria-current="page">Sales Dashboard</li>
							</ol>
						</div>
						<div class="d-flex">
							<div class="me-2">
								<a class="btn ripple btn-outline-primary dropdown-toggle mb-0" href="#"
									data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
									<i class="fe fe-external-link"></i> Export <i class="fa fa-caret-down ms-1"></i>
								</a>
								<div class="dropdown-menu tx-13">
									<a class="dropdown-item" href="#"><i class="fa fa-file-pdf me-2"></i>Export as Pdf</a>
									<a class="dropdown-item" href="#"><i class="fa fa-image me-2"></i>Export as Image</a>
									<a class="dropdown-item" href="#"><i class="fa fa-file-excel me-2"></i>Export as
										Excel</a>
								</div>
							</div>
							<div class="">
								<a href="#" class="btn ripple btn-secondary navresponsive-toggler mb-0"
									data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
									aria-controls="navbarSupportedContent" aria-expanded="false"
									aria-label="Toggle navigation">
									<i class="fe fe-filter me-1"></i> Filter <i class="fa fa-caret-down ms-1"></i>
								</a>
							</div>
						</div>
					</div>
					{/* <!-- End Page Header --> */}

                    {/* <!--Navbar--> */}
					<div class="responsive-background">
						<div class="collapse navbar-collapse" id="navbarSupportedContent">
							<div class="advanced-search br-3">
								<div class="row align-items-center">
									<div class="col-md-12 col-xl-4">
										<div class="row">
											<div class="col-md-6">
												<div class="form-group mb-lg-0">
													<label class="">From :</label>
													<div class="input-group">
														<div class="input-group-text">
															<i class="fe fe-calendar lh--9 op-6"></i>
														</div><input class="form-control fc-datepicker"
															placeholder="11/01/2019" type="text"/>
													</div>
												</div>
											</div>
											<div class="col-md-6">
												<div class="form-group mb-lg-0">
													<label class="">To :</label>
													<div class="input-group">
														<div class="input-group-text">
															<i class="fe fe-calendar lh--9 op-6"></i>
														</div><input class="form-control fc-datepicker"
															placeholder="11/08/2019" type="text"/>
													</div>
												</div>
											</div>
										</div>
									</div>
        </div>
        </div>
        </div>
        </div>

        {/* <!-- Row --> */}
					<div class="row row-sm">
						<div class="col-sm-6 col-xl-3 col-lg-6">
							<div class="card custom-card">
								<div class="card-body dash1">
									<div class="d-flex">
										<p class="mb-1 tx-inverse">Number Of Sales</p>
										<div class="ms-auto">
											<i class="fa fa-line-chart fs-20 text-primary"></i>
										</div>
									</div>
									<div>
										<h3 class="dash-25">568</h3>
									</div>
									<div class="progress mb-1">
										<div aria-valuemax="100" aria-valuemin="0" aria-valuenow="70"
											class="progress-bar progress-bar-xs wd-70p" role="progressbar"></div>
									</div>
									<div class="expansion-label d-flex">
										<span class="text-muted">Last Month</span>
										<span class="ms-auto"><i class="fa fa-caret-up me-1 text-success"></i>0.7%</span>
									</div>
								</div>
							</div>
						</div>
						<div class="col-sm-6 col-xl-3 col-lg-6">
							<div class="card custom-card">
								<div class="card-body dash1">
									<div class="d-flex">
										<p class="mb-1 tx-inverse">New Revenue</p>
										<div class="ms-auto">
											<i class="fa fa-money fs-20 text-secondary"></i>
										</div>
									</div>
									<div>
										<h3 class="dash-25">$12,897</h3>
									</div>
									<div class="progress mb-1">
										<div aria-valuemax="100" aria-valuemin="0" aria-valuenow="70"
											class="progress-bar progress-bar-xs wd-60p bg-secondary" role="progressbar">
										</div>
									</div>
									<div class="expansion-label d-flex">
										<span class="text-muted">Last Month</span>
										<span class="ms-auto"><i class="fa fa-caret-down me-1 text-danger"></i>0.43%</span>
									</div>
								</div>
							</div>
						</div>
						<div class="col-sm-6 col-xl-3 col-lg-6">
							<div class="card custom-card">
								<div class="card-body dash1">
									<div class="d-flex">
										<p class="mb-1 tx-inverse">Total Cost</p>
										<div class="ms-auto">
											<i class="fa fa-usd fs-20 text-success"></i>
										</div>
									</div>
									<div>
										<h3 class="dash-25">$11,234</h3>
									</div>
									<div class="progress mb-1">
										<div aria-valuemax="100" aria-valuemin="0" aria-valuenow="70"
											class="progress-bar progress-bar-xs wd-50p bg-success" role="progressbar"></div>
									</div>
									<div class="expansion-label d-flex text-muted">
										<span class="text-muted">Last Month</span>
										<span class="ms-auto"><i class="fa fa-caret-down me-1 text-danger"></i>1.44%</span>
									</div>
								</div>
							</div>
						</div>
						<div class="col-sm-6 col-xl-3 col-lg-6">
							<div class="card custom-card">
								<div class="card-body dash1">
									<div class="d-flex">
										<p class="mb-1 tx-inverse">Profit By Sale</p>
										<div class="ms-auto">
											<i class="fa fa-signal fs-20 text-info"></i>
										</div>
									</div>
									<div>
										<h3 class="dash-25">$789</h3>
									</div>
									<div class="progress mb-1">
										<div aria-valuemax="100" aria-valuemin="0" aria-valuenow="70"
											class="progress-bar progress-bar-xs wd-40p bg-info" role="progressbar"></div>
									</div>
									<div class="expansion-label d-flex text-muted">
										<span class="text-muted">Last Month</span>
										<span class="ms-auto"><i class="fa fa-caret-up me-1 text-success"></i>0.9%</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* <!--End  Row --> */}

        {/* <!-- Row --> */}
					<div class="row row-sm">
						<div class="col-sm-12 col-xl-8 col-lg-8">
							<div class="card custom-card overflow-hidden">
								<div class="card-body">
									<div class="card-option d-flex">
										<div>
											<h6 class="card-title mb-1">Overview of Sales Win/Lost</h6>
											<p class="text-muted card-sub-title">Comapred to last month sales.</p>
										</div>
										<div class="card-option-title ms-auto">
											<div class="btn-group p-0">
												<button class="btn btn-light btn-sm" type="button">Month</button>
												<button class="btn btn-outline-light btn-sm" type="button">Year</button>
											</div>
										</div>
									</div>
									<div>
										<canvas id="sales"></canvas>
									</div>
								</div>
							</div>
						</div>
						<div class="col-sm-12 col-lg-4 col-xl-4">
							<div class="card custom-card">
								<div class="card-body">
									<div>
										<h6 class="card-title mb-1">Cost BreakDown</h6>
										<p class="text-muted card-sub-title">Excepteur sint occaecat cupidatat non proident.
										</p>
									</div>
									<div class="row">
										<div class="col-6 col-md-6 text-center">
											<div class="mb-2">
												<span class="peity-donut"
													data-peity='{ "fill": ["#eb6f33", "#e1e6f1"], "innerRadius": 14, "radius": 20 }'>4/7</span>
											</div>
											<p class="mb-1 tx-inverse">Marketing</p>
											<h4 class="mb-1"><span>$</span>67,927</h4>
											<span class="text-muted fs-12"><i
													class="fa fa-caret-up me-1 text-success"></i>54% last month</span>
										</div>
										<div class="col-6 col-md-6 text-center">
											<div class="mb-2">
												<span class="peity-donut"
													data-peity='{ "fill": ["#01b8ff", "#e1e6f1"], "innerRadius": 14, "radius": 20 }'>2/7</span>
											</div>
											<p class="mb-1 tx-inverse">Sales</p>
											<h4 class="mb-1"><span>$</span>24,789</h4>
											<span class="text-muted fs-12"><i
													class="fa fa-caret-down me-1 text-danger"></i>33% last month</span>
										</div>
									</div>
								</div>
							</div>
							<div class="card custom-card">
								<div class="card-body">
									<div>
										<h6 class="card-title mb-1">Monthly Profits</h6>
										<p class="text-muted card-sub-title">Excepteur sint occaecat cupidatat non proident.
										</p>
									</div>
									<h3><span>$</span>22,534</h3>
									<div class="clearfix mb-3">
										<div class="clearfix">
											<span class="float-start text-muted">This Month</span>
											<span class="float-end">75%</span>
										</div>
										<div class="progress mt-1">
											<div aria-valuemax="100" aria-valuemin="0" aria-valuenow="70"
												class="progress-bar progress-bar-xs wd-70p bg-primary" role="progressbar">
											</div>
										</div>
									</div>
									<div class="clearfix">
										<div class="clearfix">
											<span class="float-start text-muted">Last Month</span>
											<span class="float-end">50%</span>
										</div>
										<div class="progress mt-1">
											<div aria-valuemax="100" aria-valuemin="0" aria-valuenow="50"
												class="progress-bar progress-bar-xs wd-50p bg-success" role="progressbar">
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* <!-- End Row --> */}


        </div>
        </div>
        </div>
		</div>



<div style={{marginLeft:"300px"}}>
	{MultiLineChart()}
</div>


        </div>
);
}