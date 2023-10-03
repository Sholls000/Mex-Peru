// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import Menus from "../utils/menu";
// import Spinner from "../utils/spinner";
// import { DataContext } from "../contexts/dataContexts";
// // import Logo from "../utils/logo";
// // import {  } from "../utils/utilityFunctions";

// export default class Sidebar extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       menus: [],
//       iscompact: false,
//     };
//   }

//   static contextType = DataContext;

//   componentDidMount() {
//     const globalState = this.context.globalState;
//     console.log(globalState.user?.role?.toLowerCase());
//     const userMenus = Menus[globalState.user?.role?.toLowerCase()] || [];
//     this.setState({ menus: userMenus });
//   }

//   toggleCompact = () => {
//     this.setState({ iscompact: !this.state.iscompact });
//   };

//   render() {
//     return (
//       <div
//         className={`nk-sidebar nk-sidebar-fixed is-dark ${
//           this.state.iscompact && " nk-sidebar-active is-compact"
//         }`}
//         data-content="sidebarMenu"
//       >
//         <div className="nk-sidebar-element nk-sidebar-head">
//           <div className="nk-menu-trigger">
//             <Link
//               to={"#"}
//               className="nk-nav-toggle nk-quick-nav-icon d-xl-none"
//               data-target="sidebarMenu"
//             >
//               <em className="icon ni ni-arrow-left" />
//             </Link>
//             <Link
//               to={"#"}
//               onClick={() => this.toggleCompact()}
//               className="nk-nav-compact nk-quick-nav-icon d-none d-xl-inline-flex"
//               data-target="sidebarMenu"
//             >
//               <em className="icon ni ni-menu" />
//             </Link>
//           </div>
//           <div className="nk-sidebar-brand">
//             <Link to={"html/index.html"} className="logo-link nk-sidebar-logo">
//               <img
//                 className="logo-light logo-img"
//                 src="./images/internautical_white_logo.png"
//                 srcSet="./images/internautical_white_logo.png 2x"
//                 alt="logo"
//               />
//               <img
//                 className="logo-dark logo-img"
//                 src="./images/internautical_white_logo.png"
//                 srcSet="./images/internautical_white_logo.png 2x"
//                 alt="logo-dark"
//               />
//             </Link>
//           </div>
//         </div>
//         {/* .nk-sidebar-element */}
//         <div className="nk-sidebar-element nk-sidebar-body">
//           <div className="nk-sidebar-content">
//             <div className="nk-sidebar-menu" data-simplebar>
//               <ul className="nk-menu">
//                 <li className="nk-menu-heading">
//                   <h6 className="overline-title text-primary-alt">
//                     ---
//                   </h6>
//                 </li>
//                 {/* .nk-menu-item */}
//                 {("vessel_view_module") && (
//                   <li className="nk-menu-item">
//                     <Link to={"/list-vessels"} className="nk-menu-link">
//                       <span className="nk-menu-icon">
//                         <em className="icon ni ni-downward-alt-fill" />
//                       </span>
//                       <span className="nk-menu-text">Vessels</span>
//                     </Link>
//                   </li>
//                 )}
//                 {/* .nk-menu-item */}
//                 {("location_view_module") && (
//                   <li className="nk-menu-item">
//                     <Link to="/locations" className="nk-menu-link">
//                       <span className="nk-menu-icon">
//                         <em className="icon ni ni-map-pin-fill" />
//                       </span>
//                       <span className="nk-menu-text">Locations</span>
//                     </Link>
//                   </li>
//                 )}
//                 {/* .nk-menu-item */}
//                 {("parties_view_module") && (
//                   <li className="nk-menu-item">
//                     <Link to="/party-list" className="nk-menu-link">
//                       <span className="nk-menu-icon">
//                         <em className="icon ni ni-briefcase" />
//                       </span>
//                       <span className="nk-menu-text">Parties</span>
//                     </Link>
//                   </li>
//                 )}
//                 {/* .nk-menu-item */}
//                 {("equipment_view_module") && (
//                   <li className="nk-menu-item">
//                     <Link to="/equipment-list" className="nk-menu-link">
//                       <span className="nk-menu-icon">
//                         <em className="icon ni ni-cc-secure" />
//                       </span>
//                       <span className="nk-menu-text">Cargo Equipments</span>
//                     </Link>
//                   </li>
//                 )}
//                 {/* .nk-menu-item */}
//                 {("commercial_view_module") && (
//                   <li className="nk-menu-item">
//                     <Link to="/commercials" className="nk-menu-link">
//                       <span className="nk-menu-icon">
//                         <em className="icon ni ni-layers" />
//                       </span>
//                       <span className="nk-menu-text">Commercial</span>
//                     </Link>
//                   </li>
//                 )}
//                 {/* .nk-menu-item */}
//                 {(
//                   "sailing-schedule_view_sailing_calendar"
//                 ) && (
//                   <li className="nk-menu-item">
//                     <Link to="/sailingschedule" className="nk-menu-link">
//                       <span className="nk-menu-icon">
//                         <em className="icon ni ni-tile-thumb" />
//                       </span>
//                       <span className="nk-menu-text">Sailing schedule</span>
//                     </Link>
//                   </li>
//                 )}
//                 {/* .nk-menu-item */}
//                 {("forecast_view_module") && (
//                   <li className="nk-menu-item">
//                     <Link to="html/Forecast_List.html" className="nk-menu-link">
//                       <span className="nk-menu-icon">
//                         <em className="icon ni ni-growth" />
//                       </span>
//                       <span className="nk-menu-text">Forecast</span>
//                     </Link>
//                   </li>
//                 )}
//                 {/* .nk-menu-item */}
//                 {("booking_view_bookings_list") && (
//                   <li className="nk-menu-item">
//                     <Link to="/booking-requests" className="nk-menu-link">
//                       <span className="nk-menu-icon">
//                         <em className="icon ni ni-swap-alt-fill" />
//                       </span>
//                       <span className="nk-menu-text">Booking Request</span>
//                     </Link>
//                   </li>
//                 )}
//                 {/* .nk-menu-item */}
//                 {("voyage-planning_view_module") && (
//                   <li className="nk-menu-item">
//                     <Link to="/voyages" className="nk-menu-link">
//                       <span className="nk-menu-icon">
//                         <em className="icon ni ni-globe" />
//                       </span>
//                       <span className="nk-menu-text">Voyage Planning</span>
//                     </Link>
//                   </li>
//                 )}
//                 {/* .nk-menu-item */}
//                 {("activities_view_module") && (
//                   <li className="nk-menu-item">
//                     <Link to="/activity-list" className="nk-menu-link">
//                       <span className="nk-menu-icon">
//                         <em className="icon ni ni-note-add" />
//                       </span>
//                       <span className="nk-menu-text">Activities</span>
//                     </Link>
//                   </li>
//                 )}
//                 {/* .nk-menu-item */}
//                 <li className="nk-menu-item">
//                   <Link to="html/ActivityView.html" className="nk-menu-link">
//                     <span className="nk-menu-icon">
//                       <em className="icon ni ni-reports" />
//                     </span>
//                     <span className="nk-menu-text">
//                       Activities - Voyage Reporting
//                     </span>
//                   </Link>
//                 </li>
//                 {/* .nk-menu-item */}
//                 {/* <li class="nk-menu-item">
//                                             <Link to="html/index-analytics.html" class="nk-menu-link" onclick="return false">
//                                                 <span class="nk-menu-icon"><em class="icon ni ni-report-profit"></em></span>
//                                                 <span class="nk-menu-text">Contract Performance</span>
//                                             </Link>
//                                         </li> */}
//                 {/* .nk-menu-item */}
//                 <li className="nk-menu-item d-none">
//                   <Link to="/costs/ports" className="nk-menu-link">
//                     <span className="nk-menu-icon">
//                       <em className="icon ni ni-swap-alt-fill" />
//                     </span>
//                     <span className="nk-menu-text">Costs</span>
//                   </Link>
//                 </li>
//                 {/* .nk-menu-item */}

