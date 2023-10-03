import { getRoles } from "@testing-library/react";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../contexts/dataContexts";
import peruFlag from "../images/peru.png";
import mexicoFlag from "../images/mexico.webp";
import ukFlag from "../images/Uk_flag.png";
import spainFlag from "../images/spain_flag.png";
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";

export default class TopNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileDropdownVisible: false,
      displayExtraTopLinks: false,
      user: {},
    };

    this.dropDownOpen = this.dropDownOpen.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);
  }

  country = localStorage.getItem("country");
  email = localStorage.getItem("email");

  static contextType = DataContext;

  componentDidMount() {
    this.setState({ user: this.context.globalState.user });
    console.log(this.context);
  }

  toggleProfileDropdown() {
    let { profileDropdownVisible } = this.state;
    this.setState({ profileDropdownVisible: !profileDropdownVisible }, () => {
      console.log("profile dropdown: ", profileDropdownVisible);
    });
  }

  logout() {
    localStorage.clear();
    document.location.href = `${process.env.REACT_APP_AUTH_LOGIN_URL}?redirect_url=${document.location.href}`;
  }

  userRole() {
    const roles = this.state.user.roles;
    if (roles && roles?.filter((role) => role.Name === "Super Admin").length !== 0) {
      return roles?.filter((role) => role.Name === "Super Admin")[0]?.Name;
    } else if (roles && roles?.filter((role) => role.Name === "Super Admin").length === 0) {
      return roles[0].Name;
    }
  }

  displayCountryFlag = () => {
    if (this.country === "mexico") {
      return <img src={mexicoFlag} alt="" style={{ width: "40px" }} />;
    }
    return <img src={peruFlag} alt="" style={{ width: "40px" }} />;
  };

  signOut = () => {
    localStorage.clear();
  };

  /* Toggle Dropdown menu */

  dropDownOpen = () => {
    this.setState({ isDropDownOpen: !this.state.isDropDownOpen });
  };

  changeLanguage = (language) => {
    this.context.setDefaultLanguage(language);
  };

  render() {
    const dropDownOptions = [
      { img: ukFlag, nativeName: "English", lang: "en" },
      { img: spainFlag, nativeName: "Español", lang: "es" },
    ];

    return (
      <>
        <div className="nk-header nk-header-fixed is-light">
          <div className="container-fluid">
            <div className="nk-header-wrap">
              {/* ============================================= */}
              {/* =============LANGUAGE DROPDOWN=============== */}
              {/* ============================================= */}
              <div
                style={{
                  width: "20%",
                  position: "relative",
                  boxShadow:
                    "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                }}
                onClick={this.dropDownOpen}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                  }}
                >
                  <img
                    style={{ height: "15px", width: "20px", marginRight: "8px" }}
                    src={this.context.defaultLanguage.img}
                    alt=""
                  />
                  {this.context.defaultLanguage.nativeName}
                  <div>{this.state.isDropDownOpen ? <VscChevronUp /> : <VscChevronDown />}</div>
                </div>
                {/* <div>{this.state.isDropDownOpen}</div> */}
                {this.state.isDropDownOpen && (
                  <ul
                    style={{
                      position: "absolute",
                      left: "0",
                      top: "30px",
                      background: "white",
                      width: "100%",
                      padding: "10px 8px",
                      border: "1px solid #DCDDDD",
                    }}
                  >
                    {dropDownOptions.map((language, id) => {
                      return (
                        <li
                          key={id}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                            marginBottom: "8px",
                          }}
                          onClick={() => this.changeLanguage(language)}
                        >
                          <img
                            style={{ height: "15px", width: "20px", marginRight: "8px" }}
                            src={language.img}
                            alt=""
                          />
                          {language.nativeName}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
              {/* ============================================== */}
              {/* ============================================== */}
              <div
                style={{
                  marginRight: "20px",
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                {this.displayCountryFlag()}
              </div>
              <div className="nk-menu-trigger d-xl-none ml-n1">
                <Link
                  to={"#"}
                  className="nk-nav-toggle nk-quick-nav-icon"
                  data-target="sidebarMenu"
                >
                  <em className="icon ni ni-menu" />
                </Link>
              </div>
              <div className="nk-header-brand d-xl-none">
                <Link to={"/sample"} className="logo-link">
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
                </Link>
              </div>
              {/* .nk-header-brand */}
              {/* <div class="nk-header-news d-none d-xl-block">
                                        <div class="nk-news-list">
                                            <a class="nk-news-item" href="#">
                                                
                                            
                                            </a>
                                        </div>
                                    </div>.nk-header-news */}
              <div className="nk-header-tools">
                <ul className="nk-quick-nav">
                  <li className="dropdown user-dropdown">
                    <Link to={"#"} className="dropdown-toggle" data-toggle="dropdown">
                      <div className="user-toggle">
                        <div className="user-avatar sm">
                          <em className="icon ni ni-user-alt" />
                        </div>
                        <div className="user-info d-none d-md-block">
                          <div className="user-status">
                            {/* {this.state.user?.roles &&
                              this.state.user?.roles[0]?.Name} */}
                            {/* {role && role[0]?.Name} */}
                            {/* {role} */}
                          </div>
                          <div className="user-name dropdown-indicator">
                            {/* {this.state.user?.user?.FirstName}{" "}
                            {this.state.user?.user?.LastName} */}
                            {this.email}
                          </div>
                        </div>
                      </div>
                    </Link>
                    <div className="dropdown-menu dropdown-menu-md dropdown-menu-right dropdown-menu-s1">
                      <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
                        <div className="user-card">
                          <div className="user-avatar">
                            <span>
                              {this.state.user?.user?.FirstName?.charAt(0).toUpperCase()}
                              {this.state.user?.user?.LastName?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="user-info">
                            <span className="lead-text">
                              {this.state.user?.user?.FirstName} {this.state.user?.user?.LastName}
                            </span>
                            <span className="sub-text">{this.state.user?.user?.Email}</span>
                          </div>
                        </div>
                      </div>
                      <div className="dropdown-inner">
                        {/* <ul className="link-list"> */}
                        {/* <li>
                            <a href={{ javascript: void 0 }}>
                              <em className="icon ni ni-user-alt" />
                              <span>View Profile</span>
                            </a>
                          </li> */}
                        {/* <li>
                            <Link to="html/user-profile-setting.html">
                              <em className="icon ni ni-setting-alt" />
                              <span>Account Setting</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="html/user-profile-activity.html">
                              <em className="icon ni ni-activity-alt" />
                              <span>Login Activity</span>
                            </Link>
                          </li>
                          <li>
                            <a className="dark-switch" href="#">
                              <em className="icon ni ni-moon" />
                              <span>Dark Mode</span>
                            </a>
                          </li> */}
                        {/* </ul> */}
                      </div>
                      <div className="dropdown-inner">
                        <ul className="link-list">
                          <li onClick={this.signOut}>
                            <a href={"/"}>
                              <em className="icon ni ni-signout" />
                              <span>Sign out</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  {/* .dropdown */}
                  <li className="dropdown notification-dropdown mr-n1">
                    {/* <a
                      href="#"
                      className="dropdown-toggle nk-quick-nav-icon"
                      data-toggle="dropdown"
                    >
                      <div className="icon-status icon-status-info">
                        <em className="icon ni ni-bell" />
                      </div>
                    </a> */}
                    <div className="dropdown-menu dropdown-menu-xl dropdown-menu-right dropdown-menu-s1">
                      <div className="dropdown-head">
                        <span className="sub-title nk-dropdown-title">Notifications</span>
                        <Link to="#">Mark All as Read</Link>
                      </div>
                      <div className="dropdown-body">
                        <div className="nk-notification">
                          <div className="nk-notification-item dropdown-inner">
                            <div className="nk-notification-icon">
                              <em className="icon icon-circle bg-warning-dim ni ni-curve-down-right" />
                            </div>
                            <div className="nk-notification-content">
                              <div className="nk-notification-text">
                                You have requested to
                                <span>Widthdrawl</span>
                              </div>
                              <div className="nk-notification-time">2 hrs ago</div>
                            </div>
                          </div>
                          <div className="nk-notification-item dropdown-inner">
                            <div className="nk-notification-icon">
                              <em className="icon icon-circle bg-success-dim ni ni-curve-down-left" />
                            </div>
                            <div className="nk-notification-content">
                              <div className="nk-notification-text">
                                Your <span>Deposit Order</span> is placed
                              </div>
                              <div className="nk-notification-time">2 hrs ago</div>
                            </div>
                          </div>
                          <div className="nk-notification-item dropdown-inner">
                            <div className="nk-notification-icon">
                              <em className="icon icon-circle bg-warning-dim ni ni-curve-down-right" />
                            </div>
                            <div className="nk-notification-content">
                              <div className="nk-notification-text">
                                You have requested to
                                <span>Widthdrawl</span>
                              </div>
                              <div className="nk-notification-time">2 hrs ago</div>
                            </div>
                          </div>
                          <div className="nk-notification-item dropdown-inner">
                            <div className="nk-notification-icon">
                              <em className="icon icon-circle bg-success-dim ni ni-curve-down-left" />
                            </div>
                            <div className="nk-notification-content">
                              <div className="nk-notification-text">
                                Your <span>Deposit Order</span> is placed
                              </div>
                              <div className="nk-notification-time">2 hrs ago</div>
                            </div>
                          </div>
                          <div className="nk-notification-item dropdown-inner">
                            <div className="nk-notification-icon">
                              <em className="icon icon-circle bg-warning-dim ni ni-curve-down-right" />
                            </div>
                            <div className="nk-notification-content">
                              <div className="nk-notification-text">
                                You have requested to
                                <span>Widthdrawl</span>
                              </div>
                              <div className="nk-notification-time">2 hrs ago</div>
                            </div>
                          </div>
                          <div className="nk-notification-item dropdown-inner">
                            <div className="nk-notification-icon">
                              <em className="icon icon-circle bg-success-dim ni ni-curve-down-left" />
                            </div>
                            <div className="nk-notification-content">
                              <div className="nk-notification-text">
                                Your <span>Deposit Order</span> is placed
                              </div>
                              <div className="nk-notification-time">2 hrs ago</div>
                            </div>
                          </div>
                        </div>
                        {/* .nk-notification */}
                      </div>
                      {/* .nk-dropdown-body */}
                      <div className="dropdown-foot center">
                        <Link to="#">View All</Link>
                      </div>
                    </div>
                  </li>
                  {/* .dropdown */}
                </ul>
                {/* .nk-quick-nav */}
              </div>
              {/* .nk-header-tools */}
            </div>
            {/* .nk-header-wrap */}
          </div>
          {/* .container-fliud */}
        </div>
      </>
    );
  }
}