//                 {("invoice_view_module") && (
//                   <li className="nk-menu-item">
//                     <Link to="/invoices" className="nk-menu-link">
//                       <span className="nk-menu-icon">
//                         <em className="icon ni ni-file-docs" />
//                       </span>
//                       <span className="nk-menu-text">Invoicing</span>
//                     </Link>
//                   </li>
//                 )}
//                 <li className="nk-menu-item">
//                   <Link to="/payments" className="nk-menu-link">
//                     <span className="nk-menu-icon">
//                       <em className="icon ni ni-money" />
//                     </span>
//                     <span className="nk-menu-text">Payments</span>
//                   </Link>
//                 </li>
//                 {/* .nk-menu-item */}
//                 {/* <li class="nk-menu-item">
//                                             <Link to="html/ComplianceList.html" class="nk-menu-link">
//                                                 <span class="nk-menu-icon"><em class="icon ni ni-growth"></em></span>
//                                                 <span class="nk-menu-text">Compliance</span>
//                                             </Link>
//                                         </li> */}
//                 {("pool_view_module") && (
//                   <li className="nk-menu-item">
//                     <Link to="/vessel-pools" className="nk-menu-link">
//                       <span className="nk-menu-icon">
//                         <em className="icon ni ni-truck" />
//                       </span>
//                       <span className="nk-menu-text">Pool</span>
//                     </Link>
//                   </li>
//                 )}
//                 {/* .nk-menu-item */}
//                 <li className="nk-menu-item">
//                   <Link to="html/VesselComp.html" className="nk-menu-link">
//                     <span className="nk-menu-icon">
//                       <em className="icon ni ni-location" />
//                     </span>
//                     <span className="nk-menu-text">Vessel (Comparison)</span>
//                   </Link>
//                 </li>
//                 {/* .nk-menu-item */}
//                 <li className="nk-menu-item">
//                   <Link to="/update-system-settings" className="nk-menu-link">
//                     <span className="nk-menu-icon">
//                       <em className="icon ni ni-setting" />
//                     </span>
//                     <span className="nk-menu-text">Settings</span>
//                   </Link>
//                 </li>
//                 {/* .nk-menu-item */}
//                 <li className="nk-menu-item">
//                   <Link to="/users" className="nk-menu-link">
//                     <span className="nk-menu-icon">

import React, { Component } from "react";
import { Link } from "react-router-dom";
import Menus from "../utils/menu";
import Spinner from "../utils/spinner";
import { DataContext } from "../contexts/dataContexts";

// import Logo from "../utils/logo";
// import { checkUserPermission } from "../utils/utilityFunctions";

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: [],
      iscompact: false,
    };
  }

  static contextType = DataContext;

  componentDidMount() {
    const globalState = this.context.globalState;
    console.log(globalState.user?.role?.toLowerCase());
    const userMenus = Menus[globalState.user?.role?.toLowerCase()] || [];
    this.setState({ menus: userMenus });
  }

  toggleCompact = () => {
    this.setState({ iscompact: !this.state.iscompact });
  };

  render() {
    return (
      <div
        className={`nk-sidebar nk-sidebar-fixed is-dark ${
          this.state.iscompact && " nk-sidebar-active is-compact"
        }`}
        data-content="sidebarMenu"
      >
        <div className="nk-sidebar-element nk-sidebar-head">
          <div className="nk-menu-trigger">
            <Link
              to={"#"}
              className="nk-nav-toggle nk-quick-nav-icon d-xl-none"
              data-target="sidebarMenu"
            >
              <em className="icon ni ni-arrow-left" />
            </Link>
            <Link
              to={"#"}
              onClick={() => this.toggleCompact()}
              className="nk-nav-compact nk-quick-nav-icon d-none d-xl-inline-flex"
              data-target="sidebarMenu"
            >
              <em className="icon ni ni-menu" />
            </Link>
          </div>
          <div className="nk-sidebar-brand">
            <a href="/" className="logo-link nk-sidebar-logo">
              <img
                className="logo-light logo-img"
                src="/assets/images/jsTree/logo.svg"
                srcSet="/assets/images/jsTree/logo.png 2x"
                alt="logo"
              />
              <img
                className="logo-dark logo-img"
                src="/assets/images/jsTree/logo.svg"
                srcSet="/assets/images/jsTree/logo.png 2x"
                alt="logo-dark"
              />
            </a>
          </div>
        </div>
        {/* .nk-sidebar-element */}
        <div className="nk-sidebar-element nk-sidebar-body">
          <div className="nk-sidebar-content">
            <div className="nk-sidebar-menu" data-simplebar>
              <ul className="nk-menu">
                <li className="nk-menu-heading">
                  <h6 className="overline-title text-primary-alt">{this.props.administrator}</h6>
                </li>
                <li className="nk-menu-item">
                  <Link to="/coordinates-update" className="nk-menu-link">
                    <span className="nk-menu-icon">
                      <em className="icon ni ni-map-pin-fill" />
                    </span>
                    <span className="nk-menu-text">{this.props.changeCoordinate}</span>
                  </Link>
                </li>

                <li className="nk-menu-item">
                  <Link to="/credentials-update" className="nk-menu-link">
                    <span className="nk-menu-icon">
                      <em className="icon ni ni-account-setting-fill" />
                    </span>
                    <span className="nk-menu-text">{this.props.passwordReset}</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
